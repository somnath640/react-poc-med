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

/* ---------- Types & Data ---------- */
type Expense = {
  id: string;
  title: string;
  amount: number;
  type: string;
  date: string;
  location: string;
  status: "Pending" | "Approved";
};

const EXPENSES: Expense[] = [
  { id: "1", title: "Hospital Visit", amount: 1050, type: "TA/DA", date: "Nov 3, 2025", location: "Breach Candy Hospital", status: "Pending" },
  { id: "2", title: "Outstation Call", amount: 2500, type: "Other", date: "Nov 2, 2025", location: "Pune", status: "Pending" },
];

/* ---------- Responsive helper ---------- */
function useResponsive() {
  const { width } = useWindowDimensions();

  // breakpoints (tweak these numbers if you prefer)
  const PHONE_BREAK = 0;
  const TABLET_BREAK = 768;
  const LAPTOP_BREAK = 1200;

  const isPhone = width < TABLET_BREAK;
  const isTablet = width >= TABLET_BREAK && width < LAPTOP_BREAK;
  const isLaptop = width >= LAPTOP_BREAK;

  // container width calculation (centered)
  // leave some side padding on larger screens
  let container = Math.min(width - 32, 1000); // default phone-cap
  if (isTablet) container = Math.min(width - 64, 1400);
  if (isLaptop) container = Math.min(width - 160, 1800);

  return { width, container, isPhone, isTablet, isLaptop };
}

/* ---------- App ---------- */
export default function ExpenseManagement(): JSX.Element {
  const { container, isPhone, isTablet, isLaptop } = useResponsive();

  const monthlyEligibility = 25000;
  const claimed = 18450;
  const pending = 3250;
  const remaining = monthlyEligibility - claimed - pending;
  const progress = Math.min(1, (claimed + pending) / monthlyEligibility);

  // layout flags
  const summaryHorizontal = !isPhone; // row on tablet+; stacked on phone
  const statsTwoCol = !isPhone;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {/* Centered container — width driven by JS */}
        <View style={{ width: container, alignSelf: "center", paddingHorizontal: 8 }}>

          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: "800", color: "#0f172a" }}>Expense Management</Text>
            <Pressable style={{ backgroundColor: "#0f172a", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 }}>
              <Text style={{ color: "#fff", fontWeight: "700" }}>+ Add Expense</Text>
            </Pressable>
          </View>

          {/* Eligibility Card */}
          <View style={{ backgroundColor: "#faf5ff", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#efe9fb" }}>
            <Text style={{ color: "#6b7280" }}>Monthly Eligibility - November 2025</Text>
            <Text style={{ fontSize: 28, fontWeight: "800", marginTop: 6 }}>₹{monthlyEligibility.toLocaleString()}</Text>

            {/* Progress track */}
            <View style={{ height: 10, backgroundColor: "#e6e9ef", borderRadius: 999, marginTop: 12, flexDirection: "row", overflow: "hidden" }}>
              <View style={{ flex: progress, backgroundColor: "#0f172a" }} />
              <View style={{ flex: 1 - progress }} />
            </View>

            {/* Summary row (row on tablet/laptop, stacked on phone) */}
            <View style={{ flexDirection: summaryHorizontal ? "row" : "column", marginTop: 14 }}>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f1f5f9", marginRight: summaryHorizontal ? 8 : 0, marginBottom: summaryHorizontal ? 0 : 8 }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Claimed</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#10b981", marginTop: 8 }}>₹{claimed.toLocaleString()}</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f1f5f9", marginRight: summaryHorizontal ? 8 : 0, marginBottom: summaryHorizontal ? 0 : 8 }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Pending</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#ef4444", marginTop: 8 }}>₹{pending.toLocaleString()}</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f1f5f9" }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Remaining</Text>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#0ea5e9", marginTop: 8 }}>₹{remaining.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          {/* This Month Card */}
          <View style={{ backgroundColor: "#ecfdf5", borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: "#dff7ea", position: "relative" }}>
            <Text style={{ fontWeight: "700", color: "#0f172a" }}>This Month's Expenses</Text>
            <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 8 }}>₹18,450</Text>

            <View style={{ flexDirection: summaryHorizontal ? "row" : "column", marginTop: 14 }}>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f1f5f9", marginRight: summaryHorizontal ? 8 : 0, marginBottom: summaryHorizontal ? 0 : 8 }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>TA/DA</Text>
                <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 8 }}>₹12,200</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f1f5f9" }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Other</Text>
                <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 8 }}>₹6,250</Text>
              </View>
            </View>

            <Text style={{ position: "absolute", right: 16, top: 12, fontSize: 28, fontWeight: "800", color: "#10b981" }}>₹</Text>
          </View>

          {/* Policy box */}
          <View style={{ backgroundColor: "#ecfeff", borderRadius: 12, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: "#e6f6f8" }}>
            <Text style={{ fontWeight: "700", marginBottom: 8 }}>Expense Policy Guidelines</Text>
            <Text style={{ color: "#374151", lineHeight: 20 }}>
              • TA auto-calculated based on geographical zone{"\n"}
              • DA varies by station type: Local (₹450), Next Station (₹600), Outstation (₹750){"\n"}
              • Other expenses require prior approval for outstation/next-station calls
            </Text>
          </View>

          {/* Tabs */}
          <View style={{ flexDirection: "row", backgroundColor: "#f3f4f6", borderRadius: 999, padding: 4, marginBottom: 16 }}>
            <Pressable style={{ flex: 1, backgroundColor: "#fff", borderRadius: 999, paddingVertical: 10, alignItems: "center" }}>
              <Text style={{ fontWeight: "700" }}>Pending (2)</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>Approved (2)</Text>
            </Pressable>
            <Pressable style={{ flex: 1, paddingVertical: 10, alignItems: "center" }}>
              <Text>All (4)</Text>
            </Pressable>
          </View>

          {/* Expense list */}
          <View style={{ gap: 12, marginBottom: 16 }}>
            {EXPENSES.map((e) => (
              <View key={e.id} style={{ backgroundColor: "#fff", borderRadius: 12, padding: 12, borderWidth: 1, borderColor: "#eef2f7", flexDirection: isPhone ? "column" : "row", alignItems: "flex-start" }}>
                <View style={{ width: isPhone ? "100%" : 96, marginBottom: isPhone ? 8 : 0 }}>
                  <Text style={{ fontWeight: "800" }}>₹{e.amount}</Text>
                  <View style={{ marginTop: 8, alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: "#e6e6e6" }}>
                    <Text style={{ fontSize: 12 }}>{e.type}</Text>
                  </View>
                </View>

                <View style={{ flex: 1, paddingHorizontal: isPhone ? 0 : 12 }}>
                  <Text style={{ fontWeight: "700", fontSize: 15 }}>{e.title}</Text>
                  <Text style={{ color: "#6b7280", marginTop: 6 }}>{e.date} • {e.location}</Text>

                  <View style={{ marginTop: 12 }}>
                    <View style={{ height: 10, backgroundColor: "#f3f4f6", borderRadius: 6 }} />
                    <Pressable style={{ marginTop: 10, alignSelf: "stretch", backgroundColor: "#f1f5f9", borderRadius: 8, paddingVertical: 10, alignItems: "center" }}>
                      <Text style={{ fontWeight: "700" }}>👁  View Details</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={{ width: isPhone ? "100%" : 96, alignItems: "flex-end", marginTop: isPhone ? 12 : 0 }}>
                  <View style={{ backgroundColor: "#f5f3ff", borderWidth: 1, borderColor: "#efe9ff", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 }}>
                    <Text style={{ color: "#5b21b6", fontWeight: "700", fontSize: 12 }}>{e.status}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Stats card */}
          <View style={{ backgroundColor: "#eaf6ff", borderRadius: 12, padding: 14, marginBottom: 40, borderWidth: 1, borderColor: "#dbeffd" }}>
            <Text style={{ fontWeight: "700", marginBottom: 12 }}>November 2025 Statistics</Text>

            <View style={{ flexDirection: statsTwoCol ? "row" : "column", gap: 12 }}>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f3f7fb", marginRight: statsTwoCol ? 8 : 0 }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Total Expenses</Text>
                <Text style={{ fontWeight: "800", fontSize: 18, marginTop: 8 }}>₹18,450</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f3f7fb" }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Avg per Day</Text>
                <Text style={{ fontWeight: "800", fontSize: 18, marginTop: 8 }}>₹842</Text>
              </View>
            </View>

            <View style={{ height: 12 }} />

            <View style={{ flexDirection: statsTwoCol ? "row" : "column", gap: 12 }}>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f3f7fb", marginRight: statsTwoCol ? 8 : 0 }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>TA/DA Claims</Text>
                <Text style={{ fontWeight: "800", fontSize: 18, marginTop: 8 }}>8</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: "#fff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#f3f7fb" }}>
                <Text style={{ color: "#6b7280", fontSize: 12 }}>Other Expenses</Text>
                <Text style={{ fontWeight: "800", fontSize: 18, marginTop: 8 }}>4</Text>
              </View>
            </View>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
