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
type Leave = {
  id: string;
  type: string;
  date: string;
  days: string;
  status: "Pending" | "Approved";
};

const LEAVES: Leave[] = [
  { id: "1", type: "Casual Leave", date: "Nov 10, 2025", days: "1 day", status: "Pending" },
  { id: "2", type: "Sick Leave", date: "Oct 2, 2025", days: "2 days", status: "Approved" },
];

/* ---------- Helpers ---------- */
/** returns container width & layout breakpoint flags */
function useResponsiveWidths() {
  const { width } = useWindowDimensions();

  // breakpoints you can tune
  const PHONE_MAX = 1000;  // phone cap
  const TABLET_MAX = 1400; // tablet cap
  const DESKTOP_MAX = 1800; // large screens cap

  // determine "mode"
  const isTablet = width >= 768 && width < 1200; // you can tune
  const isLaptop = width >= 1200;

  // compute effective container width (centered)
  let container = Math.min(width - 32, PHONE_MAX); // default padding 16 both sides
  if (isTablet) container = Math.min(width - 64, TABLET_MAX);
  if (isLaptop) container = Math.min(width - 160, DESKTOP_MAX);

  return { width, container, isTablet, isLaptop };
}

/* ---------- App ---------- */
export default function LeaveAttendence(): JSX.Element {
  const { width, container, isTablet, isLaptop } = useResponsiveWidths();

  // data
  const checkIn = "08:45 AM";
  const leaveBalance = {
    casual: { used: 3, available: 12, total: 15 },
    sick: { used: 2, available: 8, total: 10 },
    earned: { used: 5, available: 15, total: 20 },
    comp: { used: 3, available: 2, total: 5 },
  };

  // layout flags used inside render
  const twoColumnStats = isTablet || isLaptop; // show side-by-side
  const twoColumnAttendance = isTablet || isLaptop;

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        {/* CENTERED CONTAINER — width driven by JS fallback but still uses NativeWind classes */}
        <View style={{ width: container, alignSelf: "center" }} className="px-2">
          {/* HEADER */}
          <View className="flex-row justify-between items-center mb-4 px-1">
            <Text className="text-2xl font-extrabold text-slate-900">Leave & Attendance</Text>
            <Pressable className="bg-slate-900 px-3 py-2 rounded-md">
              <Text className="text-white font-semibold">+ Apply Leave</Text>
            </Pressable>
          </View>

          {/* ATTENDANCE CARD */}
          <View className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6 relative">
            <View className="mb-2">
              <Text className="font-semibold text-slate-800">Today's Attendance</Text>
              <Text className="text-slate-500 text-sm">Friday, November 7, 2025</Text>
            </View>

            {/* when wide, place side-by-side; otherwise stack */}
            <View style={{ flexDirection: twoColumnAttendance ? "row" : "column", gap: 16 }}>
              <View style={{ flex: 1 }} className="bg-white rounded-md p-3 border border-slate-100">
                <Text className="text-slate-500 text-xs">Check-in</Text>
                <Text className="text-lg font-extrabold text-emerald-600 mt-2">{checkIn}</Text>
              </View>

              <View style={{ width: twoColumnAttendance ? 160 : "100%" }} className="bg-white rounded-md p-3 border border-slate-100">
                <Text className="text-slate-500 text-xs">Status</Text>
                <View className="mt-2">
                  <View className="bg-emerald-600 px-2 py-1 rounded-full self-start">
                    <Text className="text-white font-semibold text-xs">On Time</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable className="bg-white mt-4 rounded-md p-3 border border-slate-100 items-center">
              <Text className="font-semibold text-slate-700">Check Out</Text>
            </Pressable>

            <Text className="absolute right-4 top-4 text-2xl text-emerald-600">🗓️</Text>
          </View>

          {/* LEAVE BALANCE */}
          <View className="bg-white rounded-xl border border-slate-100 p-4 mb-6">
            <Text className="font-semibold mb-4">Leave Balance</Text>
            <LeaveBar label="Casual Leave" used={leaveBalance.casual.used} total={leaveBalance.casual.total} rightLabel={`${leaveBalance.casual.available} of ${leaveBalance.casual.total} available`} note={`${leaveBalance.casual.used} days used this year`} />
            <LeaveBar label="Sick Leave" used={leaveBalance.sick.used} total={leaveBalance.sick.total} rightLabel={`${leaveBalance.sick.available} of ${leaveBalance.sick.total} available`} note={`${leaveBalance.sick.used} days used this year`} />
            <LeaveBar label="Earned Leave" used={leaveBalance.earned.used} total={leaveBalance.earned.total} rightLabel={`${leaveBalance.earned.available} of ${leaveBalance.earned.total} available`} note={`${leaveBalance.earned.used} days used this year`} />
            <LeaveBar label="Compensatory Off" used={leaveBalance.comp.used} total={leaveBalance.comp.total} rightLabel={`${leaveBalance.comp.available} of ${leaveBalance.comp.total} available`} note={`${leaveBalance.comp.used} days used this year`} />
          </View>

          {/* TABS */}
          <View className="flex-row bg-slate-100 rounded-full p-1 mb-6">
            <Pressable className="flex-1 bg-white rounded-full py-2 items-center"><Text className="font-semibold">Pending (1)</Text></Pressable>
            <Pressable className="flex-1 py-2 items-center"><Text>Approved (3)</Text></Pressable>
            <Pressable className="flex-1 py-2 items-center"><Text>All (4)</Text></Pressable>
          </View>

          {/* LEAVE LIST (simple cards) */}
          <View className="space-y-4 mb-6">
            {LEAVES.map((l) => (
              <View key={l.id} className="bg-white rounded-xl border border-slate-100 p-4">
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View>
                    <Text className="font-semibold">{l.type}</Text>
                    <Text className="text-slate-500 text-sm mt-2">{l.date}</Text>
                    <Text className="text-slate-500 text-sm mt-1">{l.days}</Text>
                  </View>

                  <View className="items-end">
                    <View className="bg-violet-50 border border-violet-100 px-3 py-1 rounded-full">
                      <Text className="text-violet-700 font-semibold text-xs">{l.status}</Text>
                    </View>
                  </View>
                </View>

                <View className="mt-4">
                  <View className="h-2 bg-slate-100 rounded-md" />
                  <Pressable className="mt-3 bg-slate-50 border border-slate-100 rounded-md py-2 items-center">
                    <Text className="font-semibold">👁  View Details</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          {/* STATS: show two-per-row on tablet/laptop, stacked on phone */}
          <View className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-12">
            <Text className="font-semibold mb-4">This Month - November 2025</Text>

            <View style={{ flexDirection: twoColumnStats ? "row" : "column", gap: 12 }}>
              <StatBox title="Present Days" value="18" />
              <StatBox title="Attendance Rate" value="92%" />
            </View>

            <View style={{ height: 12 }} />

            <View style={{ flexDirection: twoColumnStats ? "row" : "column", gap: 12 }}>
              <StatBox title="On Time" value="16" />
              <StatBox title="Late Check-ins" value="2" highlight />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Small components ---------- */
function LeaveBar({ label, used, total, rightLabel, note }: { label: string; used: number; total: number; rightLabel: string; note: string; }) {
  const filled = Math.min(1, used / total);
  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-medium">{label}</Text>
        <Text className="text-sm text-slate-600">{rightLabel}</Text>
      </View>

      <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <View style={{ width: `${filled * 100}%` }} className="h-full bg-slate-900" />
      </View>

      <Text className="text-slate-500 text-xs mt-2">{note}</Text>
    </View>
  );
}

function StatBox({ title, value, highlight = false }: { title: string; value: string; highlight?: boolean }) {
  return (
    <View className="flex-1 bg-white rounded-md p-3 border border-slate-100 mb-3">
      <Text className="text-slate-500 text-xs">{title}</Text>
      <Text className={`${highlight ? "text-red-500" : "text-slate-900"} mt-2 font-extrabold text-lg`}>{value}</Text>
    </View>
  );
}
