// App.tsx

import StockistVisitModal from "@/components/StockistVisitModal";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { JSX, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";

/* ---------------- Types & sample data ---------------- */
type Stockist = {
  id: string;
  name: string;
  group: string;
  tag?: "Premium" | "Standard" | "Distributor";
  location: string;
  phone: string;
  lastOrder: string;
  lastOrderValue: number; // INR in units (e.g., 125000)
  outstanding: number;
  monthlyVolume: number;
  creditLimit: number;
  pendingOrders?: number;
};
type SelectedStockistData = {
  name: string;
  group: string;
  location: string;
  monthlyVolume: number;
  pending: number;
};


const STOCKISTS: Stockist[] = [
  {
    id: "s1",
    name: "Ramesh Medical Distributors Pvt Ltd",
    group: "Ramesh Traders",
    tag: "Premium",
    location: "Andheri East, Mumbai",
    phone: "+91 98765 00001",
    lastOrder: "5 days ago",
    lastOrderValue: 1250000,
    outstanding: 130000,
    monthlyVolume: 4500000,
    creditLimit: 5000000,
    pendingOrders: 2,
  },
  {
    id: "s2",
    name: "Sharma Medical Supply Chain",
    group: "Sharma Distributors",
    tag: "Premium",
    location: "Bandra West, Mumbai",
    phone: "+91 98765 00002",
    lastOrder: "3 days ago",
    lastOrderValue: 980000,
    outstanding: 0,
    monthlyVolume: 3200000,
    creditLimit: 4000000,
    pendingOrders: 0,
  },
  {
    id: "s3",
    name: "Metro Pharmaceutical Distributors",
    group: "Metro Pharma Hub",
    tag: "Standard",
    location: "Worli, Mumbai",
    phone: "+91 98765 00003",
    lastOrder: "2 weeks ago",
    lastOrderValue: 550000,
    outstanding: 280000,
    monthlyVolume: 1800000,
    creditLimit: 2000000,
    pendingOrders: 3,
  },
];

/* ---------- Responsive container helper ---------- */
function useResponsiveContainer() {
  const { width } = useWindowDimensions();
  const TABLET_BREAK = 768;
  const LAPTOP_BREAK = 1200;

  const isPhone = width < TABLET_BREAK;
  const isTablet = width >= TABLET_BREAK && width < LAPTOP_BREAK;
  const isLaptop = width >= LAPTOP_BREAK;

  let container = Math.min(width - 32, 1000);
  if (isTablet) container = Math.min(width - 80, 1400);
  if (isLaptop) container = Math.min(width - 240, 1800);

  return { container, isPhone, isTablet, isLaptop };
}

/* ---------- Helpers ---------- */
function formatINRShort(n: number) {
  // show in lakhs with 1 decimal if larger than 1 lakh; else show normal with separators
  if (n >= 100000) {
    const lakh = n / 100000;
    return `₹${lakh % 1 === 0 ? lakh.toFixed(0) : lakh.toFixed(1)}L`;
  }
  return `₹${n.toLocaleString("en-IN")}`;
}

function Badge({ text }: { text: string }) {
  return (
    <View style={{ backgroundColor: "#f3e8ff", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
      <Text style={{ color: "#7c3aed", fontWeight: "700", fontSize: 12 }}>{text}</Text>
    </View>
  );
}

/* ---------- Main App ---------- */
export default function StokistVisit(): JSX.Element {
  const { container, isPhone } = useResponsiveContainer();
  const [visitModalVisible, setVisitModalVisible] = useState(false);
  const [selectedStockist, setSelectedStockist] = useState<SelectedStockistData | null>(null);
  const activeStockists = STOCKISTS.length;
  const pendingOrders = STOCKISTS.reduce((s, x) => s + (x.pendingOrders ?? 0), 0);
  const [activeTab, setActiveTab] = useState<"stockists" | "orders" | "demand" | "hq" | "schemes">("stockists");


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <View
        style={{
          backgroundColor: "#0a8b36",
          paddingHorizontal: 16,
          paddingVertical: 13,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo + App Name */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: "#ffffff",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 8,
            }}
          >
            <TouchableOpacity>
                          <Ionicons name="chevron-back" size={20} onPress={() =>  router.replace({ pathname: '/(tabs)', params: { openDrawer: '1' } } as any) }/>
                        </TouchableOpacity>
          </View>

          <View>
            <Text
              style={{
                color: "#ffffff",
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              LUPIN CRM
            </Text>
            <Text style={{ color: "#d9ffd7", fontSize: 11 }}>
              Field Force Management
            </Text>
          </View>
        </View>

        {/* 3-dot menu */}
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: 16,
          }}
        >
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          />
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          />
          <View
            style={{
              width: 3,
              height: 3,
              borderRadius: 2,
              backgroundColor: "#ffffff",
            }}
          />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
        <View style={{ width: container, alignSelf: "center", paddingHorizontal: 8 }}>
          {/* Header */}
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
              <View style={{ width: 44, height: 44, borderRadius: 10, backgroundColor: "#fb923c", alignItems: "center", justifyContent: "center" }}>
                <Text style={{ color: "white", fontWeight: "700" }}>🏬</Text>
              </View>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "700", color: "#0f172a" }}>Stockist Visit & Interaction</Text>
                <Text style={{ color: "#6b7280", fontSize: 13 }}>Manage distributor relationships & supply chain</Text>
              </View>
            </View>
          </View>

          {/* Search */}
          <View style={{ marginBottom: 12 }}>
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 10,
                paddingHorizontal: 14,
                borderWidth: 1,
                borderColor: "#e5e7eb",
                flexDirection: "row",
                alignItems: "center",
                height: 46,
              }}
            >
              <MaterialIcons
                name="search"
                size={22}
                color="#9CA3AF"
                style={{ marginRight: 8 }}
              />
              <TextInput
                placeholder="Search stockists by name, firm, or location..."
                placeholderTextColor="#9CA3AF"
                style={{
                  flex: 1,
                  color: "#111827",
                  fontSize: 15,
                }}
              />
            </View>
          </View>

          {/* Summary row */}
          <View
            style={{
              flexDirection: isPhone ? "column" : "row",
              gap: 12,
              marginBottom: 12,
            }}
          >
            {/* Active Stockists */}
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff7ed",
                padding: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#fed7aa",
              }}
            >
              <Text style={{ color: "#92400e", fontSize: 13 }}>
                Active Stockists
              </Text>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "800",
                    color: "#92400e",
                  }}
                >
                  {activeStockists}
                </Text>

                <MaterialIcons
                  name="warehouse"
                  size={28}
                  color="#ea580c"
                />
              </View>
            </View>

            {/* Pending Orders */}
            <View
              style={{
                flex: 1,
                backgroundColor: "#ecfdf5",
                padding: 14,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#d1fae5",
              }}
            >
              <Text style={{ color: "#065f46", fontSize: 13 }}>
                Pending Orders
              </Text>
              <View
                style={{
                  marginTop: 4,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 26,
                    fontWeight: "800",
                    color: "#065f46",
                  }}
                >
                  {pendingOrders}
                </Text>
                <MaterialIcons
                  name="inventory-2"
                  size={28}
                  color="#059669"
                />
              </View>
            </View>
          </View>

          {/* Tabs */}
          <View
  style={{
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 999,
    padding: 6,
    marginBottom: 16,
  }}
>
  {[
    { key: "stockists", label: "Stockists", icon: "storefront" },
    { key: "orders", label: "Orders", icon: "shopping-cart" },
    { key: "demand", label: "Demand", icon: "show-chart" },
    { key: "hq", label: "HQ Stock", icon: "inventory-2" },
    { key: "schemes", label: "Schemes", icon: "card-giftcard" },
  ].map((t, i) => (
    <Pressable
      key={i}
      onPress={() => setActiveTab(t.key as any)}
      style={{
        flex: 1,
        backgroundColor: activeTab === t.key ? "#fff" : "transparent",
        borderRadius: 999,
        paddingVertical: 10,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
      }}
    >
      <MaterialIcons name={t.icon as any} size={18} color="#374151" />
      <Text
        style={{
          fontWeight: activeTab === t.key ? "700" : "500",
          color: "#111827",
        }}
      >
        {t.label}
      </Text>
    </Pressable>
  ))}
</View>

{/* --------------------------------------------- */}
{/* ORDERS TAB UI */}
{/* --------------------------------------------- */}
{activeTab === "orders" && (
  <View style={{ marginTop: 8 }}>

    {/* HEADER CARD */}
    <View
      style={{
        backgroundColor: "#eff6ff",
        borderRadius: 12,
        padding: 18,
        borderWidth: 1,
        borderColor: "#dbeafe",
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#2563eb",
            width: 36,
            height: 36,
            borderRadius: 999,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="history" size={20} color="#fff" />
        </View>

        <View>
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a" }}>
            Order History & Inventory Status
          </Text>
          <Text style={{ color: "#6b7280", fontSize: 13 }}>
            Track orders and monitor inventory levels
          </Text>
        </View>
      </View>
    </View>

    {/* RECENT ORDERS TITLE */}
    <Text style={{ fontWeight: "700", marginBottom: 12, color: "#0f172a" }}>
      Recent Orders
    </Text>

    {/* ORDER CARD 1 */}
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        padding: 16,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Text style={{ color: "#2563eb", fontWeight: "700" }}>ORD-2024-1156</Text>
        <View
          style={{
            backgroundColor: "#dcfce7",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#15803d", fontWeight: "700" }}>Delivered</Text>
        </View>
      </View>

      <Text style={{ color: "#6b7280", fontSize: 12, marginBottom: 14 }}>
        5 days ago
      </Text>

      {/* Order details */}
      <View
        style={{
          backgroundColor: "#f8fafc",
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          marginBottom: 14,
        }}
      >
        <Text style={{ color: "#374151" }}>Products:</Text>
        <Text style={{ color: "#374151", marginTop: 4 }}>Quantity:</Text>
        <Text style={{ color: "#374151", marginTop: 4 }}>Value:</Text>
      </View>

      <Text style={{ color: "#6b7280", fontSize: 12 }}>
        📅 3 days ago
      </Text>
    </View>

    {/* ORDER CARD 2 */}
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#e5e7eb",
        padding: 16,
        marginBottom: 40,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <Text style={{ color: "#2563eb", fontWeight: "700" }}>ORD-2024-1089</Text>
        <View
          style={{
            backgroundColor: "#dcfce7",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#15803d", fontWeight: "700" }}>Delivered</Text>
        </View>
      </View>

      <Text style={{ color: "#6b7280", fontSize: 12, marginBottom: 14 }}>
        12 days ago
      </Text>

      {/* Order details */}
      <View
        style={{
          backgroundColor: "#f8fafc",
          padding: 12,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          marginBottom: 14,
        }}
      >
        <Text style={{ color: "#374151" }}>Products:</Text>
        <Text style={{ color: "#374151", marginTop: 4 }}>Quantity:</Text>
        <Text style={{ color: "#374151", marginTop: 4 }}>Value:</Text>
      </View>

      <Text style={{ color: "#6b7280", fontSize: 12 }}>
        📅 8 days ago
      </Text>
    </View>
    {/* CURRENT INVENTORY STATUS TITLE */}
<Text
  style={{
    fontWeight: "700",
    marginBottom: 14,
    color: "#0f172a",
    marginTop: 20,
  }}
>
  Current Inventory Status
</Text>

{/* INVENTORY CARD 1 */}
<View
  style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 20,
  }}
>
  {/* Header */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    }}
  >
    <View>
      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
        Lupin Cardio-X 10mg
      </Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Movement: Fast</Text>
    </View>

    <View
      style={{
        backgroundColor: "#fefce8",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#fef08a",
      }}
    >
      <Text style={{ color: "#ca8a04", fontWeight: "700" }}>Low</Text>
    </View>
  </View>

  {/* Stock row */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#f8fafc",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginTop: 10,
    }}
  >
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Current</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>2500</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Minimum</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>3000</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Last Order</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>5000</Text>
    </View>
  </View>

  {/* Warning */}
  <View
    style={{
      marginTop: 10,
      backgroundColor: "#fef9c3",
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#fde68a",
    }}
  >
    <Text style={{ color: "#b45309" }}>
      ⚠ Below minimum stock – Recommend replenishment
    </Text>
  </View>
</View>

{/* INVENTORY CARD 2 */}
<View
  style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 20,
  }}
>
  {/* Header */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    }}
  >
    <View>
      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
        Lupin Antibiotic Plus
      </Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Movement: Fast</Text>
    </View>

    <View
      style={{
        backgroundColor: "#dcfce7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#bbf7d0",
      }}
    >
      <Text style={{ color: "#15803d", fontWeight: "700" }}>Adequate</Text>
    </View>
  </View>

  {/* Stock row */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#f8fafc",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginTop: 10,
    }}
  >
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Current</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>4500</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Minimum</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>2000</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Last Order</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>3000</Text>
    </View>
  </View>
</View>

{/* INVENTORY CARD 3 */}
<View
  style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 20,
  }}
>
  {/* Header */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    }}
  >
    <View>
      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
        Lupin Diabetes Care
      </Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Movement: Fast</Text>
    </View>

    <View
      style={{
        backgroundColor: "#fee2e2",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#fecaca",
      }}
    >
      <Text style={{ color: "#b91c1c", fontWeight: "700" }}>Critical</Text>
    </View>
  </View>

  {/* Stock row */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#f8fafc",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginTop: 10,
    }}
  >
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Current</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>1200</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Minimum</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>2500</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Last Order</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>4000</Text>
    </View>
  </View>

  {/* Critical warning */}
  <View
    style={{
      marginTop: 10,
      backgroundColor: "#fee2e2",
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#fecaca",
    }}
  >
    <Text style={{ color: "#b91c1c" }}>
      ⚠ Critical stock level – Immediate replenishment needed
    </Text>
  </View>
</View>
<View
  style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 20,
  }}
>
  {/* Header */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    }}
  >
    <View>
      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
        Lupin Diabetes Care
      </Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Movement: Fast</Text>
    </View>

    <View
      style={{
        backgroundColor: "#fee2e2",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#fecaca",
      }}
    >
      <Text style={{ color: "#b91c1c", fontWeight: "700" }}>Critical</Text>
    </View>
  </View>

  {/* Stock row */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#f8fafc",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginTop: 10,
    }}
  >
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Current</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>1200</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Minimum</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>2500</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Last Order</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>4000</Text>
    </View>
  </View>

  {/* Critical warning */}
  <View
    style={{
      marginTop: 10,
      backgroundColor: "#fee2e2",
      padding: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#fecaca",
    }}
  >
    <Text style={{ color: "#b91c1c" }}>
      ⚠ Critical stock level – Immediate replenishment needed
    </Text>
  </View>
</View>
{/* INVENTORY CARD — Lupin Pain Relief */}
<View
  style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 20,
  }}
>
  {/* Header */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    }}
  >
    <View>
      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
        Lupin Pain Relief
      </Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Movement: Medium</Text>
    </View>

    <View
      style={{
        backgroundColor: "#dcfce7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#bbf7d0",
      }}
    >
      <Text style={{ color: "#15803d", fontWeight: "700" }}>Adequate</Text>
    </View>
  </View>

  {/* Stock row */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#f8fafc",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginTop: 10,
    }}
  >
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Current</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>3800</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Minimum</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>1500</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Last Order</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>2000</Text>
    </View>
  </View>
</View>

{/* INVENTORY CARD — Lupin Respiratory Aid */}
<View
  style={{
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    padding: 16,
    marginBottom: 40,
  }}
>
  {/* Header */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    }}
  >
    <View>
      <Text style={{ fontWeight: "700", color: "#0f172a" }}>
        Lupin Respiratory Aid
      </Text>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Movement: Medium</Text>
    </View>

    <View
      style={{
        backgroundColor: "#dcfce7",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: "#bbf7d0",
      }}
    >
      <Text style={{ color: "#15803d", fontWeight: "700" }}>Adequate</Text>
    </View>
  </View>

  {/* Stock row */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      backgroundColor: "#f8fafc",
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      marginTop: 10,
    }}
  >
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Current</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>5500</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Minimum</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>3000</Text>
    </View>

    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#6b7280", fontSize: 12 }}>Last Order</Text>
      <Text style={{ fontWeight: "700", marginTop: 4 }}>3500</Text>
    </View>
  </View>
</View>

  </View>
  
)}
{activeTab === "hq" && (
  <View style={{ marginTop: 8 }}>

  {/* ========================================= */}
  {/*             HQ HEADER CARD                */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#F0F9FF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#DBEAFE",
      padding: 18,
      marginBottom: 16,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
      <View
        style={{
          width: 36,
          height: 36,
          borderRadius: 999,
          backgroundColor: "#2563EB20",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <MaterialIcons name="inventory" size={22} color="#2563EB" />
      </View>

      <Text style={{ fontSize: 17, fontWeight: "700", color: "#0F172A" }}>
        Headquarter Stock Availability
      </Text>
    </View>

    <Text style={{ marginTop: 6, color: "#6B7280", fontSize: 13 }}>
      Real-time inventory status at HQ warehouse to manage stockist expectations
    </Text>
  </View>

  {/* ========================================= */}
  {/*            SUMMARY CARDS (3)              */}
  {/* ========================================= */}
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      marginBottom: 20,
    }}
  >
    {/* AVAILABLE */}
    <View
      style={{
        flexBasis: "32%",
        flexGrow: 1,
        backgroundColor: "#ECFDF5",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D1FAE5",
        padding: 16,
        minWidth: 120,
      }}
    >
      <Text style={{ color: "#065F46", fontSize: 13 }}>Available</Text>
      <Text style={{ marginTop: 4, fontSize: 28, fontWeight: "800", color: "#065F46" }}>
        2
      </Text>
    </View>

    {/* LOW STOCK */}
    <View
      style={{
        flexBasis: "32%",
        flexGrow: 1,
        backgroundColor: "#FFFBEB",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FDE68A",
        padding: 16,
        minWidth: 120,
      }}
    >
      <Text style={{ color: "#92400E", fontSize: 13 }}>Low Stock</Text>
      <Text style={{ marginTop: 4, fontSize: 28, fontWeight: "800", color: "#92400E" }}>
        2
      </Text>
    </View>

    {/* CRITICAL/OOS */}
    <View
      style={{
        flexBasis: "32%",
        flexGrow: 1,
        backgroundColor: "#FEF2F2",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FECACA",
        padding: 16,
        minWidth: 120,
      }}
    >
      <Text style={{ color: "#B91C1C", fontSize: 13 }}>Critical/OOS</Text>
      <Text style={{ marginTop: 4, fontSize: 28, fontWeight: "800", color: "#B91C1C" }}>
        2
      </Text>
    </View>
  </View>

  {/* ========================================= */}
  {/*       PRODUCT 1 — LUPIN CARDIO-X         */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#FDE68A",
      padding: 16,
      marginBottom: 20,
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          Lupin Cardio-X 500mg
        </Text>

        <View
          style={{
            backgroundColor: "#F3F4F6",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 11, color: "#374151" }}>Cardiology</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FFFBEB",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#FDE68A",
        }}
      >
        <Text style={{ color: "#CA8A04", fontWeight: "700", fontSize: 12 }}>
          Low Stock
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#6B7280", fontSize: 12 }}>HQ Stock</Text>
        <Text style={{ marginTop: 4, fontWeight: "700" }}>15,000 units</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: "#6B7280", fontSize: 12 }}>Min. Required</Text>
        <Text style={{ marginTop: 4, fontWeight: "700" }}>50,000 units</Text>
      </View>
    </View>

    <View
      style={{
        backgroundColor: "#FFFBEB",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#FDE68A",
        marginTop: 14,
      }}
    >
      <Text style={{ color: "#92400E", fontWeight: "700" }}>
        ⚠ Low Stock – Replenishment in progress
      </Text>
      <Text style={{ marginTop: 6, color: "#78350F", fontSize: 12 }}>
        🗓 Expected: Nov 18, 2024
      </Text>
      <Text style={{ color: "#78350F", fontSize: 12 }}>👥 12 stockists affected</Text>
    </View>

    <Text style={{ marginTop: 12, fontSize: 11, color: "#6B7280" }}>
      Updated: 2 hours ago
    </Text>
  </View>

  {/* ========================================= */}
  {/*      PRODUCT 2 — DIABETES CARE (OOS)      */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#FECACA",
      padding: 16,
      marginBottom: 20,
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          Lupin Diabetes Care 1000mg
        </Text>

        <View
          style={{
            backgroundColor: "#F3F4F6",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 11 }}>Diabetology</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FEE2E2",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#FECACA",
        }}
      >
        <Text style={{ color: "#B91C1C", fontWeight: "700", fontSize: 12 }}>
          Out of Stock
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: "#6B7280", fontSize: 12 }}>HQ Stock</Text>
        <Text style={{ color: "#B91C1C", marginTop: 4, fontWeight: "700" }}>
          0 units
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: "#6B7280", fontSize: 12 }}>Min. Required</Text>
        <Text style={{ marginTop: 4, fontWeight: "700" }}>60,000 units</Text>
      </View>
    </View>

    <View
      style={{
        backgroundColor: "#FEE2E2",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#FECACA",
        marginTop: 14,
      }}
    >
      <Text style={{ color: "#B91C1C", fontWeight: "700" }}>
        ⚠ Out of Stock – Cannot fulfill orders
      </Text>

      <Text style={{ marginTop: 6, color: "#7F1D1D", fontSize: 12 }}>
        🗓 Expected: Nov 20, 2024
      </Text>

      <Text style={{ color: "#7F1D1D", fontSize: 12 }}>👥 18 stockists affected</Text>
    </View>

    <Text style={{ marginTop: 12, fontSize: 11, color: "#6B7280" }}>
      Updated: 1 hour ago
    </Text>
  </View>

  {/* ========================================= */}
  {/*   PRODUCT 3 — ANTIBIOTIC PLUS (CRITICAL)  */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#FFFAF5",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#FDE6C8",
      padding: 16,
      marginBottom: 20,
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          Lupin Antibiotic Plus
        </Text>

        <View
          style={{
            backgroundColor: "#F3F4F6",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 11 }}>Infectious Disease</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FFF7ED",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#FDBA74",
        }}
      >
        <Text style={{ color: "#EA580C", fontWeight: "700", fontSize: 12 }}>
          Critical
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>HQ Stock</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>5,000 units</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>Min. Required</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>40,000 units</Text>
      </View>
    </View>

    <View
      style={{
        backgroundColor: "#FEF3E6",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#FCD9A5",
        marginTop: 14,
      }}
    >
      <Text style={{ color: "#C2410C", fontWeight: "700" }}>
        ⚠ Critical Stock Level – Limited supply
      </Text>
      <Text style={{ marginTop: 6, color: "#7C2D12", fontSize: 12 }}>
        🗓 Expected: Nov 16, 2024
      </Text>
      <Text style={{ color: "#7C2D12", fontSize: 12 }}>👥 8 stockists affected</Text>
    </View>

    <Text style={{ marginTop: 12, fontSize: 11, color: "#6B7280" }}>
      Updated: 30 minutes ago
    </Text>
  </View>

  {/* ========================================= */}
  {/*      PRODUCT 4 — PAIN RELIEF (GREEN)      */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#F3FFF8",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#C7F9E5",
      padding: 16,
      marginBottom: 20,
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>
          Lupin Pain Relief
        </Text>

        <View
          style={{
            backgroundColor: "#F3F4F6",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 11 }}>Pain Management</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#DCFCE7",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#BBF7D0",
        }}
      >
        <Text style={{ color: "#059669", fontWeight: "700", fontSize: 12 }}>
          Available
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>HQ Stock</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>85,000 units</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>Min. Required</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>30,000 units</Text>
      </View>
    </View>

    <View
      style={{
        backgroundColor: "#ECFDF5",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        borderWidth: 1,
        borderColor: "#D1FAE5",
        marginTop: 14,
      }}
    >
      <MaterialIcons name="check-circle" size={14} color="#10B981" />
      <Text style={{ color: "#059669", fontSize: 12 }}>Stock Available</Text>
    </View>

    <Text style={{ marginTop: 12, fontSize: 11, color: "#6B7280" }}>
      Updated: 5 hours ago
    </Text>
  </View>

  {/* ========================================= */}
  {/*      PRODUCT 5 — BP CONTROL (GREEN)       */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#F3FFF8",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#C7F9E5",
      padding: 16,
      marginBottom: 20,
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700" }}>Lupin BP Control</Text>

        <View
          style={{
            backgroundColor: "#F3F4F6",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 11 }}>Hypertension</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#DCFCE7",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#BBF7D0",
        }}
      >
        <Text style={{ color: "#059669", fontWeight: "700", fontSize: 12 }}>
          Available
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>HQ Stock</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>120,000 units</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>Min. Required</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>45,000 units</Text>
      </View>
    </View>

    <View
      style={{
        backgroundColor: "#ECFDF5",
        borderRadius: 999,
        paddingHorizontal: 12,
        paddingVertical: 6,
        alignSelf: "flex-end",
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        borderWidth: 1,
        borderColor: "#D1FAE5",
        marginTop: 14,
      }}
    >
      <MaterialIcons name="check-circle" size={14} color="#10B981" />
      <Text style={{ color: "#059669", fontSize: 12 }}>Stock Available</Text>
    </View>

    <Text style={{ marginTop: 12, fontSize: 11, color: "#6B7280" }}>
      Updated: 3 hours ago
    </Text>
  </View>

  {/* ========================================= */}
  {/*   PRODUCT 6 — VITAMIN COMPLEX (LOW)       */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#FFFEF5",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#FDE68A",
      padding: 16,
      marginBottom: 20,
    }}
  >
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#0F172A" }}>
          Lupin Vitamin Complex
        </Text>

        <View
          style={{
            backgroundColor: "#F3F4F6",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ fontSize: 11, color: "#374151" }}>Nutraceuticals</Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: "#FEF9C3",
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          borderWidth: 1,
          borderColor: "#FDE68A",
        }}
      >
        <Text style={{ color: "#CA8A04", fontWeight: "700", fontSize: 12 }}>
          Low Stock
        </Text>
      </View>
    </View>

    <View style={{ flexDirection: "row", gap: 12, marginTop: 10 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>HQ Stock</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>22,000 units</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, color: "#6B7280" }}>Min. Required</Text>
        <Text style={{ fontWeight: "700", marginTop: 4 }}>35,000 units</Text>
      </View>
    </View>

    <View
      style={{
        backgroundColor: "#FEF9C3",
        borderRadius: 12,
        padding: 14,
        borderWidth: 1,
        borderColor: "#FDE68A",
        marginTop: 14,
      }}
    >
      <Text style={{ color: "#B45309", fontWeight: "700" }}>
        ⚠ Low Stock – Replenishment in progress
      </Text>

      <Text style={{ marginTop: 6, color: "#78350F", fontSize: 12 }}>
        🗓 Expected: Nov 19, 2024
      </Text>

      <Text style={{ color: "#78350F", fontSize: 12 }}>👥 5 stockists affected</Text>
    </View>

    <Text style={{ marginTop: 12, fontSize: 11, color: "#6B7280" }}>
      Updated: 4 hours ago
    </Text>
  </View>

  {/* ========================================= */}
  {/*       SUPPLY CHAIN TIP — BLUE BOX         */}
  {/* ========================================= */}
  <View
    style={{
      backgroundColor: "#EFF6FF",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#DBEAFE",
      padding: 16,
      marginBottom: 50,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <MaterialIcons name="lightbulb" size={18} color="#2563EB" />
      <Text style={{ fontWeight: "700", color: "#1E40AF", fontSize: 14 }}>
        Supply Chain Tip
      </Text>
    </View>

    <Text
      style={{
        marginTop: 6,
        color: "#1E3A8A",
        fontSize: 13,
        lineHeight: 18,
      }}
    >
      Check HQ stock availability before promising delivery timelines to stockists. 
      Set realistic expectations to maintain trust and credibility.
    </Text>
  </View>

</View>

)}
{activeTab === "schemes" && (
  <View style={{ marginTop: 8 }}>
      {activeTab === "schemes" && (
  <View style={{ marginTop: 8 }}>

    {/* HEADER */}
    <View
      style={{
        backgroundColor: "#FDF4FF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#F3E8FF",
        padding: 18,
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <MaterialIcons name="card-giftcard" size={22} color="#A855F7" />
        <Text style={{ fontSize: 17, fontWeight: "700", color: "#7E22CE" }}>
          Trade Schemes & Incentives
        </Text>
      </View>

      <Text style={{ marginTop: 6, color: "#6B7280", fontSize: 13 }}>
        Share current promotions to boost stockist orders
      </Text>
    </View>

    {/* ================================================= */}
    {/* FIRST SCHEME CARD */}
    {/* ================================================= */}
    <View
      style={{
        backgroundColor: "#FCF8FF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E9D5FF",
        padding: 16,
        marginBottom: 22,
      }}
    >
      {/* TITLE */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#4B0082" }}>
          Bulk Order Incentive - Q4 2024
        </Text>

        <View
          style={{
            backgroundColor: "#DCFCE7",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#059669", fontSize: 11, fontWeight: "700" }}>
            Discount
          </Text>
        </View>
      </View>

      <Text style={{ marginTop: 4, color: "#6B7280", fontSize: 13 }}>
        Additional 5% discount on orders above ₹10 Lakhs
      </Text>

      {/* BENEFIT BOX */}
      {/* BENEFIT BOX */}
<View
  style={{
    backgroundColor: "#F9F5FF",
    marginTop: 14,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  }}
>
  {/* TOP ROW = TWO COLUMNS */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start", // 🔥 FIX: aligns value to the top label (Benefit)
    }}
  >
    {/* LEFT COLUMN */}
    <View style={{ width: "50%" }}>
      <Text style={{ color: "#6B7280", fontSize: 12 }}>Benefit:</Text>

      <Text
        style={{
          color: "#6B7280",
          fontSize: 12,
          marginTop: 8,
        }}
      >
        Min. Order Value:
      </Text>
    </View>

    {/* RIGHT COLUMN */}
    <View
      style={{
        width: "45%",
        alignItems: "flex-end", // aligns to right
      }}
    >
      <Text
        style={{
          color: "#7C3AED",
          fontWeight: "700",
          fontSize: 14,
        }}
      >
        5%
      </Text>

      <Text
        style={{
          color: "#7C3AED",
          fontWeight: "700",
          fontSize: 13,
          marginTop: 4,
        }}
      >
        ₹10.0L
      </Text>
    </View>
  </View>
</View>


      {/* APPLICABLE PRODUCTS */}
      <Text style={{ marginTop: 16, fontSize: 12, color: "#6B7280" }}>
        Applicable Products:
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
        <View
          style={{
            backgroundColor: "#F3E8FF",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#7C3AED", fontSize: 12 }}>All Lupin Products</Text>
        </View>
      </View>

      {/* FOOTER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialIcons name="schedule" size={14} color="#6B7280" />
          <Text style={{ color: "#6B7280", fontSize: 12 }}>Valid till: Dec 31, 2024</Text>
        </View>

        <Pressable
          style={{
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColor: "#D8B4FE",
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#7C3AED", fontWeight: "600" }}>Share Scheme</Text>
        </Pressable>
      </View>
    </View>

    {/* ================================================= */}
    {/* SECOND SCHEME CARD */}
    {/* ================================================= */}
    <View
      style={{
        backgroundColor: "#FCF8FF",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E9D5FF",
        padding: 16,
        marginBottom: 22,
      }}
    >
      {/* TITLE */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <Text style={{ fontSize: 15, fontWeight: "700", color: "#4B0082" }}>
          Fast Moving Products - Free Goods
        </Text>

        <View
          style={{
            backgroundColor: "#E0E7FF",
            paddingHorizontal: 8,
            paddingVertical: 3,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#4F46E5", fontSize: 11, fontWeight: "700" }}>
            Free Goods
          </Text>
        </View>
      </View>

      <Text style={{ marginTop: 4, color: "#6B7280", fontSize: 13 }}>
        Buy 100 Get 10 Free on Cardio-X and Diabetes Care
      </Text>

      {/* BENEFIT BOX */}
      {/* BENEFIT BOX */}
<View
  style={{
    backgroundColor: "#F9F5FF",
    marginTop: 14,
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  }}
>
  {/* TOP ROW = TWO COLUMNS */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start", // 🔥 FIX: aligns value to the top label (Benefit)
    }}
  >
    {/* LEFT COLUMN */}
    <View style={{ width: "50%" }}>
      <Text style={{ color: "#6B7280", fontSize: 12 }}>Benefit:</Text>

      <Text
        style={{
          color: "#6B7280",
          fontSize: 12,
          marginTop: 8,
        }}
      >
        Min. Order Value:
      </Text>
    </View>

    {/* RIGHT COLUMN */}
    <View
      style={{
        width: "45%",
        alignItems: "flex-end", // aligns to right
      }}
    >
      <Text
        style={{
          color: "#7C3AED",
          fontWeight: "700",
          fontSize: 14,
        }}
      >
        5%
      </Text>

      <Text
        style={{
          color: "#7C3AED",
          fontWeight: "700",
          fontSize: 13,
          marginTop: 4,
        }}
      >
        ₹10.0L
      </Text>
    </View>
  </View>
</View>


      {/* APPLICABLE PRODUCTS */}
      <Text style={{ marginTop: 16, fontSize: 12, color: "#6B7280" }}>
        Applicable Products:
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
        <View
          style={{
            backgroundColor: "#F3E8FF",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#7C3AED", fontSize: 12 }}>Lupin Cardio-X</Text>
        </View>

        <View
          style={{
            backgroundColor: "#F3E8FF",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#7C3AED", fontSize: 12 }}>Lupin Diabetes Care</Text>
        </View>
      </View>

      {/* FOOTER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 16,
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
          <MaterialIcons name="schedule" size={14} color="#6B7280" />
          <Text style={{ color: "#6B7280", fontSize: 12 }}>Valid till: Nov 30, 2024</Text>
        </View>

        <Pressable
          style={{
            backgroundColor: "#FFF",
            borderWidth: 1,
            borderColor: "#D8B4FE",
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "#7C3AED", fontWeight: "600" }}>Share Scheme</Text>
        </Pressable>
      </View>
    </View>
    {/* ================================================= */}
{/* THIRD SCHEME CARD — EXTENDED CREDIT TERMS */}
{/* ================================================= */}
<View
  style={{
    backgroundColor: "#FCF8FF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9D5FF",
    padding: 16,
    marginBottom: 22,
  }}
>
  {/* TITLE */}
  <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
    <Text style={{ fontSize: 15, fontWeight: "700", color: "#4B0082" }}>
      Extended Credit Terms
    </Text>

    {/* Orange Tag */}
    <View
      style={{
        backgroundColor: "#FDEAD7",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 999,
      }}
    >
      <Text style={{ color: "#C2410C", fontSize: 11, fontWeight: "700" }}>
        Credit Terms
      </Text>
    </View>
  </View>

  <Text style={{ marginTop: 4, color: "#6B7280", fontSize: 13 }}>
    60 days credit instead of 45 days for premium stockists
  </Text>

  {/* BENEFIT BOX */}
  <View
    style={{
      backgroundColor: "#F9F5FF",
      marginTop: 14,
      padding: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#E9D5FF",
    }}
  >
    {/* LEFT + RIGHT aligned EXACTLY like your screenshot */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* LEFT COLUMN */}
      <View style={{ width: "50%" }}>
        <Text style={{ color: "#6B7280", fontSize: 12 }}>Benefit:</Text>
        <Text style={{ color: "#6B7280", fontSize: 12, marginTop: 8 }}>
          Min. Order Value:
        </Text>
      </View>

      {/* RIGHT COLUMN */}
      <View style={{ width: "45%", alignItems: "flex-end" }}>
        <Text
          style={{
            color: "#7C3AED",
            fontWeight: "700",
            fontSize: 14,
          }}
        >
          60 Days
        </Text>

        <Text
          style={{
            color: "#7C3AED",
            fontWeight: "700",
            fontSize: 13,
            marginTop: 4,
          }}
        >
          ₹20.0L
        </Text>
      </View>
    </View>
  </View>

  {/* APPLICABLE PRODUCTS */}
  <Text style={{ marginTop: 16, fontSize: 12, color: "#6B7280" }}>
    Applicable Products:
  </Text>

  <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
    <View
      style={{
        backgroundColor: "#F3E8FF",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
      }}
    >
      <Text style={{ color: "#7C3AED", fontSize: 12 }}>All Products</Text>
    </View>
  </View>

  {/* FOOTER */}
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      alignItems: "center",
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
      <MaterialIcons name="schedule" size={14} color="#6B7280" />
      <Text style={{ color: "#6B7280", fontSize: 12 }}>
        Valid till: Dec 15, 2024
      </Text>
    </View>

    <Pressable
      style={{
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#D8B4FE",
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 8,
      }}
    >
      <Text style={{ color: "#7C3AED", fontWeight: "600" }}>Share Scheme</Text>
    </Pressable>
  </View>
</View>

  </View>
)}

  </View>
)}


          {/* Stockist cards */}
          {activeTab === "stockists" && (
          <View style={{ gap: 14 }}>
            {STOCKISTS.map((s) => (
              <View key={s.id} style={{ backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: "#eef2f7" }}>
                {/* top row */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                      <Text style={{ fontSize: 16, fontWeight: "800", color: "#0f172a" }}>{s.name}</Text>
                      {s.tag && (
                        <View style={{ backgroundColor: "#f3e8ff", borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 }}>
                          <Text style={{ color: "#7c3aed", fontWeight: "700", fontSize: 12 }}>{s.tag}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={{ color: "#6b7280", marginTop: 6 }}>{s.group}</Text>
                  </View>

                  {/* pending badge if any */}
                  <View style={{ marginLeft: 12 }}>
                    {s.pendingOrders && s.pendingOrders > 0 ? (
                      <View style={{ backgroundColor: "#fffbeb", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#fef3c7" }}>
                        <Text style={{ color: "#92400e", fontWeight: "700" }}>{s.pendingOrders} Pending</Text>
                      </View>
                    ) : null}
                  </View>
                </View>

                {/* contact */}
                <View style={{ marginTop: 12 }}>
                  <Text style={{ color: "#6b7280" }}>📍 {s.location}</Text>
                  <Text style={{ color: "#6b7280", marginTop: 6 }}>📞 {s.phone}</Text>
                  <Text style={{ color: "#6b7280", marginTop: 6 }}>⏱️ Last order: {s.lastOrder}</Text>
                </View>

                {/* divider */}
                <View style={{ height: 1, backgroundColor: "#f1f5f9", marginVertical: 16 }} />

                {/* footer row: left & right stats + full width button */}
                <View>
                  <View style={{ flexDirection: isPhone ? "column" : "row", justifyContent: "space-between", marginBottom: 12 }}>
                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Last Order Value</Text>
                      <Text style={{ color: "#059669", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.lastOrderValue)}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Monthly Volume</Text>
                      <Text style={{ color: "#1e3a8a", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.monthlyVolume)}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Outstanding</Text>
                      <Text style={{ color: "#ef4444", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.outstanding)}</Text>
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={{ color: "#6b7280", fontSize: 13 }}>Credit Limit</Text>
                      <Text style={{ color: "#7c3aed", fontWeight: "800", marginTop: 6 }}>{formatINRShort(s.creditLimit)}</Text>
                    </View>
                  </View>

                  {/* FULL WIDTH BUTTON */}
                  <Pressable
                    style={{
                      backgroundColor: "#ef4444",
                      // simulate a red gradient feel by using a dark red border at bottom
                      borderRadius: 8,
                      paddingVertical: 14,
                      alignItems: "center",
                      width: "100%",
                      alignSelf: "center",
                      shadowColor: "#ef4444",
                      shadowOpacity: 0.12,
                      shadowRadius: 6,
                    }}
                    onPress={() => {
                      setSelectedStockist({
                        name: s.name,
                        group: s.group,
                        location: s.location,
                        monthlyVolume: s.monthlyVolume,
                        pending: s.pendingOrders ?? 0,
                      });
                      setVisitModalVisible(true);
                    }}
                  >
                    <Text style={{ color: "white", fontWeight: "800" }}>+ Start Stockist Visit</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>)}
          {activeTab === "demand" && (
  <View style={{ marginTop: 8 }}>

    {/* ========================= */}
    {/*   DEMAND HEADER SECTION   */}
    {/* ========================= */}
    <View
      style={{
        backgroundColor: "#ECFDF5",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#D1FAE5",
        padding: 16,
        marginBottom: 20,
        flexDirection: "column",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <MaterialIcons name="insights" size={22} color="#059669" />
        <Text style={{ fontWeight: "700", fontSize: 16, color: "#065F46" }}>
          Doctor-Chemist Demand Analysis
        </Text>
      </View>

      <Text style={{ marginTop: 6, color: "#6B7280", fontSize: 13 }}>
        Align stockist inventory with market demand
      </Text>
    </View>

    {/* ========================= */}
    {/*    RISING DEMAND BLOCKS   */}
    {/* ========================= */}

    {[
      {
        title: "Lupin Cardio-X 10mg",
        chemistOrdering: 28,
        monthlyDemand: 8500,
        currentStock: 2500,
        replenishment: 6000,
        trend: "Rising",
      },
      {
        title: "Lupin Diabetes Care",
        chemistOrdering: 25,
        monthlyDemand: 7200,
        currentStock: 1200,
        replenishment: 6000,
        trend: "Rising",
      },
    ].map((item, i) => (
      <View
        key={i}
        style={{
          marginBottom: 26,
          backgroundColor: "#FFFFFF",
          borderRadius: 12,
          borderWidth: 1,
          borderColor: "#E5E7EB",
          padding: 16,
        }}
      >
        {/* TITLE + TREND */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "700", fontSize: 15, color: "#0F172A" }}>
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ECFDF5",
              paddingHorizontal: 10,
              paddingVertical: 4,
              borderRadius: 999,
              borderWidth: 1,
              borderColor: "#D1FAE5",
              gap: 4,
            }}
          >
            <MaterialIcons name="trending-up" size={16} color="#059669" />
            <Text style={{ color: "#059669", fontWeight: "600" }}>
              {item.trend}
            </Text>
          </View>
        </View>

        {/* ROW: ORDERING + DEMAND */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          {/* Chemists Ordering */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#ECFEFF",
              borderRadius: 10,
              padding: 14,
              borderWidth: 1,
              borderColor: "#BAF2F7",
            }}
          >
            <Text style={{ color: "#0F172A", fontSize: 12 }}>
              Chemists Ordering
            </Text>
            <Text
              style={{ color: "#0284C7", fontWeight: "700", marginTop: 4 }}
            >
              {item.chemistOrdering}
            </Text>
          </View>

          {/* Monthly Demand */}
          <View
            style={{
              flex: 1,
              backgroundColor: "#F5F3FF",
              borderRadius: 10,
              padding: 14,
              borderWidth: 1,
              borderColor: "#DDD6FE",
            }}
          >
            <Text style={{ color: "#0F172A", fontSize: 12 }}>
              Monthly Demand
            </Text>
            <Text
              style={{ color: "#7C3AED", fontWeight: "700", marginTop: 4 }}
            >
              {item.monthlyDemand}
            </Text>
          </View>
        </View>

        {/* CURRENT STOCK */}
        <View
          style={{
            backgroundColor: "#FEF3C7",
            borderRadius: 10,
            padding: 14,
            borderWidth: 1,
            borderColor: "#FDE68A",
            marginTop: 12,
          }}
        >
          <Text style={{ color: "#92400E", fontSize: 12 }}>Current Stock</Text>
          <Text
            style={{ color: "#B45309", fontWeight: "700", marginTop: 4 }}
          >
            {item.currentStock}
          </Text>
        </View>

        {/* HR */}
        <View
          style={{
            height: 1,
            backgroundColor: "#E5E7EB",
            marginVertical: 18,
          }}
        />

        {/* REPLENISHMENT */}
        <View
          style={{
            backgroundColor: "#FEF2F2",
            borderRadius: 10,
            padding: 14,
            borderWidth: 1,
            borderColor: "#FECACA",
          }}
        >
          <Text style={{ color: "#991B1B", fontWeight: "700" }}>
            Replenishment Needed
          </Text>
          <Text style={{ fontSize: 11, color: "#B91C1C", marginTop: 2 }}>
            Based on demand vs current stock
          </Text>

          <Text
            style={{
              color: "#DC2626",
              fontWeight: "800",
              marginTop: 8,
              textAlign: "right",
              fontSize: 16,
            }}
          >
            {item.replenishment} units
          </Text>
        </View>
      </View>
    ))}

    {/* ========================= */}
    {/*   SUPPLY CHAIN ISSUES    */}
    {/* ========================= */}

    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
      }}
    >
      <MaterialIcons name="warning" size={18} color="#DC2626" />
      <Text style={{ fontWeight: "700", fontSize: 15, color: "#991B1B" }}>
        Supply Chain Issues
      </Text>
    </View>

    {/* 🔴 HIGH PRIORITY ISSUE */}
    <View
      style={{
        backgroundColor: "#FEF2F2",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FECACA",
        padding: 16,
        marginBottom: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 15, color: "#991B1B" }}>
          Lupin Diabetes Care
        </Text>

        <View
          style={{
            backgroundColor: "#FEE2E2",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "#FCA5A5",
          }}
        >
          <Text style={{ color: "#B91C1C", fontWeight: "600", fontSize: 12 }}>
            Shortage
          </Text>
        </View>
      </View>

      <Text style={{ color: "#7F1D1D", marginTop: 10 }}>
        Unable to fulfill chemist orders due to low stock. High demand from
        Dr. Sharma and Dr. Mehta patients.
      </Text>

      {/* Divider */}
      <View
        style={{
          height: 1,
          backgroundColor: "#FECACA",
          marginVertical: 14,
        }}
      />

      {/* Status Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: "#FEE2E2",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#DC2626", fontWeight: "600", fontSize: 12 }}>
            Open
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#FEE2E2",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#B91C1C", fontWeight: "600", fontSize: 12 }}>
            High Priority
          </Text>
        </View>
      </View>
    </View>

    {/* 🟡 MEDIUM PRIORITY ISSUE */}
    <View
      style={{
        backgroundColor: "#FFFBEB",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#FDE68A",
        padding: 16,
        marginBottom: 30,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "700", fontSize: 15, color: "#92400E" }}>
          Lupin Cardio-X 10mg
        </Text>

        <View
          style={{
            backgroundColor: "#FEF3C7",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: "#FDE68A",
          }}
        >
          <Text style={{ color: "#CA8A04", fontWeight: "600", fontSize: 12 }}>
            Delay
          </Text>
        </View>
      </View>

      <Text style={{ color: "#78350F", marginTop: 10 }}>
        Delivery delayed by 3 days affecting 5 chemist orders.
      </Text>

      <View
        style={{
          height: 1,
          backgroundColor: "#FDE68A",
          marginVertical: 14,
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            backgroundColor: "#FEF3C7",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#A16207", fontSize: 12, fontWeight: "600" }}>
            In Progress
          </Text>
        </View>

        <View
          style={{
            backgroundColor: "#FEF3C7",
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: 999,
          }}
        >
          <Text style={{ color: "#CA8A04", fontSize: 12, fontWeight: "600" }}>
            Medium Priority
          </Text>
        </View>
      </View>
    </View>
  </View>
)}


        </View>
        <StockistVisitModal
  visible={visitModalVisible}
  stockist={selectedStockist}
  onClose={() => setVisitModalVisible(false)}
  onSubmit={() => {
    setVisitModalVisible(false);
  }}
/>

      </ScrollView>
    </SafeAreaView>
  );
}
