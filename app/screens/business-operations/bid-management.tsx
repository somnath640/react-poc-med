import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const bids = [
  {
    id: "BID-2025-089",
    hospital: "Municipal Hospital",
    value: "₹18.5L",
    deadline: "Nov 15, 2025",
    status: "In Progress",
  },
  {
    id: "BID-2025-091",
    hospital: "State Medical Dept",
    value: "₹32.2L",
    deadline: "Nov 20, 2025",
    status: "Under Review",
  },
];

export default function BidManagement() {
  const summary = {
    active: 12,
    won: 8,
    winRate: "67%",
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Bid Management</Text>

      {bids.map((bid, index) => (
        <View key={index} style={styles.card}>

          <View style={styles.statusPill}>
            <Text style={styles.statusText}>{bid.status}</Text>
          </View>

          <Text style={styles.bidId}>{bid.id}</Text>
          <Text style={styles.hospital}>{bid.hospital}</Text>

          <View style={styles.row}>
            <View style={[styles.infoBox, styles.valueBox]}>
              <Text style={styles.label}>Value</Text>
              <Text style={styles.valueText}>{bid.value}</Text>
            </View>

            <View style={[styles.infoBox, styles.deadlineBox]}>
              <Text style={styles.label}>Deadline</Text>
              <Text style={styles.valueText}>{bid.deadline}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.detailsBtn}>
            <Text style={styles.detailsText}>View Details</Text>
          </TouchableOpacity>

        </View>
      ))}

      {/* Summary */}
      <View style={styles.summaryRow}>

        <View style={[styles.summaryBox, styles.summaryBlue]}>
          <Text style={styles.summaryValue}>{summary.active}</Text>
          <Text style={styles.summaryLabel}>Active</Text>
        </View>

        <View style={[styles.summaryBox, styles.summaryGreen]}>
          <Text style={styles.summaryValue}>{summary.won}</Text>
          <Text style={styles.summaryLabel}>Won</Text>
        </View>

        <View style={[styles.summaryBox, styles.summaryOrange]}>
          <Text style={styles.summaryValue}>{summary.winRate}</Text>
          <Text style={styles.summaryLabel}>Win Rate</Text>
        </View>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 16,
    position: "relative",
  },

  statusPill: {
    position: "absolute",
    right: 16,
    top: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },

  bidId: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
  },
  hospital: {
    color: "#6B7280",
    marginTop: 2,
    marginBottom: 20,
  },

  row: {
    flexDirection: "row",
    marginBottom: 16,
  },

  infoBox: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
  },

  valueBox: {
    backgroundColor: "#F0FDF4", // light green like screenshot
    marginRight: 8,
  },

  deadlineBox: {
    backgroundColor: "#FFF7ED", // light peach like screenshot
    marginLeft: 8,
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
  },
  valueText: {
    fontSize: 16,
    fontWeight: "400",
    marginTop: 2,
  },

  detailsBtn: {
    paddingVertical: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
  },
  detailsText: {
    fontWeight: "500",
  },

  // Summary Section
  summaryRow: {
    flexDirection: "row",
    marginTop: 8,
  },

  summaryBox: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  summaryBlue: {
    backgroundColor: "#EFF6FF",
  },
  summaryGreen: {
    backgroundColor: "#ECFDF5",
  },
  summaryOrange: {
    backgroundColor: "#FFF7ED",
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: "600",
    paddingBottom: 20
  },
  summaryLabel: {
    fontSize: 12,
    marginTop: 4,
    color: "#6B7280",
  },
});
