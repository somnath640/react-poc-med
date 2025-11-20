import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

type SampleDetailsProps = {
  visible: boolean;
  onClose: () => void;
  product: {
    name: string;
    stock: number;
    max: number;
    distributed: number;
    batch: string;
    expiry: string;
    last: string;
  } | null;
};

export default function SampleDetailsModal({
  visible,
  onClose,
  product,
}: SampleDetailsProps) {
  if (!product) return null;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(15,23,42,0.35)",
          justifyContent: "center",
          alignItems: "center",
          padding: 16,
        }}
      >
        {/* Modal Card */}
        <View
          style={{
            width: "100%",
            maxWidth: 360,
            backgroundColor: "#fff",
            borderRadius: 12,
            padding: 16,
          }}
        >
          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                Sample Details
              </Text>
              <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                {product.name}
              </Text>
            </View>

            <Pressable onPress={onClose} hitSlop={12}>
              <Ionicons name="close" size={20} color="#9ca3af" />
            </Pressable>
          </View>

          <ScrollView
            style={{ marginTop: 12 }}
            showsVerticalScrollIndicator={false}
          >
            {/* Stock Healthy Box */}
            <View
              style={{
                backgroundColor: "#ecfdf5",
                borderColor: "#bbf7d0",
                borderWidth: 1,
                borderRadius: 10,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="checkmark-circle" size={16} color="#22c55e" />
                <Text
                  style={{
                    marginLeft: 6,
                    fontSize: 13,
                    fontWeight: "600",
                    color: "#166534",
                  }}
                >
                  Stock Healthy
                </Text>
              </View>

              <Text
                style={{ fontSize: 12, marginTop: 4, color: "#166534" }}
              >
                {product.stock} units available out of {product.max} max capacity
              </Text>
            </View>

            {/* Stock Info */}
            <View
              style={{
                backgroundColor: "#fff",
                borderWidth: 1,
                borderColor: "#e5e7eb",
                borderRadius: 10,
                padding: 12,
                marginBottom: 12,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  marginBottom: 8,
                  color: "#111827",
                }}
              >
                Stock Information
              </Text>

              {[
                ["Current Stock:", `${product.stock} units`],
                ["Max Capacity:", `${product.max} units`],
                ["Distributed:", `${product.distributed} units`],
                ["Pending Requests:", `0`],
              ].map(([label, val]) => (
                <View
                  key={label}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#6b7280" }}>{label}</Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: "600", color: "#111827" }}
                  >
                    {val}
                  </Text>
                </View>
              ))}
            </View>

            {/* Batch Details */}
            <View
              style={{
                backgroundColor: "#f1f5ff",
                borderWidth: 1,
                borderColor: "#dbe4ff",
                borderRadius: 10,
                padding: 12,
                marginBottom: 4,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "700",
                  marginBottom: 8,
                  color: "#111827",
                }}
              >
                Batch Details
              </Text>

              {[
                ["Batch Number:", product.batch],
                ["Expiry Date:", product.expiry],
                ["Last Restocked:", product.last],
              ].map(([label, val]) => (
                <View
                  key={label}
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <Text style={{ fontSize: 12, color: "#6b7280" }}>{label}</Text>
                  <Text
                    style={{ fontSize: 12, fontWeight: "600", color: "#111827" }}
                  >
                    {val}
                  </Text>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
