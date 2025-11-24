// App.tsx
// Expo + React Native + TypeScript
// Full file with:
// ✔ Tabs
// ✔ Chemists List
// ✔ Visit Modal
// ✔ Rx Trends UI (matching your screenshot)
// ✔ Single file as requested

import VisitModal from "@/components/VisitModal";
import COLORS from "@/constants/LupinColors";
import { Feather, FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { JSX, useState } from "react";

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  View,
  useWindowDimensions
} from "react-native";

/* ---------- Types ---------- */
type Chemist = {
  id: string;
  name: string;
  owner: string;
  tier: "A" | "B" | "C";
  location: string;
  phone: string;
  lastVisit: string;
  totalPurchase: number;
  outstanding: number;
  stockStatus: "Good Stock" | "Low Stock" | "Critical Stock";
};

/* ---------- Data ---------- */
const CHEMISTS: Chemist[] = [
  {
    id: "c1",
    name: "Kumar Medical Store",
    owner: "Rajesh Kumar",
    tier: "A",
    location: "Breach Candy, Mumbai",
    phone: "+91 98765 43210",
    lastVisit: "2 days ago",
    totalPurchase: 245000,
    outstanding: 12000,
    stockStatus: "Good Stock",
  },
  {
    id: "c2",
    name: "City Pharmacy",
    owner: "Priya Sharma",
    tier: "A",
    location: "Bandra West, Mumbai",
    phone: "+91 98765 43211",
    lastVisit: "5 days ago",
    totalPurchase: 320000,
    outstanding: 0,
    stockStatus: "Low Stock",
  },
  {
    id: "c3",
    name: "HealthPlus Chemist",
    owner: "Amit Patel",
    tier: "B",
    location: "Andheri East, Mumbai",
    phone: "+91 98765 43212",
    lastVisit: "1 week ago",
    totalPurchase: 180000,
    outstanding: 25000,
    stockStatus: "Critical Stock",
  },
  {
    id: "c4",
    name: "Wellness Pharmacy",
    owner: "Neha Desai",
    tier: "A",
    location: "Juhu, Mumbai",
    phone: "+91 98765 43213",
    lastVisit: "3 days ago",
    totalPurchase: 290000,
    outstanding: 8000,
    stockStatus: "Good Stock",
  },
  {
    id: "c5",
    name: "Mehta Medicals",
    owner: "Suresh Mehta",
    tier: "B",
    location: "Worli, Mumbai",
    phone: "+91 98765 43214",
    lastVisit: "10 days ago",
    totalPurchase: 150000,
    outstanding: 15000,
    stockStatus: "Low Stock",
  },
];

/* ---------- RX TRENDS DATA -----------*/
const RX_DATA = [
  {
    doctor: "Dr. Sharma",
    speciality: "Cardiologist",
    product: "Lupin Cardio-X 10mg",
    quantity: 45,
    chemist: "Kumar Medical Store",
    daysAgo: "2 days ago",
  },
  {
    doctor: "Dr. Gupta",
    speciality: "General Physician",
    product: "Lupin Antibiotic Plus",
    quantity: 30,
    chemist: "City Pharmacy",
    daysAgo: "3 days ago",
  },
  {
    doctor: "Dr. Mehta",
    speciality: "Diabetologist",
    product: "Lupin Diabetes Care",
    quantity: 60,
    chemist: "Kumar Medical Store",
    daysAgo: "1 day ago",
  },
  {
    doctor: "Dr. Singh",
    speciality: "Orthopedic",
    product: "Lupin Pain Relief",
    quantity: 25,
    chemist: "Wellness Pharmacy",
    daysAgo: "4 days ago",
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
function formatINR(n: number) {
  return `₹${n.toLocaleString("en-IN")}`;
}

function StatusBadge({ status }: { status: Chemist["stockStatus"] }) {
  const styles = {
    "Good Stock": { bg: "#ecfdf5", color: "#059669", border: "#d1fae5" },
    "Low Stock": { bg: "#fffbeb", color: "#b45309", border: "#fef3c7" },
    "Critical Stock": { bg: "#fff1f2", color: "#b91c1c", border: "#fee2e2" },
  } as const;

  const s = styles[status];
  return (
    <View
      style={{
        backgroundColor: s.bg,
        borderColor: s.border,
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
      }}
    >
      <Text style={{ color: s.color, fontWeight: "700", fontSize: 12 }}>
        {status}
      </Text>
    </View>
  );
}

/* ---------- Rx Trends Component (INLINE) ---------- */
function RxTrendsUI() {
  return (
    <View style={{ marginTop: 10, gap: 16 }}>
      {/* Header */}
      <View
        style={{
          backgroundColor: "#eef2ff",
          padding: 16,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#e0e7ff",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#1e3a8a",
            marginBottom: 4,
          }}
        >
          Doctor Prescription Trends
        </Text>
        <Text style={{ color: "#475569", fontSize: 13 }}>
          Track prescriptions from recent doctor visits to identify opportunities
        </Text>
      </View>

      {/* Doctor Cards */}
      {RX_DATA.map((d, idx) => (
        <View
          key={idx}
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            padding: 16,
          }}
        >
          {/* Top */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <View>
              <Text
                style={{ fontWeight: "700", color: "#1e40af", fontSize: 15 }}
              >
                {d.doctor}
              </Text>
              <Text style={{ color: "#6b7280", marginTop: 2 }}>
                {d.speciality}
              </Text>
            </View>

            <Text style={{ color: "#6b7280", fontSize: 12 }}>{d.daysAgo}</Text>
          </View>

          {/* Product Box */}
          <View
            style={{
              backgroundColor: "#ecfdf5",
              borderWidth: 1,
              borderColor: "#99f6e4",
              padding: 14,
              borderRadius: 8,
              marginBottom: 12,
            }}
          >
            <Text style={{ color: "#0f172a", fontWeight: "600" }}>
              {d.product}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 6,
                marginTop: 6,
              }}
            >
              <MaterialIcons name="check-circle" size={16} color="#10b981" />
              <Text style={{ color: "#0f172a" }}>
                Quantity:{" "}
                <Text style={{ fontWeight: "700" }}>{d.quantity} units</Text>
              </Text>
            </View>
          </View>

          {/* Chemist */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <MaterialIcons name="store" size={16} color="#6b7280" />
            <Text style={{ color: "#6b7280" }}>Chemist: {d.chemist}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

function StockTabUI() {
  type StockStatus = "Fresh" | "Near Expiry" | "Expired";

  const STOCK: {
    name: string;
    batch: string;
    qty: number;
    expiry: string;
    status: StockStatus;
  }[] = [
    {
      name: "Lupin Cardio-X 10mg",
      batch: "LCX2024-11",
      qty: 150,
      expiry: "Dec 2025",
      status: "Fresh",
    },
    {
      name: "Lupin Antibiotic Plus",
      batch: "LAP2024-10",
      qty: 85,
      expiry: "Oct 2025",
      status: "Fresh",
    },
    {
      name: "Lupin Diabetes Care",
      batch: "LDC2024-08",
      qty: 45,
      expiry: "Jan 2025",
      status: "Near Expiry",
    },
  ];
  

  const badge = {
    Fresh: {
      text: "#059669",
      border: "#D1FAE5",
      bg: "#ECFDF5",
    },
    "Near Expiry": {
      text: "#B45309",
      border: "#FDE68A",
      bg: "#FEFCE8",
    },
    Expired: {
      text: "#B91C1C",
      border: "#FECACA",
      bg: "#FEF2F2",
    },
  };

  return (
    <View style={{ marginTop: 12, gap: 20 }}>

      {/* HEADER */}
      <View
        style={{
          padding: 16,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "#FDECDC",
          backgroundColor: "#FFF7ED",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <MaterialIcons name="warning-amber" size={20} color="#DC821C" />
          <Text style={{ fontWeight: "700", color: "#B45309", fontSize: 16 }}>
            Stock Status & Expiry Check
          </Text>
        </View>

        <Text style={{ marginTop: 6, color: "#6B7280" }}>
          Verify stock levels and expiry dates to prevent wastage
        </Text>
      </View>

      {/* ITEMS */}
      {STOCK.map((item, i) => {
        const s = badge[item.status];

        return (
          <View
            key={i}
            style={{
              backgroundColor: "#FFFFFF",
              padding: 18,
              borderWidth: 1,
              borderColor: "#E5E7EB",
              borderRadius: 10,
              gap: 20,
            }}
          >
            {/* Product Title Row */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <View>
                <Text style={{ fontSize: 16, fontWeight: "700", color: "#0F172A" }}>
                  {item.name}
                </Text>
                <Text style={{ marginTop: 4, color: "#6B7280" }}>
                  Batch: {item.batch}
                </Text>
              </View>

              {/* Status Badge */}
              <View
                style={{
                  borderWidth: 1,
                  borderColor: s.border,
                  backgroundColor: s.bg,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 999,
                  height: 26,
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: s.text, fontSize: 12, fontWeight: "600" }}>
                  {item.status}
                </Text>
              </View>
            </View>

            {/* Quantity + Expiry */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              {/* Quantity box */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#F9FAFB",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#F3F4F6",
                  padding: 12,
                }}
              >
                <Text style={{ fontSize: 12, color: "#6B7280" }}>Quantity</Text>
                <Text style={{ marginTop: 4, fontWeight: "700" }}>
                  {item.qty} units
                </Text>
              </View>

              {/* Expiry box */}
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#F9FAFB",
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: "#F3F4F6",
                  padding: 12,
                }}
              >
                <Text style={{ fontSize: 12, color: "#6B7280" }}>Expiry</Text>
                <Text style={{ marginTop: 4, fontWeight: "700" }}>
                  {item.expiry}
                </Text>
              </View>
              
            </View>
          </View>
        );
      })}
      {/* === Lupin Pain Relief (Expired) === */}
<View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: "#eef2f7", marginBottom: 16 }}>

{/* Name + Status */}
<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
  <View>
    <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a" }}>Lupin Pain Relief</Text>
    <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>Batch: LPR2024-06</Text>
  </View>

  {/* Red badge */}
  <View style={{ backgroundColor: "#fff1f2", borderRadius: 999, borderWidth: 1, borderColor: "#fee2e2", paddingHorizontal: 10, paddingVertical: 4 }}>
    <Text style={{ color: "#b91c1c", fontWeight: "600", fontSize: 12 }}>Expired</Text>
  </View>
</View>

{/* Quantity + Expiry */}
{/* Quantity + Expiry row */}
<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  }}
>
  {/* Quantity box */}
  <View
    style={{
      flex: 1,
      backgroundColor: "#F9FAFB",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#F3F4F6",
      padding: 12,
    }}
  >
    <Text style={{ fontSize: 12, color: "#6B7280" }}>Quantity</Text>
    <Text style={{ marginTop: 4, fontWeight: "700" }}>20 units</Text>
  </View>

  {/* Expiry box */}
  <View
    style={{
      flex: 1,
      backgroundColor: "#F9FAFB",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#F3F4F6",
      padding: 12,
    }}
  >
    <Text style={{ fontSize: 12, color: "#6B7280" }}>Expiry</Text>
    <Text style={{ marginTop: 4, fontWeight: "700" }}>Nov 2024</Text>
  </View>
</View>


{/* Warning Bar */}
<View style={{
  marginTop: 16,
  backgroundColor: "#fef2f2",
  borderRadius: 6,
  borderWidth: 1,
  borderColor: "#fee2e2",
  padding: 10,
  flexDirection: "row",
  alignItems: "center",
}}>
  <MaterialIcons name="warning" size={18} color="#b91c1c" />
  <Text style={{ color: "#b91c1c", marginLeft: 6, fontSize: 13 }}>
    Expired – Arrange for return/replacement
  </Text>
</View>
</View>


{/* === Lupin Respiratory Aid (Fresh) === */}
<View style={{ backgroundColor: "#fff", borderRadius: 10, padding: 16, borderWidth: 1, borderColor: "#eef2f7", marginBottom: 16 }}>

{/* Name + Status */}
<View style={{ flexDirection: "row", justifyContent: "space-between" }}>
  <View>
    <Text style={{ fontSize: 16, fontWeight: "700", color: "#0f172a" }}>Lupin Respiratory Aid</Text>
    <Text style={{ color: "#6b7280", fontSize: 13, marginTop: 4 }}>Batch: LRA2024-12</Text>
  </View>

  {/* Green badge */}
  <View style={{ backgroundColor: "#ecfdf5", borderRadius: 999, borderWidth: 1, borderColor: "#d1fae5", paddingHorizontal: 10, paddingVertical: 4 }}>
    <Text style={{ color: "#059669", fontWeight: "600", fontSize: 12 }}>Fresh</Text>
  </View>
</View>

{/* Quantity + Expiry */}
{/* Quantity + Expiry row */}
<View
  style={{
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginTop: 16,
  }}
>
  {/* Quantity box */}
  <View
    style={{
      flex: 1,
      backgroundColor: "#F9FAFB",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#F3F4F6",
      padding: 12,
    }}
  >
    <Text style={{ fontSize: 12, color: "#6B7280" }}>Quantity</Text>
    <Text style={{ marginTop: 4, fontWeight: "700" }}>200 units</Text>
  </View>

  {/* Expiry box */}
  <View
    style={{
      flex: 1,
      backgroundColor: "#F9FAFB",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#F3F4F6",
      padding: 12,
    }}
  >
    <Text style={{ fontSize: 12, color: "#6B7280" }}>Expiry</Text>
    <Text style={{ marginTop: 4, fontWeight: "700" }}>Feb 2026</Text>
  </View>
</View>

</View>

    </View>
    
  );
}

function SchemesTabUI() {

  const SCHEMES = [
    {
      title: "Winter Season Promotion - Q4 2025",
      description:
        "Stock up on high-demand seasonal products - Extra 10% off on bulk orders above ₹50,000",
      discount: "10%",
      validTill: "Feb 28, 2025",
      products: [
        "Lupin Vapor Rub",
        "Lupin Cough & Cold Range",
        "Lupin Derma Care",
        "Lupin Respiratory Aid",
      ],
    },
    {
      title: "Stock Clearance - Near Expiry",
      description: "Special 15% discount on products expiring within 3 months",
      discount: "15%",
      validTill: "Dec 31, 2024",
      products: ["Lupin Diabetes Care", "Selected batches"],
    },
    {
      title: "New Launch Promotion",
      description: "Buy 10 Get 2 Free on new product launches",
      discount: "10+2",
      validTill: "Jan 31, 2025",
      products: ["Lupin Respiratory Aid", "Lupin Derma Care"],
    },
  ];

  return (
    <View style={{ marginTop: 16, gap: 20 }}>

      {/* HEADER */}
      <View
        style={{
          backgroundColor: "#ECFDF5",
          borderColor: "#BBF7D0",
          borderWidth: 1,
          padding: 16,
          borderRadius: 10,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <MaterialIcons name="card-giftcard" size={20} color="#059669" />
          <Text style={{ fontSize: 16, fontWeight: "700", color: "#065F46" }}>
            Active Schemes & Offers
          </Text>
        </View>

        <Text style={{ marginTop: 6, color: "#6B7280" }}>
          Highlight current promotions to boost sales
        </Text>
      </View>

      {/* SCHEME CARDS */}
      {SCHEMES.map((s, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "#D1FADF",
            padding: 16,
            gap: 14,
          }}
        >
          {/* Top Row */}
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 16, fontWeight: "700", color: "#0F172A" }}>
              {s.title}
            </Text>

            {/* Discount Badge */}
            <View
              style={{
                backgroundColor: "#ECFDF5",
                borderRadius: 999,
                borderWidth: 1,
                borderColor: "#BBF7D0",
                paddingHorizontal: 10,
                paddingVertical: 4,
              }}
            >
              <Text style={{ color: "#059669", fontWeight: "700" }}>{s.discount}</Text>
            </View>
          </View>

          {/* Description */}
          <Text style={{ color: "#6B7280" }}>{s.description}</Text>

          {/* Applicable Products */}
          <View
            style={{
              backgroundColor: "#ECFDF5",
              borderWidth: 1,
              borderColor: "#BBF7D0",
              padding: 12,
              borderRadius: 8,
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 12, color: "#065F46", fontWeight: "700" }}>
              Applicable Products:
            </Text>

            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
              {s.products.map((p, idx) => (
                <View
                  key={idx}
                  style={{
                    backgroundColor: "#D1FAE5",
                    borderRadius: 999,
                    paddingHorizontal: 10,
                    paddingVertical: 4,
                    borderWidth: 1,
                    borderColor: "#A7F3D0",
                  }}
                >
                  <Text style={{ color: "#047857", fontWeight: "600", fontSize: 12 }}>
                    {p}
                  </Text>
                </View>
              ))}
            </View>
          </View>

          {/* Footer Row (validity + share) */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 6,
              alignItems: "center",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <MaterialIcons name="access-time" size={16} color="#6B7280" />
              <Text style={{ color: "#6B7280", fontSize: 12 }}>
                Valid till: {s.validTill}
              </Text>
            </View>

            <Pressable
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: "#A7F3D0",
              }}
            >
              <Text style={{ color: "#047857", fontWeight: "600", fontSize: 12 }}>
                Share Details
              </Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
}


/* ---------- Main App ---------- */
export default function ChemistVisit(): JSX.Element {
  const { container } = useResponsiveContainer();

  const [activeTab, setActiveTab] = useState<"chemists" | "rx" | "stock" | "schemes">(
    "chemists"
  );

  const [visitVisible, setVisitVisible] = useState(false);
  const [selectedChemist, setSelectedChemist] = useState<Chemist | null>(null);

  const totalChemists = CHEMISTS.length;
  const rxTracked = 4;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <Stack.Screen
  options={{
    title: "Chemist Visit",
    headerStyle: { backgroundColor: COLORS.brand.lupinGreen },
    headerTintColor: "#fff",
    headerTitleStyle: { fontWeight: "bold" },
  }}
/>

      <ScrollView contentContainerStyle={{ paddingVertical: 16, paddingBottom: 130, }}>
        <View style={{ width: container, alignSelf: "center", paddingHorizontal: 8 }}>
          {/* Header */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 12,
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <View
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: "#06b6d4",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white", fontWeight: "700" }}>💊</Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 20, fontWeight: "700", color: "#0f172a" }}
                >
                  Chemist Visit & Interaction
                </Text>
                <Text style={{ color: "#6b7280", fontSize: 13 }}>
                  Manage pharmacy relationships & track prescriptions
                </Text>
              </View>
            </View>
          </View>

          {/* Search */}
          <View style={{ marginBottom: 12 }}>
            <TextInput
              placeholder="Search chemists by name, shop, or location..."
              placeholderTextColor="#9CA3AF"
              style={{
                backgroundColor: "#fff",
                paddingHorizontal: 14,
                paddingVertical: 12,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#eef2f7",
                color: "#111827",
              }}
            />
          </View>

          {/* Stats Row */}
          <View style={{ flexDirection: "row", gap: 12, marginBottom: 12 }}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#ecfdf5",
                padding: 14,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#d1fae5",
              }}
            >
              <Text style={{ color: "#6b7280", fontSize: 13 }}>
                Total Chemists
              </Text>
              <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 6 }}>
                {totalChemists}
              </Text>
            </View>

            <View
              style={{
                flex: 1,
                backgroundColor: "#faf5ff",
                padding: 14,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: "#efe7ff",
              }}
            >
              <Text style={{ color: "#6b7280", fontSize: 13 }}>Rx Tracked</Text>
              <Text style={{ fontSize: 26, fontWeight: "800", marginTop: 6 }}>
                {rxTracked}
              </Text>
            </View>
          </View>

          {/* Tabs */}
          <View
  style={{
    flexDirection: "row",
    backgroundColor: "#f3f4f6",
    borderRadius: 999,
    padding: 6,
    marginBottom: 12,
  }}
>
  {[
    {
      id: "chemists",
      label: "Chemists",
      icon: (
        <MaterialIcons
          name="link"
          size={16}
          color={activeTab === "chemists" ? "#0f172a" : "#6b7280"}
        />
      ),
    },
    {
      id: "rx",
      label: "Rx Trends",
      icon: (
        <Feather
          name="trending-up"
          size={16}
          color={activeTab === "rx" ? "#7e22ce" : "#a78bfa"}
        />
      ),
    },
    {
      id: "stock",
      label: "Stock",
      icon: (
        <FontAwesome6
          name="cube"
          size={15}
          color={activeTab === "stock" ? "#0f172a" : "#6b7280"}
        />
      ),
    },
    {
      id: "schemes",
      label: "Schemes",
      icon: (
        <MaterialIcons
          name="card-giftcard"
          size={16}
          color={activeTab === "schemes" ? "#0f172a" : "#6b7280"}
        />
      ),
    },
  ].map((t) => (
    <Pressable
      key={t.id}
      onPress={() => setActiveTab(t.id as any)}
      style={{
        flex: 1,
        paddingVertical: 10,
        alignItems: "center",
        borderRadius: 999,
        flexDirection: "row",
        justifyContent: "center",
        gap: 6,
        backgroundColor: activeTab === t.id ? "#ffffff" : "transparent",
      }}
    >
      {t.icon}

      <Text
        style={{
          fontWeight: activeTab === t.id ? "700" : "500",
          color: activeTab === t.id ? "#0f172a" : "#4b5563",
        }}
      >
        {t.label}
      </Text>
    </Pressable>
  ))}
</View>

          {/* TAB CONTENT */}
          {activeTab === "chemists" && (
            <View style={{ gap: 14 }}>
              {CHEMISTS.map((c) => (
                <View
                  key={c.id}
                  style={{
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    padding: 16,
                    borderWidth: 1,
                    borderColor: "#eef2f7",
                  }}
                >
                  {/* top row */}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: "800",
                            color: "#0f172a",
                          }}
                        >
                          {c.name}
                        </Text>
                        <View
                          style={{
                            backgroundColor: "#f3e8ff",
                            borderRadius: 999,
                            paddingHorizontal: 8,
                            paddingVertical: 4,
                          }}
                        >
                          <Text
                            style={{
                              color: "#7c3aed",
                              fontWeight: "700",
                              fontSize: 12,
                            }}
                          >
                            Tier {c.tier}
                          </Text>
                        </View>
                      </View>
                      <Text style={{ color: "#6b7280", marginTop: 6 }}>
                        {c.owner}
                      </Text>
                    </View>

                    <View style={{ marginLeft: 12 }}>
                      <StatusBadge status={c.stockStatus} />
                    </View>
                  </View>

                  {/* contact details */}
                  <View style={{ marginTop: 12 }}>
                    <Text style={{ color: "#6b7280" }}>📍 {c.location}</Text>
                    <Text style={{ color: "#6b7280", marginTop: 6 }}>
                      📞 {c.phone}
                    </Text>
                    <Text style={{ color: "#6b7280", marginTop: 6 }}>
                      ⏱️ Last visit: {c.lastVisit}
                    </Text>
                  </View>

                  {/* divider */}
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "#f1f5f9",
                      marginVertical: 16,
                    }}
                  />

                  {/* footer */}
                  <View style={{ marginTop: 12 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <View>
                        <Text style={{ color: "#6b7280", fontSize: 13 }}>
                          Total Purchase
                        </Text>
                        <Text
                          style={{
                            color: "#059669",
                            fontWeight: "800",
                            marginTop: 6,
                          }}
                        >
                          {formatINR(c.totalPurchase)}
                        </Text>
                      </View>

                      <View>
                        <Text style={{ color: "#6b7280", fontSize: 13 }}>
                          Outstanding
                        </Text>
                        <Text
                          style={{
                            color: "#ef4444",
                            fontWeight: "800",
                            marginTop: 6,
                          }}
                        >
                          {formatINR(c.outstanding)}
                        </Text>
                      </View>
                    </View>

                    {/* FULL WIDTH Start Visit */}
                    <Pressable
                      onPress={() => {
                        setSelectedChemist(c);
                        setVisitVisible(true);
                      }}
                      style={{
                        backgroundColor: "#0ea5a3",
                        paddingVertical: 14,
                        borderRadius: 8,
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{ color: "white", fontWeight: "800" }}
                      >
                        + Start Visit
                      </Text>
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          )}

          {activeTab === "rx" && <RxTrendsUI />}
          {activeTab === "stock" && <StockTabUI />}
          {activeTab === "schemes" && <SchemesTabUI />}


          {/* You can add Stock & Schemes UI the same way */}
        </View>

        {/* Visit Modal */}
        {selectedChemist && (
          <VisitModal
            visible={visitVisible}
            chemistName={selectedChemist.name}
            chemistLocation={selectedChemist.location}
            onClose={() => setVisitVisible(false)}
            onSubmit={() => {
              setVisitVisible(false);
              console.log("Visit submitted!");
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
