import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RequestSamplesModal({
  visible,
  onClose,
  onSubmit,
  productOptions,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (payload: any) => void;
  productOptions: { id: string; label: string }[];
}) {
  const [productId, setProductId] = useState("");
  const [qty, setQty] = useState("20");
  const [reason, setReason] = useState("");

  if (!visible) return null;

  return (
    <View
      style={{
        position: Platform.OS === "web" ? "fixed" : "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      {/* Modal Box */}
      <View
        style={{
          width: "100%",
          maxWidth: 520,
          backgroundColor: "#fff",
          borderRadius: 12,
          paddingBottom: 16,
          overflow: "hidden",

          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowRadius: 25,
        }}
      >
        {/* Header */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingTop: 16,
            paddingBottom: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: "#f1f5f9",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>Request Samples</Text>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#64748b" />
          </TouchableOpacity>
        </View>

        {/* Body */}
        <View style={{ paddingHorizontal: 20, paddingTop: 14 }}>
          {/* Product */}
          <Text style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Select Product *</Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              borderRadius: 8,
              backgroundColor: "#fff",
              marginBottom: 14,
            }}
          >
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              style={{
                width: "100%",
                height: 46,
                borderRadius: 8,
                outline: "none",
                border: "none",
                fontSize: 14,
                color: "#0f172a",
                background: "transparent",
              }}
            >
              <option value="">Choose a product</option>
              {productOptions.map((p) => (
                <option value={p.id} key={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </View>

          {/* Quantity */}
          <Text style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Quantity</Text>

          <TextInput
            value={qty}
            keyboardType="numeric"
            onChangeText={setQty}
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              borderRadius: 8,
              padding: 12,
              marginBottom: 14,
            }}
          />

          {/* Reason */}
          <Text style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>Reason for Request *</Text>

          <TextInput
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={4}
            placeholder="Enter reason..."
            style={{
              borderWidth: 1,
              borderColor: "#e2e8f0",
              borderRadius: 8,
              padding: 12,
              minHeight: 90,
              marginBottom: 16,
              textAlignVertical: "top",
            }}
          />

          {/* Warning Box */}
          <View
            style={{
              backgroundColor: "#fff7ed",
              borderWidth: 1,
              borderColor: "#fed7aa",
              padding: 12,
              borderRadius: 8,
              marginBottom: 18,
            }}
          >
            <Text style={{ fontSize: 12, color: "#b45309" }}>
              Note: Distribution limits per UCPMP Code ’24 apply. Max 30 units per product per month.
            </Text>
          </View>

          {/* Submit */}
          <TouchableOpacity
            style={{
              backgroundColor: "#06060a",
              paddingVertical: 14,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={() => {
              onSubmit({ productId, quantity: qty, reason });
              onClose();
            }}
          >
            <Text style={{ fontWeight: "700", color: "#fff" }}>Submit Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
