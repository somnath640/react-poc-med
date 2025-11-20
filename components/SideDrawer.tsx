// app/components/SideDrawer.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
    Animated,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    Text,
    View,
    useWindowDimensions,
} from "react-native";

type SideDrawerProps = {
  visible: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  side?: "right" | "left";
  widthFraction?: number; // 0–1, default 0.35 on wide screens
};

export default function SideDrawer({
  visible,
  onClose,
  title,
  subtitle,
  children,
  side = "right",
  widthFraction,
}: SideDrawerProps) {
  const { width, height } = useWindowDimensions();

  const drawerWidth =
    width < 640
      ? Math.min(width * (widthFraction ?? 0.85), 420)
      : Math.min(width * (widthFraction ?? 0.35), 420);

  const translateX = useRef(new Animated.Value(side === "right" ? drawerWidth : -drawerWidth))
    .current;

  const [rendered, setRendered] = useState(visible);

  useEffect(() => {
    if (visible) {
      setRendered(true);
      Animated.timing(translateX, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    } else if (rendered) {
      Animated.timing(translateX, {
        toValue: side === "right" ? drawerWidth : -drawerWidth,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setRendered(false);
      });
    }
  }, [visible, drawerWidth, rendered, side, translateX]);

  if (!rendered) return null;

  return (
    <Modal transparent visible={rendered} animationType="none" onRequestClose={onClose}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.35)",
          flexDirection: side === "right" ? "row" : "row-reverse",
        }}
      >
        {/* tap overlay to close */}
        <Pressable
          style={{ flex: 1 }}
          onPress={onClose}
        />

        <Animated.View
          style={{
            width: drawerWidth,
            height,
            backgroundColor: "#ffffff",
            shadowColor: "#000",
            shadowOpacity: 0.16,
            shadowRadius: 10,
            elevation: 12,
            transform: [{ translateX }],
          }}
        >
          {/* Header */}
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 14,
              borderBottomWidth: 1,
              borderBottomColor: "#e5e7eb",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 1, paddingRight: 16 }}>
              {!!title && (
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#111827" }}>
                  {title}
                </Text>
              )}
              {!!subtitle && (
                <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>
                  {subtitle}
                </Text>
              )}
            </View>
            <Pressable onPress={onClose} hitSlop={10}>
              <Ionicons name="close" size={20} color="#6b7280" />
            </Pressable>
          </View>

          {/* Body */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}
          >
            {children}
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
}
