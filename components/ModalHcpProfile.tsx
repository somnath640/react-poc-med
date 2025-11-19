// app/components/ModalHcpProfile.tsx
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import CallPlanning from "./CallPlanning";
import DetailingPlayer from "./DetailingPlayer";
import DetailingSequence from "./DetailingSequence";
import SuccessPanel from "./SuccessPanel";

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function ModalHcpProfile({ visible, onClose }: Props) {
  const { width, height } = useWindowDimensions();
  const isNarrow = width < 420;
  const containerWidth = isNarrow ? Math.min(width - 24, 360) : Math.min(width * 0.48, 980);

  const [showCallPlan, setShowCallPlan] = useState(false);
  const [showDetailingList, setShowDetailingList] = useState(false);

  // play queue + index
  const [playQueue, setPlayQueue] = useState<any[]>([]);
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [openPlayerFor, setOpenPlayerFor] = useState<any | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [completedMap, setCompletedMap] = useState<Record<string, boolean>>({});

  // Reset modal state whenever the modal is opened so it always starts from the beginning.
  useEffect(() => {
    if (visible) {
      // reset all listing/player UI state so modal shows initial screen
      setShowCallPlan(false);
      setShowDetailingList(false);

      // clear play queue + player index
      setPlayQueue([]);
      setPlayIndex(null);
      setOpenPlayerFor(null);

      // hide success panel and reset completed flags
      setShowSuccess(false);
      setCompletedMap({});
    }
  }, [visible]);

  const hcp = {
    name: "Dr. Rajesh Sharma",
    speciality: "Cardiologist",
    tier: "Gold",
    visitTime: "09:00 AM",
    distance: "2.3 km",
    duration: "45 min",
    age: 48,
    experience: "20 yrs",
    rcpa: "₹18 Lacs",
    uin: "MH12340",
    prescriber: "KBL",
    lastVisitDays: 3,
    nextVisit: "Nov 7, 2025",
    overallRate: 92,
  };

  // demo slide image path (use local file or remote url)
  const demoSlideImage = "file:///mnt/data/b4cba913-84b6-4fc2-8848-1c6cad5df14d.png";

  // When DetailingSequence asks to start detailing a product,
  // parent receives (product, allProducts, index) — create a play queue and start at index.
  function handleStartDetailing(productFromList?: Partial<any>, products?: any[], index?: number) {
    // For the "Tonact EZ 40" demo we will use the four uploaded slide images you provided.
    const demoImages = [
      require("../assets/images/tonact.png"),
      require("../assets/images/starpress.png"),
      require("../assets/images/ramister.png"),
      require("../assets/images/tonact.png"), // <-- update to your real 4th filename
    ];

    const product = {
      id: productFromList?.id ?? "p-demo",
      name: productFromList?.name ?? "Tonact EZ 40",
      tagline: productFromList?.tagline ?? "Statin Combination",
      indication: productFromList?.indication ?? "Hyperlipidemia, CVD Prevention",
      slides: [
        {
          id: "s1",
          title: `Introduction - ${productFromList?.name ?? "Tonact EZ 40"}`,
          image: demoImages[0],
          description:
            "Tonact EZ combines Atorvastatin 10mg with Ezetimibe 10mg for superior lipid-lowering efficacy through complementary mechanisms.",
          keyPoints: [
            "Dual mechanism: HMG-CoA reductase inhibition + cholesterol absorption inhibition",
            "Superior LDL-C reduction vs statin alone",
            "Established cardiovascular protection",
            "Excellent safety profile with proven clinical data",
          ],
        },
        {
          id: "s2",
          title: "Clinical Evidence",
          image: demoImages[1],
          description:
            "Multiple landmark trials have demonstrated superior efficacy of Atorvastatin + Ezetimibe combination therapy.",
          keyPoints: [
            "IMPROVE-IT: 18% relative reduction in CV events",
            "Greater LDL-C reduction vs statin alone",
            "Complementary mechanisms for maximum efficacy",
            "Proven safety with combination therapy",
          ],
        },
        {
          id: "s3",
          title: "Dosing & Administration",
          image: demoImages[2],
          description: "Tonact EZ offers convenient once-daily combination dosing for optimal patient compliance.",
          keyPoints: [
            "Fixed-dose combination: Atorvastatin 10mg + Ezetimibe 10mg",
            "Once-daily dosing improves adherence",
            "Can be taken any time of day, with or without food",
            "Suitable for patients not at LDL goal with statin alone",
          ],
        },
        {
          id: "s4",
          title: "Safety & Tolerability",
          image: demoImages[3],
          description: "Tonact EZ has an excellent safety profile with proven tolerability in clinical practice.",
          keyPoints: [
            "Well-tolerated combination therapy",
            "Monitor liver function at baseline and periodically",
            "Minimal drug-drug interactions",
            "Safe in elderly and patients with comorbidities",
          ],
        },
      ],
    };

    // If the caller provided the full products list and a start index, use the queue behavior:
    if (products && typeof index === "number") {
      setPlayQueue(products);
      setPlayIndex(index);
      return;
    }

    // otherwise simply open player for this single product
    setOpenPlayerFor(product);
  }

  // Called by player when slides viewed — if you want to persist or show per-product progress, do that here.
  function handleSlideViewed(slidesViewed: number) {
    // optional: persist
    // console.log("slidesViewed:", slidesViewed);
  }

  // Called when the player marks product complete
  function handleCompleteProduct() {
    // nothing immediate; Next Product button is what advances, but you could auto-advance here too
  }

  // Advance to next product (called from player)
  function handleNextProduct() {
    if (playIndex == null) return;
    const next = playIndex + 1;
    if (next < playQueue.length) {
      setPlayIndex(next);
    } else {
      // finished all products — close player
      setPlayIndex(null);
      setPlayQueue([]);
      setShowDetailingList(false);
    }
  }

  // close player: clear queue & index
  function closePlayer() {
    setPlayIndex(null);
    setPlayQueue([]);
  }

  // currently playing product:
  const currentProduct = playIndex != null && playQueue[playIndex] ? playQueue[playIndex] : null;

  return (
    <Modal animationType="slide" visible={visible} transparent onRequestClose={onClose}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}>
        <StatusBar barStyle="light-content" />
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <Pressable
            style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}
            onPress={onClose}
          />

          <View
            style={{
              width: containerWidth,
              maxHeight: Math.min(height - 48, 960),
              backgroundColor: "#fff",
              borderRadius: 12,
              overflow: "hidden",
              elevation: 18,
              shadowColor: "#000",
              shadowOpacity: 0.18,
              shadowRadius: 14,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 12,
                justifyContent: "space-between",
                backgroundColor: "#fff",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View>
                  <Text style={{ fontWeight: "800", fontSize: 16, color: "#0f172a" }}>
                    {hcp.name}
                  </Text>
                  <Text style={{ color: "#6b7280", fontSize: 12 }}>
                    360° HCP Profile — Scheduled at {hcp.visitTime}
                  </Text>
                </View>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                <View
                  style={{
                    backgroundColor: "#fff7ed",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: "#fbe0b8",
                  }}
                >
                  <Text style={{ color: "#b45309", fontWeight: "800", fontSize: 12 }}>
                    {hcp.tier}
                  </Text>
                </View>
                <Pressable onPress={onClose} style={{ padding: 8 }}>
                  <Ionicons name="close" size={20} color="#6b7280" />
                </Pressable>
              </View>
            </View>

            {/* body: if a product in the playQueue is active -> show player */}
            {currentProduct ? (
              <DetailingPlayer
                product={currentProduct}
                productIndex={playIndex ?? 0}
                totalProducts={playQueue.length}
                onBack={() => {
                  closePlayer();
                }}
                onSlideViewed={handleSlideViewed}
                onComplete={handleCompleteProduct}
                onNextProduct={handleNextProduct}
                onFinish={() => {
                  // Show the SuccessPanel when user clicks Finish
                  setShowSuccess(true);
                  // optionally clear queue/index
                  setPlayIndex(null);
                  setPlayQueue([]);
                  // ensure the detailing list is visible so the success UI sits in same modal body
                  setShowDetailingList(true);
                }}
                inline={true}
              />
            ) : showCallPlan ? (
              <CallPlanning
                onCancel={() => setShowCallPlan(false)}
                onProceed={() => {
                  setShowCallPlan(false);
                  setShowDetailingList(true);
                }}
              />
            ) : showDetailingList ? (
              showSuccess ? (
                <SuccessPanel
                  onSubmit={() => {
                    onClose();
                  }}
                />
              ) : (
                <DetailingSequence
                  onClose={() => setShowDetailingList(false)}
                  onBack={() => setShowDetailingList(false)}
                  onStartDetailing={(p?: Partial<any>, products?: any[], idx?: number) => {
                    handleStartDetailing(p, products, idx);
                  }}
                  completedMap={completedMap}
                />
              )
            ) : (
              <MainProfileContent
                hcp={hcp}
                onStartCall={() => {
                  setShowCallPlan(true);
                }}
              />
            )}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

/* ----------------- MainProfileContent + small building blocks ----------------- */

function MainProfileContent({ hcp, onStartCall }: { hcp: any; onStartCall: () => void }) {
  const [activeTab, setActiveTab] = useState<"Overview" | "Practice" | "Engagement" | "Insights">(
    "Overview"
  );

  return (
    <>
      <ScrollView contentContainerStyle={{ padding: 14 }} showsVerticalScrollIndicator>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <MetricCard
            color="#eef2ff"
            title="Visit Time"
            value={hcp.visitTime}
            icon={<Ionicons name="time-outline" size={16} color="#2563eb" />}
          />
          <MetricCard
            color="#ecfdf5"
            title="Distance"
            value={hcp.distance}
            icon={<Ionicons name="location-outline" size={16} color="#059669" />}
          />
          <MetricCard
            color="#f5f3ff"
            title="Duration"
            value={hcp.duration}
            icon={<MaterialIcons name="timer" size={16} color="#7c3aed" />}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <SmallStat title="Age" value={`${hcp.age}`} />
          <SmallStat title="Experience" value={hcp.experience} />
          <SmallStat title="RCPA Value" value={hcp.rcpa} bg="#ecfdf5" border="#d1fae5" />
        </View>

        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 10,
            marginBottom: 10,
          }}
        >
          <Box label="UIN" value={hcp.uin} />
          <Box
            label="Prescriber"
            value={hcp.prescriber}
            color="#fff1f2"
            border="#ffe3ee"
            textColor="#be185d"
          />
        </View>

        <View
          style={{
            backgroundColor: "#faf5ff",
            padding: 12,
            borderRadius: 10,
            marginBottom: 14,
            borderWidth: 1,
            borderColor: "#efe6ff",
          }}
        >
          <Text style={{ color: "#6b7280", fontWeight: "700", marginBottom: 6 }}>
            Nature of Practice
          </Text>
          <Text style={{ color: "#374151" }}>Corporate Hospital, Private Clinic</Text>
        </View>

        {/* Tabs */}
        <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
          <TabPill
            label="Overview"
            active={activeTab === "Overview"}
            onPress={() => setActiveTab("Overview")}
          />
          <TabPill
            label="Practice"
            active={activeTab === "Practice"}
            onPress={() => setActiveTab("Practice")}
          />
          <TabPill
            label="Engagement"
            active={activeTab === "Engagement"}
            onPress={() => setActiveTab("Engagement")}
          />
          <TabPill
            label="Insights"
            active={activeTab === "Insights"}
            onPress={() => setActiveTab("Insights")}
          />
        </View>

        {/* Tab content */}
        {activeTab === "Overview" && (
          <>
            <Section
              title="Basic Information"
              icon={<Ionicons name="information-circle-outline" size={18} color="#0284c7" />}
              bg="#f0f9ff"
              border="#dbeffd"
            >
              <RowIcon
                icon={<Ionicons name="call-outline" size={14} color="#0284c7" />}
                text="+91 98765 43210"
              />
              <RowIcon
                icon={<MaterialIcons name="email" size={14} color="#0284c7" />}
                text="dr.sharma@hospital.com"
              />
              <RowIcon
                icon={<Ionicons name="location-outline" size={14} color="#0284c7" />}
                text="Breach Candy Hospital, Mumbai"
              />
              <Text style={{ color: "#64748b", marginTop: 8 }}>
                Specialty:{" "}
                <Text style={{ color: "#0f172a", fontWeight: "700" }}>{hcp.speciality}</Text>
              </Text>
            </Section>

            <Section
              title="Demographic Details"
              icon={<FontAwesome5 name="user-graduate" size={16} color="#be185d" />}
              bg="#fff1f2"
              border="#ffebf0"
            >
              <View style={{ marginBottom: 8 }}>
                <Text style={{ color: "#374151" }}>
                  Birthday: <Text style={{ fontWeight: "700" }}>Jan 15, 1977</Text> {"  "} • {"  "}
                  Wife's Birthday: <Text style={{ fontWeight: "700" }}>Mar 22, 1980</Text>
                </Text>
                <Text style={{ color: "#374151", marginTop: 6 }}>
                  Anniversary: <Text style={{ fontWeight: "700" }}>Dec 10, 2005</Text>
                </Text>
              </View>

              <Divider />

              <Text style={{ marginTop: 8, color: "#6b7280", marginBottom: 8 }}>
                Academic credentials:
              </Text>
              <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                MBBS - KEM Hospital, MD Cardiology - AIIMS
              </Text>

              <Divider />

              <Text style={{ marginTop: 8, color: "#6b7280", marginBottom: 8 }}>
                Hospitals affiliated:
              </Text>
              <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                Breach Candy Hospital{"\n"}
                Jaslok Hospital
              </Text>

              <Divider />

              <Text style={{ marginTop: 8, color: "#6b7280", marginBottom: 8 }}>Mentors:</Text>
              <Text style={{ color: "#0f172a" }}>Dr. Devi Shetty, Dr. Naresh Trehan</Text>
            </Section>

            <Section
              title="Visit & Communication"
              icon={<Ionicons name="calendar-outline" size={18} color="#7c3aed" />}
              bg="#fbf8ff"
              border="#f3e8ff"
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <Text style={{ color: "#6b7280" }}>
                  Last Visit:{" "}
                  <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                    {hcp.lastVisitDays} days ago
                  </Text>
                </Text>
                <Text style={{ color: "#6b7280" }}>
                  Next Visit:{" "}
                  <Text style={{ fontWeight: "700", color: "#0f172a" }}>{hcp.nextVisit}</Text>
                </Text>
              </View>
              <Text style={{ color: "#6b7280", marginBottom: 8 }}>
                Total Visits:{" "}
                <Text style={{ fontWeight: "700", color: "#0f172a" }}>24</Text> • Classification:{" "}
                <Text style={{ fontWeight: "700" }}>V2</Text>
              </Text>

              <Divider />

              <Text style={{ color: "#6b7280", marginBottom: 8 }}>
                Communication:{" "}
                <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                  In-clinic, Email, WhatsApp
                </Text>
              </Text>

              <View style={{ flexDirection: "row", gap: 8, marginTop: 8 }}>
                <SmallTag label="Brand-A" />
                <SmallTag label="Brand-B" />
                <SmallTag label="Brand-C" />
              </View>
            </Section>

            <Section
              title="Digital Engagement"
              icon={<Ionicons name="phone-portrait-outline" size={16} color="#0ea5a4" />}
              bg="#fff"
              border="#eef2f7"
            >
              <EngagementItem
                icon={<MaterialIcons name="email" size={16} color="#0ea5a4" />}
                title="Email"
                subtitle="Opened product brochure • 2 days ago"
                status="Engaged"
              />
              <EngagementItem
                icon={<Ionicons name="play-circle-outline" size={16} color="#16a34a" />}
                title="Webinar"
                subtitle="Attended Product X launch • 1 week ago"
                status="Completed"
              />
              <EngagementItem
                icon={<MaterialIcons name="menu-book" size={16} color="#2563eb" />}
                title="E-Detail"
                subtitle="Viewed clinical trial data • 3 days ago"
                status="Engaged"
              />
            </Section>

            <View style={{ marginTop: 8, marginBottom: 18 }}>
              <Text style={{ fontWeight: "700", marginBottom: 8 }}>Prescription Rate</Text>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: "#eef2f7",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ color: "#6b7280" }}>Overall Rate</Text>
                  <Text style={{ fontWeight: "800" }}>{hcp.overallRate}%</Text>
                </View>
                <View
                  style={{
                    height: 12,
                    backgroundColor: "#e6e9ef",
                    borderRadius: 999,
                    overflow: "hidden",
                    marginTop: 10,
                  }}
                >
                  <View
                    style={{
                      width: `${hcp.overallRate}%`,
                      height: "100%",
                      backgroundColor: "#0f172a",
                    }}
                  />
                </View>
              </View>
            </View>
          </>
        )}

        {activeTab === "Practice" && (
          <View style={{ paddingVertical: 16 }}>
            <Text style={{ color: "#6b7280" }}>
              Practice view placeholder — plug in clinic / hospital mix, patient load, OPD timings
              etc.
            </Text>
          </View>
        )}

        {activeTab === "Engagement" && (
          <View style={{ paddingVertical: 16 }}>
            <Text style={{ color: "#6b7280" }}>
              Engagement view placeholder — show past calls, channel preference, response to
              campaigns.
            </Text>
          </View>
        )}

        {activeTab === "Insights" && (
          <View style={{ paddingVertical: 16 }}>
            <Text style={{ color: "#6b7280" }}>
              Insights view placeholder — add opportunity areas, segmentation notes, AI suggestions.
            </Text>
          </View>
        )}

        <View style={{ height: 8 }} />
      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          padding: 12,
          borderTopWidth: 1,
          borderColor: "#eef2f7",
          backgroundColor: "#fff",
        }}
      >
        <Pressable
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#e6e9ef",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            marginRight: 8,
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
          onPress={() => {
            /* navigate */
          }}
        >
          <Ionicons name="navigate-outline" size={16} color="#0f172a" />
          <Text style={{ fontWeight: "700" }}>Navigate</Text>
        </Pressable>

        <Pressable
          style={{
            flex: 1,
            backgroundColor: "#0f172a",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
          onPress={() => {
            onStartCall();
          }}
        >
          <Ionicons name="call-outline" size={16} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "800" }}>Start Call</Text>
        </Pressable>
      </View>
    </>
  );
}

/* ---- small building blocks ---- */
function MetricCard({
  color,
  title,
  value,
  icon,
}: {
  color?: string;
  title: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <View
      style={{
        minWidth: 120,
        backgroundColor: color ?? "#f8fafc",
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: "#eef2f7",
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 8,
      }}
    >
      <View>{icon ?? null}</View>
      <View>
        <Text style={{ color: "#6b7280", fontSize: 12 }}>{title}</Text>
        <Text style={{ fontWeight: "800", marginTop: 6 }}>{value}</Text>
      </View>
    </View>
  );
}

function SmallStat({
  title,
  value,
  bg,
  border,
}: {
  title: string;
  value: string;
  bg?: string;
  border?: string;
}) {
  return (
    <View
      style={{
        minWidth: 100,
        backgroundColor: bg ?? "#fff",
        padding: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border ?? "#eef2f7",
        marginBottom: 8,
      }}
    >
      <Text style={{ color: "#6b7280", fontSize: 12 }}>{title}</Text>
      <Text style={{ fontWeight: "800", marginTop: 6 }}>{value}</Text>
    </View>
  );
}

function Box({
  label,
  value,
  color = "#fff",
  border = "#eef2f7",
  textColor = "#0f172a",
}: {
  label: string;
  value: string;
  color?: string;
  border?: string;
  textColor?: string;
}) {
  return (
    <View
      style={{
        backgroundColor: color,
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: border,
        minWidth: 140,
      }}
    >
      <Text style={{ color: "#6b7280", fontSize: 12 }}>{label}</Text>
      <Text style={{ fontWeight: "800", marginTop: 6, color: textColor }}>{value}</Text>
    </View>
  );
}

function TabPill({
  label,
  active,
  icon,
  onPress,
}: {
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: active ? "#fff" : "#f1f5f9",
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 999,
          borderWidth: active ? 1 : 0,
          borderColor: active ? "#eef2f7" : "transparent",
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
        },
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
    >
      {icon ?? null}
      <Text style={{ fontWeight: active ? "800" : "600", color: "#0f172a" }}>{label}</Text>
    </Pressable>
  );
}

function Section({
  title,
  children,
  bg,
  border,
  icon,
}: {
  title: string;
  children: React.ReactNode;
  bg?: string;
  border?: string;
  icon?: React.ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: bg ?? "#fff",
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: border ?? "#eef2f7",
        marginBottom: 12,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          {icon ?? null}
          <Text style={{ fontWeight: "800" }}>{title}</Text>
        </View>
      </View>
      {children}
    </View>
  );
}

function RowIcon({ icon, text }: { icon?: React.ReactNode; text: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        gap: 8,
        alignItems: "center",
        marginVertical: 6,
      }}
    >
      {icon ?? <Ionicons name="ellipse" size={8} color="#94a3b8" />}
      <Text style={{ color: "#374151" }}>{text}</Text>
    </View>
  );
}

function Divider() {
  return <View style={{ height: 1, backgroundColor: "#fae9ef", marginVertical: 8 }} />;
}

function SmallTag({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        paddingVertical: 6,
        paddingHorizontal: 8,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: "#eef2f7",
        marginRight: 6,
      }}
    >
      <Text style={{ color: "#0f172a", fontWeight: "700" }}>{label}</Text>
    </View>
  );
}

function EngagementItem({
  icon,
  title,
  subtitle,
  status,
}: {
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  status?: string;
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 10,
        borderWidth: 1,
        borderColor: "#eef2f7",
        marginBottom: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          {icon ?? null}
          <View>
            <Text style={{ fontWeight: "700" }}>{title}</Text>
            {subtitle ? (
              <Text style={{ color: "#6b7280", marginTop: 6 }}>{subtitle}</Text>
            ) : null}
          </View>
        </View>

        {status ? (
          <View
            style={{
              backgroundColor: "#eef2ff",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 999,
            }}
          >
            <Text style={{ color: "#1e3a8a", fontWeight: "700" }}>{status}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
