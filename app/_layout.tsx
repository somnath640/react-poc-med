import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Slot } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import COLORS from '../constants/LupinColors';

// Helper: right arrow icon
function RightArrow() {
  return <Ionicons name="chevron-forward" size={20} color="#999" />;
}

// Wrapper that keeps left content and places an arrow on the right
function LabelWrapper({ children }: { children: any }) {
  return (
    <View style={styles.labelContainer}>
      <View style={styles.labelLeft}>{children}</View>
      <RightArrow />
    </View>
  );
}

// Custom drawer content: keeps default screens and adds manual items
function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      screenoptions={{
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.35)',
        swipeEnabled: true,
        swipeEdgeWidth: 80,
        drawerStyle: {
          width: '75%',
        },
      }}
      contentContainerStyle={{ padding: 0, borderRadius: 10 }}
    >
      <View style={styles.drawerHeader}>
        <Text style={styles.headerTitleText}>CRM</Text>
        <Text style={styles.headerSubtitle}>Field Force Management</Text>
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.userDetailsContainer}>
          <View style={styles.header}>
            <Image
              source={{ uri: 'https://i.pravatar.cc/150?img=12' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.name}>Rahul Sharma</Text>
              <Text style={styles.role}>Medical Representative</Text>
              <Text style={styles.id}>ID: EMP2024789</Text>
            </View>
          </View>

          {/* Division */}
          <View style={styles.infoBox}>
            <View style={styles.detailscontainer}>
              <Text style={styles.infoLabel}>Division</Text>
              <Text style={styles.infoValue}>Cardiology</Text>
            </View>

            <View style={styles.detailscontainer}>
              <Text style={styles.infoLabel}>Zone</Text>
              <Text style={styles.infoValue}>Mumbai</Text>
            </View>
          </View>
        </View>

        {/* Section Title */}
        <Text style={styles.sectionTitle}>AI FIELD ASSISTANT</Text>

        {/* AI Assistant Option */}
        <DrawerItem
          style={{ margin: 0, padding: 0 }}
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
          )}
          label={() => (
            <LabelWrapper>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.itemText} onPress={() => router.push("/screens/ai-assistant")}>Lupin AI Assistant</Text>
                <Text style={styles.tag}>NEW</Text>
              </View>
            </LabelWrapper>
          )}
          onPress={() => { }}
        />

        {/* Field Activities */}
        <Text style={styles.sectionTitle}>FIELD ACTIVITIES</Text>

        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
          )}
          label={() => (
            <LabelWrapper>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>Expense Management</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>2</Text>
                </View>
              </View>
            </LabelWrapper>
          )}
          onPress={() => { }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
          )}
          label={() => (
            <LabelWrapper>
              <Text style={styles.itemText}>Leave & Attendance</Text>
            </LabelWrapper>
          )}
          onPress={() => { }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
          )}
          label={() => (
            <LabelWrapper>
              <View style={styles.itemLeft}>
                <Text style={styles.itemText}>Sample Tracking</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </View>
            </LabelWrapper>
          )}
          onPress={() => { }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
          )}
          label={() => (
            <LabelWrapper>
              <Text style={styles.itemText}>Chemist Visit</Text>
            </LabelWrapper>
          )}
          onPress={() => { }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
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
          onPress={() => { }}
        />

        {/* Engagement */}
        <Text style={styles.sectionTitle}>ENGAGEMENT & MARKETING</Text>

        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
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
          onPress={() => { }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
          )}
          label={() => (
            <LabelWrapper>
              <Text style={styles.itemText}>E-Detailing</Text>
            </LabelWrapper>
          )}
          onPress={() => { }}
        />
        <DrawerItem
          icon={({ color, size }) => (
            <Ionicons name="calendar" size={18} color="black" />
          )}
          label={() => (
            <LabelWrapper>
              <Text style={styles.itemText}>KOL Management</Text>
            </LabelWrapper>
          )}
          onPress={() => { }}
        />

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => { }}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </DrawerContentScrollView>
  );
}

// Define missing color constants
const LUPIN_GREEN_LEFT = '#01963f';
const LUPIN_GREEN_RIGHT = '#008a37';

export default function RootLayout() {
  return (
    <Drawer
      // provide custom drawer content so you can add items manually
      drawerContent={(props) => <CustomDrawerContent {...props} />}

      screenOptions={({ navigation }) => ({
        drawerPosition: 'right',
        headerTitleAlign: 'left',
        // Left logo
        headerLeft: () => (
          <View style={{ marginLeft: 12, marginRight: 8 }}>
            <View style={styles.logoWrap}>
              <Image source={require('../assets/images/logo-lu.png')} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>
        ),
        // Add a custom right button (hamburger)
        headerRight: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="menu" size={24} color={COLORS.utility.white} />
          </Pressable>
        ),
        // Centered custom header title
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>LUPIN CRM</Text>
            <Text style={styles.headerSubtitle}>Field Force Management</Text>
          </View>
        ),

        // Header background (gradient)
        headerStyle: {
          backgroundColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 2,
          elevation: 4, // for Android shadow
        },
        headerBackground: () => (
          <LinearGradient
            colors={[LUPIN_GREEN_LEFT, LUPIN_GREEN_RIGHT]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.container}
          />
        ),
      })}
    >
      <Slot />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    alignItems: 'flex-start',
  },
  headerTitleText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'white',
  },
  drawerHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'transparent',
  },
  container: { flex: 1, backgroundColor: '#fff', },
  userDetailsContainer: {
    marginBottom: 20,
    backgroundColor: '#0A4DFF',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avatar: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  name: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  role: { color: '#E8E8E8', marginTop: 2 },
  id: { color: '#D0D0D0', marginTop: 3 },

  infoBox: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(50px)',
    margin: 20,
    marginTop: 0,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailscontainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  infoLabel: { color: '#fff', fontSize: 12 },
  infoValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  sectionTitle: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 12,
    color: '#888',
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    marginHorizontal: 10,
    borderBottomWidth: 0.5,
    borderColor: '#eee',
  },
  itemText: { fontSize: 16 },

  badge: {
    backgroundColor: '#ff3d3d',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginLeft: 5,
  },
  badgeText: { color: '#fff', fontSize: 12 },

  tag: {
    backgroundColor: '#6C63FF',
    color: '#fff',
    fontSize: 10,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginRight: 0,
    marginLeft: 20,
  },

  logoutBtn: {
    backgroundColor: '#FF4D4D',
    padding: 15,
    margin: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  // add styles used by the new helpers
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  labelLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrap: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: { width: 28, height: 28 },
});
