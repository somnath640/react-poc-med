import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import FilterRoutesDrawer from "@/components/FilterRoutesDrawer";
import ModalHcpProfile from "@/components/ModalHcpProfile";
import COLORS from "../../constants/LupinColors";
import {
  IconPlan,
  IconSparkles
} from "../../constants/LupinIcons";
import AddHCPModal from "../screens/hcp-tab-screen/AddHCPModal";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

/* -------------------------------------------------------------------------- */
/*  PAGE HEADER (green, page name + Add button)                               */
/* -------------------------------------------------------------------------- */

type PageHeaderProps = {
  title: string;
  onBack?: () => void;
  onAdd?: () => void;
};

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack, onAdd }) => {
  return (
    <View style={[styles.header, { backgroundColor: 'transparent' }]}>
  <View style={styles.headerLeft}>
    <TouchableOpacity onPress={onBack} style={styles.backBtn}>
      <Text style={styles.backIcon}>‹</Text>
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
  </View>

  <TouchableOpacity style={styles.addBtn} onPress={onAdd}>
    <Text style={styles.addPlus}>+</Text>
    <Text style={styles.addText}>Add HCP</Text>
  </TouchableOpacity>
</View>

  );
};

/* -------------------------------------------------------------------------- */
/*  FILTER MODAL (full page style)                                            */
/* -------------------------------------------------------------------------- */

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  totalCount: number;
};

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  totalCount,
}) => {
  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.filterSafeArea}>
        <View style={styles.filterHeader}>
          <View>
            <Text style={styles.filterTitle}>Filter HCPs</Text>
            <Text style={styles.filterSubtitle}>
              Filter by tier and specialty
            </Text>
          </View>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.filterClose}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Filter body */}
        <ScrollView contentContainerStyle={styles.filterBody}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Tier</Text>
            <View style={styles.filterField}>
              <Text style={styles.filterFieldText}>All Tiers</Text>
              <Text style={styles.filterChevron}>⌵</Text>
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Specialty</Text>
            <View style={styles.filterField}>
              <Text style={styles.filterFieldText}>All Specialties</Text>
              <Text style={styles.filterChevron}>⌵</Text>
            </View>
          </View>

          <Text style={styles.filterFooterText}>
            Showing {totalCount} of {totalCount} HCPs
          </Text>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

/* -------------------------------------------------------------------------- */
/*  DOCTOR CARD                                                               */
/* -------------------------------------------------------------------------- */

type Doctor = {
  name: string;
  tier: "Gold" | "Silver" | "Bronze";
  specialty: string;
  location: string;
  lastVisit: string;
  totalVisits: number;
};

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const [modalVisible, setModalVisible] = useState(false);
    const closeModal = () => setModalVisible(false);
  const tierBg =
    doctor.tier === "Gold"
      ? "#FBBF24"
      : doctor.tier === "Silver"
      ? "#CBD5F5"
      : "#F97316";

  return (
    <View style={styles.docCard}>
      <View style={styles.docTopRow}>
        <View style={styles.docLeft}>
          <View style={styles.docAvatar}>
            <Text style={styles.docAvatarText}>
              {doctor.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={{ flexShrink: 1 }}>
            <View style={styles.docNameRow}>
              <Text style={styles.docName}>{doctor.name}</Text>
              <View style={[styles.tierBadge, { backgroundColor: tierBg }]}>
                <Text style={styles.tierBadgeText}>{doctor.tier}</Text>
              </View>
            </View>
            <Text style={styles.docSpecialty}>{doctor.specialty}</Text>
            <View style={styles.docLocationRow}>
              <Text style={styles.docLocationBullet}>📍</Text>
              <Text style={styles.docLocation} numberOfLines={1}>
                {doctor.location}
              </Text>
            </View>
          </View>
        </View>
      </View>
<ModalHcpProfile 
                    visible={modalVisible} 
                    onClose={closeModal} 
                  />
      <View style={styles.docStatsRow}>
        <Text style={styles.docStatText}>
          Last Visit: <Text style={styles.docStatStrong}>{doctor.lastVisit}</Text>
        </Text>
        <Text style={styles.docStatText}>
          Total:{" "}
          <Text style={styles.docStatStrong}>{doctor.totalVisits} visits</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.docProfileBtn} onPress={() => setModalVisible(true)}>
        <IconPlan size={16} color={COLORS.gray[700]} />
        <Text style={styles.docProfileText}>View 360° Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/*  MAIN PAGE                                                                 */
/* -------------------------------------------------------------------------- */

const mockDoctors: Doctor[] = [
  {
    name: "Dr. Sharma",
    tier: "Gold",
    specialty: "Cardiologist",
    location: "Breach Candy Hospital, Mumbai",
    lastVisit: "3 weeks ago",
    totalVisits: 24,
  },
  {
    name: "Dr. Priya Patel",
    tier: "Silver",
    specialty: "Diabetologist",
    location: "Malabar Hill Clinic, Mumbai",
    lastVisit: "1 week ago",
    totalVisits: 18,
  },
  {
    name: "Dr. Amit Mehta",
    tier: "Gold",
    specialty: "General Physician",
    location: "Jaslok Hospital, Mumbai",
    lastVisit: "2 weeks ago",
    totalVisits: 20,
  },
  {
    name: "Dr. Sunita Kumar",
    tier: "Bronze",
    specialty: "Cardiologist",
    location: "Tardeo Medical Center, Mumbai",
    lastVisit: "5 days ago",
    totalVisits: 12,
  },
  {
    name: "Dr. Vikram Gupta",
    tier: "Gold",
    specialty: "Endocrinologist",
    location: "Bombay Hospital, Mumbai",
    lastVisit: "Never",
    totalVisits: 0,
  },
  {
    name: "Dr. Meera Singh",
    tier: "Silver",
    specialty: "Diabetologist",
    location: "Grant Road Clinic, Mumbai",
    lastVisit: "4 days ago",
    totalVisits: 9,
  },
];

const HcpsScreen: React.FC = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screen}>
      {/* Page Header */}
      <PageHeader
        title="HCP Management"
        onBack={() => console.log("Back pressed")}
        onAdd={() => setModalVisible(true)}
      />
      <AddHCPModal visible={modalVisible} onClose={()=>setModalVisible(false)} onSubmit={()=>setModalVisible(false)} />

      {/* Content */}
      <View style={styles.body}>
        {/* Search + Filter */}
        <View style={styles.searchRow}>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              placeholder="Search HCPs by name, specialty, or location..."
              placeholderTextColor={COLORS.gray[400]}
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity
            style={styles.filtersBtn}
            onPress={() => setFilterVisible(true)}
          >
            <Text style={styles.filtersIcon}>☰</Text>
            <Text style={styles.filtersText}>Filters</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* AI HCP Intelligence Banner */}
          <LinearGradient
            colors={["#7C3AED", "#2563EB"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.aiBanner}
          >
            <View style={styles.aiBannerLeft}>
              <View style={styles.aiIconCircle}>
                <IconSparkles size={20} color={COLORS.utility.white} />
              </View>
              <View style={{ flexShrink: 1 }}>
                <Text style={styles.aiTitle}>AI HCP Intelligence</Text>
                <Text style={styles.aiSubtitle}>
                  3 high-value HCPs identified for this week. Predicted
                  conversion rate: 87%
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Tier summary cards */}
          <View style={styles.tierRow}>
            <View style={[styles.tierCard, styles.tierGold]}>
              <Text style={styles.tierLabel}>☆ Gold</Text>
              <Text style={styles.tierNumber}>3</Text>
            </View>
            <View style={[styles.tierCard, styles.tierSilver]}>
              <Text style={styles.tierLabel}>☆ Silver</Text>
              <Text style={styles.tierNumber}>2</Text>
            </View>
            <View style={[styles.tierCard, styles.tierBronze]}>
              <Text style={styles.tierLabel}>☆ Bronze</Text>
              <Text style={styles.tierNumber}>1</Text>
            </View>
          </View>

          {/* Doctor cards list */}
          <View style={{ marginTop: 16 }}>
            {mockDoctors.map((doc) => (
              <DoctorCard key={doc.name} doctor={doc} />
            ))}
          </View>
        </ScrollView>

        {/* Floating Lupin AI FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => console.log("Lupin AI pressed")}
        >
          <LinearGradient
            colors={["#9333EA", "#22C55E"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabInner}
          >
            <Text style={styles.fabText}>L</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>

      {/* Filter modal */}
      {/* <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        totalCount={mockDoctors.length}
      /> */}
      {/* Sidebar drawer */}
      <FilterRoutesDrawer
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        title="Filter HCPs"
      />
    </SafeAreaView>
  );
};

export default HcpsScreen;

/* -------------------------------------------------------------------------- */
/*  STYLES                                                                    */
/* -------------------------------------------------------------------------- */

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.gray[100],
  },

  header: {
    paddingTop: 44,
    paddingBottom: 14,
    paddingHorizontal: 16,
    backgroundColor: COLORS.brand.lupinGreen,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    paddingRight: 8,
    paddingVertical: 4,
    marginRight: 6,
  },
  backIcon: {
    color: COLORS.utility.white,
    fontSize: 26,
    fontWeight: "300",
  },
  headerTitle: {
    color: COLORS.utility.black,
    fontSize: 20,
    fontWeight: "600",
  },
  addBtn: {
    flexDirection: "row",
    backgroundColor: "#04040D",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
    gap: 6,
  },
  addPlus: {
    color: COLORS.utility.white,
    fontSize: 18,
    marginBottom: 1,
  },
  addText: {
    color: COLORS.utility.white,
    fontSize: 14,
    fontWeight: "500",
  },

  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  searchContainer: {
    flex: 1,
    backgroundColor: COLORS.utility.white,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 6,
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: COLORS.gray[800],
  },
  filtersBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.utility.white,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
  },
  filtersIcon: {
    marginRight: 4,
    fontSize: 14,
  },
  filtersText: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.gray[800],
  },

  scrollContent: {
    paddingBottom: 80,
    paddingTop: 10,
  },

  aiBanner: {
    borderRadius: 18,
    padding: 14,
  },
  aiBannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  aiIconCircle: {
    width: 34,
    height: 34,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  aiTitle: {
    color: COLORS.utility.white,
    fontSize: 14,
    fontWeight: "600",
  },
  aiSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 12,
    marginTop: 2,
  },

  tierRow: {
    flexDirection: "row",
    marginTop: 12,
    gap: 10,
  },
  tierCard: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  tierGold: {
    backgroundColor: "#FFF7DB",
  },
  tierSilver: {
    backgroundColor: "#EEF0F6",
  },
  tierBronze: {
    backgroundColor: "#FFEBDD",
  },
  tierLabel: {
    fontSize: 13,
    color: COLORS.gray[700],
    marginBottom: 12,
  },
  tierNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.gray[900],
  },

  docCard: {
    backgroundColor: COLORS.utility.white,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  docTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  docLeft: {
    flexDirection: "row",
    gap: 12,
    flexShrink: 1,
  },
  docAvatar: {
    width: 42,
    height: 42,
    borderRadius: 999,
    backgroundColor: COLORS.gray[100],
    alignItems: "center",
    justifyContent: "center",
  },
  docAvatarText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.gray[700],
  },
  docNameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  docName: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.gray[900],
  },
  tierBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },
  tierBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.utility.white,
  },
  docSpecialty: {
    fontSize: 13,
    color: COLORS.gray[700],
    marginTop: 2,
  },
  docLocationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
   modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  closeBtn: { marginTop: 20, padding: 10, backgroundColor: "#ddd", borderRadius: 5 },
  closeText: { fontSize: 16 },
  docLocationBullet: {
    fontSize: 12,
    marginRight: 4,
  },
  docLocation: {
    fontSize: 12,
    color: COLORS.gray[500],
    flexShrink: 1,
  },

  docStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  docStatText: {
    fontSize: 12,
    color: COLORS.gray[600],
  },
  docStatStrong: {
    fontWeight: "600",
  },
  docProfileBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  docProfileText: {
    fontSize: 13,
    color: COLORS.gray[700],
    fontWeight: "500",
  },

  fab: {
    position: "absolute",
    right: 18,
    bottom: 24,
  },
  fabInner: {
    width: 54,
    height: 54,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 8,
  },
  fabText: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.utility.white,
  },

  // Filter modal
  filterSafeArea: {
    flex: 1,
    backgroundColor: COLORS.utility.white,
  },
  filterHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[200],
  },
  filterTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.gray[900],
  },
  filterSubtitle: {
    fontSize: 13,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  filterClose: {
    fontSize: 28,
    color: COLORS.gray[500],
  },
  filterBody: {
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  filterGroup: {
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray[700],
    marginBottom: 6,
  },
  filterField: {
    backgroundColor: "#F5F5F7",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterFieldText: {
    fontSize: 14,
    color: COLORS.gray[800],
  },
  filterChevron: {
    fontSize: 18,
    color: COLORS.gray[400],
  },
  filterFooterText: {
    marginTop: 24,
    fontSize: 14,
    color: COLORS.gray[600],
  },
});
