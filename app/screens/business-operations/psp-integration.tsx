// PatientSupportProgram.tsx
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";

export default function PatientSupportProgram() {
  const summary = {
    enrolled: 456,
    adherence: "89%",
  };

  const activities = [
    {
      id: "Patient #2456",
      desc: "Medication refill reminder sent",
      time: "2h ago",
      status: "Completed",
    },
    {
      id: "Patient #2457",
      desc: "Follow-up call scheduled",
      time: "4h ago",
      status: "Pending",
    },
  ];

  return (
    <View style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Patient Support Program</Text>

        {/* Summary row */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.summaryCardLeft]}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="people-outline" size={24} color="#2563EB" />
            </View>
            <Text style={styles.summaryValue}>{summary.enrolled}</Text>
            <Text style={styles.summaryLabel}>Enrolled Patients</Text>
          </View>

          <View style={[styles.summaryCard, styles.summaryCardRight]}>
            <View style={styles.cardIconWrap}>
              <Ionicons name="trending-up" size={24} color="#059669" />
            </View>
            <Text style={styles.summaryValue}>{summary.adherence}</Text>
            <Text style={styles.summaryLabel}>Adherence Rate</Text>
          </View>
        </View>

        {/* Recent Activities section */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Recent Activities</Text>
          {activities.map((a, idx) => (
            <View key={idx} style={styles.activityRowWrap}>
              <View style={styles.activityRow}>
                <View style={styles.activityLeft}>
                  <Text style={styles.activityTitle}>{a.id}</Text>
                  <Text style={styles.activityDesc}>{a.desc}</Text>
                  <Text style={styles.activityTime}>{a.time}</Text>
                </View>

                <View style={styles.activityRight}>
                  {a.status === "Completed" ? (
                    <View style={styles.pillCompleted}>
                      <Text style={styles.pillCompletedText}>Completed</Text>
                    </View>
                  ) : (
                    <View style={styles.pillPending}>
                      <Text style={styles.pillPendingText}>Pending</Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Footer actions */}
        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.footerBtn}>
            <View style={styles.footerIconWrap}>
              <Ionicons name="call-outline" size={22} color="#2563EB" />
            </View>
            <Text style={styles.footerText}>Call Coordinator</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.footerBtn}>
            <View style={styles.footerIconWrap}>
              <MaterialIcons name="textsms" size={22} color="#16A34A" />
            </View>
            <Text style={styles.footerText}>Send Reminder</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Floating action button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>L</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F3F4F6" },
  container: {
    padding: 16,
    paddingBottom: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 12,
    color: "#0f172a",
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 10,
    padding: 18,
    minHeight: 100,
    borderWidth: 1,
    borderColor: "#E6EEF9",
    justifyContent: "flex-start",
  },
  summaryCardLeft: {
    backgroundColor: "#EEF6FF",
    borderColor: "#aff9f9ff",
  },
  summaryCardRight: {
    backgroundColor: "#F0FFF4",
    borderColor: "#bff7d4ff",
  },
  cardIconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12    ,
  },

  summaryValue: {
    fontSize: 28,
    fontWeight: "400",
    color: "#0f172a",
  },
  summaryLabel: {
    marginTop: 8,
    color: "#6B7280",
    fontSize: 12,
  },

  /* RECENT ACTIVITIES */
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    marginTop: 6,
  },

  activityContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 18,
  },

  activityRowWrap: {
    marginBottom: 12,
  },

  activityRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAFBFC", // very light inner strip
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },

  activityLeft: {
    flex: 1,
    paddingRight: 12,
  },

  activityTitle: {
    fontWeight: "600",
    color: "#0f172a",
    marginBottom: 6,
    fontSize: 14,
  },

  activityDesc: {
    color: "#6B7280",
    fontSize: 13,
    marginBottom: 6,
  },

  activityTime: {
    color: "#9CA3AF",
    fontSize: 12,
  },

  activityRight: {
    marginLeft: 6,
    position: "absolute",
    top: 12,
    right: 12,
  },

  pillCompleted: {
    backgroundColor: "#0b1220",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pillCompletedText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 12,
  },

  pillPending: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pillPendingText: {
    color: "#374151",
    fontWeight: "600",
    fontSize: 12,
  },

  /* FOOTER ACTIONS */
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 4,
  },
  footerBtn: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  footerIconWrap: {
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "600",
  },

  /* FAB */
  fab: {
    position: "absolute",
    right: 18,
    bottom: 18,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  fabText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
