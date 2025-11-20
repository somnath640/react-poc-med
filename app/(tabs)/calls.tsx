// app/screens/CallsScreen.tsx
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CallStatus = "Submitted" | "Approved";

type CallItem = {
  id: string;
  doctor: string;
  specialty: string;
  dateTime: string;
  location: string;
  duration: string;
  samples: number;
  files: number;
  status: CallStatus;
  outcome: "Positive" | "Neutral" | "Very Positive";
};

const CALLS: CallItem[] = [
  {
    id: "1",
    doctor: "Dr. Sharma",
    specialty: "Cardiologist",
    dateTime: "Nov 3, 2025 at 09:15 AM",
    location: "Breach Candy Hospital",
    duration: "45 min",
    samples: 13,
    files: 2,
    status: "Submitted",
    outcome: "Positive",
  },
  {
    id: "2",
    doctor: "Dr. Patel",
    specialty: "Diabetologist",
    dateTime: "Nov 2, 2025 at 10:30 AM",
    location: "Malabar Hill Clinic",
    duration: "30 min",
    samples: 10,
    files: 1,
    status: "Submitted",
    outcome: "Neutral",
  },
  {
    id: "3",
    doctor: "Dr. Mehta",
    specialty: "General Physician",
    dateTime: "Nov 1, 2025 at 12:00 PM",
    location: "Jaslok Hospital",
    duration: "50 min",
    samples: 15,
    files: 2,
    status: "Approved",
    outcome: "Very Positive",
  },
];

export default function CallsScreen() {
  const [activeTab, setActiveTab] = useState<"All" | "Submitted" | "Approved">("All");

  const filteredCalls = useMemo(() => {
    if (activeTab === "All") return CALLS;
    if (activeTab === "Submitted") return CALLS.filter((c) => c.status === "Submitted");
    return CALLS.filter((c) => c.status === "Approved");
  }, [activeTab]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Call Reporting</Text>

          <Pressable
            style={styles.newCallButton}
            onPress={() => {
              // hook your navigation / action here
            }}
          >
            <Ionicons name="add" size={18} color="#ffffff" />
            <Text style={styles.newCallText}>New Call</Text>
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* AI Call Suggestions */}
          <View style={styles.aiCard}>
            <View style={styles.aiHeaderRow}>
              <View style={styles.aiIconCircle}>
                <Ionicons name="sparkles-outline" size={18} color="#7c3aed" />
              </View>
              <Text style={styles.aiTitle}>AI Call Suggestions</Text>
            </View>
            <Text style={styles.aiSubtitle}>Based on recent activity and priorities</Text>

            <View style={{ marginTop: 8 }}>
              <BulletLine text="Dr. Gupta (Gold) - High priority, new HCP. Best time: 2-4 PM today" />
              <BulletLine text="Dr. Sharma - Follow-up needed on Product X demo from last week" />
              <BulletLine text="Dr. Mehta - Overdue by 5 days. Prefers early morning visits" />
            </View>
          </View>

          {/* Summary cards row */}
          <View style={styles.summaryRow}>
            {/* Calls Made */}
            <View style={[styles.summaryCard, styles.summaryLeft]}>
              <View style={styles.summaryCardHeader}>
                <View style={styles.summaryIconCircle}>
                  <Ionicons name="document-text-outline" size={18} color="#2563eb" />
                </View>
                <View style={styles.badgeToday}>
                  <Text style={styles.badgeTodayText}>Today</Text>
                </View>
              </View>
              <Text style={styles.summaryTitle}>Calls Made</Text>
              <Text style={styles.summaryBigValue}>1</Text>
              <Text style={styles.summarySubText}>Target: 8 per day</Text>
            </View>

            {/* Submitted */}
            <View style={[styles.summaryCard, styles.summaryRight]}>
              <View style={styles.summaryCardHeader}>
                <View style={[styles.summaryIconCircle, { backgroundColor: "#dcfce7" }]}>
                  <Ionicons name="checkmark-done-outline" size={18} color="#16a34a" />
                </View>
                <View style={styles.badgeThisMonth}>
                  <Text style={styles.badgeThisMonthText}>This Month</Text>
                </View>
              </View>
              <Text style={styles.summaryTitle}>Submitted</Text>
              <Text style={styles.summaryBigValue}>3</Text>
              <Text style={styles.summarySubText}>89% of target</Text>
            </View>
          </View>

          {/* Segmented Tabs */}
          <View style={styles.segmentContainer}>
            <SegmentTab
              label={`All (${CALLS.length})`}
              active={activeTab === "All"}
              onPress={() => setActiveTab("All")}
            />
            <SegmentTab
              label={`Submitted (${CALLS.filter((c) => c.status === "Submitted").length})`}
              active={activeTab === "Submitted"}
              onPress={() => setActiveTab("Submitted")}
            />
            <SegmentTab
              label={`Approved (${CALLS.filter((c) => c.status === "Approved").length})`}
              active={activeTab === "Approved"}
              onPress={() => setActiveTab("Approved")}
            />
          </View>

          {/* Call Cards */}
          {filteredCalls.map((item) => (
            <CallCard key={item.id} call={item} />
          ))}

          {/* This Month Performance */}
          <View style={styles.performanceCard}>
            <Text style={styles.sectionTitle}>This Month Performance</Text>

            <View style={styles.performanceGrid}>
              <PerformanceTile
                title="Total Calls"
                icon={<Ionicons name="document-text-outline" size={18} color="#2563eb" />}
                value="3"
                subtitle=""
              />
              <PerformanceTile
                title="Positive Outcomes"
                icon={<Ionicons name="checkmark-circle-outline" size={18} color="#16a34a" />}
                value="2"
                subtitle=""
              />
              <PerformanceTile
                title="Samples Distributed"
                icon={<Ionicons name="cube-outline" size={18} color="#f97316" />}
                value="38"
                subtitle="33 units"
              />
              <PerformanceTile
                title="Files Shared"
                icon={<Ionicons name="document-attach-outline" size={18} color="#8b5cf6" />}
                value="5"
                subtitle="Various formats"
              />
            </View>
          </View>

          {/* Sample Distribution Summary */}
          <View style={styles.sampleCard}>
            <Text style={styles.sectionTitle}>Sample Distribution Summary</Text>

            <SampleRow label="Product X - 10mg" units="18 units" />
            <SampleRow label="Product Y - 20mg" units="15 units" />
            <SampleRow label="Product Z - Syrup" units="5 units" />

            <View style={styles.complianceRow}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#16a34a" />
              <Text style={styles.complianceText}>All distributions UCPMP compliant</Text>
            </View>
          </View>

          <View style={{ height: 24 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ---------- Small building blocks ---------- */

function BulletLine({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: "row", alignItems: "flex-start", marginVertical: 2 }}>
      <View
        style={{
          width: 5,
          height: 5,
          borderRadius: 999,
          backgroundColor: "#7c3aed",
          marginTop: 6,
          marginRight: 8,
        }}
      />
      <Text style={{ color: "#374151", fontSize: 13 }}>{text}</Text>
    </View>
  );
}

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
      style={[
        styles.segmentTab,
        active && styles.segmentTabActive,
      ]}
    >
      <Text
        style={[
          styles.segmentLabel,
          active && styles.segmentLabelActive,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

function CallCard({ call }: { call: CallItem }) {
  return (
    <View style={styles.callCard}>
      {/* top row */}
      <View style={styles.callTopRow}>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Text style={styles.callDoctor}>{call.doctor}</Text>
            <View style={styles.specialtyPill}>
              <Text style={styles.specialtyText}>{call.specialty}</Text>
            </View>
          </View>

          <View style={styles.callMetaRow}>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={13} color="#6b7280" />
              <Text style={styles.metaText}>{call.dateTime}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={13} color="#6b7280" />
              <Text style={styles.metaText}>{call.location}</Text>
            </View>
          </View>
        </View>

        <View style={{ alignItems: "flex-end", gap: 4 }}>
          <StatusPill label={call.status} variant={call.status === "Approved" ? "green" : "outline"} />
          <StatusPill
            label={call.outcome}
            variant={
              call.outcome === "Positive" || call.outcome === "Very Positive"
                ? "green"
                : "outline"
            }
          />
        </View>
      </View>

      {/* divider */}
      <View style={styles.cardDivider} />

      {/* bottom metrics row */}
      <View style={styles.bottomMetricsRow}>
        <View style={styles.metricItem}>
          <Ionicons name="time-outline" size={14} color="#6b7280" />
          <Text style={styles.metricText}>{call.duration}</Text>
        </View>
        <View style={styles.metricItem}>
          <FontAwesome5 name="leaf" size={13} color="#16a34a" />
          <Text style={[styles.metricText, { color: "#16a34a" }]}>{call.samples} samples</Text>
        </View>
        <View style={styles.metricItem}>
          <MaterialIcons name="insert-drive-file" size={14} color="#8b5cf6" />
          <Text style={[styles.metricText, { color: "#8b5cf6" }]}>{call.files} files</Text>
        </View>
      </View>

      {/* View Details row */}
      <Pressable
        style={styles.viewDetailsRow}
        onPress={() => {
          // hook your navigation here
        }}
      >
        <Ionicons name="eye-outline" size={16} color="#6b7280" />
        <Text style={styles.viewDetailsText}>View Details</Text>
      </Pressable>
    </View>
  );
}

function StatusPill({
  label,
  variant,
}: {
  label: string;
  variant: "green" | "outline";
}) {
  const isGreen = variant === "green";
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: isGreen ? "#16a34a" : "#eff6ff",
        borderWidth: 1,
        borderColor: isGreen ? "#16a34a" : "#bfdbfe",
      }}
    >
      <Text
        style={{
          fontSize: 11,
          fontWeight: "700",
          color: isGreen ? "#ffffff" : "#1d4ed8",
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function PerformanceTile({
  title,
  icon,
  value,
  subtitle,
}: {
  title: string;
  icon: React.ReactNode;
  value: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.performanceTile}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        {icon}
        <Text style={styles.performanceTitle}>{title}</Text>
      </View>
      <Text style={styles.performanceValue}>{value}</Text>
      {subtitle ? <Text style={styles.performanceSubtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function SampleRow({ label, units }: { label: string; units: string }) {
  return (
    <View style={styles.sampleRow}>
      <Text style={styles.sampleLabel}>{label}</Text>
      <View style={styles.unitsPill}>
        <Text style={styles.unitsText}>{units}</Text>
      </View>
    </View>
  );
}

/* ---------- styles ---------- */

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f3f4f6",
  },
  container: {
    flex: 1,
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
  newCallButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#020617",
    gap: 6,
  },
  newCallText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },
  scrollContent: {
    padding: 12,
    paddingBottom: 32,
  },
  aiCard: {
    backgroundColor: "#f5f3ff",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    marginBottom: 12,
  },
  aiHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  aiIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ede9fe",
    alignItems: "center",
    justifyContent: "center",
  },
  aiTitle: {
    fontWeight: "700",
    fontSize: 15,
    color: "#4c1d95",
  },
  aiSubtitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  summaryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  summaryLeft: {
    backgroundColor: "#eff6ff",
    borderColor: "#dbeafe",
  },
  summaryRight: {
    backgroundColor: "#ecfdf3",
    borderColor: "#bbf7d0",
  },
  summaryCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  summaryIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeToday: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#2563eb",
  },
  badgeTodayText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  badgeThisMonth: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#16a34a",
  },
  badgeThisMonthText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  summaryTitle: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
  },
  summaryBigValue: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 4,
  },
  summarySubText: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 4,
  },
  segmentContainer: {
    flexDirection: "row",
    borderRadius: 999,
    backgroundColor: "#e5e7eb",
    padding: 3,
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
  callCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 0,
  },
  callTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  callDoctor: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  specialtyPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },
  specialtyText: {
    fontSize: 11,
    color: "#111827",
    fontWeight: "600",
  },
  callMetaRow: {
    marginTop: 6,
    gap: 2,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: "#6b7280",
  },
  cardDivider: {
    height: 1,
    backgroundColor: "#e5e7eb",
    marginTop: 10,
  },
  bottomMetricsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 18,
    paddingVertical: 10,
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metricText: {
    fontSize: 12,
    color: "#4b5563",
  },
  viewDetailsRow: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  performanceCard: {
    backgroundColor: "#faf5ff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    padding: 14,
    marginTop: 4,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },
  performanceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  performanceTile: {
    flexBasis: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#f3e8ff",
  },
  performanceTitle: {
    fontSize: 12,
    color: "#6b7280",
  },
  performanceValue: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
    marginTop: 4,
  },
  performanceSubtitle: {
    fontSize: 11,
    color: "#9ca3af",
    marginTop: 2,
  },
  sampleCard: {
    backgroundColor: "#ecfdf3",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    padding: 14,
    marginBottom: 10,
  },
  sampleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcfce7",
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginTop: 6,
  },
  sampleLabel: {
    fontSize: 13,
    color: "#111827",
  },
  unitsPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#ecfdf3",
  },
  unitsText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#166534",
  },
  complianceRow: {
    marginTop: 10,
    borderRadius: 8,
    backgroundColor: "#dcfce7",
    paddingVertical: 8,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  complianceText: {
    fontSize: 12,
    color: "#166534",
  },
});
