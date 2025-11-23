// app/components/LeaveModal.tsx

import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (payload: any) => void;
};

export default function LeaveModal({ visible, onClose, onSubmit }: Props) {
  const [leaveType, setLeaveType] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");

  function handleSubmit() {
    onSubmit?.({ leaveType, fromDate, toDate, reason });
    onClose();
  }

  if (!visible) return null;

  return (
    <View
      style={{
        position: Platform.OS === "web" ? "fixed" : "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
        zIndex: 9999,
      }}
    >
      {/* MODAL BOX */}
      <View
        style={{
          width: "100%",
          maxWidth: 520,
          backgroundColor: "#fff",
          borderRadius: 12,
          overflow: "hidden",

          shadowColor: "#000",
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 30,
          elevation: 12,
        }}
      >
        {/* HEADER */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#f1f5f9",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#0f172a" }}>
              Apply for Leave
            </Text>
            <Text style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
              Submit leave request for manager approval
            </Text>
          </View>

          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={22} color="#94a3b8" />
          </TouchableOpacity>
        </View>

        {/* BODY */}
        <ScrollView contentContainerStyle={{ padding: 20 }}>
          {/* Leave Type */}
          <Text style={{ color: "#475569", fontSize: 13, marginBottom: 8 }}>
            Leave Type *
          </Text>

          <View
            style={{
              borderWidth: 1,
              borderColor: "#eef2ff",
              borderRadius: 8,
              marginBottom: 16,
              backgroundColor: "#fff",
            }}
          >
            <Picker
              selectedValue={leaveType}
              onValueChange={setLeaveType}
              style={{ height: 46 }}
            >
              <Picker.Item label="Select leave type" value="" />
              <Picker.Item label="Casual Leave" value="casual" />
              <Picker.Item label="Sick Leave" value="sick" />
              <Picker.Item label="Earned Leave" value="earned" />
              <Picker.Item label="Compensatory Off" value="comp" />
              <Picker.Item label="Maternity Leave" value="maternity" />
              <Picker.Item label="Paternity Leave" value="paternity" />
            </Picker>
          </View>

          {/* Dates */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 16 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>
                From Date *
              </Text>

              <TextInput
                value={fromDate}
                onChangeText={setFromDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#94a3b8"
                style={{
                  borderWidth: 1,
                  borderColor: "#eef2ff",
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: "#fff",
                }}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>
                To Date *
              </Text>

              <TextInput
                value={toDate}
                onChangeText={setToDate}
                placeholder="dd-mm-yyyy"
                placeholderTextColor="#94a3b8"
                style={{
                  borderWidth: 1,
                  borderColor: "#eef2ff",
                  borderRadius: 8,
                  padding: 12,
                  backgroundColor: "#fff",
                }}
              />
            </View>
          </View>

          {/* Reason */}
          <Text style={{ fontSize: 13, color: "#475569", marginBottom: 6 }}>
            Reason *
          </Text>

          <TextInput
            multiline
            value={reason}
            onChangeText={setReason}
            numberOfLines={4}
            placeholder="Enter detailed reason for leave…"
            placeholderTextColor="#94a3b8"
            style={{
              borderWidth: 1,
              borderColor: "#eef2ff",
              borderRadius: 8,
              padding: 12,
              minHeight: 96,
              textAlignVertical: "top",
              backgroundColor: "#fff",
              marginBottom: 16,
              color: "#0f172a",
            }}
          />

          {/* Important warning box */}
          <View
            style={{
              borderWidth: 1,
              borderColor: "#f6e7c6",
              backgroundColor: "#fef6ec",
              borderRadius: 8,
              padding: 14,
              marginBottom: 20,
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
              <Ionicons name="alert-circle" size={18} color="#f59e0b" />
              <Text style={{ marginLeft: 8, fontWeight: "600", color: "#334155" }}>
                Important:
              </Text>
            </View>

            <Text style={{ fontSize: 12, color: "#475569", marginBottom: 6 }}>
              • Apply at least 3 days in advance for planned leaves
            </Text>
            <Text style={{ fontSize: 12, color: "#475569", marginBottom: 6 }}>
              • Sick leaves require medical certificate for &gt;2 days
            </Text>
            <Text style={{ fontSize: 12, color: "#475569" }}>
              • Your request will be sent to your reporting manager
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            style={{
              backgroundColor: "#09051a",
              borderRadius: 10,
              paddingVertical: 14,
              alignItems: "center",

              shadowColor: "#000",
              shadowOffset: { width: 0, height: 6 },
              shadowOpacity: 0.15,
              shadowRadius: 16,
              elevation: 6,
            }}
          >
            <Text style={{ color: "#fff", fontSize: 15, fontWeight: "700" }}>
              Submit Leave Request
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
