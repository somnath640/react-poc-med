// app/components/StockistVisitModal.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";

type StockistVisitModalProps = {
  visible: boolean;
  onClose: () => void;
  stockist: {
    name: string;
    group: string;
    location: string;
    monthlyVolume: number;
    pending: number;
  } | null;
  onSubmit?: () => void;
};

export default function StockistVisitModal({
  visible,
  onClose,
  stockist,
  onSubmit,
}: StockistVisitModalProps) {
  if (!stockist) return null;

  const checklistItems = [
    "Review order history and pending deliveries",
    "Check doctor-chemist demand trends",
    "Discuss current inventory of Lupin products",
    "Address any supply chain issues",
    "Confirm if chemist orders are fulfilled",
  ];
  const [checked, setChecked] = React.useState<boolean[]>(
    Array(checklistItems.length).fill(false)
  );
  
  const toggleCheck = (index: number) => {
    const updated = [...checked];
    updated[index] = !updated[index];
    setChecked(updated);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.55)",
          justifyContent: "center",
          paddingHorizontal: 12,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            borderRadius: 12,
            width: "100%",
            maxWidth: 520,
            maxHeight: "85%",
            alignSelf: "center",
            overflow: "hidden",
          }}
        >
          {/* FULL MODAL SCROLL */}
          <ScrollView
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View
                style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
              >
                <MaterialIcons name="task-alt" size={24} color="#ea580c" />
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: "700",
                    color: "#0f172a",
                  }}
                >
                  Stockist Visit - {stockist.name}
                </Text>
              </View>

              <Pressable onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#374151" />
              </Pressable>
            </View>

            <Text style={{ color: "#6b7280", marginTop: 6 }}>
              Record your stockist visit and complete the checklist
            </Text>

            {/* Info Card */}
            <View
              style={{
                backgroundColor: "#f8fafc",
                borderRadius: 10,
                padding: 16,
                marginTop: 18,
                borderWidth: 1,
                borderColor: "#e2e8f0",
              }}
            >
              <Text style={{ fontWeight: "700", color: "#0f172a" }}>
                {stockist.group}
              </Text>

              <View style={{ flexDirection: "row", marginTop: 10, gap: 6 }}>
                <MaterialIcons name="location-on" size={20} color="#6b7280" />
                <Text style={{ color: "#4b5563" }}>{stockist.location}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 18,
                }}
              >
                <View>
                  <Text style={{ color: "#6b7280" }}>Monthly Volume</Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#2563eb",
                      marginTop: 4,
                    }}
                  >
                    ₹{(stockist.monthlyVolume / 100000).toFixed(1)}L
                  </Text>
                </View>

                <View>
                  <Text style={{ color: "#6b7280" }}>Pending</Text>
                  <Text
                    style={{
                      fontWeight: "700",
                      color: "#ea580c",
                      marginTop: 4,
                    }}
                  >
                    {stockist.pending} orders
                  </Text>
                </View>
              </View>
            </View>

            {/* Checklist */}
            <Text
              style={{
                marginTop: 20,
                marginBottom: 8,
                color: "#0f172a",
                fontWeight: "700",
              }}
            >
              Visit Checklist
            </Text>

            {/* Checklist (NOT SCROLLABLE) */}
            {checklistItems.map((item, index) => (
  <Pressable
    key={index}
    style={{
      backgroundColor: "#f8fafc",
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
    onPress={() => toggleCheck(index)}
  >
    <MaterialIcons
      name={checked[index] ? "check-box" : "check-box-outline-blank"}
      size={24}
      color={checked[index] ? "#16a34a" : "#6b7280"}
    />
    <Text style={{ color: "#374151" }}>{item}</Text>
  </Pressable>
))}


            {/* ---- Trade Schemes ---- */}
            <View
              style={{
                marginTop: 10,
                backgroundColor: "#f8fafc",
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <MaterialIcons
                name="check-box-outline-blank"
                size={22}
                color="#111827"
              />
              <Text style={{ color: "#111827", fontWeight: "500" }}>
                Share ongoing trade schemes or incentives
              </Text>
            </View>

            {/* ---- Order Booked ---- */}
            <Text
              style={{
                marginTop: 18,
                color: "#6b7280",
                fontWeight: "600",
                fontSize: 14,
              }}
            >
              Order Booked (Optional)
            </Text>

            <View
              style={{
                marginTop: 6,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                paddingHorizontal: 14,
                paddingVertical: 12,
                backgroundColor: "#f8fafc",
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MaterialIcons
                name="currency-rupee"
                size={20}
                color="#9ca3af"
              />
              <TextInput
                placeholder="Enter order value"
                placeholderTextColor="#9ca3af"
                keyboardType="numeric"
                style={{ flex: 1, color: "#111827" }}
              />
            </View>

            {/* ---- Visit Notes ---- */}
            <Text
              style={{
                marginTop: 20,
                color: "#0f172a",
                fontWeight: "700",
                fontSize: 14,
              }}
            >
              Visit Notes *
            </Text>

            <TextInput
              placeholder="Record discussion points, inventory status, supply issues, schemes shared, replenishment plans..."
              placeholderTextColor="#9ca3af"
              multiline
              style={{
                marginTop: 8,
                minHeight: 90,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                padding: 14,
                backgroundColor: "#f8fafc",
                color: "#111827",
                textAlignVertical: "top",
              }}
            />

            {/* ---- AI Recommendation ---- */}
            <View
              style={{
                marginTop: 16,
                borderRadius: 10,
                padding: 14,
                backgroundColor: "#eff6ff",
                borderLeftWidth: 4,
                borderLeftColor: "#3b82f6",
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 6 }}
              >
                <MaterialIcons
                  name="auto-awesome"
                  size={20}
                  color="#2563eb"
                />
                <Text
                  style={{ fontWeight: "700", color: "#1e3a8a" }}
                >
                  AI Recommendation
                </Text>
              </View>

              <Text
                style={{
                  marginTop: 8,
                  color: "#1e3a8a",
                  lineHeight: 20,
                }}
              >
                Lupin Diabetes Care stock is critical (1200 units). High
                demand from 38 doctors and 25 chemists. Recommend immediate
                replenishment of 6000 units. Share Free Goods scheme for bulk
                orders.
              </Text>
            </View>
          </ScrollView>

          {/* STICKY FOOTER BUTTONS */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 16,
              gap: 12,
              backgroundColor: "white",
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                backgroundColor: "#f3f4f6",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "600", color: "#374151" }}>
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onSubmit}
              style={{
                flex: 1,
                backgroundColor: "#ef4444",
                paddingVertical: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "700", color: "white" }}>
                Submit Visit
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
