import RequestSamplesModal from "@/components/RequestSamplesModal";
import RestockModal from "@/components/RestockModal";
import StockDetailsModal from "@/components/StockDetailsModal";
import COLORS from "@/constants/LupinColors";
import { Stack } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions
} from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit?: (payload: any) => void;
  };

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

const DISTRIBUTIONS = [
  { id: "d1", doctor: "Dr. Sharma", product: "Acemiz Plus Tablet", date: "Nov 3, 2025", units: 10, ack: true },
  { id: "d2", doctor: "Dr. Patel", product: "Clopitab-CV Gold Capsule", date: "Nov 2, 2025", units: 5, ack: true },
  { id: "d3", doctor: "Dr. Mehta", product: "Acemiz Plus Tablet", date: "Nov 1, 2025", units: 12, ack: true },
  { id: "d4", doctor: "Dr. Kumar", product: "Telmisartan (40mg)", date: "Oct 31, 2025", units: 8, ack: true },
];

const NEAR_EXPIRY = [
  {
    id: "n1",
    name: "Clopitab-CV Gold Capsule",
    batch: "CLO2024B",
    expiry: "Jan 2025",
    daysRemaining: 51,
    qty: 12,
    severity: "urgent" as const,
  },
  {
    id: "n2",
    name: "Telmisartan (40mg)",
    batch: "TEL2024C",
    expiry: "Feb 2025",
    daysRemaining: 82,
    qty: 8,
    severity: "warning" as const,
  },
];

/* Replace tab sample items (two items) */
const REPLACE_ITEMS = [
  {
    id: "r1",
    name: "Clopitab-CV Gold Capsule",
    batch: "CLO2024B",
    expiry: "Jan 2025",
    current: 12,
    distributed: 18,
    reason: "High distribution rate",
    aiRecommendation: "Request 30 units",
    severity: "low-on-stock" as const,
  },
  {
    id: "r2",
    name: "Telmisartan (40mg)",
    batch: "TEL2024C",
    expiry: "Feb 2025",
    current: 8,
    distributed: 17,
    reason: "Low stock + Near expiry",
    aiRecommendation: "Request 25 units urgently",
    severity: "critical" as const,
  },
];

/* ---------------- responsive helper ---------------- */
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

/* ---------------- main app ---------------- */
export default function SampleTracking({ visible, onClose, onSubmit }: Props) {
  const { container, isTablet, isLaptop } = useResponsiveContainer();
  const [modalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState<StockItem | null>(null);
  const [restockVisible, setRestockVisible] = useState(false);
  const [restockInitialProductId, setRestockInitialProductId] = useState<string | undefined>(undefined);
  const [requestVisible, setRequestVisible] = useState(false);


  // Tab state
  const [tab, setTab] = useState<"stock" | "distribution" | "nearExpiry" | "replace">("stock");

  function openDetails(item: StockItem | null) {
    if (!item) return;
    setSelected(item);
    setModalVisible(true);
  }

  function closeDetails() {
    setModalVisible(false);
    setSelected(null);
  }
  function openRestockForProduct(productId?: string) {
    setRestockInitialProductId(productId);
    setRestockVisible(true);
  }

  function handleRestockSubmit(payload: { productId: string; quantity: number; reason: string }) {
    // hook into API or state update here
    console.log("Restock request:", payload);
    // Example: show toast / send request / update state
  }
  const productOptions = STOCKS.map((s) => ({
    id: s.id,
    label: `${s.name} (Stock: ${s.current}${s.low ? " - Low" : ""})`,
  }));
  

  const totalStock = STOCKS.reduce((s, it) => s + it.current, 0);
  const distributed = DISTRIBUTIONS.reduce((s, it) => s + it.units, 0);
  const lowStockCount = STOCKS.filter((s) => s.low).length;

  // local path to uploaded replace-banner image (environment will convert to usable url)
  const REPLACE_BANNER_IMG = "/mnt/data/f296c7e3-2d24-4d55-b588-c9ca1d617ffa.png";

  const pct = (cur: number, cap: number) => Math.round((cur / cap) * 100);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <Stack.Screen
  options={{
    title: "Chemist Visit",
    headerStyle: { backgroundColor: COLORS.brand.lupinGreen },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
  }}
/>
      <ScrollView contentContainerStyle={{ paddingVertical: 18, paddingBottom: 80,  }}>
        <View style={{ width: container, alignSelf: "center", paddingHorizontal: 8 }}>
          
          {/* Header */}

        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <Text style={{ fontSize: 22, fontWeight: "700", color: "#0f172a" }}>Sample Tracking</Text>
            <Pressable onPress={() => setRestockVisible(true)} style={{ backgroundColor: "#0f172a", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>+ Request</Text>
            </Pressable>
          </View>
          {/* AI Forecast banner */}
          <View style={{
            backgroundColor: "#0ea5e9",
            borderRadius: 10,
            padding: 14,
            marginBottom: 12,
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
            <Pressable
              onPress={() => setTab("stock")}
              style={{ flex: 1, borderRadius: 999, paddingVertical: 10, alignItems: "center", backgroundColor: tab === "stock" ? "#fff" : "transparent" }}
            >
              <Text style={{ fontWeight: tab === "stock" ? "700" : "500" }}>Stock</Text>
            </Pressable>

            <Pressable
              onPress={() => setTab("distribution")}
              style={{ flex: 1, borderRadius: 999, paddingVertical: 10, alignItems: "center", backgroundColor: tab === "distribution" ? "#fff" : "transparent" }}
            >
              <Text style={{ fontWeight: tab === "distribution" ? "700" : "500" }}>Distribution</Text>
            </Pressable>

            <Pressable
              onPress={() => setTab("nearExpiry")}
              style={{ flex: 1, borderRadius: 999, paddingVertical: 10, alignItems: "center", backgroundColor: tab === "nearExpiry" ? "#fff" : "transparent" }}
            >
              <Text style={{ fontWeight: tab === "nearExpiry" ? "700" : "500" }}>Near Expiry</Text>
            </Pressable>

            <Pressable
              onPress={() => setTab("replace")}
              style={{ flex: 1, borderRadius: 999, paddingVertical: 10, alignItems: "center", backgroundColor: tab === "replace" ? "#fff" : "transparent" }}
            >
              <Text style={{ fontWeight: tab === "replace" ? "700" : "500" }}>Replace</Text>
            </Pressable>
          </View>

          {/* Content: show stock, distribution, nearExpiry, or replace */}
          {tab === "stock" ? (
            <>
              {/* Stock list — unchanged */}
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

                      {/* thin progress bar */}
                      <View style={{ marginTop: 12 }}>
                        <View style={{
                          height: 8,
                          backgroundColor: "#f3f4f6",
                          borderRadius: 999,
                          overflow: "hidden",
                        }}>
                          <View style={{ width: `${percent}%`, height: "100%", backgroundColor: "#0f172a" }} />
                        </View>
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
                          <Text onPress={() => openDetails(s)} style={{ color: "#0f172a", fontWeight: "700" }}>👁 Details</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          ) : tab === "distribution" ? (
            <>
              {/* Distribution UI — unchanged */}
              <View style={{ backgroundColor: "#ecf4ff", borderRadius: 8, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#dbeeff", flexDirection: "column" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <Text style={{ fontWeight: "700", color: "#0f172a" }}>This Month's Distribution</Text>
                  <Image source={{ uri: "/mnt/data/0b1c7ec4-1c30-4751-b258-21ce94fc1a76.png" }} style={{ width: 34, height: 34, borderRadius: 6 }} />
                </View>

                <View style={{ flexDirection: isTablet || isLaptop ? "row" : "column", gap: 10 }}>
                  <View style={{ flex: 1, backgroundColor: "#fff", padding: 14, borderRadius: 6, borderWidth: 1, borderColor: "#edf6ff", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>{distributed}</Text>
                    <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>Units</Text>
                  </View>

                  <View style={{ flex: 1, backgroundColor: "#fff", padding: 14, borderRadius: 6, borderWidth: 1, borderColor: "#edf6ff", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>{DISTRIBUTIONS.length}</Text>
                    <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>HCPs</Text>
                  </View>

                  <View style={{ flex: 1, backgroundColor: "#fff", padding: 14, borderRadius: 6, borderWidth: 1, borderColor: "#edf6ff", alignItems: "center" }}>
                    <Text style={{ fontSize: 18, fontWeight: "700", color: "#0f172a" }}>100%</Text>
                    <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 4 }}>Acknowledged</Text>
                  </View>
                </View>
              </View>

              <View style={{ gap: 12, marginBottom: 16 }}>
                {DISTRIBUTIONS.map((d) => (
                  <View key={d.id} style={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    padding: 14,
                    borderWidth: 1,
                    borderColor: "#eef2f7",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ fontWeight: "700", fontSize: 15 }}>{d.doctor}</Text>
                      <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>{d.product}</Text>
                      <Text style={{ color: "#9ca3af", fontSize: 11, marginTop: 8 }}>{d.date}</Text>

                      <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                        <View style={{ width: 18, height: 18, borderRadius: 18, backgroundColor: "#d1fae5", alignItems: "center", justifyContent: "center", marginRight: 8 }}>
                          <Text style={{ color: "#059669", fontWeight: "700" }}>✓</Text>
                        </View>
                        <Text style={{ color: "#059669", fontSize: 12 }}>HCP Acknowledged</Text>
                      </View>
                    </View>

                    <View style={{ width: 60, alignItems: "center" }}>
                      <Text style={{ fontWeight: "700", color: "#0f172a" }}>{d.units}</Text>
                      <Text style={{ color: "#9ca3af", fontSize: 11 }}>units</Text>
                    </View>
                  </View>
                ))}
              </View>
            </>
          ) : tab === "nearExpiry" ? (
            <>
              {/* Near expiry UI — unchanged */}
              <View style={{ backgroundColor: "#fff7f0", borderRadius: 8, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#fbe8e6", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", color: "#b45309" }}>⏱ Expiring Soon</Text>
                  <Text style={{ color: "#92400e", marginTop: 8 }}>{NEAR_EXPIRY.length} products need attention before expiry</Text>
                </View>

                <Image source={{ uri: "/mnt/data/9dc624f3-1fd7-4a1c-bacd-95985dad3b12.png" }} style={{ width: 56, height: 56, borderRadius: 6, marginLeft: 12 }} />
              </View>

              <View style={{ gap: 12, marginBottom: 16 }}>
                {NEAR_EXPIRY.map((n) => {
                  const isUrgent = n.severity === "urgent";
                  return (
                    <View key={n.id} style={{
                      backgroundColor: isUrgent ? "#fff5f6" : "#fff9f0",
                      borderRadius: 8,
                      padding: 14,
                      marginBottom: 6,
                      borderWidth: 1,
                      borderColor: isUrgent ? "#f8d7da" : "#fdeecd",
                    }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15 }}>{n.name}</Text>
                            <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: isUrgent ? "#f87171" : "#fb923c" }}>
                              <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>{isUrgent ? "Urgent" : "Warning"}</Text>
                            </View>
                          </View>
                          <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>Batch: {n.batch}</Text>

                          <View style={{ marginTop: 12 }}>
                            <Text style={{ color: "#6b7280", marginBottom: 4 }}>Expiry Date:</Text>
                            <Text style={{ fontWeight: "700", color: "#111827" }}>{n.expiry}</Text>

                            {/* <View style={{ height: 8, marginTop: 12, backgroundColor: "#f3f4f6", borderRadius: 999, overflow: "hidden" }}>
                              <View style={{ width: "100%", height: "100%", backgroundColor: isUrgent ? "#f43f5e" : "#0f172a" }} />
                            </View> */}
                          </View>
                        </View>

                        <View style={{ alignItems: "flex-end", marginLeft: 12 }}>
                          <Text style={{ color: isUrgent ? "#b91c1c" : "#b45309", fontWeight: "700" }}>{n.expiry}</Text>
                          <Text style={{ color: isUrgent ? "#b91c1c" : "#b45309", marginTop: 8 }}>{n.daysRemaining} days</Text>
                          <Text style={{ color: "#111827", marginTop: 8 }}>{n.qty} units</Text>
                        </View>
                      </View>

                      <View style={{ marginTop: 12 }}>
                      <Pressable style={{
  backgroundColor: isUrgent ? "#dc2626" : "#06060a",
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: "center",
  justifyContent: "center",
}}>
  <Text style={{ color: "#fff", fontWeight: "700" }}>⚠️  Prioritize Distribution</Text>
</Pressable>

                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          ) : (
            <>
              {/* REPLACE UI */}
              {/* Banner */}
              <View style={{ backgroundColor: "#fff6f7", borderRadius: 8, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#f5d6d8", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "700", color: "#b91c1c" }}>🔁 Needs Replacement</Text>
                  <Text style={{ color: "#b91c1c", marginTop: 8 }}>{REPLACE_ITEMS.length} products require immediate restock request</Text>
                </View>

                <Image source={{ uri: REPLACE_BANNER_IMG }} style={{ width: 56, height: 56, borderRadius: 6, marginLeft: 12 }} />
              </View>

              {/* Replace cards */}
              <View style={{ gap: 12, marginBottom: 16 }}>
                {REPLACE_ITEMS.map((r) => {
                  const isCritical = r.severity === "critical";
                  const cardBg = "#fff5f6"; // pale pink
                  const borderColor = "#f5d6d8";
                  return (
                    <View key={r.id} style={{ backgroundColor: cardBg, borderRadius: 8, padding: 14, borderWidth: 1, borderColor: borderColor }}>
                      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <View style={{ flex: 1 }}>
                          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
                            <Text style={{ fontWeight: "700", fontSize: 15 }}>{r.name}</Text>
                            <View style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, backgroundColor: "#f43f5e" }}>
                              <Text style={{ color: "white", fontWeight: "700", fontSize: 12 }}>{r.severity === "critical" ? "Critical stock" : "Low on stock"}</Text>
                            </View>
                          </View>

                          <Text style={{ color: "#6b7280", fontSize: 12, marginTop: 6 }}>Batch: {r.batch}</Text>

                          <View style={{ marginTop: 12 }}>
                            <Text style={{ color: "#6b7280", marginBottom: 6 }}>Current Stock:</Text>
                            <Text style={{ fontWeight: "700" }}>{r.current} units</Text>

                            <View style={{ marginTop: 10 }}>
                              <Text style={{ color: "#6b7280", marginBottom: 6 }}>Distributed:</Text>
                              <Text style={{ fontWeight: "700" }}>{r.distributed} units</Text>
                            </View>

                            <View style={{ marginTop: 12 }}>
                              <Text style={{ color: "#6b7280", marginBottom: 6 }}>Reason:</Text>
                              <Text style={{ fontWeight: "700" }}>{r.reason}</Text>
                            </View>
                          </View>
                        </View>

                        {/* right column numbers */}
                        <View style={{ alignItems: "flex-end", marginLeft: 12 }}>
                          <Text style={{ color: "#ef4444", fontWeight: "700" }}>{r.current} units</Text>
                          <Text style={{ marginTop: 8, color: "#111827", fontWeight: "700" }}>{r.distributed} units</Text>
                          <Text style={{ marginTop: 8, color: "#6b7280" }}> {r.reason}</Text>
                        </View>
                      </View>

                      {/* AI recommendation box */}
                      <View style={{ marginTop: 12, borderRadius: 8, padding: 12, backgroundColor: "#fff", borderWidth: 1, borderColor: "#f3e6e8" }}>
                        <Text style={{ color: "#0f172a", fontWeight: "700", marginBottom: 6 }}>🔎 AI Recommendation:</Text>
                        <Text style={{ color: "#6b7280" }}>{r.aiRecommendation}</Text>
                      </View>

                      {/* Full width request restock bar (screenshot style) */}
                      <View style={{ marginTop: 12 }}>
                        <Pressable onPress={() => openRestockForProduct(r.id)} style={{ backgroundColor: "#06060a", paddingVertical: 14, borderRadius: 6, alignItems: "center", justifyContent: "center" }}>
                          <Text style={{ color: "#fff", fontWeight: "700" }}>＋ Request Restock Now</Text>
                        </Pressable>
                      </View>
                    </View>
                  );
                })}
              </View>
            </>
          )}

          {/* Compliance box (kept intact) */}
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

        {/* Modal kept in place */}
        <StockDetailsModal visible={modalVisible} item={selected} onClose={closeDetails} />
        <RestockModal
          visible={restockVisible}
          productOptions={productOptions}
          initialProductId={restockInitialProductId}
          onClose={() => setRestockVisible(false)}
          onSubmit={handleRestockSubmit}
        />
        <RequestSamplesModal
  visible={requestVisible}
  onClose={() => setRequestVisible(false)}
  onSubmit={(payload) => console.log("Request submitted", payload)}
  productOptions={productOptions}
/>

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
