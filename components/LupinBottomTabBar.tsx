import { Ionicons } from "@expo/vector-icons";
import { router, usePathname } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BLUE = "#2563eb";
const BLUE_50 = "#eef4ff";
const GRAY_500 = "#6b7280";

// Ionicons strict types
type IconName = React.ComponentProps<typeof Ionicons>["name"];

export default function LupinBottomTabBar() {
  const pathname = usePathname();

  const tabs: {
    key: string;
    label: string;
    route: string;
    icon: IconName;
    iconActive: IconName;
  }[] = [
    { key: "home", label: "Home", route: "/", icon: "home-outline", iconActive: "home" },
    { key: "route", label: "Route", route: "/route", icon: "navigate-outline", iconActive: "navigate" },
    { key: "hcps", label: "HCPs", route: "/hcps", icon: "people-outline", iconActive: "people" },
    { key: "calls", label: "Calls", route: "/calls", icon: "document-text-outline", iconActive: "document-text" },
    {
      key: "analytics",
      label: "Analytics",
      route: "/analytics",
      icon: "analytics-outline",
      iconActive: "analytics",
    },
  ];
  

  return (
    <SafeAreaView edges={["bottom"]} style={styles.container}>
      <View style={styles.pill}>
        {tabs.map((tab) => {
          const isActive = pathname === tab.route;

          return (
            <TouchableOpacity
              key={tab.key}
              style={styles.itemWrapper}
              activeOpacity={0.8}
              onPress={() => router.push(tab.route as any)}
            >
              <View style={[styles.item, isActive && styles.itemActive]}>
                <Ionicons
                  name={isActive ? tab.iconActive : tab.icon}
                  size={20}
                  color={isActive ? BLUE : GRAY_500}
                />
                <Text
                  style={[
                    styles.label,
                    { color: isActive ? BLUE : GRAY_500 },
                    isActive && { fontWeight: "700" },
                  ]}
                >
                  {tab.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
  },
  pill: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  itemWrapper: {
    flex: 1,
  },
  item: {
    paddingVertical: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  itemActive: {
    backgroundColor: BLUE_50,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: "500",
  },
});
