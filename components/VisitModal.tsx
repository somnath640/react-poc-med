// app/components/VisitModal.tsx

import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  chemistName: string;
  chemistLocation: string;
  onClose: () => void;
  onSubmit: () => void;
};

export default function VisitModal({
  visible,
  chemistName,
  chemistLocation,
  onClose,
  onSubmit,
}: Props) {
  const checklistItems = [
    "Verify Lupin brands prescribed by doctors",
    "Check stock levels and expiry dates",
    "Discuss active schemes and discounts",
    "Review doctor Rx trends",
    "Update chemist feedback",
  ];

  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const toggleCheck = (idx: number) =>
    setChecked((prev) => ({ ...prev, [idx]: !prev[idx] }));

  const [orderValue, setOrderValue] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* BACKDROP */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        {/* CARD */}
        <View
          style={{
            width: "100%",
            maxWidth: 480,
            backgroundColor: "#ffffff",
            borderRadius: 10,
            maxHeight: "90%", // IMPORTANT: allows outside scrolling
          }}
        >
          <ScrollView
            contentContainerStyle={{
              padding: 22,
            }}
            showsVerticalScrollIndicator={false}
          >
            {/* HEADER */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <MaterialIcons
                  name="check-circle-outline"
                  size={22}
                  color="#22c55e"
                />
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  Chemist Visit – {chemistName}
                </Text>
              </View>

              <Pressable onPress={onClose}>
                <MaterialIcons name="close" size={22} color="#6b7280" />
              </Pressable>
            </View>

            <Text style={{ color: "#6b7280", marginBottom: 16 }}>
              Record your visit details and complete the checklist
            </Text>

            {/* INFO CARD */}
            <View
              style={{
                backgroundColor: "#f9fafb",
                borderColor: "#e5e7eb",
                borderWidth: 1,
                padding: 14,
                borderRadius: 8,
                marginBottom: 18,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <MaterialIcons name="person" size={18} color="#6b7280" />
                <Text style={{ fontWeight: "600", color: "#0f172a" }}>
                  {chemistName}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 6,
                }}
              >
                <MaterialIcons name="location-on" size={18} color="#6b7280" />
                <Text style={{ color: "#6b7280" }}>{chemistLocation}</Text>
              </View>
            </View>

            {/* CHECKLIST */}
            <Text
              style={{
                fontWeight: "600",
                color: "#0f172a",
                marginBottom: 10,
              }}
            >
              Visit Checklist
            </Text>

            {checklistItems.map((item, index) => (
              <Pressable
                key={index}
                onPress={() => toggleCheck(index)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#ffffff",
                  borderColor: "#e5e7eb",
                  borderWidth: 1,
                  padding: 12,
                  borderRadius: 6,
                  marginBottom: 10,
                }}
              >
                {/* EXACT SQUARE CHECKBOX */}
                <View
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 3,
                    borderWidth: 1.5,
                    borderColor: "#6b7280",
                    marginRight: 12,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {checked[index] && (
                    <View
                      style={{
                        width: 10,
                        height: 10,
                        backgroundColor: "#374151",
                      }}
                    />
                  )}
                </View>

                <Text style={{ color: "#0f172a" }}>{item}</Text>
              </Pressable>
            ))}

            {/* ORDER VALUE */}
            <Text style={{ color: "#6b7280", marginBottom: 6 }}>
              Order Value (Optional)
            </Text>
            <View
              style={{
                backgroundColor: "#f9fafb",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 6,
                marginBottom: 16,
                paddingHorizontal: 10,
              }}
            >
              <TextInput
                placeholder="₹ Enter order amount"
                placeholderTextColor="#9ca3af"
                style={{ paddingVertical: 12, fontSize: 14, color: "#111827" }}
                keyboardType="numeric"
                value={orderValue}
                onChangeText={setOrderValue}
              />
            </View>

            {/* VISIT NOTES */}
            <Text
              style={{ color: "#0f172a", fontWeight: "600", marginBottom: 6 }}
            >
              Visit Notes *
            </Text>
            <TextInput
              placeholder="Record discussion points, stock status, feedback, schemes discussed..."
              placeholderTextColor="#9ca3af"
              style={{
                backgroundColor: "#f9fafb",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 6,
                padding: 12,
                height: 90,
                textAlignVertical: "top",
                color: "#111827",
                marginBottom: 16,
              }}
              multiline
              value={notes}
              onChangeText={setNotes}
            />

            {/* AI SUGGESTION CARD */}
            <View
              style={{
                borderLeftWidth: 4,
                borderLeftColor: "#3b82f6",
                backgroundColor: "#eff6ff",
                padding: 12,
                borderRadius: 6,
                marginBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <MaterialIcons
                  name="info-outline"
                  size={18}
                  color="#2563eb"
                />
                <Text
                  style={{ color: "#2563eb", fontWeight: "600" }}
                >
                  AI Suggestion
                </Text>
              </View>

              <Text
                style={{
                  color: "#374151",
                  marginTop: 6,
                  lineHeight: 18,
                  fontSize: 13.5,
                }}
              >
                Dr. Sharma prescribed 45 units of Cardio-X to this chemist.
                Verify stock and highlight Festival Bonanza scheme.
              </Text>
            </View>

            {/* FOOTER BUTTONS */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                borderTopWidth: 1,
                borderColor: "#e5e7eb",
                paddingTop: 16,
              }}
            >
              <Pressable
                onPress={onClose}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 6,
                  backgroundColor: "#f3f4f6",
                  marginRight: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "#374151", fontWeight: "600" }}
                >
                  Cancel
                </Text>
              </Pressable>

              <Pressable
                onPress={onSubmit}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 6,
                  backgroundColor: "#0284c7",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontWeight: "600" }}
                >
                  Submit Visit
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
