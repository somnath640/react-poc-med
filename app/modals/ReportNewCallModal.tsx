// app/components/ReportNewCallModal.tsx
import DropdownSelect from "@/components/DropdownSelect";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: () => void;
};

const HCP_OPTIONS = [
  "Dr. Sharma - Cardiologist",
  "Dr. Patel - Diabetologist",
  "Dr. Mehta - General Physician",
  "Dr. Kumar - Cardiologist",
  "Dr. Gupta - Endocrinologist",
];

const OUTCOME_OPTIONS = ["Very Positive", "Positive", "Neutral", "Negative"];

export default function ReportNewCallModal({ visible, onClose, onSubmit }: Props) {
  const [hcp, setHcp] = useState("Choose doctor");
  const [outcome, setOutcome] = useState("Select outcome");
  const [notes, setNotes] = useState(
    "Doctor showed great interest in Product X clinical efficacy data. " +
      "Discussed recent cardiovascular study results and safety profile.\n" +
      "Patient volume is high (150-200/day) making this a key account. " +
      "Doctor requested additional literature and expressed willingness to prescribe for suitable patients. " +
      "Strong engagement throughout the visit."
  );
  const [nextAction, setNextAction] = useState("Follow-up required, schedule demo, etc.");

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.45)",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* tap outside to close */}
        <Pressable
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          onPress={onClose}
        />

        <View
          style={{
            width: "92%",
            maxWidth: 480,
            maxHeight: "92%",
            backgroundColor: "#ffffff",
            borderRadius: 14,
            overflow: "hidden",
          }}
        >
          {/* header */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#e5e7eb",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ fontSize: 18, fontWeight: "700", color: "#111827" }}>
                Report New Call
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                Document your HCP interaction
              </Text>
            </View>
            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={20} color="#6b7280" />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              paddingBottom: 20,
            }}
            showsVerticalScrollIndicator
          >
            {/* Select HCP */}
            <View style={{ marginBottom: 14 }}>
              <DropdownSelect
                label="Select HCP *"
                value={hcp}
                onChange={setHcp}
                options={["Choose doctor", ...HCP_OPTIONS]}
              />
            </View>

            {/* Date & Time */}
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: 6,
                  }}
                >
                  Date *
                </Text>
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 6,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: "#f9fafb",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#9ca3af", fontSize: 13 }}>dd-mm-yyyy</Text>
                </Pressable>
              </View>

              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: 6,
                  }}
                >
                  Time *
                </Text>
                <Pressable
                  style={{
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 6,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    backgroundColor: "#f9fafb",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "#9ca3af", fontSize: 13 }}>--:--</Text>
                </Pressable>
              </View>
            </View>

            {/* Location */}
            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: 6,
                }}
              >
                Location (Auto-captured)
              </Text>
              <View
                style={{
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#bbf7d0",
                  backgroundColor: "#ecfdf3",
                  paddingVertical: 10,
                  paddingHorizontal: 12,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <Ionicons name="location-outline" size={18} color="#16a34a" />
                <Text style={{ color: "#166534", fontSize: 13 }}>
                  Breach Candy Hospital, Mumbai
                </Text>
              </View>
            </View>

            {/* Products Discussed */}
            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: 6,
                }}
              >
                Products Discussed
              </Text>

              {["Product X - 10mg", "Product Y - 20mg", "Product Z - Syrup"].map((p) => (
                <Pressable
                  key={p}
                  style={{
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    borderRadius: 8,
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "#f9fafb",
                    marginBottom: 6,
                  }}
                >
                  <View
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 3,
                      borderWidth: 1,
                      borderColor: "#4b5563",
                      backgroundColor: "#111827",
                    }}
                  />
                  <Text style={{ color: "#111827", fontSize: 13 }}>{p}</Text>
                </Pressable>
              ))}
            </View>

            {/* Sample Distribution */}
            <View style={{ marginBottom: 14 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  Sample Distribution (UCPMP Compliant)
                </Text>
                <Pressable
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 999,
                    borderWidth: 1,
                    borderColor: "#e5e7eb",
                    backgroundColor: "#f9fafb",
                    gap: 6,
                  }}
                >
                  <Ionicons name="add" size={16} color="#4b5563" />
                  <Text style={{ fontSize: 12, fontWeight: "600", color: "#111827" }}>
                    Add Sample
                  </Text>
                </Pressable>
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderStyle: "dashed",
                  borderRadius: 10,
                  paddingVertical: 24,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                }}
              >
                <Ionicons name="cube-outline" size={32} color="#d1d5db" />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "#6b7280",
                  }}
                >
                  No samples added yet
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 12,
                    color: "#9ca3af",
                  }}
                >
                  Click "Add Sample" to distribute samples
                </Text>
              </View>
            </View>

            {/* Call Outcome */}
            <View style={{ marginBottom: 14 }}>
              <DropdownSelect
                label="Call Outcome *"
                value={outcome}
                onChange={setOutcome}
                options={["Select outcome", ...OUTCOME_OPTIONS]}
              />
            </View>

            {/* Call Notes */}
            <View style={{ marginBottom: 14 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontSize: 13,
                    fontWeight: "700",
                    color: "#111827",
                  }}
                >
                  Call Notes
                </Text>

                <View style={{ flexDirection: "row", gap: 6 }}>
                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                      backgroundColor: "#f5f3ff",
                      gap: 6,
                    }}
                  >
                    <Ionicons name="sparkles-outline" size={14} color="#7c3aed" />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "700",
                        color: "#7c3aed",
                      }}
                    >
                      AI Generate
                    </Text>
                  </Pressable>

                  <Pressable
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                      backgroundColor: "#f9fafb",
                      gap: 6,
                    }}
                  >
                    <Ionicons name="mic-outline" size={14} color="#111827" />
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "600",
                        color: "#111827",
                      }}
                    >
                      Voice
                    </Text>
                  </Pressable>
                </View>
              </View>

              <TextInput
                multiline
                value={notes}
                onChangeText={setNotes}
                textAlignVertical="top"
                style={{
                  minHeight: 120,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderRadius: 10,
                  padding: 10,
                  fontSize: 13,
                  color: "#111827",
                  backgroundColor: "#f9fafb",
                }}
              />
            </View>

            {/* Files & Media Shared */}
            <View style={{ marginBottom: 14 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: 6,
                }}
              >
                Files & Media Shared
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderStyle: "dashed",
                  borderRadius: 10,
                  paddingVertical: 24,
                  paddingHorizontal: 12,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#fafafa",
                  marginBottom: 8,
                }}
              >
                <MaterialIcons name="file-upload" size={28} color="#9ca3af" />
                <Text
                  style={{
                    marginTop: 8,
                    fontSize: 13,
                    color: "#6b7280",
                  }}
                >
                  Click to upload files
                </Text>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 11,
                    color: "#9ca3af",
                  }}
                >
                  PDF, PPT, Videos, Images
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                {["Product Brochure", "Clinical Study", "Product Demo", "Safety Data"].map(
                  (tag) => (
                    <View
                      key={tag}
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        borderRadius: 999,
                        backgroundColor: "#f5f3ff",
                        borderWidth: 1,
                        borderColor: "#e5e7eb",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: "600",
                          color: "#111827",
                        }}
                      >
                        {tag}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </View>

            {/* Next Action */}
            <View style={{ marginBottom: 18 }}>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: 6,
                }}
              >
                Next Action
              </Text>
              <TextInput
                multiline
                value={nextAction}
                onChangeText={setNextAction}
                textAlignVertical="top"
                style={{
                  minHeight: 70,
                  borderWidth: 1,
                  borderColor: "#e5e7eb",
                  borderRadius: 10,
                  padding: 10,
                  fontSize: 13,
                  color: "#111827",
                  backgroundColor: "#f9fafb",
                }}
              />
            </View>

            {/* Submit button */}
            <Pressable
              style={{
                backgroundColor: "#020617",
                paddingVertical: 12,
                borderRadius: 999,
                alignItems: "center",
              }}
              onPress={() => {
                onSubmit?.();
                onClose();
              }}
            >
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "700",
                  fontSize: 14,
                }}
              >
                Submit Call Report
              </Text>
            </Pressable>
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
}
