// app/components/LeaveDetailsModal.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export type LeaveDetail = {
  id: string;
  type: string;
  fromDate: string;
  toDate: string;
  totalDays: number;
  appliedOn?: string;
  reason?: string;
  status: "Pending" | "Approved" | "Cancelled";
  // optional approvedOn to show exact approved date if available
  approvedOn?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  leave?: LeaveDetail | null;
  onCancel?: (id: string) => void;
  onEdit?: (leave: LeaveDetail) => void;
};

export default function LeaveDetailsModal({
  visible,
  onClose,
  leave,
  onCancel,
  onEdit,
}: Props) {
  if (!leave) return null;

  // determine visual theme per status
  const isApproved = leave.status === "Approved";
  const isPending = leave.status === "Pending";
  const isCancelled = leave.status === "Cancelled";

  const statusBg = isApproved ? "#ecfdf5" : isPending ? "#fff7ed" : "#fff0f1";
  const statusBorder = isApproved ? "#d1fae5" : isPending ? "#fde3b7" : "#ffd0d6";
  const statusIconColor = isApproved ? "#059669" : isPending ? "#f59e0b" : "#dc1633";
  const statusTitle = isApproved ? "Approved" : isPending ? "Pending Approval" : "Cancelled";

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.paper}>
          {/* Header */}
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Leave Request Details</Text>
              <Text style={styles.requestId}>Request ID: {leave.id}</Text>
            </View>

            <TouchableOpacity onPress={onClose} style={styles.closeBtn} accessibilityLabel="close">
              <Ionicons name="close" size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.content}>
            {/* Status panel (adapts for Approved / Pending / Cancelled) */}
            <View style={[styles.statusPanel, { backgroundColor: statusBg, borderColor: statusBorder }]}>
              <View style={styles.statusRow}>
                <View style={[styles.statusIconWrap, { backgroundColor: statusBg }]}>
                  {isApproved ? (
                    <Ionicons name="checkmark-circle" size={18} color={statusIconColor} />
                  ) : isPending ? (
                    <Ionicons name="time-outline" size={18} color={statusIconColor} />
                  ) : (
                    <Ionicons name="close-circle" size={18} color={statusIconColor} />
                  )}
                </View>

                <Text style={styles.statusTitle}>
                  {statusTitle}
                </Text>
              </View>

              {/* Message text differs for approved vs pending/cancelled */}
              {isApproved ? (
                <View style={{ marginTop: 8 }}>
                  <Text style={styles.statusSubtitle}>
                    Your leave request has been approved by Regional Manager - Mr. Amit Patel.
                  </Text>
                  <Text style={[styles.statusSubtitle, { marginTop: 10, color: "#065f46", fontWeight: "600" }]}>
                    Approved on: {leave.approvedOn ?? leave.appliedOn ?? "—"}
                  </Text>
                </View>
              ) : isPending ? (
                <Text style={styles.statusSubtitle}>
                  Your leave request is awaiting manager approval.
                </Text>
              ) : (
                <Text style={styles.statusSubtitle}>
                  This leave request has been cancelled.
                </Text>
              )}
            </View>

            {/* Leave Information */}
            <View style={styles.infoCard}>
              <Text style={styles.infoHeading}>Leave Information</Text>

              <InfoRow label="Leave Type:" value={leave.type} />
              <InfoRow label="Date Range:" value={`${leave.fromDate} - ${leave.toDate}`} alignValueRight />
              <InfoRow label="From Date:" value={leave.fromDate} />
              <InfoRow label="To Date:" value={leave.toDate} />
              <InfoRow label="Total Days:" value={`${leave.totalDays}`} />
              <InfoRow label="Applied On:" value={leave.appliedOn ?? "—"} />
            </View>

            {/* Reason */}
            <View style={styles.reasonCard}>
              <Text style={styles.reasonHeading}>Reason</Text>
              <Text style={styles.reasonText}>{leave.reason ?? "No reason provided"}</Text>
            </View>

            {/* Actions: hide edit/cancel when Approved */}
            {!isApproved && (
              <View style={styles.actions}>
                <TouchableOpacity
                  onPress={() => onEdit?.(leave)}
                  style={styles.actionEdit}
                  activeOpacity={0.85}
                >
                  <Text style={styles.actionEditText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onCancel?.(leave.id)}
                  style={styles.actionCancel}
                  activeOpacity={0.85}
                >
                  <Text style={styles.actionCancelText}>✕ Cancel</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

/* Small helpers */
function InfoRow({ label, value, alignValueRight = false }: { label: string; value: string | number; alignValueRight?: boolean; }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <View style={alignValueRight ? { flex: 1, alignItems: "flex-end" } : undefined}>
        <Text style={styles.infoValue}>{value}</Text>
      </View>
    </View>
  );
}

/* Styles tuned to match the screenshot */
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    padding: 18,
  },

  paper: {
    width: "100%",
    maxWidth: 520,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    overflow: "hidden",
    // shadow / elevation to match screenshot depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 22,
    elevation: 14,
  },

  header: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eef2f6",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: { fontSize: 15, fontWeight: "700", color: "#0f172a" },
  requestId: { color: "#6b7280", fontSize: 12, marginTop: 6 },

  closeBtn: {
    padding: 6,
    marginLeft: 12,
    borderRadius: 6,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 12,
  },

  /* status */
  statusPanel: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 14,
  },
  statusRow: { flexDirection: "row", alignItems: "center" },
  statusIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTitle: { marginLeft: 12, fontWeight: "700", color: "#065f46", fontSize: 14 },
  statusSubtitle: { color: "#475569", fontSize: 13, marginTop: 6 },

  /* info card */
  infoCard: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#eef2f6",
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 14,
  },
  infoHeading: { fontWeight: "700", marginBottom: 10, color: "#0f172a" },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 6,
  },
  infoLabel: { color: "#475569", fontSize: 13, flex: 1 },
  infoValue: { color: "#0f172a", fontSize: 13 },

  /* reason */
  reasonCard: {
    backgroundColor: "#f1f8ff",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e6f0ff",
    marginBottom: 18,
  },
  reasonHeading: { fontWeight: "600", marginBottom: 8, color: "#0f172a" },
  reasonText: { color: "#475569", fontSize: 13 },

  /* actions */
  actions: {
    flexDirection: "row",
    gap: 12,
  },
  actionEdit: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eef2f6",
    backgroundColor: "#fff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionEditText: { fontWeight: "600", color: "#0f172a" },

  actionCancel: {
    flex: 1,
    backgroundColor: "#dc1633",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionCancelText: { color: "#fff", fontWeight: "700" },
});
