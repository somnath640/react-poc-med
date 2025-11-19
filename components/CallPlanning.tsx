// app/components/CallPlanning.tsx
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";

type Props = {
  imageUri?: string;
  onCancel: () => void;
  onProceed: () => void;
};

export default function CallPlanning({ imageUri, onCancel, onProceed }: Props) {
  return (
    <>
      {/* Header title area inside the modal (small top spacing kept by parent modal) */}
      <View style={{ paddingHorizontal: 14, paddingTop: 6, paddingBottom: 6 }}>
        <Text style={{ fontWeight: "800", fontSize: 16, color: "#0f172a" }}>
          How should I plan my call with
        </Text>
        <Text style={{ fontWeight: "800", fontSize: 20, marginTop: 2, color: "#0f172a" }}>
          Dr. Rajesh Sharma?
        </Text>
        <Text style={{ color: "#6b7280", marginTop: 6 }}>AI-powered call planning suggestions</Text>
      </View>

      {/* Greeting / small avatar row */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10, paddingHorizontal: 14, paddingTop: 8 }}>
        <View style={{ width: 38, height: 38, borderRadius: 999, backgroundColor: "#eef2ff", alignItems: "center", justifyContent: "center" }}>
          <MaterialIcons name="person" size={18} color="#2563eb" />
        </View>
        <Text style={{ color: "#0f172a", fontWeight: "600" }}>Certainly demo,</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 14 }} showsVerticalScrollIndicator>
        {/* BIG pink panel */}
        <View
          style={{
            backgroundColor: "#fff1f6", // pale pink paper
            borderRadius: 12,
            padding: 14,
            borderWidth: 1,
            borderColor: "#ffdfe8",
            marginBottom: 18,
          }}
        >
          <Text style={{ fontWeight: "800", fontSize: 16, marginBottom: 10, color: "#0f172a" }}>
            Call planning suggestions
          </Text>

          {/* 1. Previous Call Note */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "700", marginBottom: 8 }}>1. Previous Call Note:</Text>
            <Text style={{ color: "#0f172a", lineHeight: 20 }}>
              In the most recent discussion on <Text style={{ fontWeight: "700" }}>14th June</Text>, Dr. Rajesh Sharma requested for a{" "}
              <Text style={{ fontWeight: "700" }}>full text article</Text> on the cardiovascular risk management related to{" "}
              <Text style={{ fontWeight: "700" }}>Atorvastatin 40mg</Text>. Ensure to follow up on this request and provide the necessary materials. It's essential to take detailed call notes for future reference.
            </Text>
          </View>

          {/* 2. E-detailing trend */}
          <View style={{ marginBottom: 12 }}>
            <Text style={{ fontWeight: "700", marginBottom: 8 }}>2. E-detailing trend:</Text>
            <Text style={{ color: "#0f172a", marginBottom: 8, lineHeight: 20 }}>
              Over the past three months, the e-detailing sessions have been as follows:
            </Text>

            <View style={{ paddingLeft: 12, marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                <Text style={{ marginTop: 2 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>Atorvastatin 40mg:</Text> 22 seconds
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                <Text style={{ marginTop: 2 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>Metoprolol XL 50mg:</Text> 19 seconds
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
                <Text style={{ marginTop: 2 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>Ramipril 5mg:</Text> 20.5 seconds
                </Text>
              </View>
            </View>

            <Text style={{ color: "#0f172a", lineHeight: 20 }}>
              The detailing time has been relatively low indicating that there is room for more in-depth discussions on these brands. Make sure to spend more time detailing these focus brands.
            </Text>
          </View>

          {/* 3. Call coverage trend */}
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontWeight: "700", marginBottom: 8 }}>3. Call coverage trend:</Text>

            <View style={{ paddingLeft: 12 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                <Text style={{ marginTop: 2 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>In March 2025,</Text> you plan to meet Dr. Rajesh Sharma 3 times
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                <Text style={{ marginTop: 2 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>In April 2025,</Text> you plan to meet 3 times but had 4 actual calls.
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8, marginBottom: 6 }}>
                <Text style={{ marginTop: 2 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>In May 2025,</Text> you plan to meet 3 times but had 3 actual calls.
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 8 }}>
                <Text style={{ marginTop: 2 }}>•</Text>
                <Text style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700" }}>In June 2025,</Text> you plan to meet 3 times but had 1 actual call.
                </Text>
              </View>
            </View>

            <Text style={{ marginTop: 12, color: "#0f172a", lineHeight: 20 }}>
              The actual call coverage has been lower than planned, especially in June. Aim to improve the call coverage to ensure consistent engagement.
            </Text>
          </View>
        </View>

        {/* optional screenshot below the text (kept but hidden by default) */}
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: 160, borderRadius: 8, marginBottom: 18, backgroundColor: "#f3f4f6" }}
            resizeMode="cover"
          />
        ) : null}
      </ScrollView>

      {/* Footer */}
      <View style={{ flexDirection: "row", padding: 12, borderTopWidth: 1, borderColor: "#eef2f7", backgroundColor: "#fff" }}>
        <Pressable
          onPress={onCancel}
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
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontWeight: "700", color: "#0f172a" }}>Cancel</Text>
        </Pressable>

        <Pressable
          onPress={onProceed}
          style={{
            flex: 1,
            backgroundColor: "#10b981",
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <MaterialIcons name="edit" size={16} color="#fff" />
          <Text style={{ color: "#fff", fontWeight: "800" }}>Proceed to Detailing</Text>
        </Pressable>
      </View>
    </>
  );
}
