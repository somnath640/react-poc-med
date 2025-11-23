// StockDetailsModal.tsx
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

export type StockItem = {
  id: string;
  name: string;
  batch: string;
  expiry: string;
  current: number;
  capacity: number;
  note?: string;
  low?: boolean;
  nearExpiry?: boolean;
};

// Use the uploaded image path from the conversation (the environment will map the path to a usable URL)
const REFERENCE_IMAGE = "/mnt/data/0de7c2fc-f52c-4f0c-ac6c-c2fa9b873625.png";

export default function StockDetailsModal({
  visible,
  item,
  onClose,
  onRequestRestock,
}: {
  visible: boolean;
  item: StockItem | null;
  onClose: () => void;
  onRequestRestock?: (item: StockItem) => void;
}) {
  if (!item) return null;

  const percent = Math.max(0, Math.min(100, Math.round((item.current / item.capacity) * 100)));
  const distributed = Math.max(0, item.capacity - item.current);

  // Severity rules:
  // critical when current <= ceil(capacity * 0.35)
  // low when current <= ceil(capacity * 0.5)
  // healthy otherwise
  const criticalThreshold = Math.ceil(item.capacity * 0.35);
  const lowThreshold = Math.ceil(item.capacity * 0.5);

  const severity = item.current <= criticalThreshold ? "critical" : item.current <= lowThreshold ? "low" : "healthy";

  function handleRestock() {
    if (!item) return; // narrow type for TypeScript safety
    if (onRequestRestock) onRequestRestock(item);
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center", padding: 20 }}>
        <View
          style={{
            width: "100%",
            maxWidth: 480,
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 14,
            borderWidth: 1,
            borderColor: "#e6e7eb",
            shadowColor: "#000",
            shadowOpacity: 0.08,
            shadowRadius: 10,
            overflow: "hidden",
          }}
        >
          {/* header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
            <View>
              <Text style={{ fontSize: 15, fontWeight: "700", color: "#111827" }}>Sample Details</Text>
              <Text style={{ color: "#6b7280", marginTop: 6 }}>{item.name}</Text>
            </View>

            <Pressable onPress={onClose} accessibilityLabel="Close modal" style={{ marginLeft: 8 }}>
              <View style={{ width: 28, height: 28, borderRadius: 6, borderWidth: 1, borderColor: "#d1d5db", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
                <Text style={{ fontSize: 13 }}>✕</Text>
              </View>
            </Pressable>
          </View>

          <ScrollView style={{ marginTop: 6 }} contentContainerStyle={{ paddingBottom: 12 }}>
            {/* Status card */}
            {severity === "critical" ? (
              <View style={{ backgroundColor: "#fff3f3", borderRadius: 8, padding: 14, marginTop: 6, borderWidth: 1, borderColor: "#f5c6c6" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 34, height: 34, borderRadius: 6, backgroundColor: "#fff3f3", alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                    <Text style={{ color: "#b91c1c", fontWeight: "700" }}>⚠️</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#b91c1c", fontWeight: "700", marginBottom: 6 }}>Critical Stock Level</Text>
                    <Text style={{ color: "#7f1d1d" }}>{item.current} units available out of {item.capacity} max capacity</Text>
                  </View>
                </View>
              </View>
            ) : severity === "low" ? (
              <View style={{ backgroundColor: "#fff7ed", borderRadius: 8, padding: 14, marginTop: 6, borderWidth: 1, borderColor: "#ffecd1" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 34, height: 34, borderRadius: 6, backgroundColor: "#fff4e6", alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                    <Text style={{ color: "#b45309", fontWeight: "700" }}>↘</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#c2410c", fontWeight: "700", marginBottom: 6 }}>Low Stock Alert</Text>
                    <Text style={{ color: "#7c2d12" }}>{item.current} units available out of {item.capacity} max capacity</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={{ backgroundColor: "#ecfdf5", borderRadius: 8, padding: 14, marginTop: 6, borderWidth: 1, borderColor: "#d1fae5" }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ width: 34, height: 34, borderRadius: 6, backgroundColor: "#e6ffef", alignItems: "center", justifyContent: "center", marginRight: 10 }}>
                    <Text style={{ color: "#059669", fontWeight: "700" }}>✓</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#059669", fontWeight: "700", marginBottom: 6 }}>Stock Healthy</Text>
                    <Text style={{ color: "#065f46" }}>{item.current} units available out of {item.capacity} max capacity</Text>
                  </View>
                </View>
              </View>
            )}

            {/* Stock Information */}
            <View style={{ backgroundColor: "#fff", padding: 14, borderRadius: 8, borderWidth: 1, borderColor: "#eef2f7", marginTop: 12 }}>
              <Text style={{ fontWeight: "700", marginBottom: 10 }}>Stock Information</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: "#6b7280" }}>Current Stock:</Text>
                <Text style={{ color: "#111827" }}>{item.current} units</Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: "#6b7280" }}>Max Capacity:</Text>
                <Text style={{ color: "#111827" }}>{item.capacity} units</Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
                <Text style={{ color: "#6b7280" }}>Distributed:</Text>
                <Text style={{ color: "#111827" }}>{distributed} units</Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#6b7280" }}>Pending Requests:</Text>
                <Text style={{ color: "#111827" }}>1</Text>
              </View>
            </View>

            {/* Batch details */}
            <View style={{ backgroundColor: "#eef2ff", padding: 14, borderRadius: 8, marginTop: 12, borderWidth: 1, borderColor: "#e6edff" }}>
              <Text style={{ fontWeight: "700", marginBottom: 10 }}>Batch Details</Text>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ color: "#6b7280" }}>Batch Number:</Text>
                <Text style={{ color: "#111827" }}>{item.batch}</Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 6 }}>
                <Text style={{ color: "#6b7280" }}>Expiry Date:</Text>
                <Text style={{ color: "#111827" }}>{item.expiry}</Text>
              </View>

              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ color: "#6b7280" }}>Last Restocked:</Text>
                {/* example last restocked dates; adjust as needed or pass in via item */}
                <Text style={{ color: "#111827" }}>{severity === "critical" ? "Oct 25, 2025" : severity === "low" ? "Oct 28, 2025" : "Nov 1, 2025"}</Text>
              </View>
            </View>

            {/* Request Restock button for low & critical */}
            {(severity === "critical" || severity === "low") && (
              <View style={{ marginTop: 16, paddingBottom: 6 }}>
                <Pressable onPress={handleRestock} style={{ backgroundColor: "#0f172a", paddingVertical: 14, borderRadius: 6, alignItems: "center", justifyContent: "center", width: "100%" }}>
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 14 }}>＋ Request Restock</Text>
                </Pressable>
              </View>
            )}

            {/* close small */}
            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 12 }}>
              <Pressable onPress={onClose} style={{ paddingHorizontal: 12, paddingVertical: 8 }}>
                <Text style={{ fontWeight: "700", color: "#0f172a" }}>Close</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
