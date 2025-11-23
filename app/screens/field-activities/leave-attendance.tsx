import LeaveDetailsModal, { LeaveDetail } from "@/components/LeaveDetailModal";
import LeaveModal from "@/components/LeaveModal";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { JSX, useMemo, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/* ---------- Types ---------- */
type LeaveType = {
  key: string;
  label: string;
  used: number;
  total: number;
};

const LEAVE_TYPES: LeaveType[] = [
  { key: "casual", label: "Casual Leave", used: 3, total: 15 },
  { key: "sick", label: "Sick Leave", used: 2, total: 10 },
  { key: "earned", label: "Earned Leave", used: 5, total: 20 },
  { key: "compOff", label: "Compensatory Off", used: 3, total: 5 },
];

type LeaveStatus = "Pending" | "Approved";

type LeaveRequest = {
  id: string;
  type: string;
  date: string;
  days: string;
  status: LeaveStatus;
};

const LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: "1",
    type: "Casual Leave",
    date: "Nov 10, 2025",
    days: "1 day",
    status: "Pending",
  },
  {
    id: "2",
    type: "Sick Leave",
    date: "Nov 3–4, 2025",
    days: "2 days",
    status: "Approved",
  },
  {
    id: "3",
    type: "Earned Leave",
    date: "Oct 21–23, 2025",
    days: "3 days",
    status: "Approved",
  },
  {
    id: "4",
    type: "Compensatory Off",
    date: "Oct 5, 2025",
    days: "1 day",
    status: "Approved",
  },
];

export default function LeaveAttendence(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"Pending" | "Approved" | "All">("Pending");

  const [leaveModal, setLeaveModal] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveDetail | null>(null);

  /* ---------- Prepare Data ---------- */
  const filteredRequests = useMemo(() => {
    if (activeTab === "All") return LEAVE_REQUESTS;
    return LEAVE_REQUESTS.filter((r) => r.status === activeTab);
  }, [activeTab]);

  const pendingCount = LEAVE_REQUESTS.filter((r) => r.status === "Pending").length;
  const approvedCount = LEAVE_REQUESTS.filter((r) => r.status === "Approved").length;

  /* ---------- Convert to LeaveDetail ---------- */
  function openDetails(l: LeaveRequest) {
    const detail: LeaveDetail = {
      id: l.id,
      type: l.type,
      fromDate: l.date.includes("–") ? l.date.split("–")[0].trim() : l.date,
      toDate: l.date.includes("–") ? l.date.split("–")[1].trim() : l.date,
      totalDays: Number(l.days.replace(/\D/g, "")) || 1,
      appliedOn: "Oct 27, 2025",
      reason: "Medical emergency - Fever and body ache",
      status: l.status,
      approvedOn: l.status === "Approved" ? "Oct 27, 2025" : undefined,
    };

    setSelectedLeave(detail);
    setDetailsModalVisible(true);
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* GREEN APP HEADER */}
      <View style={styles.appHeader}>
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/(tabs)",
              params: { openDrawer: "1" },
            } as any)
          }
          style={{ marginRight: 10 }}
        >
          <Ionicons name="chevron-back" size={20} color="#ffffff" />
        </TouchableOpacity>

        <View style={{ flex: 1 }}>
          <Text style={styles.appHeaderTitle}>LUPIN CRM</Text>
          <Text style={styles.appHeaderSubtitle}>Field Force Management</Text>
        </View>

        <Ionicons name="menu" size={20} color="#ffffff" />
      </View>

      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Leave & Attendance</Text>

          <Pressable style={styles.applyBtn} onPress={() => setLeaveModal(true)}>
            <Ionicons name="add" size={16} color="#ffffff" />
            <Text style={styles.applyBtnText}>Apply Leave</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* --- Today's Attendance Card --- */}
          <View style={styles.attendanceCard}>
            <View style={styles.cardHeaderRow}>
              <View>
                <Text style={styles.cardTitle}>Today&apos;s Attendance</Text>
                <Text style={styles.cardSubtitle}>Friday, November 7, 2025</Text>
              </View>

              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: "#dcfce7",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Ionicons name="calendar-outline" size={18} color="#16a34a" />
              </View>
            </View>

            <View style={styles.checkInRow}>
              <View style={{ flex: 3 }}>
                <Text style={styles.checkInLabel}>Check-in</Text>
                <Text style={styles.checkInTime}>08:45 AM</Text>
              </View>

              <View style={{ flex: 1, alignItems: "flex-start" }}>
                <Text style={styles.checkInLabel}>Status</Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusPillText}>On Time</Text>
                </View>
              </View>
            </View>

            <Pressable style={styles.checkoutRow}>
              <Text style={styles.checkoutText}>Check Out</Text>
            </Pressable>
          </View>

          {/* --- Leave Balance --- */}
          <View style={styles.balanceCard}>
            <Text style={styles.cardTitle}>Leave Balance</Text>

            {LEAVE_TYPES.map((leave) => {
              const used = leave.used;
              const total = leave.total;
              const remaining = total - used;
              const percentUsed = used / total;

              return (
                <View key={leave.key} style={{ marginTop: 14 }}>
                  <View style={styles.balanceTopRow}>
                    <Text style={styles.balanceLabel}>{leave.label}</Text>
                    <Text style={styles.balanceRightText}>
                      {remaining} of {total} available
                    </Text>
                  </View>

                  <View style={styles.progressTrack}>
                    <View
                      style={[styles.progressFill, { width: `${percentUsed * 100}%` }]}
                    />
                  </View>

                  <Text style={styles.balanceUsedText}>{used} days used this year</Text>
                </View>
              );
            })}
          </View>

          {/* --- Tabs --- */}
          <View style={styles.segmentContainer}>
            <SegmentTab
              label={`Pending (${pendingCount})`}
              active={activeTab === "Pending"}
              onPress={() => setActiveTab("Pending")}
            />
            <SegmentTab
              label={`Approved (${approvedCount})`}
              active={activeTab === "Approved"}
              onPress={() => setActiveTab("Approved")}
            />
            <SegmentTab
              label={`All (${LEAVE_REQUESTS.length})`}
              active={activeTab === "All"}
              onPress={() => setActiveTab("All")}
            />
          </View>

          {/* --- Leave Cards --- */}
          {filteredRequests.map((req) => (
            <LeaveRequestCard key={req.id} req={req} onView={() => openDetails(req)} />
          ))}

          {/* --- Monthly Stats --- */}
          <View style={styles.monthCard}>
            <Text style={styles.monthTitle}>This Month - November 2025</Text>

            <View style={styles.monthGrid}>
              <MonthStatTile title="Present Days" value="18" valueColor="#16a34a" />
              <MonthStatTile title="Attendance Rate" value="92%" valueColor="#111827" />
              <MonthStatTile title="On Time" value="16" valueColor="#16a34a" />
              <MonthStatTile title="Late Check-ins" value="2" valueColor="#f97316" />
            </View>
          </View>

          <View style={{ height: 24 }} />

          {/* --- APPLY LEAVE MODAL --- */}
          <LeaveModal
            visible={leaveModal}
            onClose={() => setLeaveModal(false)}
            onSubmit={(data) => {
              console.log("Leave submitted:", data);
              setLeaveModal(false);
            }}
          />

          {/* --- DETAILS MODAL --- */}
          <LeaveDetailsModal
            visible={detailsModalVisible}
            onClose={() => setDetailsModalVisible(false)}
            leave={selectedLeave}
            onCancel={(id) => {
              console.log("Cancel leave:", id);
              setDetailsModalVisible(false);
            }}
            onEdit={(leave) => {
              console.log("Edit leave:", leave);
              setDetailsModalVisible(false);
            }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Components ---------- */

function SegmentTab({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.segmentTab, active && styles.segmentTabActive]}
    >
      <Text style={[styles.segmentLabel, active && styles.segmentLabelActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function LeaveRequestCard({
  req,
  onView,
}: {
  req: LeaveRequest;
  onView: () => void;
}) {
  const isPending = req.status === "Pending";

  return (
    <View style={styles.leaveCard}>
      <View style={styles.leaveTopRow}>
        <View>
          <Text style={styles.leaveType}>{req.type}</Text>
          <Text style={styles.leaveDate}>{req.date}</Text>
          <Text style={styles.leaveDays}>{req.days}</Text>
        </View>

        <View style={{ alignItems: "flex-end" }}>
          <View
            style={[
              styles.leaveStatusPill,
              isPending ? styles.leaveStatusPending : styles.leaveStatusApproved,
            ]}
          >
            <Ionicons
              name={isPending ? "time-outline" : "checkmark-circle-outline"}
              size={13}
              color={isPending ? "#111827" : "#ffffff"}
              style={{ marginRight: 4 }}
            />
            <Text
              style={[
                styles.leaveStatusText,
                isPending && { color: "#111827" },
              ]}
            >
              {req.status}
            </Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.viewDetailsRow} onPress={onView}>
        <Ionicons name="eye-outline" size={16} color="#6b7280" />
        <Text style={styles.viewDetailsText}>View Details</Text>
      </Pressable>
    </View>
  );
}

function MonthStatTile({
  title,
  value,
  valueColor,
}: {
  title: string;
  value: string;
  valueColor: string;
}) {
  return (
    <View style={styles.monthTile}>
      <Text style={styles.monthTileTitle}>{title}</Text>
      <Text style={[styles.monthTileValue, { color: valueColor }]}>{value}</Text>
    </View>
  );
}

/* ---------- Styles ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },

  appHeader: {
    backgroundColor: "#188838",
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  appHeaderTitle: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
  appHeaderSubtitle: {
    color: "#f0fff0",
    fontSize: 9,
    marginTop: 2,
  },

  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },

  headerRow: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  applyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#020617",
  },
  applyBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },

  attendanceCard: {
    backgroundColor: "#ecfdf3",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },
  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  cardSubtitle: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
  },
  checkInRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcfce7",
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  checkInLabel: {
    fontSize: 12,
    color: "#6b7280",
  },
  checkInTime: {
    fontSize: 20,
    fontWeight: "800",
    color: "#16a34a",
    marginTop: 4,
  },

  statusPill: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#16a34a",
  },
  statusPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
  },

  checkoutRow: {
    marginTop: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    alignItems: "center",
  },
  checkoutText: {
    fontSize: 12,
    color: "#111827",
    fontWeight: "600",
  },

  balanceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
  },

  balanceTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#111827",
  },
  balanceRightText: {
    fontSize: 11,
    color: "#6b7280",
  },

  progressTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#020617",
  },
  balanceUsedText: {
    fontSize: 11,
    color: "#6b7280",
    marginTop: 4,
  },

  segmentContainer: {
    flexDirection: "row",
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    padding: 3,
    marginTop: 10,
    marginBottom: 10,
  },
  segmentTab: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  segmentTabActive: {
    backgroundColor: "#ffffff",
  },
  segmentLabel: {
    fontSize: 12,
    color: "#4b5563",
    fontWeight: "600",
  },
  segmentLabelActive: {
    color: "#111827",
    fontWeight: "700",
  },

  leaveCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 0,
  },
  leaveTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  leaveType: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },
  leaveDate: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  leaveDays: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 2,
    marginBottom: 8,
  },

  leaveStatusPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  leaveStatusPending: {
    backgroundColor: "#f9fafb",
    borderColor: "#d1d5db",
  },
  leaveStatusApproved: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },

  leaveStatusText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#ffffff",
  },

  viewDetailsRow: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },

  monthCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginTop: 6,
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  monthTile: {
    flexBasis: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },
  monthTileTitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  monthTileValue: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 4,
  },
});
