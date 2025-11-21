// RouteDashboardScreen.tsx
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const COLORS = {
  lupinGreen: "#00A651",
  lupinGreenDark: "#00833F",
  lupinBlue: "#2D73FF",
  bg: "#F5F6FA",
  card: "#FFFFFF",
  textDark: "#141414",
  textLight: "#808495",
  border: "#E2E4ED",
  high: "#FF6565",
  medium: "#FFB020",
  low: "#3CCF4E",
  chipGold: "#FFC857",
  chipSilver: "#BDC3C7",
  chipBronze: "#D35400",
  alert: "#FFF4F2",
};

const RouteDashboardScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity style={styles.headerBack}>
              <Ionicons name="chevron-back" onPress={() =>  router.replace({ pathname: '/(tabs)', params: { openDrawer: '1' } } as any) } size={20} color="#FFFFFF" />
            </TouchableOpacity>
            <View>
              <Text style={styles.headerTitle}>LUPIN CRM</Text>
              <Text style={styles.headerSubtitle}>Field Force Management</Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.headerFilterBtn}>
              <Ionicons name="funnel-outline" size={16} color="#fff" />
              <Text style={styles.headerFilterText}>Filters</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingBottom: 90 }}
          showsVerticalScrollIndicator={false}
        >
          {/* AI POWERED ROUTE OPTIMIZATION */}
          <View style={styles.aiBanner}>
            <View style={{ flex: 1 }}>
              <Text style={styles.aiTitle}>AI-Powered Route Optimization</Text>
              <Text style={styles.aiSubtitle}>
                Smart routing enabled based on GPS, traffic data, and HCP
                priority.
              </Text>
              <View style={styles.aiStatsRow}>
                <AiStat label="Distance Saved" value="-2.4 km" />
                <AiStat label="Time Saved" value="-35 min" />
                <AiStat label="Fuel Saved" value="₹180" />
              </View>
            </View>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>Active</Text>
            </View>
          </View>

          {/* TERRITORY SUMMARY */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              My Territory – South Mumbai Zone
            </Text>

            <View style={styles.grid2}>
              <SummaryCard
                title="Total HCPs"
                main="248"
                chipLeft="Gold: 45"
                chipRight="Silver: 80"
              />
              <SummaryCard
                title="Coverage This Month"
                main="92%"
                progress={0.92}
              />
            </View>

            <View style={[styles.grid2, { marginTop: 12 }]}>
              <SummaryCard
                title="High Priority Pending"
                main="12"
                chipLeft="Gold & silver"
              />
              <SummaryCard
                title="Avg Visit Frequency"
                main="2.4x"
                caption="Per month"
              />
            </View>
          </View>

          {/* COVERAGE HEATMAP */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Coverage Heatmap</Text>
              <View style={styles.legendRow}>
                <LegendDot color={COLORS.high} label="High" />
                <LegendDot color={COLORS.medium} label="Medium" />
                <LegendDot color={COLORS.low} label="Low" />
              </View>
            </View>

            <View style={styles.heatmapGrid}>
              {Array.from({ length: 5 * 5 }).map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.heatBlock,
                    i % 7 === 0
                      ? { backgroundColor: COLORS.low }
                      : i % 3 === 0
                      ? { backgroundColor: COLORS.medium }
                      : { backgroundColor: COLORS.high },
                  ]}
                />
              ))}
            </View>

            <View style={styles.alertBar}>
              <Ionicons
                name="alert-circle-outline"
                size={14}
                color={COLORS.high}
              />
              <Text style={styles.alertText}>
                North Mumbai area shows low coverage (42%). Plan additional
                visits this week.
              </Text>
            </View>
          </View>

          {/* TABS (Today's Route / Map View / This Week / Plan New) */}
          <View style={styles.tabRow}>
            <TopTab label="Today's Route" active />
            <TopTab label="Map View" />
            <TopTab label="This Week" />
            <TopTab label="Plan New" />
          </View>

          {/* AI ROUTE INTELLIGENCE BANNER */}
          <View style={styles.aiRouteCard}>
            <View style={styles.rowBetween}>
              <View>
                <Text style={styles.aiRouteTitle}>AI Route Intelligence</Text>
                <Text style={styles.aiRouteSubtitle}>
                  Real-time optimization with traffic & availability
                </Text>
              </View>
              <Ionicons name="sparkles-outline" size={22} color="#fff" />
            </View>

            <View style={styles.aiRouteNoteRow}>
              <View style={styles.dot} />
              <Text style={styles.aiRouteNote}>
                Light traffic on Linking Road until 11 AM – Saves 25 mins
              </Text>
            </View>
            <View style={styles.aiRouteNoteRow}>
              <View style={styles.dot} />
              <Text style={styles.aiRouteNote}>
                Dr. Sharma available 9-11 AM – Book early slot
              </Text>
            </View>
          </View>

          {/* ROUTE / MAP / HCP / CALLS / ANALYTICS SMALL TABBAR */}
          <View style={styles.subTabRow}>
            <BottomMiniTab label="Route" active />
            <BottomMiniTab label="Map" />
            <BottomMiniTab label="HCPs" />
            <BottomMiniTab label="Calls" />
            <BottomMiniTab label="Analytics" />
          </View>

          {/* OPTIMIZED ROUTE SUMMARY */}
          <View style={styles.section}>
            <View style={styles.rowBetween}>
              <Text style={styles.sectionTitle}>Optimized Route</Text>
              <TouchableOpacity style={styles.startBtn}>
                <Ionicons name="play" size={14} color="#fff" />
                <Text style={styles.startBtnText}>Start GPS</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.grid3}>
              <MiniStat label="Total Distance" value="18.6 km" />
              <MiniStat label="Est. Time" value="6h 20m" />
              <MiniStat label="Visits" value="6" />
            </View>

            <Text style={styles.helperText}>
              Route optimized considering traffic patterns and HCP availability.
            </Text>
          </View>

          {/* MAP PLACEHOLDER */}
          <View style={styles.mapPlaceholder}>
            <Ionicons name="map-outline" size={24} color={COLORS.textLight} />
            <Text style={styles.mapText}>Interactive map appears here</Text>
          </View>

          {/* VISIT LIST */}
          <View style={styles.section}>
            <VisitCard
              index={1}
              name="Dr. Sharma"
              speciality="Cardiologist"
              tags={["Gold", "High"]}
              distance="2.3 km"
              rxPotential="High"
              traffic="Light"
              time="09:00 AM"
              duration="45 min"
            />
            <VisitCard
              index={2}
              name="Dr. Patel"
              speciality="Diabetologist"
              tags={["Silver", "Medium"]}
              distance="1.8 km"
              rxPotential="Medium"
              traffic="Light"
              time="10:30 AM"
              duration="30 min"
            />
            <VisitCard
              index={3}
              name="Dr. Mehta"
              speciality="General Physician"
              tags={["Gold", "High"]}
              distance="3.2 km"
              rxPotential="Very High"
              traffic="Moderate"
              time="12:00 PM"
              duration="50 min"
            />
            <VisitCard
              index={4}
              name="Dr. Kumar"
              speciality="Cardiologist"
              tags={["Bronze", "Low"]}
              distance="2.1 km"
              rxPotential="Medium"
              traffic="Heavy"
              time="02:00 PM"
              duration="40 min"
            />
            <VisitCard
              index={5}
              name="Dr. Gupta"
              speciality="Endocrinologist"
              tags={["Gold", "High"]}
              distance="4.5 km"
              rxPotential="Very High"
              traffic="Heavy"
              time="03:30 PM"
              duration="60 min"
            />
            <VisitCard
              index={6}
              name="Dr. Singh"
              speciality="Diabetologist"
              tags={["Silver", "Medium"]}
              distance="2.8 km"
              rxPotential="High"
              traffic="Moderate"
              time="05:00 PM"
              duration="35 min"
            />
          </View>

          {/* DOCTOR COVERAGE PLANNING */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Doctor Coverage Planning</Text>

            <CoverageCard
              name="Dr. Sharma"
              status="Overdue"
              lastVisit="Last visit: 3 weeks ago"
              frequency="Required frequency: Biweekly"
              potential="Rx Potential: Very High"
            />
            <CoverageCard
              name="Dr. Mehta"
              status="Overdue"
              lastVisit="Last visit: 4 weeks ago"
              frequency="Required frequency: Biweekly"
              potential="Rx Potential: Very High"
            />
            <CoverageCard
              name="Dr. Gupta"
              status="New"
              lastVisit="Last visit: Never"
              frequency="Required frequency: Biweekly"
              potential="Rx Potential: Very High"
            />
          </View>

          {/* OVERLAP ALERT */}
          <View style={styles.overlapCard}>
            <View style={styles.rowBetween}>
              <View style={styles.rowCenter}>
                <Ionicons
                  name="alert-circle-outline"
                  size={18}
                  color={COLORS.high}
                />
                <Text style={styles.overlapTitle}>
                  Overlap Management Alert
                </Text>
              </View>
            </View>
            <Text style={styles.overlapText}>
              2 HCPs in your territory are also covered by Oncology division.
              Coordinate with Rep ID: EMP2024790 to avoid duplication.
            </Text>
            <TouchableOpacity style={styles.viewDetailsBtn}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* BOTTOM NAV BAR */}
        {/* <View style={styles.bottomNav}>
          <BottomNavItem icon="home-outline" label="Home" />
          <BottomNavItem icon="navigate-outline" label="Route" active />
          <BottomNavItem icon="people-outline" label="HCPs" />
          <BottomNavItem icon="call-outline" label="Calls" />
          <BottomNavItem icon="stats-chart-outline" label="Analytics" />
        </View> */}
      </View>
    </SafeAreaView>
  );
};

/* ---------- SMALL COMPONENTS ---------- */

const AiStat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.aiStat}>
    <Text style={styles.aiStatValue}>{value}</Text>
    <Text style={styles.aiStatLabel}>{label}</Text>
  </View>
);

const SummaryCard = ({
  title,
  main,
  chipLeft,
  chipRight,
  progress,
  caption,
}: {
  title: string;
  main: string;
  chipLeft?: string;
  chipRight?: string;
  progress?: number;
  caption?: string;
}) => (
  <View style={styles.summaryCard}>
    <Text style={styles.summaryTitle}>{title}</Text>
    <Text style={styles.summaryMain}>{main}</Text>
    {caption && <Text style={styles.summaryCaption}>{caption}</Text>}
    {(chipLeft || chipRight) && (
      <View style={styles.summaryChipRow}>
        {chipLeft && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{chipLeft}</Text>
          </View>
        )}
        {chipRight && (
          <View style={styles.chip}>
            <Text style={styles.chipText}>{chipRight}</Text>
          </View>
        )}
      </View>
    )}
    {progress != null && (
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { flex: progress }]} />
        <View style={{ flex: 1 - progress }} />
      </View>
    )}
  </View>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <View style={styles.legendItem}>
    <View style={[styles.legendDot, { backgroundColor: color }]} />
    <Text style={styles.legendLabel}>{label}</Text>
  </View>
);

const TopTab = ({ label, active }: { label: string; active?: boolean }) => (
  <TouchableOpacity
    style={[styles.tabItem, active && styles.tabItemActive]}
    activeOpacity={0.8}
  >
    <Text style={[styles.tabText, active && styles.tabTextActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const BottomMiniTab = ({
  label,
  active,
}: {
  label: string;
  active?: boolean;
}) => (
  <TouchableOpacity style={styles.subTabItem}>
    <Text style={[styles.subTabText, active && styles.subTabTextActive]}>
      {label}
    </Text>
    {active && <View style={styles.subTabIndicator} />}
  </TouchableOpacity>
);

const MiniStat = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.miniStat}>
    <Text style={styles.miniStatLabel}>{label}</Text>
    <Text style={styles.miniStatValue}>{value}</Text>
  </View>
);

type VisitProps = {
  index: number;
  name: string;
  speciality: string;
  tags: string[];
  distance: string;
  rxPotential: string;
  traffic: string;
  time: string;
  duration: string;
};

const VisitCard = ({
  index,
  name,
  speciality,
  tags,
  distance,
  rxPotential,
  traffic,
  time,
  duration,
}: VisitProps) => (
  <View style={styles.visitCard}>
    <View style={styles.visitTopRow}>
      <View style={styles.visitIndexCircle}>
        <Text style={styles.visitIndexText}>{index}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.visitName}>{name}</Text>
        <Text style={styles.visitSpeciality}>{speciality}</Text>
        <View style={styles.visitTagRow}>
          {tags.map((t) => (
            <View key={t} style={styles.visitTag}>
              <Text style={styles.visitTagText}>{t}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={{ alignItems: "flex-end" }}>
        <Text style={styles.visitTime}>{time}</Text>
        <Text style={styles.visitDuration}>{duration}</Text>
      </View>
    </View>

    <View style={styles.visitMetaRow}>
      <MetaItem icon="location-on" text={distance} />
      <MetaItem icon="show-chart" text={`Rx Potential: ${rxPotential}`} />
      <MetaItem icon="traffic" text={`Traffic: ${traffic}`} />
    </View>
  </View>
);

const MetaItem = ({ icon, text }: { icon: any; text: string }) => (
  <View style={styles.metaItem}>
    <MaterialIcons name={icon} size={14} color={COLORS.textLight} />
    <Text style={styles.metaText}>{text}</Text>
  </View>
);

const CoverageCard = ({
  name,
  status,
  lastVisit,
  frequency,
  potential,
}: {
  name: string;
  status: "Overdue" | "New";
  lastVisit: string;
  frequency: string;
  potential: string;
}) => (
  <View style={styles.coverageCard}>
    <View style={styles.rowBetween}>
      <Text style={styles.coverageName}>{name}</Text>
      <View
        style={[
          styles.statusChip,
          status === "Overdue"
            ? { backgroundColor: "#FFE5E0" }
            : { backgroundColor: "#E4F4FF" },
        ]}
      >
        <Text
          style={[
            styles.statusChipText,
            status === "Overdue"
              ? { color: COLORS.high }
              : { color: COLORS.lupinBlue },
          ]}
        >
          {status}
        </Text>
      </View>
    </View>
    <Text style={styles.coverageMeta}>{lastVisit}</Text>
    <Text style={styles.coverageMeta}>{frequency}</Text>
    <Text style={styles.coverageMeta}>{potential}</Text>

    <TouchableOpacity style={styles.scheduleBtn}>
      <Ionicons name="calendar-outline" size={14} color={COLORS.lupinBlue} />
      <Text style={styles.scheduleText}>Schedule Visit</Text>
    </TouchableOpacity>
  </View>
);

const BottomNavItem = ({
  icon,
  label,
  active,
}: {
  icon: any;
  label: string;
  active?: boolean;
}) => (
  <TouchableOpacity style={styles.bottomItem}>
    <Ionicons
      name={icon}
      size={22}
      color={active ? COLORS.lupinGreen : COLORS.textLight}
    />
    <Text style={[styles.bottomLabel, active && styles.bottomLabelActive]}>
      {label}
    </Text>
  </TouchableOpacity>
);

/* ---------- STYLES ---------- */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.lupinGreen,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    backgroundColor: COLORS.lupinGreen,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBack: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerFilterBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  headerFilterText: {
    color: "#fff",
    fontSize: 11,
    marginLeft: 4,
  },
  scroll: {
    flex: 1,
  },

  /* AI Banner */
  aiBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: COLORS.lupinBlue,
    padding: 14,
  },
  aiTitle: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  aiSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    marginBottom: 10,
  },
  aiStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  aiStat: {
    flex: 1,
  },
  aiStatValue: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
  aiStatLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 11,
  },
  aiBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#00C853",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
  },
  aiBadgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  section: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  grid2: {
    flexDirection: "row",
    gap: 8,
  },
  grid3: {
    flexDirection: "row",
    marginTop: 10,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  summaryMain: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.textDark,
    marginTop: 4,
  },
  summaryCaption: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  summaryChipRow: {
    flexDirection: "row",
    marginTop: 6,
    gap: 6,
    flexWrap: "wrap",
  },
  chip: {
    borderRadius: 10,
    backgroundColor: "#F5F6FA",
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  chipText: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  progressBar: {
    height: 5,
    borderRadius: 3,
    overflow: "hidden",
    backgroundColor: "#ECEEF5",
    marginTop: 8,
    flexDirection: "row",
  },
  progressFill: {
    backgroundColor: COLORS.lupinGreen,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  legendRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 10,
    color: COLORS.textLight,
    marginLeft: 4,
  },

  heatmapGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 4,
  },
  heatBlock: {
    width: "18%",
    height: 20,
    borderRadius: 4,
  },
  alertBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.alert,
    borderRadius: 8,
    padding: 8,
    marginTop: 10,
  },
  alertText: {
    fontSize: 11,
    color: COLORS.textDark,
    marginLeft: 6,
    flex: 1,
  },

  /* Top Tabs */
  tabRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: "#E9ECF5",
    borderRadius: 12,
    padding: 3,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  tabItemActive: {
    backgroundColor: "#fff",
  },
  tabText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "500",
  },
  tabTextActive: {
    color: COLORS.lupinGreen,
  },

  /* AI Route Card */
  aiRouteCard: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "#6C5CE7",
  },
  aiRouteTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  aiRouteSubtitle: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
    marginTop: 2,
  },
  aiRouteNoteRow: {
    flexDirection: "row",
    marginTop: 8,
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#fff",
    marginRight: 6,
  },
  aiRouteNote: {
    color: "#fff",
    fontSize: 11,
    flex: 1,
  },

  /* Sub Tabs */
  subTabRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  subTabItem: {
    flex: 1,
    alignItems: "center",
  },
  subTabText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  subTabTextActive: {
    color: COLORS.lupinGreen,
    fontWeight: "600",
  },
  subTabIndicator: {
    marginTop: 2,
    width: 18,
    height: 2,
    borderRadius: 1,
    backgroundColor: COLORS.lupinGreen,
  },

  startBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.lupinGreen,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  startBtnText: {
    color: "#fff",
    fontSize: 11,
    marginLeft: 4,
  },
  miniStat: {
    flex: 1,
    paddingVertical: 8,
  },
  miniStatLabel: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  miniStatValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
    marginTop: 2,
  },
  helperText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 6,
  },

  mapPlaceholder: {
    marginTop: 14,
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: "#DDE3F5",
    height: 160,
    alignItems: "center",
    justifyContent: "center",
  },
  mapText: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
  },

  /* Visit cards */
  visitCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
  },
  visitTopRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  visitIndexCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#EEF1FB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  visitIndexText: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  visitName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  visitSpeciality: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  visitTagRow: {
    flexDirection: "row",
    marginTop: 4,
    gap: 6,
  },
  visitTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: "#FFF5D7",
  },
  visitTagText: {
    fontSize: 10,
    color: COLORS.textDark,
  },
  visitTime: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  visitDuration: {
    fontSize: 10,
    color: COLORS.textLight,
    marginTop: 2,
  },
  visitMetaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    marginLeft: 4,
    fontSize: 10,
    color: COLORS.textLight,
  },

  /* Coverage planning */
  coverageCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginTop: 10,
  },
  coverageName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.textDark,
  },
  coverageMeta: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statusChip: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  statusChipText: {
    fontSize: 10,
    fontWeight: "600",
  },
  scheduleBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "#EEF3FF",
  },
  scheduleText: {
    fontSize: 11,
    color: COLORS.lupinBlue,
    marginLeft: 4,
    fontWeight: "500",
  },

  overlapCard: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    padding: 12,
    borderRadius: 12,
    backgroundColor: COLORS.alert,
    borderWidth: 1,
    borderColor: "#FFCCBC",
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
  },
  overlapTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.textDark,
    marginLeft: 6,
  },
  overlapText: {
    fontSize: 11,
    color: COLORS.textDark,
    marginTop: 6,
  },
  viewDetailsBtn: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  viewDetailsText: {
    fontSize: 11,
    color: COLORS.textDark,
  },

  /* Bottom nav */
  bottomNav: {
    height: 60,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: "#FFFFFF",
  },
  bottomItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  bottomLabel: {
    fontSize: 10,
    marginTop: 2,
    color: COLORS.textLight,
  },
  bottomLabelActive: {
    color: COLORS.lupinGreen,
    fontWeight: "600",
  },
});

export default RouteDashboardScreen;
