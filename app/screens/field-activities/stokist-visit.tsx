// App.tsx
import React, { JSX } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    TextInput,
    View,
    useWindowDimensions,
} from "react-native";

/* ---------------- Types & sample data ---------------- */
type Stockist = {
  id: string;
  name: string;
  group: string;
  tag?: "Premium" | "Standard" | "Distributor";
  location: string;
  phone: string;
  lastOrder: string;
  lastOrderValue: number; // INR in units (e.g., 125000)
  outstanding: number;
  monthlyVolume: number;
  creditLimit: number;
  pendingOrders?: number;
};

const STOCKISTS: Stockist[] = [
  {
    id: "s1",
    name: "Ramesh Medical Distributors Pvt Ltd",
    group: "Ramesh Traders",
    tag: "Premium",
    location: "Andheri East, Mumbai",
    phone: "+91 98765 00001",
    lastOrder: "5 days ago",
    lastOrderValue: 1250000,
    outstanding: 130000,
    monthlyVolume: 4500000,
    creditLimit: 5000000,
    pendingOrders: 2,
  },
  {
    id: "s2",
    name: "Sharma Medical Supply Chain",
    group: "Sharma Distributors",
    tag: "Premium",
    location: "Bandra West, Mumbai",
    phone: "+91 98765 00002",
    lastOrder: "3 days ago",
    lastOrderValue: 980000,
    outstanding: 0,
    monthlyVolume: 3200000,
    creditLimit: 4000000,
    pendingOrders: 0,
  },
  {
    id: "s3",
    name: "Metro Pharmaceutical Distributors",
    group: "Metro Pharma Hub",
    tag: "Standard",
    location: "Worli, Mumbai",
    phone: "+91 98765 00003",
    lastOrder: "2 weeks ago",
    lastOrderValue: 550000,
    outstanding: 280000,
    monthlyVolume: 1800000,
    creditLimit: 2000000,
    pendingOrders: 3,
  },
];

/* ---------- Responsive container helper ---------- */
function useResponsiveContainer() {
  const { width } = useWindowDimensions();
  const TABLET_BREAK = 768;
  const LAPTOP_BREAK = 1200;

  const isPhone = width < TABLET_BREAK;
  const isTablet = width >= TABLET_BREAK && width < LAPTOP_BREAK;
  const isLaptop = width >= LAPTOP_BREAK;

  let container = Math.min(width - 32, 1000);
  if (isTablet) container = Math.min(width - 80, 1400);
  if (isLaptop) container = Math.min(width - 240, 1800);

  return { container, isPhone, isTablet, isLaptop };
}

/* ---------- Helpers ---------- */
function formatINRShort(n: number) {
  // show in lakhs with 1 decimal if larger than 1 lakh; else show normal with separators
  if (n >= 100000) {
    const lakh = n / 100000;
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)}L`;
  }
  return `₹${n.toLocaleString("en-IN")}`;
}

function Badge({ text }: { text: string }) {
  return (
    <View style={{ backgroundColor: "#f3e8ff", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
      <Text style={{ color: "#7c3aed", fontWeight: "700", fontSize: 12 }}>{text}</Text>
    </View>
  );
}

/* ---------- Main App ---------- */
export default function StokistVisit(): JSX.Element {
  const { container, isPhone } = useResponsiveContainer();

  const activeStockists = STOCKISTS.length;
  const pendingOrders = STOCKISTS.reduce((s, x) => s + (x.pendingOrders ?? 0), 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={{ width: container, alignSelf: "center", paddingHorizontal: 8 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: "#fb923c", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontWeight: "700" }}>🏬</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700", color: "#0f172a" }}>Stockist Visit & Interaction</Text>
                <Text style={{ color: "#6b7280", fontSize: 13 }}>Manage distributor relationships & supply chain</Text>
              </View>
            </View>

            <Pressable style={{ backgroundColor: "#0f172a", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: "white", fontWeight: "700" }}>+ Visit</Text>
            </Pressable>
          </View>

          {/* Search */}
          <View style={{ marginBottom: 12 }}>
            <TextInput
              placeholder="Search stockists by name, firm, or location..."
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

          {/* Summary row */}
          <View style={{ flexDirection: isPhone ? "column" : "row", gap: 12, marginBottom: 12 }}>
            <View style={{ flex: 1, backgroundColor: "#fff7ed", padding: 14, borderRadius: 10, borderWidth: 1, borderColor: "#fed7aa" }}>
              <Text style={{ color: "#92400e", fontSize: 13 }}>Active Stockists</Text>
              <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 6 }}>{activeStockists}</Text>
            </View>

            <View style={{ flex: 1, backgroundColor: "#ecfdf5", padding: 14, borderRadius: 10, borderWidth: 1, borderColor: "#d1fae5" }}>
              <Text style={{ color: "#065f46", fontSize: 13 }}>Pending Orders</Text>
              <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 6 }}>{pendingOrders}</Text>
            </View>
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: "row", backgroundColor: "#f3f4f6", borderRadius: 999, padding: 6, marginBottom: 12 }}>
            <Pressable style={{ flex: 1, backgroundColor: "#fff", borderRadius: 999, paddingVertical: 10, alignItems: "center" }}>
              <Text style={{ fontWeight: "700" }}>Stockists</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Orders</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Demand</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>HQ Stock</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Schemes</Text>
            </Pressable>
          </View>

          {/* Stockist cards */}
          <View style={{ gap: 14 }}>
            {STOCKISTS.map((s) => (
              <View key={s.id} style={{ backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: "#eef2f7" }}>
                {/* top row */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: "800", color: "#0f172a" }}>{s.name}</Text>
                      {s.tag && (
                        <View style={{ backgroundColor: "#f3e8ff", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 }}>
                          <Text style={{ color: "#7c3aed", fontWeight: "700", fontSize: 12 }}>{s.tag}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ color: "#6b7280", marginTop: 6 }}>{s.group}</Text>
                  </View>

                  {/* pending badge if any */}
                  <View style={{ marginLeft: 12 }}>
                    {s.pendingOrders && s.pendingOrders > 0 ? (
                      <View style={{ backgroundColor: "#fffbeb", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#fef3c7" }}>
                        <Text style={{ color: "#92400e", fontWeight: "700" }}>{s.pendingOrders} Pending</Text>
                      </View>
                    ) : null}
                  </View>
                </View>

                {/* contact */}
                <View style={{ marginTop: 12 }}>
                  <Text style={{ color: "#6b7280" }}>📍 {s.location}</Text>
                  <Text style={{ color: "#6b7280", marginTop: 6 }}>📞 {s.phone}</Text>
                  <Text style={{ color: "#6b7280", marginTop: 6 }}>⏱️ Last order: {s.lastOrder}</Text>
                </View>

                {/* divider */}
                <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 16 }} />

                {/* footer row: left & right stats + full width button */}
                <View>
                  <View style={{ flexDirection: isPhone ? "column" : "row", justifyContent: "space-between", marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Last Order Value</Text>
                      <Text style={{ color: "#059669", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.lastOrderValue)}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Monthly Volume</Text>
                      <Text style={{ color: "#1e3a8a", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.monthlyVolume)}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Outstanding</Text>
                      <Text style={{ color: "#ef4444", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.outstanding)}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Credit Limit</Text>
                      <Text style={{ color: "#7c3aed", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.creditLimit)}</Text>
                    </View>
                  </View>

                  {/* FULL WIDTH BUTTON */}
                  <Pressable
                    style={{
                      backgroundColor: "#ef4444",
                      // simulate a red gradient feel by using a dark red border at bottom
                      borderRadius: 8,
                      paddingVertical: 14,
                      alignItems: "center",
                      width: "100%",
                      alignSelf: "center",
                      shadowColor: "#ef4444",
                      shadowOpacity: 0.12,
                      shadowRadius: 6,
                    }}
                    onPress={() => {
                      /* TODO: start visit action */
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "800" }}>+ Start Stockist Visit</Text>
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
