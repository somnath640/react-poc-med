// RestockModal.tsx
import { Picker as RNPicker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";



export type ProductOption = {
  id: string;
  label: string;
  current?: number;
  note?: string;
};

const DECORATIVE_IMG = "/mnt/data/3163bf03-a3ff-4845-a772-3acceb94e954.png";

export default function RestockModal({
  visible,
  productOptions,
  initialProductId,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  productOptions: ProductOption[];
  initialProductId?: string | null;
  onClose: () => void;
  onSubmit: (payload: { productId: string; quantity: number; reason: string }) => void;
}) {
  const [productId, setProductId] = useState<string | undefined>(initialProductId ?? productOptions[0]?.id);
  const [quantity, setQuantity] = useState<string>("20");
  const [reason, setReason] = useState<string>("");
  const UCPMP_LIMIT = 30; // example rule

  useEffect(() => {
    if (visible) {
      setProductId(initialProductId ?? productOptions[0]?.id);
      setQuantity("20");
      setReason("");
    }
  }, [visible, initialProductId, productOptions]);

  const selected = productOptions.find((p) => p.id === productId);

  function handleSubmit() {
    if (!productId) return;
    const q = Number(quantity) || 0;
    onSubmit({ productId, quantity: q, reason });
    onClose();
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", alignItems: "center", padding: 20 }}>
        <View style={{
          width: "100%",
          maxWidth: 520,
          backgroundColor: "#fff",
          borderRadius: 10,
          padding: 18,
          borderWidth: 1,
          borderColor: "#e6e7eb",
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          overflow: "hidden"
        }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>Request Samples</Text>
              <Text style={{ color: "#6b7280", marginTop: 6, fontSize: 12 }}>Request additional product samples (UCPMP compliant)</Text>
            </View>

            <Pressable onPress={onClose} accessibilityLabel="Close modal" style={{ marginLeft: 8 }}>
              <View style={{ width: 28, height: 28, borderRadius: 6, borderWidth: 1, borderColor: "#d1d5db", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" }}>
                <Text style={{ fontSize: 13 }}>✕</Text>
              </View>
            </Pressable>
          </View>

          <ScrollView style={{ marginTop: 10 }} contentContainerStyle={{ paddingBottom: 8 }}>
            {/* product picker */}
            <View style={{ marginVertical: 8 }}>
              <Text style={{ color: "#6b7280", marginBottom: 6 }}>Select Product *</Text>

              {/* Platform-agnostic picker fallback: simple Text-based select for RN web */}
              {Platform.OS === "web" ? (
                <View style={{
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 8,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                }}>
                  <select
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    style={{ width: "100%", fontSize: 14, border: "none", outline: "none", backgroundColor: "transparent" }}
                  >
                    {productOptions.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </View>
              ) : (
                // for mobile / emulator: use RNPicker if available
                // If you have @react-native-picker/picker installed, replace this block with <Picker> component.
                <View style={{
                  borderWidth: 1,
                  borderColor: "#d1d5db",
                  borderRadius: 8,
                  paddingHorizontal: 6,
                }}>
                  <RNPicker
  selectedValue={productId}
  onValueChange={(v: string | number) => setProductId(String(v))}
  style={{ height: 44 }}
>

                    {productOptions.map((p) => (
                      <RNPicker.Item key={p.id} label={p.label} value={p.id} />
                    ))}
                  </RNPicker>
                </View>
              )}
            </View>

            {/* Quantity */}
            <View style={{ marginVertical: 8 }}>
              <Text style={{ color: "#6b7280", marginBottom: 6 }}>Quantity</Text>
              <TextInput
                keyboardType="number-pad"
                value={quantity}
                onChangeText={setQuantity}
                placeholder="20"
                style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10 }}
              />
            </View>

            {/* Reason */}
            <View style={{ marginVertical: 8 }}>
              <Text style={{ color: "#6b7280", marginBottom: 6 }}>Reason for Request *</Text>
              <TextInput
                value={reason}
                onChangeText={setReason}
                placeholder="Enter reason..."
                multiline
                numberOfLines={4}
                style={{ borderWidth: 1, borderColor: "#d1d5db", borderRadius: 8, paddingHorizontal: 12, paddingVertical: 10, minHeight: 80 }}
              />
            </View>

            {/* Footer note */}
            <View style={{ marginTop: 6 }}>
              <View style={{ backgroundColor: "#fff7ed", borderRadius: 8, padding: 10, borderWidth: 1, borderColor: "#fde3c5" }}>
                <Text style={{ color: "#92400e", fontSize: 12 }}>
                  Note: Distribution limits per UCPMP Code '24 apply. Max {UCPMP_LIMIT} units per product per month.
                </Text>
              </View>
            </View>

            {/* decorative image */}
            <View style={{ marginTop: 12 }}>
              <Image source={{ uri: DECORATIVE_IMG }} style={{ width: "100%", height: 110, borderRadius: 8, resizeMode: "cover" }} />
            </View>

            {/* submit */}
            <View style={{ marginTop: 12 }}>
              <Pressable onPress={handleSubmit} style={{ backgroundColor: "#06060a", paddingVertical: 12, borderRadius: 8, alignItems: "center" }}>
                <Text style={{ color: "#fff", fontWeight: "700" }}>Submit Request</Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
