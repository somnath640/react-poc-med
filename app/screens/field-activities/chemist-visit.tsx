// App.tsx
// Expo + React Native + TypeScript
// Paste this into your project (replace App.tsx). No external libs required.
// Uses useWindowDimensions() to make the layout centered & responsive.

import React, { JSX } from "react";
import {
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Chemist = {
  id: string;
  name: string;
  owner: string;
  tier: "A" | "B" | "C";
  location: string;
  phone: string;
  lastVisit: string;
  totalPurchase: number;
  outstanding: number;
  stockStatus: "Good Stock" | "Low Stock" | "Critical Stock";
};

const CHEMISTS: Chemist[] = [
  {
    id: "c1",
    name: "Kumar Medical Store",
    owner: "Rajesh Kumar",
    tier: "A",
    location: "Breach Candy, Mumbai",
    phone: "+91 98765 43210",
    lastVisit: "2 days ago",
    totalPurchase: 245000,
    outstanding: 12000,
    stockStatus: "Good Stock",
  },
  {
    id: "c2",
    name: "City Pharmacy",
    owner: "Priya Sharma",
    tier: "A",
    location: "Bandra West, Mumbai",
    phone: "+91 98765 43211",
    lastVisit: "5 days ago",
    totalPurchase: 320000,
    outstanding: 0,
    stockStatus: "Low Stock",
  },
  {
    id: "c3",
    name: "HealthPlus Chemist",
    owner: "Amit Patel",
    tier: "B",
    location: "Andheri East, Mumbai",
    phone: "+91 98765 43212",
    lastVisit: "1 week ago",
    totalPurchase: 180000,
    outstanding: 25000,
    stockStatus: "Critical Stock",
  },
  {
    id: "c4",
    name: "Wellness Pharmacy",
    owner: "Neha Desai",
    tier: "A",
    location: "Juhu, Mumbai",
    phone: "+91 98765 43213",
    lastVisit: "3 days ago",
    totalPurchase: 290000,
    outstanding: 8000,
    stockStatus: "Good Stock",
  },
  {
    id: "c5",
    name: "Mehta Medicals",
    owner: "Suresh Mehta",
    tier: "B",
    location: "Worli, Mumbai",
    phone: "+91 98765 43214",
    lastVisit: "10 days ago",
    totalPurchase: 150000,
    outstanding: 15000,
    stockStatus: "Low Stock",
  },
];

/* ---------- Responsive container helper ---------- */
function useResponsiveContainer() {
  const { width } = useWindowDimensions();
  // breakpoints - tune if needed
  const TABLET_BREAK = 768;
  const LAPTOP_BREAK = 1200;

  const isPhone = width < TABLET_BREAK;
  const isTablet = width >= TABLET_BREAK && width < LAPTOP_BREAK;
  const isLaptop = width >= LAPTOP_BREAK;

  // compute centered container width with padding
  let container = Math.min(width - 32, 1000);
  if (isTablet) container = Math.min(width - 80, 1400);
  if (isLaptop) container = Math.min(width - 240, 1800);

  return { container, isPhone, isTablet, isLaptop };
}

/* ---------- Helpers ---------- */
function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: Chemist["stockStatus"] }) {
  const styles = {
    "Good Stock": {
      bg: "#ecfdf5",
      color: "#059669",
      border: "#d1fae5",
    },
    "Low Stock": {
      bg: "#fffbeb",
      color: "#b45309",
      border: "#fef3c7",
    },
    "Critical Stock": {
      bg: "#fff1f2",
      color: "#b91c1c",
      border: "#fee2e2",
    },
  } as const;

  const s = styles[status];
  return (
    <View
      style={{
        backgroundColor: s.bg,
        borderColor: s.border,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
      }}
    >
      <Text style={{ color: s.color, fontWeight: "700", fontSize: 12 }}>{status}</Text>
    </View>
  );
}

/* ---------- Main App ---------- */
export default function ChemistVisit(): JSX.Element {
  const { container } = useResponsiveContainer();

  // summary numbers (mock)
  const totalChemists = CHEMISTS.length;
  const rxTracked = 4;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={{ width: container, alignSelf: "center", paddingHorizontal: 8 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: "#06b6d4", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontWeight: "700" }}>💊</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700", color: "#0f172a" }}>Chemist Visit & Interaction</Text>
                <Text style={{ color: "#6b7280", fontSize: 13 }}>Manage pharmacy relationships & track prescriptions</Text>
              </View>
            </View>

            <Pressable style={{ backgroundColor: "#0f172a", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: "white", fontWeight: "700" }}>+ Visit</Text>
            </Pressable>
          </View>

          {/* Search */}
          <View style={{ marginBottom: 12 }}>
            <TextInput
              placeholder="Search chemists by name, shop, or location..."
              placeholderTextColor="#9CA3AF"
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#eef2f7",
                color: "#111827",
              }}
            />
          </View>

          {/* Summary cards row */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <View style={{ flex: 1, backgroundColor: "#ecfdf5", padding: 14, borderRadius: 10, borderWidth: 1, borderColor: "#d1fae5" }}>
              <Text style={{ color: "#6b7280", fontSize: 13 }}>Total Chemists</Text>
              <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 6 }}>{totalChemists}</Text>
            </View>

            <View style={{ flex: 1, backgroundColor: "#faf5ff", padding: 14, borderRadius: 10, borderWidth: 1, borderColor: "#efe7ff" }}>
              <Text style={{ color: "#6b7280", fontSize: 13 }}>Rx Tracked</Text>
              <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 6 }}>{rxTracked}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: "row", backgroundColor: "#f3f4f6", borderRadius: 999, padding: 6, marginBottom: 12 }}>
            <Pressable style={{ flex: 1, backgroundColor: "#fff", borderRadius: 999, paddingVertical: 10, alignItems: "center" }}>
              <Text style={{ fontWeight: "700" }}>Chemists</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Rx Trends</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Stock</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Schemes</Text>
            </Pressable>
          </View>

          {/* Chemist cards list */}
          <View style={{ gap: 14 }}>
            {CHEMISTS.map((c) => (
              <View key={c.id} style={{ backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: "#eef2f7" }}>
                {/* top row: title + badge */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      <Text style={{ fontSize: 16, fontWeight: "800", color: "#0f172a" }}>{c.name}</Text>
                      <View style={{ backgroundColor: "#f3e8ff", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 }}>
                        <Text style={{ color: "#7c3aed", fontWeight: "700", fontSize: 12 }}>Tier {c.tier}</Text>
                      </View>
                    </View>
                    <Text style={{ color: "#6b7280", marginTop: 6 }}>{c.owner}</Text>
                  </View>

                  <View style={{ marginLeft: 12 }}>
                    <StatusBadge status={c.stockStatus} />
                  </View>
                </View>

                {/* contact & meta */}
                <View style={{ marginTop: 12 }}>
                  <Text style={{ color: "#6b7280" }}>📍 {c.location}</Text>
                  <Text style={{ color: "#6b7280", marginTop: 6 }}>📞 {c.phone}</Text>
                  <Text style={{ color: "#6b7280", marginTop: 6 }}>⏱️ Last visit: {c.lastVisit}</Text>
                </View>

                {/* divider */}
                <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 16 }} />

                {/* footer row: totals + Start Visit button */}
                {/* footer row: totals + full-width Start Visit button */}
<View style={{ marginTop: 12 }}>
  
  {/* Purchase + Outstanding row */}
  <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 12 }}>
    <View>
      <Text style={{ color: "#6b7280", fontSize: 13 }}>Total Purchase</Text>
      <Text style={{ color: "#059669", fontWeight: "800", marginTop: 6 }}>
        {formatINR(c.totalPurchase)}
      </Text>
    </View>

    <View>
      <Text style={{ color: "#6b7280", fontSize: 13 }}>Outstanding</Text>
      <Text style={{ color: "#ef4444", fontWeight: "800", marginTop: 6 }}>
        {formatINR(c.outstanding)}
      </Text>
    </View>
  </View>

  {/* FULL WIDTH BUTTON */}
  <Pressable
    style={{
      backgroundColor: "#0ea5a3",
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: "center",
      width: "100%",      // FULL WIDTH
      alignSelf: "center" // CENTERED
    }}
  >
    <Text style={{ color: "white", fontWeight: "800" }}>+ Start Visit</Text>
  </Pressable>
</View>

              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
