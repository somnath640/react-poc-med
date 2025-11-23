import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  visible: boolean;
  onClose: () => void;
  hcp?: {
    name: string;
    specialty: string;
    visitTime?: string;
  };
  products?: { id: number; name: string }[];
};

export default function ReportNewCallModal({
  visible,
  onClose,
  hcp = {
    name: "Dr. Sharma",
    specialty: "Cardiologist",
  },
  products = [
    { id: 1, name: "Tonact EZ 40" },
    { id: 2, name: "Starpress AM" },
    { id: 3, name: "Ramistar 10" },
  ],
}: Props) {
  const { width, height } = useWindowDimensions();
  const modalWidth = width < 420 ? width - 16 : 520;

  return (
    <Modal animationType="slide" transparent visible={visible}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)" }}>
        {/* BACKDROP */}
        <Pressable
          onPress={onClose}
          style={{ position: "absolute", inset: 0 }}
        />

        {/* CENTER BOX */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              width: modalWidth,
              maxHeight: height - 80,
              backgroundColor: "#fff",
              borderRadius: 14,
              overflow: "hidden",
              elevation: 18,
              shadowColor: "#000",
              shadowOpacity: 0.18,
              shadowRadius: 12,
            }}
          >
            {/* HEADER */}
            <View
              style={{
                padding: 18,
                borderBottomWidth: 1,
                borderColor: "#e2e8f0",
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "800", color: "#0f172a" }}>
                Report New Call
              </Text>
              <Text style={{ color: "#6b7280", marginTop: 4 }}>
                Documenting call with {hcp.name} • {products.length} products detailed
              </Text>

              {/* Auto-filled badge */}
              <View
                style={{
                  position: "absolute",
                  right: 16,
                  top: 18,
                  backgroundColor: "#16a34a",
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    fontSize: 12,
                  }}
                >
                  Auto-filled
                </Text>
              </View>
            </View>

            {/* BODY SCROLL */}
            <ScrollView
              showsVerticalScrollIndicator
              style={{ paddingHorizontal: 16, paddingTop: 16 }}
            >
              {/* SUCCESS PANEL */}
              <View
                style={{
                  backgroundColor: "#ecfdf5",
                  borderWidth: 1,
                  borderColor: "#bbf7d0",
                  padding: 14,
                  borderRadius: 12,
                  marginBottom: 16,
                }}
              >
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <Ionicons
                    name="checkmark-circle"
                    size={24}
                    color="#16a34a"
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontWeight: "700",
                        color: "#065f46",
                        fontSize: 15,
                      }}
                    >
                      Call completed successfully!
                    </Text>
                    <Text style={{ color: "#166534", marginTop: 4 }}>
                      Form auto-filled with detailing data
                    </Text>
                  </View>
                </View>
              </View>

              {/* HCP DETAILS */}
              <Text style={{ fontWeight: "800", marginBottom: 8 }}>
                HCP Details{" "}
                <Text
                  style={{
                    backgroundColor: "#fef2f2",
                    color: "#dc2626",
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  Pre-filled
                </Text>
              </Text>

              <View
                style={{
                  backgroundColor: "#f8fafc",
                  padding: 14,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#dbeafe",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                <View
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 999,
                    backgroundColor: "#e0e7ff",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "800", color: "#312e81" }}>
                    {hcp.name[0]}
                  </Text>
                </View>

                <View>
                  <Text style={{ fontWeight: "800", color: "#0f172a" }}>
                    {hcp.name}
                  </Text>
                  <Text style={{ color: "#6b7280", marginTop: 2 }}>
                    {hcp.specialty}
                  </Text>
                </View>
              </View>

              {/* DATE + TIME */}
              <View style={{ flexDirection: "row", gap: 12, marginBottom: 18 }}>
                {/* DATE */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "800", marginBottom: 6, color: "#0f172a" }}>
                    Date{" "}
                    <Text
                      style={{
                        backgroundColor: "#eff6ff",
                        color: "#2563eb",
                        paddingHorizontal: 6,
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      Auto
                    </Text>
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      padding: 12,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#e2e8f0",
                      gap: 10,
                    }}
                  >
                    <Ionicons name="calendar-outline" size={18} color="#0f172a" />
                    <Text style={{ fontWeight: "700" }}>22/11/2025</Text>
                  </View>
                </View>

                {/* TIME */}
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "800", marginBottom: 6, color: "#0f172a" }}>
                    Time{" "}
                    <Text
                      style={{
                        backgroundColor: "#eff6ff",
                        color: "#2563eb",
                        paddingHorizontal: 6,
                        borderRadius: 999,
                        fontSize: 11,
                        fontWeight: "700",
                      }}
                    >
                      Auto
                    </Text>
                  </Text>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      backgroundColor: "#fff",
                      padding: 12,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#e2e8f0",
                      gap: 10,
                    }}
                  >
                    <Ionicons name="time-outline" size={18} color="#0f172a" />
                    <Text style={{ fontWeight: "700" }}>03:02 PM</Text>
                  </View>
                </View>
              </View>

              {/* LOCATION */}
              <Text style={{ fontWeight: "800", marginBottom: 8, color: "#0f172a" }}>
                Location{" "}
                <Text
                  style={{
                    backgroundColor: "#ecfdf5",
                    color: "#16a34a",
                    paddingHorizontal: 6,
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: "700",
                  }}
                >
                  GPS Auto-captured
                </Text>
              </Text>

              <View
                style={{
                  backgroundColor: "#f0fdf4",
                  borderWidth: 1,
                  borderColor: "#bbf7d0",
                  padding: 12,
                  borderRadius: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 18,
                }}
              >
                <Ionicons name="location-outline" size={20} color="#16a34a" />
                <View>
                  <Text style={{ fontWeight: "700", color: "#065f46" }}>
                    Breach Candy Hospital, Mumbai
                  </Text>
                  <Text style={{ color: "#15803d", marginTop: 2 }}>
                    Verified location
                  </Text>
                </View>
              </View>

              {/* PRODUCTS DISCUSSED */}
              <Text style={{ fontWeight: "800", marginBottom: 10 }}>
                Products Discussed{" "}
                <Text
                  style={{
                    backgroundColor: "#eff6ff",
                    color: "#1d4ed8",
                    paddingHorizontal: 8,
                    paddingVertical: 3,
                    borderRadius: 999,
                    fontSize: 12,
                    fontWeight: "700",
                  }}
                >
                  {products.length} Products Detailed
                </Text>
              </Text>

              <View
                style={{
                  backgroundColor: "#f8fafc",
                  padding: 14,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: "#dbeafe",
                  marginBottom: 20,
                }}
              >
                {products.map((p) => (
                  <View
                    key={p.id}
                    style={{
                      backgroundColor: "#fff",
                      padding: 14,
                      borderRadius: 12,
                      borderWidth: 1,
                      borderColor: "#e2e8f0",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <View>
                      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                        {p.name}
                      </Text>
                      <Text style={{ color: "#64748b", marginTop: 4 }}>
                        Detailing completed
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 4,
                        backgroundColor: "#ecfdf5",
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                        borderRadius: 999,
                        borderWidth: 1,
                        borderColor: "#bbf7d0",
                      }}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={16}
                        color="#16a34a"
                      />
                      <Text style={{ fontWeight: "700", color: "#166534" }}>
                        Done
                      </Text>
                    </View>
                  </View>
                ))}
              </View>

              <View style={{ height: 20 }} />
              {/* ----------------------------------------------------- */}
{/* CALL OUTCOME */}
{/* ----------------------------------------------------- */}

<Text
  style={{
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 4,
    marginBottom: 8,
  }}
>
  Call Outcome{" "}
  <Text
    style={{
      backgroundColor: "#fef2f2",
      color: "#dc2626",
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 999,
      fontSize: 11,
      fontWeight: "700",
    }}
  >
    Required Field
  </Text>
</Text>

<View
  style={{
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: "#ffedd5",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  }}
>
  <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
    <Ionicons name="alert-circle-outline" size={20} color="#c2410c" />
    <Text style={{ color: "#c2410c", fontWeight: "700" }}>
      Select call outcome to continue
    </Text>
  </View>
  <Ionicons name="chevron-down" size={20} color="#c2410c" />
</View>

{/* ----------------------------------------------------- */}
{/* CALL NOTES */}
{/* ----------------------------------------------------- */}

<Text style={{ fontWeight: "800", marginBottom: 8, color: "#0f172a" }}>
  Call Notes{" "}
</Text>

<View
  style={{
    flexDirection: "row",
    gap: 8,
    marginBottom: 10,
  }}
>
  <View
    style={{
      backgroundColor: "#fef9c3",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: "#fde68a",
    }}
  >
    <Text style={{ fontSize: 12, fontWeight: "700", color: "#92400e" }}>
      AI-Powered
    </Text>
  </View>

  <View
    style={{
      backgroundColor: "#f5f3ff",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: "#e9d5ff",
    }}
  >
    <Text style={{ fontSize: 12, fontWeight: "700", color: "#6d28d9" }}>
      AI Generate
    </Text>
  </View>

  <View
    style={{
      backgroundColor: "#e0f2fe",
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: "#bae6fd",
    }}
  >
    <Text style={{ fontSize: 12, fontWeight: "700", color: "#0ea5e9" }}>
      Voice
    </Text>
  </View>
</View>

<View
  style={{
    backgroundColor: "#f3f4f6",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 18,
  }}
>
  <Text style={{ color: "#6b7280" }}>
    Type your call notes or use voice recording...
  </Text>
</View>

{/* ----------------------------------------------------- */}
{/* FILES & MEDIA SHARED */}
{/* ----------------------------------------------------- */}

<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  }}
>
  <Text style={{ fontWeight: "800", color: "#0f172a" }}>
    Files & Media Shared
  </Text>

  <View
    style={{
      backgroundColor: "#f3f4f6",
      paddingVertical: 6,
      paddingHorizontal: 10,
      borderRadius: 8,
    }}
  >
    <Text style={{ fontWeight: "700", color: "#4b5563", fontSize: 12 }}>
      Add More
    </Text>
  </View>
</View>

<View
  style={{
    backgroundColor: "#faf5ff",
    borderWidth: 1,
    borderColor: "#e9d5ff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 18,
  }}
>
  <View
    style={{
      backgroundColor: "#fff",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      padding: 10,
      marginBottom: 12,
    }}
  >
    <Text style={{ color: "#6b7280", fontSize: 13 }}>
      Marketing materials ready: PDF, PPT, Videos, Images
    </Text>
  </View>

  {/* FILE GRID */}
  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
    {[
      "Product Brochure",
      "Clinical Study",
      "Product Demo",
      "Safety Data",
    ].map((item) => (
      <View
        key={item}
        style={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          minWidth: "48%",
        }}
      >
        <Text style={{ fontWeight: "700", color: "#374151" }}>{item}</Text>
      </View>
    ))}
  </View>
</View>

{/* ----------------------------------------------------- */}
{/* NEXT ACTION */}
{/* ----------------------------------------------------- */}

<Text style={{ fontWeight: "800", color: "#0f172a", marginBottom: 8 }}>
  Next Action
</Text>

<View
  style={{
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 12,
    marginBottom: 18,
  }}
>
  <Text style={{ color: "#6b7280" }}>
    Follow-up required, schedule demo, etc.
  </Text>
</View>

{/* ----------------------------------------------------- */}
{/* AUTO-FILLED SUMMARY */}
{/* ----------------------------------------------------- */}

<View
  style={{
    backgroundColor: "#ecfdf5",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
  }}
>
  <Text
    style={{
      fontSize: 15,
      fontWeight: "800",
      color: "#065f46",
      marginBottom: 8,
    }}
  >
    Auto-filled Call Data Summary
  </Text>

  <View style={{ marginLeft: 6, gap: 6 }}>
    <SummaryItem label="HCP Details" />
    <SummaryItem label="GPS Location" />
    <SummaryItem label="Files/Media" />
    <SummaryItem label="Date & Time" />
    <SummaryItem label="3 Products" />
    <SummaryItem label="Outcome (Required)" important />
  </View>
</View>

{/* ----------------------------------------------------- */}
{/* SUBMIT BUTTON */}
{/* ----------------------------------------------------- */}

<Pressable
  style={{
    backgroundColor: "#1d4ed8",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  }}
  onPress={onClose}
>
  <Text
    style={{
      color: "#fff",
      fontWeight: "800",
      fontSize: 15,
    }}
  >
    Submit Call Report
  </Text>
</Pressable>

            </ScrollView>

            {/* FOOTER */}
            {/* <View
              style={{
                padding: 14,
                borderTopWidth: 1,
                borderColor: "#e5e7eb",
                backgroundColor: "#fff",
              }}
            >
              <Pressable
                onPress={onClose}
                style={{
                  backgroundColor: "#0f172a",
                  paddingVertical: 14,
                  borderRadius: 10,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15 }}>
                  Close & Continue
                </Text>
              </Pressable>
            </View> */}
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function SummaryItem({ label, important }: { label: string; important?: boolean }) {
    return (
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Ionicons
          name="checkmark-circle-outline"
          size={18}
          color={important ? "#991b1b" : "#059669"}
        />
        <Text
          style={{
            color: important ? "#991b1b" : "#065f46",
            fontWeight: important ? "800" : "700",
          }}
        >
          {label}
        </Text>
      </View>
    );
  }
  
