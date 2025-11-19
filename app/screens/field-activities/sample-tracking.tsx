// App.tsx
import React, { JSX } from "react";
import {
    Pressable,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

/* ---------------- Types & sample data ---------------- */
type StockItem = {
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

const STOCKS: StockItem[] = [
  { id: "s1", name: "Acemiz Plus Tablet", batch: "ACM2024A", expiry: "Dec 2026", current: 45, capacity: 50, note: "Stock healthy" },
  { id: "s2", name: "Clopitab-CV Gold Capsule", batch: "CLO2024B", expiry: "Jan 2025", current: 12, capacity: 30, note: "Restock needed", low: true },
  { id: "s3", name: "Telmisartan (40mg)", batch: "TEL2024C", expiry: "Feb 2025", current: 8, capacity: 25, note: "Restock needed", low: true },
];

/* ---------------- responsive helper ---------------- */
function useResponsiveContainer() {
  const { width } = useWindowDimensions();

  // tune these breakpoints if you want
  const TABLET_BREAK = 768;
  const LAPTOP_BREAK = 1200;

  const isPhone = width < TABLET_BREAK;
  const isTablet = width >= TABLET_BREAK && width < LAPTOP_BREAK;
  const isLaptop = width >= LAPTOP_BREAK;

  // compute centered container width with side padding
  let container = Math.min(width - 32, 1000); // phones cap
  if (isTablet) container = Math.min(width - 80, 1400);
  if (isLaptop) container = Math.min(width - 240, 1800);

  return { container, isPhone, isTablet, isLaptop };
}

/* ---------------- main app ---------------- */
export default function SampleTracking(): JSX.Element {
  const { container, isTablet, isLaptop } = useResponsiveContainer();

  // stats (mocked to match screenshot)
  const totalStock = STOCKS.reduce((s, it) => s + it.current, 0);
  const distributed = 40;
  const lowStockCount = STOCKS.filter((s) => s.low).length;

  // progress helper
  const pct = (cur: number, cap: number) => Math.round((cur / cap) * 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={{ paddingVertical: 18 }}>
        <View style={{ width: container, alignSelf: "center", paddingHorizontal: 8 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "#0f172a" }}>Sample Tracking</Text>
            <Pressable style={{ backgroundColor: "#0f172a", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>+ Request</Text>
            </Pressable>
          </View>

          {/* AI Forecast banner */}
          <View style={{
            backgroundColor: "#0ea5e9",
            borderRadius: 10,
            padding: 14,
            marginBottom: 12,
            // simple left-to-right gradient-esque feel by a dark blue strip at left:
            shadowColor: "#0b6fb6",
            shadowOpacity: 0.08,
            shadowRadius: 8,
          }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
              <View style={{ width: 42, height: 42, borderRadius: 10, backgroundColor: "#0b61b2", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontWeight: "700" }}>📈</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>AI Stock Forecast ✨</Text>
                <Text style={{ color: "rgba(255,255,255,0.95)", marginTop: 4 }}>
                  Clopitab-CV Gold will run out in 3 days at current pace. Request 50 units by Nov 7 to avoid stockout.
                </Text>
              </View>
            </View>
          </View>

          {/* Big totals card */}
          <View style={{ backgroundColor: "#faf5ff", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#efe7ff" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "#6b7280", fontSize: 13 }}>Total Stock</Text>
                <Text style={{ fontSize: 28, fontWeight: "800", marginTop: 8 }}>{totalStock}</Text>
              </View>

              <View style={{ width: 48, height: 48, borderRadius: 8, borderWidth: 1, borderColor: "#ede6ff", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "#6b21b6", fontWeight: "700" }}>📦</Text>
              </View>
            </View>

            {/* small summary row */}
            <View style={{ flexDirection: isTablet || isLaptop ? "row" : "column", gap: 12, marginTop: 12 }}>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#f3eefb" }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Distributed</Text>
                <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 8 }}>{distributed}</Text>
              </View>

              <View style={{ flex: 1, backgroundColor: "#fff", padding: 10, borderRadius: 8, borderWidth: 1, borderColor: "#f3eefb" }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Low Stock</Text>
                <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 8 }}>{lowStockCount}</Text>
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: "row", backgroundColor: "#f3f4f6", borderRadius: 999, padding: 6, marginBottom: 12 }}>
            <Pressable style={{ flex: 1, backgroundColor: "#fff", borderRadius: 999, paddingVertical: 10, alignItems: "center" }}>
              <Text style={{ fontWeight: "700" }}>Stock</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Distribution</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Near Expiry</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Replace</Text>
            </Pressable>
          </View>

          {/* Stock list */}
          <View style={{ gap: 12, marginBottom: 16 }}>
            {STOCKS.map((s) => {
              const percent = pct(s.current, s.capacity);
              return (
                <View key={s.id} style={{ backgroundColor: "#fff", borderRadius: 12, padding: 14, borderWidth: 1, borderColor: "#eef2f7" }}>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "700", fontSize: 15 }}>{s.name}</Text>
                      <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>Batch: {s.batch} • Expiry: {s.expiry}</Text>
                    </View>

                    <View style={{ marginLeft: 12, alignItems: "flex-end" }}>
                      <View style={{
                        backgroundColor: s.low ? "#ffedd5" : "#eef2ff",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderRadius: 12,
                        borderWidth: 1,
                        borderColor: s.low ? "#f97316" : "#dbeafe",
                      }}>
                        <Text style={{ color: s.low ? "#b45309" : "#1e3a8a", fontWeight: "700" }}>{s.current}/{s.capacity}</Text>
                      </View>
                    </View>
                  </View>

                  {/* progress bar */}
                  <View style={{ height: 18, backgroundColor: "#f3f4f6", borderRadius: 999, marginTop: 12, overflow: "hidden" }}>
                    <View style={{ width: `${percent}%`, height: "100%", backgroundColor: "#0f172a" }} />
                    {/* the remaining is naturally the background */}
                  </View>

                  {/* note + details link */}
                  <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                      {s.low ? (
                        <Text style={{ color: "#f97316", fontSize: 12 }}>⚠️ {s.note}</Text>
                      ) : (
                        <Text style={{ color: "#10b981", fontSize: 12 }}>✓ {s.note}</Text>
                      )}
                    </View>

                    <Pressable style={{ paddingHorizontal: 8, paddingVertical: 6 }}>
                      <Text style={{ color: "#0f172a", fontWeight: "700" }}>👁 Details</Text>
                    </Pressable>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Compliance box */}
          <View style={{ backgroundColor: "#eef6ff", borderRadius: 12, padding: 16, borderWidth: 1, borderColor: "#dbeffd", marginBottom: 40 }}>
            <Text style={{ fontWeight: "700", marginBottom: 8 }}>UCPMP Compliance</Text>
            <View style={{ marginTop: 6 }}>
              <RowItem text="Digital logging enabled" />
              <RowItem text="Batch tracking active" />
              <RowItem text="HCP acknowledgment mandatory" />
              <RowItem text="Within monthly distribution limits" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- small helpers ---------- */
function pct(cur: number, cap: number) {
  return Math.max(0, Math.min(100, Math.round((cur / cap) * 100)));
}

function RowItem({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginVertical: 6 }}>
      <View style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: "#d1fae5", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ color: "#059669", fontWeight: "700" }}>✓</Text>
      </View>
      <Text style={{ color: "#0f172a" }}>{text}</Text>
    </View>
  );
}
