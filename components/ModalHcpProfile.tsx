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

  const trendData = [
    { month: "Aug", value: 75 },
    { month: "Sep", value: 87 },
    { month: "Oct", value: 100 },
    { month: "Nov", value: 113 },
  ];
  const maxTrendValue = Math.max(...trendData.map((t) => t.value));

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
  <>
    {/* Practice Profile */}
    <Section
      title="Practice Profile"
      icon={<Ionicons name="briefcase-outline" size={18} color="#059669" />}
      bg="#ecfdf5"
      border="#bbf7d0"
    >
      {/* top stats */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <PracticeStat
          label="Practice size"
          value="150-200 patients a day"
        />
        <PracticeStat
          label="Consulting fees"
          value="₹1500 per consult"
        />
        <PracticeStat
          label="Avg. income"
          value="₹15-18L+ consulting income per month"
        />
      </View>

      {/* support staff */}
      <Text
        style={{
          color: "#6b7280",
          fontWeight: "700",
          marginTop: 4,
          marginBottom: 6,
        }}
      >
        Presence of support staff:
      </Text>

      <View
        style={{
          backgroundColor: "#f0fdf4",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#bbf7d0",
          padding: 10,
          marginBottom: 6,
        }}
      >
        <Text style={{ fontWeight: "700", color: "#065f46" }}>
          Sanjay Kumar (Assistant)
        </Text>
        <Text style={{ color: "#065f46", marginTop: 2 }}>9876543210</Text>
      </View>

      <View
        style={{
          backgroundColor: "#f0fdf4",
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#bbf7d0",
          padding: 10,
          marginBottom: 10,
        }}
      >
        <Text style={{ fontWeight: "700", color: "#065f46" }}>
          Priya Nair (Receptionist)
        </Text>
        <Text style={{ color: "#065f46", marginTop: 2 }}>9876543211</Text>
      </View>

      {/* equipment */}
      <Text
        style={{
          color: "#6b7280",
          fontWeight: "700",
          marginTop: 4,
          marginBottom: 6,
        }}
      >
        Type of equipment used:
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 10,
        }}
      >
        <PracticeChip label="ECG" />
        <PracticeChip label="Echo Machine" />
        <PracticeChip label="Stress Test Equipment" />
      </View>

      {/* ailments */}
      <Text
        style={{
          color: "#6b7280",
          fontWeight: "700",
          marginBottom: 6,
        }}
      >
        Typical ailments treated:
      </Text>
      <View style={{ marginBottom: 10 }}>
        <PracticeBullet text="Hypertension" />
        <PracticeBullet text="Coronary Artery Disease" />
        <PracticeBullet text="Heart Failure" />
      </View>

      {/* social & economic profile */}
      <Text
        style={{
          color: "#6b7280",
          fontWeight: "700",
          marginBottom: 4,
        }}
      >
        Social and economic profile of patients:
      </Text>
      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
        Upper middle class and affluent
      </Text>
    </Section>

    {/* Prescription Preferences */}
    <Section
      title="Prescription Preferences"
      icon={<MaterialIcons name="menu-book" size={18} color="#4f46e5" />}
      bg="#eef2ff"
      border="#e0e7ff"
    >
      <Text
        style={{
          color: "#6b7280",
          marginBottom: 6,
          fontWeight: "600",
        }}
      >
        Molecule class preferred:
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <PracticeChip label="Beta blockers" pillBg="#4f46e5" pillText="#fff" />
        <PracticeChip label="ACE inhibitors" pillBg="#4f46e5" pillText="#fff" />
        <PracticeChip
          label="Calcium channel blockers"
          pillBg="#4f46e5"
          pillText="#fff"
        />
      </View>

      {/* Therapy area table */}
      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
          borderWidth: 1,
          borderColor: "#e0e7ff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#e0e7ff",
            paddingVertical: 8,
            paddingHorizontal: 10,
          }}
        >
          <PracticeTableHeader flex={1.1} text="Therapy Area" />
          <PracticeTableHeader flex={1} text="Preferred Molecule" />
          <PracticeTableHeader flex={0.7} text="Preference" />
          <PracticeTableHeader flex={0.6} text="Share of Rx" align="right" />
        </View>

        <PracticeTableRow
          area="Cardiac"
          molecule="Beta Blocker"
          preference="1st"
          share="70%"
        />
        <PracticeTableRow
          area="Hypertension"
          molecule="ACE Inhibitors"
          preference="1st"
          share="20%"
        />
        <PracticeTableRow
          area="Heart Failure"
          molecule="ARBs"
          preference="2nd"
          share="10%"
          isLast
        />
      </View>
    </Section>

    {/* Digital Savviness */}
    <Section
      title="Digital Savviness"
      icon={<Ionicons name="phone-portrait-outline" size={18} color="#a855f7" />}
      bg="#fdf4ff"
      border="#f5d0fe"
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <View>
          <Text style={{ color: "#6b7280", marginBottom: 4 }}>LYFE user:</Text>
          <PracticeStatusPill label="Active" />
        </View>

        <View>
          <Text style={{ color: "#6b7280", marginBottom: 4 }}>Profile on Practo:</Text>
          <PracticeStatusPill label="Yes" />
        </View>
      </View>

      <Text style={{ color: "#6b7280", marginBottom: 6 }}>
        Digital Engagement Score:
      </Text>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderWidth: 1,
          borderColor: "#e5e7eb",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <Text style={{ color: "#6b7280" }}>Score</Text>
          <Text style={{ fontWeight: "800" }}>92/100</Text>
        </View>
        <View
          style={{
            height: 10,
            borderRadius: 999,
            backgroundColor: "#e5e7eb",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              width: "92%",
              height: "100%",
              borderRadius: 999,
              backgroundColor: "#4b5563",
            }}
          />
        </View>
      </View>
    </Section>

    {/* Other Clinic Details */}
    <Section
      title="Other Clinic Details"
      icon={<Ionicons name="business-outline" size={18} color="#ea580c" />}
      bg="#fff7ed"
      border="#fed7aa"
    >
      <Text
        style={{
          color: "#6b7280",
          marginBottom: 8,
          fontWeight: "600",
        }}
      >
        Nearby clinics / Competitors:
      </Text>

      <ClinicRow
        name="Heart Care Center, Pedder Road"
        distance="1.5 km"
      />
      <ClinicRow
        name="Cardiac Clinic, Malabar Hill"
        distance="2.2 km"
        isLast
      />
    </Section>
  </>
)}


        {activeTab === "Engagement" && (
  <>
    {/* Face to Face Interactions */}
    <Section
      title="Face to Face Interactions"
      icon={<Ionicons name="people-outline" size={18} color="#2563eb" />}
      bg="#eff6ff"
      border="#dbeafe"
    >
      {/* November 2025 */}
      <EngMonthHeader label="November 2025" />

      <EngVisitCard
        cycleLabel="V1"
        cycleColor="#16a34a"
        title="Product Detailing"
        outcomeLabel="Positive"
        outcomeColor="#2563eb"
        date="Nov 5, 2025"
        duration="25 mins"
        placeType="Clinic"
        products={["Tonact EZ 40", "Starpress AM"]}
      />

      <EngVisitCard
        cycleLabel="V2"
        cycleColor="#4f46e5"
        title="Follow-up"
        outcomeLabel="Scheduled"
        outcomeColor="#ea580c"
        date="Nov 12, 2025"
        duration="15 mins"
        placeType="Hospital"
        products={["Tonact EZ 40"]}
      />

      {/* December 2025 */}
      <EngMonthHeader label="December 2025" />

      <EngVisitCard
        cycleLabel="V1"
        cycleColor="#16a34a"
        title="New Launch Discussion"
        outcomeLabel="Planned"
        outcomeColor="#6366f1"
        date="Dec 3, 2025"
        duration="30 mins"
        placeType="Clinic"
        products={["Ramistar 10"]}
      />

      {/* October 2025 (Previous) */}
      <EngMonthHeader label="October 2025 (Previous)" />

      <EngVisitCard
        cycleLabel="V1"
        cycleColor="#16a34a"
        title="Clinical Data Review"
        outcomeLabel="Completed"
        outcomeColor="#22c55e"
        date="Oct 28, 2025"
        duration="35 mins"
        placeType="Clinic"
        products={[]}
        isLast
      />
    </Section>

    {/* Digital Interactions */}
    <Section
      title="Digital Interactions"
      icon={<Ionicons name="globe-outline" size={18} color="#a855f7" />}
      bg="#fdf4ff"
      border="#f5d0fe"
    >
      {/* Web Portal Activity */}
      <ChannelCard
        title="Web Portal Activity"
        icon={<Ionicons name="planet-outline" size={16} color="#6366f1" />}
      >
        <ChannelRow
          title="Logged in to rep portal"
          date="Nov 10, 2025"
          rightPrimary="12 mins"
          rightSecondary="8 pages"
        />
        <ChannelRow
          title="Downloaded clinical studies"
          date="Nov 8, 2025"
          rightPrimary="8 mins"
          rightSecondary="5 pages"
        />
        <ChannelRow
          title="Viewed product catalog"
          date="Nov 3, 2025"
          rightPrimary="15 mins"
          rightSecondary="12 pages"
          isLast
        />
      </ChannelCard>

      {/* SMS Messages */}
<ChannelCard
  title="SMS Messages"
  icon={<Ionicons name="chatbubble-outline" size={16} color="#22c55e" />}
>
  <ChannelRow
    title="New product launch reminder"
    date="Nov 9, 2025"
    badges={[
      { label: "Delivered", bg: "#ecfdf3", text: "#16a34a" }, // light green outline
      { label: "Clicked", bg: "#16a34a", text: "#ffffff" },   // solid green
    ]}
  />
  <ChannelRow
    title="Sample availability alert"
    date="Nov 4, 2025"
    badges={[
      { label: "Delivered", bg: "#ecfdf3", text: "#16a34a" },
      { label: "Clicked", bg: "#16a34a", text: "#ffffff" },
    ]}
  />
  <ChannelRow
    title="CME invitation"
    date="Oct 30, 2025"
    badges={[
      { label: "Delivered", bg: "#ecfdf3", text: "#16a34a" },
    ]}
    isLast
  />
</ChannelCard>


      {/* WhatsApp Messages */}
<ChannelCard
  title="WhatsApp Messages"
  icon={<Ionicons name="logo-whatsapp" size={16} color="#22c55e" />}
>
  <ChannelRow
    title="Patient case discussion"
    date="Nov 10, 2025"
    badges={[
      { label: "Read", bg: "#eff6ff", text: "#2563eb" },      // blue outline
      { label: "Replied", bg: "#16a34a", text: "#ffffff" },   // solid green
    ]}
  />
  <ChannelRow
    title="Product information request"
    date="Nov 7, 2025"
    badges={[
      { label: "Read", bg: "#eff6ff", text: "#2563eb" },
      { label: "Replied", bg: "#16a34a", text: "#ffffff" },
    ]}
  />
  <ChannelRow
    title="Meeting confirmation"
    date="Nov 2, 2025"
    badges={[
      { label: "Read", bg: "#eff6ff", text: "#2563eb" },
      { label: "Replied", bg: "#16a34a", text: "#ffffff" },
    ]}
    isLast
  />
</ChannelCard>


      {/* Email Campaigns */}
      <ChannelCard
        title="Email Campaigns"
        icon={<Ionicons name="mail-outline" size={16} color="#4f46e5" />}
      >
        <EmailCampaignCard
          title="Tonact EZ 40 Clinical Trial Results"
          date="Nov 10, 2025"
          opens={3}
          clicks={2}
          status="Delivered"
          links={["View Full Report", "Download PDF"]}
        />
        <EmailCampaignCard
          title="Invitation: Cardiology CME"
          date="Nov 6, 2025"
          opens={2}
          clicks={1}
          status="Delivered"
          links={["Register Now"]}
        />
        <EmailCampaignCard
          title="New Product Launch: Ramistar 10"
          date="Nov 3, 2025"
          opens={5}
          clicks={3}
          status="Delivered"
          links={["View Details", "Request Samples", "Book Demo"]}
        />
        <EmailCampaignCard
          title="Monthly Newsletter - October"
          date="Oct 28, 2025"
          opens={0}
          clicks={0}
          status="Delivered"
          links={[]}
          isLast
        />
      </ChannelCard>
    </Section>

    {/* Events & Programs */}
    <Section
      title="Events & Programs"
      icon={<Ionicons name="calendar-outline" size={18} color="#f97316" />}
      bg="#fffbeb"
      border="#fef3c7"
    >
      <EventCard
        typeLabel="Webinar"
        typeColor="#2563eb"
        statusLabel="Registered"
        statusColor="#22c55e"
        title="Advanced Cardiac Care Strategies"
        date="Nov 15, 2025"
        duration="90 mins"
        attendees="150 Attendees"
        speakers={["Dr. Devi Shetty", "Dr. Naresh Trehan"]}
      />

      <EventCard
        typeLabel="CME"
        typeColor="#16a34a"
        statusLabel="Attended"
        statusColor="#22c55e"
        title="Heart Failure Management"
        date="Oct 20, 2025"
        duration="120 mins"
        attendees="85 Attendees • 2 CME Credits"
        speakers={["Dr. K. Srinivas"]}
      />

      <EventCard
        typeLabel="Seminar"
        typeColor="#7c3aed"
        statusLabel="Attended"
        statusColor="#22c55e"
        title="Hypertension Guidelines Update"
        date="Sep 10, 2025"
        duration="180 mins"
        attendees="120 Attendees"
        speakers={["Dr. Ambuj Roy"]}
      />

      <EventCard
        typeLabel="Focus Group"
        typeColor="#f97316"
        statusLabel="Participated"
        statusColor="#22c55e"
        title="New Beta Blocker Formulation Feedback"
        date="Aug 25, 2025"
        duration="60 mins"
        attendees="12 Attendees"
        speakers={["Lupin Medical Team"]}
        isLast
      />
    </Section>
  </>
)}


        {activeTab === "Insights" && (
  <>
    {/* Engagement Score */}
    <Section
      title="Engagement Score"
      icon={<Ionicons name="trending-up-outline" size={18} color="#16a34a" />}
      bg="#ecfdf3"
      border="#bbf7d0"
    >
      <View style={{ paddingVertical: 8 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
            color: "#0f172a",
            marginBottom: 4,
          }}
        >
          92/100
        </Text>
        <Text style={{ color: "#6b7280" }}>Based on interactions and Rx data</Text>
      </View>
    </Section>

    {/* Prescription Trend */}
    <Section
      title="Prescription Trend"
      icon={<Ionicons name="trending-up-outline" size={18} color="#0284c7" />}
      bg="#e0f2fe"
      border="#bae6fd"
    >
      {/* Chart card */}
      <View
        style={{
          backgroundColor: "#f0f9ff",
          borderRadius: 16,
          padding: 12,
          borderWidth: 1,
          borderColor: "#dbeafe",
          marginBottom: 12,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: 140,
          }}
        >
          {trendData.map((item) => {
            const barHeight = (item.value / maxTrendValue) * 100 + 20; // proportional height
            return (
              <View
                key={item.month}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Text style={{ fontSize: 12, color: "#0f172a", marginBottom: 6 }}>
                  {item.value}
                </Text>
                <View
                  style={{
                    width: "70%",
                    height: barHeight,
                    borderRadius: 8,
                    backgroundColor: "#06b6d4",
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    color: "#64748b",
                    marginTop: 6,
                  }}
                >
                  {item.month}
                </Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Month-wise tiles */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 12,
        }}
      >
        {trendData.map((item) => (
          <TrendSummaryTile
            key={item.month}
            month={item.month}
            value={item.value}
          />
        ))}
      </View>

      {/* Overall growth */}
      <View
        style={{
          backgroundColor: "#ecfdf3",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#bbf7d0",
          paddingVertical: 10,
          paddingHorizontal: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#0f172a", fontWeight: "600" }}>Overall Growth</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Ionicons name="trending-up-outline" size={16} color="#16a34a" />
          <Text style={{ fontWeight: "800", color: "#16a34a" }}>+51%</Text>
        </View>
      </View>
    </Section>
  </>
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

function PracticeStat({ label, value }: { label: string; value: string }) {
  return (
    <View
      style={{
        flexGrow: 1,
        minWidth: 140,
        backgroundColor: "#f0fdf4",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#bbf7d0",
        paddingVertical: 8,
        paddingHorizontal: 10,
      }}
    >
      <Text style={{ color: "#6b7280", fontSize: 12 }}>{label}</Text>
      <Text style={{ fontWeight: "800", marginTop: 4, color: "#065f46" }}>{value}</Text>
    </View>
  );
}

function PracticeChip({
  label,
  pillBg,
  pillText,
}: {
  label: string;
  pillBg?: string;
  pillText?: string;
}) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: pillBg ?? "#dcfce7",
        borderWidth: 1,
        borderColor: pillBg ? pillBg : "#bbf7d0",
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 12, color: pillText ?? "#166534" }}>
        {label}
      </Text>
    </View>
  );
}

function PracticeBullet({ text }: { text: string }) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 2,
      }}
    >
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          backgroundColor: "#22c55e",
          marginRight: 8,
        }}
      />
      <Text style={{ color: "#374151" }}>{text}</Text>
    </View>
  );
}

function PracticeTableHeader({
  text,
  flex,
  align,
}: {
  text: string;
  flex?: number;
  align?: "left" | "right";
}) {
  return (
    <View style={{ flex: flex ?? 1 }}>
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: "#374151",
          textAlign: align ?? "left",
        }}
      >
        {text}
      </Text>
    </View>
  );
}

function PracticeTableRow({
  area,
  molecule,
  preference,
  share,
  isLast,
}: {
  area: string;
  molecule: string;
  preference: string;
  share: string;
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderTopColor: "#e5e7eb",
        borderBottomWidth: isLast ? 0 : 0,
      }}
    >
      <View style={{ flex: 1.1 }}>
        <Text style={{ fontSize: 12, color: "#111827" }}>{area}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#111827" }}>{molecule}</Text>
      </View>
      <View style={{ flex: 0.7 }}>
        <Text style={{ fontSize: 12, color: "#111827" }}>{preference}</Text>
      </View>
      <View style={{ flex: 0.6 }}>
        <Text
          style={{
            fontSize: 12,
            color: "#111827",
            textAlign: "right",
          }}
        >
          {share}
        </Text>
      </View>
    </View>
  );
}

function PracticeStatusPill({ label }: { label: string }) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
        backgroundColor: "#dcfce7",
        borderWidth: 1,
        borderColor: "#bbf7d0",
        alignSelf: "flex-start",
      }}
    >
      <Text style={{ fontWeight: "700", fontSize: 12, color: "#166534" }}>{label}</Text>
    </View>
  );
}

function ClinicRow({
  name,
  distance,
  isLast,
}: {
  name: string;
  distance: string;
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#fed7aa",
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginBottom: isLast ? 0 : 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#0f172a" }}>{name}</Text>
      <View
        style={{
          paddingVertical: 6,
          paddingHorizontal: 10,
          borderRadius: 999,
          backgroundColor: "#ffedd5",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 12, color: "#c2410c" }}>
          {distance}
        </Text>
      </View>
    </View>
  );
}

/* ----------------- Engagement tab helpers ----------------- */

function EngMonthHeader({ label }: { label: string }) {
  return (
    <View style={{ marginTop: 4, marginBottom: 6 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
        <Ionicons name="calendar-outline" size={14} color="#2563eb" />
        <Text style={{ fontWeight: "700", color: "#1d4ed8" }}>{label}</Text>
      </View>
    </View>
  );
}

function EngVisitCard({
  cycleLabel,
  cycleColor,
  title,
  outcomeLabel,
  outcomeColor,
  date,
  duration,
  placeType,
  products,
  isLast,
}: {
  cycleLabel: string;
  cycleColor: string;
  title: string;
  outcomeLabel: string;
  outcomeColor: string;
  date: string;
  duration: string;
  placeType: string;
  products: string[];
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#dbeafe",
        padding: 10,
        marginTop: 8,
        marginBottom: isLast ? 4 : 8,
      }}
    >
      {/* top row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 6,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor: "#eff6ff",
            }}
          >
            <Text
              style={{
                fontWeight: "800",
                fontSize: 12,
                color: cycleColor,
              }}
            >
              {cycleLabel}
            </Text>
          </View>
          <Text style={{ fontWeight: "700", color: "#111827" }}>{title}</Text>
        </View>

        <StatusBadge label={outcomeLabel} bg="#eff6ff" text={outcomeColor} />
      </View>

      {/* middle row */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 6,
        }}
      >
        <SmallIconText
          icon={<Ionicons name="calendar-outline" size={12} color="#6b7280" />}
          text={date}
        />
        <SmallIconText
          icon={<Ionicons name="time-outline" size={12} color="#6b7280" />}
          text={duration}
        />
        <SmallIconText
          icon={<Ionicons name="business-outline" size={12} color="#6b7280" />}
          text={placeType}
        />
        <SmallIconText
          icon={<Ionicons name="medkit-outline" size={12} color="#6b7280" />}
          text={
            products.length > 0
              ? `${products.length} Products`
              : "No specific products"
          }
        />
      </View>

      {/* product tags */}
      {products.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
          {products.map((p) => (
            <View
              key={p}
              style={{
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: "#eff6ff",
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: "700", color: "#1d4ed8" }}>{p}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

function StatusBadge({
  label,
  bg,
  text,
  small,
}: {
  label: string;
  bg?: string;
  text?: string;
  small?: boolean;
}) {
  return (
    <View
      style={{
        paddingHorizontal: small ? 8 : 10,
        paddingVertical: small ? 2 : 4,
        borderRadius: 999,
        backgroundColor: bg ?? "#f1f5f9",
        borderWidth: 1,
        borderColor: text ?? "#e5e7eb",
      }}
    >
      <Text
        style={{
          fontSize: small ? 11 : 12,
          fontWeight: "700",
          color: text ?? "#0f172a",
        }}
      >
        {label}
      </Text>
    </View>
  );
}


function SmallIconText({
  icon,
  text,
}: {
  icon?: React.ReactNode;
  text: string;
}) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      {icon}
      <Text style={{ fontSize: 12, color: "#6b7280" }}>{text}</Text>
    </View>
  );
}

/* ---- Digital interactions ---- */

function ChannelCard({
  title,
  icon,
  children,
}: {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <View
      style={{
        backgroundColor: "#f5f3ff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e9d5ff",
        padding: 10,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 8,
        }}
      >
        {icon}
        <Text style={{ fontWeight: "700", color: "#4b5563" }}>{title}</Text>
      </View>
      {children}
    </View>
  );
}

type ChannelBadge = { label: string; bg: string; text: string };

function ChannelRow({
  title,
  date,
  rightPrimary,
  rightSecondary,
  badges,
  isLast,
}: {
  title: string;
  date: string;
  rightPrimary?: string;
  rightSecondary?: string;
  badges?: ChannelBadge[];
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "#ede9fe",
        marginTop: 2,
        marginBottom: isLast ? 0 : 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "600", color: "#111827" }}>{title}</Text>
          <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{date}</Text>
        </View>

        {rightPrimary || rightSecondary ? (
          <View style={{ alignItems: "flex-end" }}>
            {rightPrimary ? (
              <Text style={{ fontSize: 12, color: "#111827" }}>{rightPrimary}</Text>
            ) : null}
            {rightSecondary ? (
              <Text style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>
                {rightSecondary}
              </Text>
            ) : null}
          </View>
        ) : null}

        {badges && badges.length > 0 ? (
  <View
    style={{
      flexDirection: "row",
      gap: 6,
      alignItems: "center",
    }}
  >
    {badges.map((b) => (
      <StatusBadge
        key={b.label}
        label={b.label}
        bg={b.bg}
        text={b.text}
        small
      />
    ))}
  </View>
) : null}


      </View>
    </View>
  );
}

function EmailCampaignCard({
  title,
  date,
  opens,
  clicks,
  status,
  links,
  isLast,
}: {
  title: string;
  date: string;
  opens: number;
  clicks: number;
  status: string;
  links: string[];
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: "#eef2ff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e0e7ff",
        padding: 10,
        marginTop: 6,
        marginBottom: isLast ? 0 : 8,
      }}
    >
      <Text style={{ fontWeight: "700", color: "#111827" }}>{title}</Text>
      <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>{date}</Text>

      {/* stats tiles */}
      <View
  style={{
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 8,
    gap: 8,
  }}
>
  <MetricTile
    label="Opens"
    value={opens.toString()}
    statusLabel={opens > 0 ? "Opened" : "Not Opened"}
    statusColor={opens > 0 ? "#16a34a" : "#6b7280"}
    badgeBg={opens > 0 ? "#ecfdf3" : "#f9fafb"}
  />
  <MetricTile
    label="Clicks"
    value={clicks.toString()}
    statusLabel={clicks > 0 ? "Clicked" : "No Clicks"}
    statusColor={clicks > 0 ? "#7c3aed" : "#6b7280"}
    badgeBg={clicks > 0 ? "#f3e8ff" : "#f9fafb"}
  />
  <MetricTile
    label="Status"
    value={status}
    statusLabel="Success"
    statusColor="#16a34a"
    badgeBg="#ecfdf3"
  />
</View>


      {/* links */}
      {links.length > 0 && (
        <>
          <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
            Links in email:
          </Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
            {links.map((l) => (
              <View
                key={l}
                style={{
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 999,
                  backgroundColor: "#fff",
                  borderWidth: 1,
                  borderColor: "#d4d4d8",
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "700", color: "#111827" }}>{l}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

function MetricTile({
  label,
  value,
  statusLabel,
  statusColor,
  badgeBg,
}: {
  label: string;
  value: string;
  statusLabel: string;
  statusColor: string;
  badgeBg: string;
}) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 6,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 11, color: "#6b7280" }}>{label}</Text>
      <Text style={{ fontWeight: "800", marginTop: 4, color: "#111827" }}>{value}</Text>
      <View style={{ marginTop: 6 }}>
        <StatusBadge
          label={statusLabel}
          bg={badgeBg}
          text={statusColor}
          small
        />
      </View>
    </View>
  );
}


/* ---- Events & Programs ---- */

function EventCard({
  typeLabel,
  typeColor,
  statusLabel,
  statusColor,
  title,
  date,
  duration,
  attendees,
  speakers,
  isLast,
}: {
  typeLabel: string;
  typeColor: string;
  statusLabel: string;
  statusColor: string;
  title: string;
  date: string;
  duration: string;
  attendees: string;
  speakers: string[];
  isLast?: boolean;
}) {
  return (
    <View
      style={{
        backgroundColor: "#fffbeb",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#fed7aa",
        padding: 10,
        marginTop: 6,
        marginBottom: isLast ? 0 : 8,
      }}
    >
      {/* top badges */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 6,
        }}
      >
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            backgroundColor: "#fff7ed",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              color: typeColor,
            }}
          >
            {typeLabel}
          </Text>
        </View>

        <StatusBadge label={statusLabel} bg="#ecfdf3" text={statusColor} />
      </View>

      <Text style={{ fontWeight: "700", color: "#111827" }}>{title}</Text>

      {/* meta */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          marginTop: 8,
          marginBottom: 6,
        }}
      >
        <SmallIconText
          icon={<Ionicons name="calendar-outline" size={12} color="#6b7280" />}
          text={date}
        />
        <SmallIconText
          icon={<Ionicons name="time-outline" size={12} color="#6b7280" />}
          text={duration}
        />
        <SmallIconText
          icon={<Ionicons name="people-outline" size={12} color="#6b7280" />}
          text={attendees}
        />
      </View>

      <View
        style={{
          height: 1,
          backgroundColor: "#fee2c5",
          marginVertical: 6,
        }}
      />

      <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>
        Speakers:
      </Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {speakers.map((s) => (
          <View
            key={s}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: "#fed7aa",
            }}
          >
            <Text style={{ fontSize: 12, fontWeight: "700", color: "#b45309" }}>{s}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
function TrendSummaryTile({ month, value }: { month: string; value: number | string }) {
  return (
    <View
      style={{
        flexGrow: 1,
        minWidth: 70,
        backgroundColor: "#f0f9ff",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#dbeafe",
        paddingVertical: 8,
        paddingHorizontal: 8,
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>{month}</Text>
      <Text style={{ fontWeight: "800", color: "#0f172a" }}>{value}</Text>
      <Text
        style={{
          fontSize: 11,
          color: "#94a3b8",
          marginTop: 2,
        }}
      >
        Total Rx
      </Text>
    </View>
  );
}
