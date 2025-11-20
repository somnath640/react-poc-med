import { Ionicons } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { router, Slot } from "expo-router";
import { Drawer } from "expo-router/drawer";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

// Helper: right arrow icon
function RightArrow() {
  return <Ionicons name="chevron-forward" size={18} color="#c4c4c4" />;
}

// Wrapper that keeps left content and places an arrow on the right
function LabelWrapper({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.labelContainer}>
      <View style={styles.labelLeft}>{children}</View>
      <RightArrow />
    </View>
  );
}

/* ---------------------- CUSTOM DRAWER CONTENT ---------------------- */

function CustomDrawerContent(props: any) {
  const { navigation } = props;

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerScrollContent}
      pagingEnabled={false}
      style={{}}
    >
      {/* Brand header (green) */}
      <View style={styles.brandHeader}>
        <View style={styles.brandLeft}>
          <View style={styles.brandLogoWrap}>
            <Image
              source={require("../assets/images/logo-lu.png")}
              style={styles.brandLogoImage}
              resizeMode="contain"
            />
          </View>
          <View>
            <Text style={styles.brandTitle}>LUPIN</Text>
            <Text style={styles.brandSubtitle}>Pharmaceuticals Ltd.</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation.closeDrawer()}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="close" size={20} color="#ffffff" />
        </TouchableOpacity>
      </View>

      {/* User card (blue block) */}
      <View style={styles.userCard}>
        <View style={styles.userRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitial}>R</Text>
          </View>
          <View>
            <Text style={styles.name}>Rahul Sharma</Text>
            <Text style={styles.role}>Medical Representative</Text>
            <Text style={styles.id}>ID: EMP2024789</Text>
          </View>
        </View>

        <View style={styles.userPillsRow}>
          <View style={styles.userPill}>
            <Text style={styles.pillLabel}>Division</Text>
            <Text style={styles.pillValue}>Cardiology</Text>
          </View>
          <View style={styles.userPill}>
            <Text style={styles.pillLabel}>Zone</Text>
            <Text style={styles.pillValue}>Mumbai</Text>
          </View>
        </View>
      </View>

      {/* AI Field Assistant */}
      <Text style={styles.sectionTitle}>AI FIELD ASSISTANT</Text>

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="sparkles-outline" size={16} color="#9333ea" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={styles.itemText}
                onPress={() => router.push("/screens/ai-assistant")}
              >
                Lupin AI Assistant
              </Text>
              <View style={styles.newTag}>
                <Text style={styles.newTagText}>NEW</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => router.push("/screens/ai-assistant")}
      />

      {/* FIELD ACTIVITIES */}
      <Text style={styles.sectionTitle}>FIELD ACTIVITIES</Text>

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="card-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText} onPress={()=>router.push('/screens/field-activities/expense-management')}>Expense Management</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="time-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText} onPress={()=>router.push('/screens/field-activities/leave-attendance')}>Leave & Attendance</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="cube-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText} onPress={()=>router.push('/screens/sampleTracking')}>Sample Tracking</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="medkit-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>Chemist Visit</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="briefcase-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>Stockist Visit</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      {/* ENGAGEMENT & MARKETING */}
      <Text style={styles.sectionTitle}>ENGAGEMENT & MARKETING</Text>

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="megaphone-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>Campaigns</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="tablet-portrait-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>E-Detailing</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="people-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>KOL Management</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      {/* BUSINESS OPERATIONS */}
      <Text style={styles.sectionTitle}>BUSINESS OPERATIONS</Text>

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="business-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>Distributor Management</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="document-text-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>Bid Management</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="git-compare-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>PSP Integration</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      {/* TEAM & LEARNING */}
      <Text style={styles.sectionTitle}>TEAM & LEARNING</Text>

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="chatbubbles-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>Team Collaboration</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>4</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="checkmark-done-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>End-of-Day Review</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      {/* COMPLIANCE & SUPPORT */}
      <Text style={styles.sectionTitle}>COMPLIANCE & SUPPORT</Text>

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="shield-checkmark-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>Compliance & Audit</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="notifications-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>Notifications</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>8</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="sparkles-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <View style={styles.itemLeft}>
              <Text style={styles.itemText}>System Highlights</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>6</Text>
              </View>
            </View>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      <DrawerItem
        style={styles.drawerItem}
        icon={() => (
          <View style={styles.itemIconCircle}>
            <Ionicons name="settings-outline" size={16} color="#4b5563" />
          </View>
        )}
        label={() => (
          <LabelWrapper>
            <Text style={styles.itemText}>Settings</Text>
          </LabelWrapper>
        )}
        onPress={() => {}}
      />

      {/* Logout - pinned visually at bottom of content */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => {
          // TODO: implement logout
        }}
      >
        <Ionicons
          name="log-out-outline"
          size={18}
          color="#ffffff"
          style={{ marginRight: 8 }}
        />
        <Text style={styles.logoutText} onPress={()=>router.push('/screens/authentication/LoginScreen')}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

/* ----------------------- ROOT LAYOUT W/ DRAWER ----------------------- */

const LUPIN_GREEN_LEFT = "#01963f";
const LUPIN_GREEN_RIGHT = "#008a37";

export default function RootLayout() {
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerPosition: 'right',
        headerShown: false,
      })}
    >
      <Slot />
    </Drawer>
  );
}

/* ----------------------------- STYLES ----------------------------- */

const styles = StyleSheet.create({
  drawerScrollContent: {
    backgroundColor: "transparent",
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0,
    padding: 0,
  },

  /* header bar of app */
  headerTitleContainer: {
    alignItems: "flex-start",
  },
  headerTitleText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "white",
  },

  /* Drawer brand header (inside drawer) */
  brandHeader: {
    backgroundColor: "#059669",
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  brandLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  brandLogoWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  brandLogoImage: {
    width: 24,
    height: 24,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  brandSubtitle: {
    color: "#e5f7ec",
    fontSize: 11,
  },

  /* Blue user card */
  userCard: {
    backgroundColor: "#2152f3",
    paddingHorizontal: 18,
    paddingVertical: 16,
    width: "100%",
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  avatarInitial: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "700",
  },
  name: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  role: {
    color: "#e5e7eb",
    fontSize: 12,
    marginTop: 2,
  },
  id: {
    color: "#d1d5db",
    fontSize: 11,
    marginTop: 2,
  },
  userPillsRow: {
    flexDirection: "row",
    gap: 10,
  },
  userPill: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.16)",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  pillLabel: {
    color: "#d1d5db",
    fontSize: 11,
  },
  pillValue: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
    marginTop: 4,
  },

  sectionTitle: {
    paddingHorizontal: 18,
    paddingTop: 18,
    fontSize: 11,
    color: "#9ca3af",
    fontWeight: "700",
  },

  drawerItem: {
    marginHorizontal: 6,
    marginVertical: 0,
  },

  itemIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 4,
  },

  itemText: {
    fontSize: 14,
    color: "#111827",
  },

  badge: {
    backgroundColor: "#e11d48",
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 8,
    minWidth: 22,
    alignItems: "center",
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },

  newTag: {
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#a855f7",
  },
  newTagText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "700",
  },

  logoutBtn: {
    marginHorizontal: 18,
    marginTop: 22,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: "#dc2626",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  logoutText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 4,
    paddingRight: 4,
  },
  labelLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  logoWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  logoImage: {
    width: 28,
    height: 28,
  },
});
