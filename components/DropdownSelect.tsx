import React, { useState } from "react";
import {
  Modal,
  Pressable,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
};

export default function DropdownSelect({ label, value, onChange, options }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Label */}
      {label && (
        <Text style={{ fontSize: 13, fontWeight: "700", color: "#111827", marginBottom: 6 }}>
          {label}
        </Text>
      )}

      {/* Selected Box */}
      <Pressable
        onPress={() => setOpen(true)}
        style={{
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 6,
          paddingVertical: 10,
          paddingHorizontal: 12,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f9fafb",
        }}
      >
        <Text style={{ color: "#374151", fontSize: 13 }}>{value}</Text>
        <Ionicons name="chevron-down-outline" size={18} color="#9ca3af" />
      </Pressable>

      {/* Modal List */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)}>
          <View
            style={{
              marginTop: 160,
              marginHorizontal: 20,
              backgroundColor: "#fff",
              borderRadius: 10,
              paddingVertical: 8,
              shadowColor: "#000",
              shadowOpacity: 0.12,
              shadowRadius: 14,
              elevation: 10,
            }}
          >
            <FlatList
              data={options}
              keyExtractor={(i) => i}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onChange(item);
                    setOpen(false);
                  }}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 16,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: item === value ? "#eef2ff" : "#fff",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: item === value ? "#4338ca" : "#111827",
                    }}
                  >
                    {item}
                  </Text>

                  {item === value && (
                    <Ionicons name="checkmark-outline" size={18} color="#4338ca" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
