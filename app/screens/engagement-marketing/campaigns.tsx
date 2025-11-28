import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CampaignDashboard() {

  const campaigns = [
    {
      title: "Diabetes Awareness Drive",
      tags: ["Email", "SMS", "WhatsApp"],
      reach: 450,
      responses: 306,
      progress: 68,
      status: "Active",
    },
    {
      title: "Product X Launch",
      tags: ["In-Person", "Email"],
      reach: 280,
      responses: 230,
      progress: 82,
      status: "Active",
    },
  ];

  const channels = [
    { icon: "📧", name: "Email", openRate: "66% open" },
    { icon: "📱", name: "SMS", openRate: "91% open" },
    { icon: "💬", name: "WhatsApp", openRate: "97% open" },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.headerTitle}>Campaigns</Text>

        <TouchableOpacity style={styles.newButton}>
          <Text style={styles.newButtonText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {/* Campaign Cards */}
      {campaigns.map((c, index) => (
        <View key={index} style={styles.card}>

          {/* Card Top */}
          <View style={styles.cardHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{c.title}</Text>

              <View style={styles.tagsRow}>
                {c.tags.map((t, i) => (
                  <View key={i} style={styles.tagOutline}>
                    <Text style={styles.tagOutlineText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.statusPill}>
              <Text style={styles.statusPillText}>{c.status}</Text>
            </View>
          </View>

          {/* Engagement */}
          <View style={{ marginTop: 16 }}>
            <View style={styles.engagementRow}>
              <Text style={styles.engagementLabel}>Engagement</Text>
              <Text style={styles.progressPercent}>{c.progress}%</Text>
            </View>

            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: `${c.progress}%` }]} />
            </View>
          </View>

          {/* Reach & Responses */}
          <View style={styles.metricsRow}>
            <View style={[styles.metricBox, styles.reachBox]}>
              <Text style={styles.metricLabel}>Reach</Text>
              <Text style={styles.metricValue}>{c.reach}</Text>
            </View>

            <View style={[styles.metricBox, styles.responseBox]}>
              <Text style={styles.metricLabel}>Responses</Text>
              <Text style={styles.metricValue}>{c.responses}</Text>
            </View>
          </View>

        </View>
      ))}

      {/* Channel Performance */}
      <View style={[styles.card, { marginBottom: 50 }]}>
        <Text style={styles.cardTitle}>Channel Performance</Text>

        {channels.map((ch, i) => (
          <View key={i} style={styles.channelRow}>
            <View style={styles.channelLeft}>
              <Text style={styles.channelIcon}>{ch.icon}</Text>
              <Text style={styles.channelName}>{ch.name}</Text>
            </View>

            <Text style={styles.channelRate}>{ch.openRate}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#F4F6FA",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0f172a",
  },

  newButton: {
    backgroundColor: "#020617",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  newButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
    color: "#0f172a",
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  tagOutline: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#CBD5E1",
  },
  tagOutlineText: {
    fontSize: 11,
    color: "#475569",
    fontWeight: "500",
  },

  statusPill: {
    backgroundColor: "#16A34A",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    height: 26,
    justifyContent: "center",
  },
  statusPillText: {
    color: "white",
    fontSize: 12,
    fontWeight: "700",
  },

  engagementRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  engagementLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#6b7280",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "600",
    color: "#111827",
  },
  progressTrack: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: 6,
    backgroundColor: "#111827",
  },

  // ---- REACH / RESPONSES (exact screenshot style) ----
  metricsRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  metricBox: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  reachBox: {
    backgroundColor: "#e9f5fcff", // light blue
  },

  responseBox: {
    backgroundColor: "#e9f5fcff", // light blue
  },

  metricLabel: {
    fontSize: 11,
    color: "#555",
    marginBottom: 2,
  },

  metricValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },

  // ---- CHANNEL PERFORMANCE ----
  channelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f7fcfeff",
    padding: 12,
    margin: 5,
    borderRadius: 8
  },
  channelLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  channelIcon: { fontSize: 20 },
  channelName: { fontSize: 15, fontWeight: "500" },
  channelRate: { color: "#374151", fontSize: 14 },
});
