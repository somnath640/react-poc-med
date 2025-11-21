import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import COLORS from "../../constants/LupinColors";
import {
  IconBox,
  IconCalendar,
  IconCheckCircle,
  IconClipboard,
  IconMapPin,
  IconPhoneCall,
  IconRupee,
  IconSparkles,
  IconTinyTrendUp,
} from "../../constants/LupinIcons";

type TabKey = "leaderboard" | "products" | "territory";

export default function AnalyticsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>("leaderboard");

  return (
    <SafeAreaView style={styles.screen}>
      {/* GREEN PAGE HEADER */}
      <View
  style={{
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  }}
>
  {/* LEFT */}
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    }}
  >
    

    <Text
      style={{
        fontSize: 22,
        fontWeight: "400",
        color: "#111827",
      }}
    >
      Analytics &amp; Reports
    </Text>
  </View>

  {/* RIGHT BTN */}
  <TouchableOpacity
    onPress={() => console.log("Change range")}
    style={{
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: "#d1d5db",
      backgroundColor: "#ffffff",
    }}
  >
    <Text
      style={{
        fontSize: 13,
        fontWeight: "600",
        color: "#111827",
      }}
    >
      This Month ⌵
    </Text>
  </TouchableOpacity>
</View>

      {/* BODY */}
      <ScrollView
        style={styles.body}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* AI FORECAST */}
        <LinearGradient
          colors={["#7C3AED", "#2563EB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.aiBanner}
        >
          <View style={styles.aiBannerTopRow}>
            <View style={styles.aiTitleRow}>
              <View style={styles.aiIconCircle}>
                <IconSparkles size={18} color={COLORS.utility.white} />
              </View>
              <Text style={styles.aiTitle}>AI Forecast</Text>
            </View>
            <View style={styles.aiPill}>
              <Text style={styles.aiPillText}>Predictive</Text>
            </View>
          </View>

          <Text style={styles.aiMainText}>
            Based on current pace, you&apos;ll achieve 96% of monthly targets.
            3 Gold HCPs need immediate attention to reach 100%.
          </Text>

          <View style={styles.aiChipsRow}>
            <View style={styles.aiChip}>
              <IconTinyTrendUp size={14} color={COLORS.utility.white} />
              <Text style={styles.aiChipText}>+8% growth</Text>
            </View>
            <View style={styles.aiChip}>
              <Text style={styles.aiChipText}>96% confidence</Text>
            </View>
          </View>
        </LinearGradient>

        {/* MONTH STRIP */}
        <View style={styles.monthStrip}>
          <View>
            <Text style={styles.monthTitle}>November 2025</Text>
            <Text style={styles.monthSubtitle}>Nov 1 - Nov 30</Text>
          </View>
          <View style={styles.monthBadge}>
            <IconTinyTrendUp size={14} color={COLORS.emerald[600]} />
            <Text style={styles.monthBadgeText}>+12%</Text>
          </View>
        </View>

        {/* KPI CARDS */}
        <View style={styles.kpiGrid}>
          <MetricCard
            icon={<IconPhoneCall size={18} color={COLORS.green[600]} />}
            iconBg={COLORS.green[50]}
            title="Call Performance"
            value="142/160"
            bottomLabel="89% achieved"
            delta="+12%"
          />
          <MetricCard
            icon={<IconMapPin size={18} color={COLORS.blue[600]} />}
            iconBg={COLORS.blue[50]}
            title="Territory Coverage"
            value="87%"
            bottomLabel="87% achieved"
            delta="+5%"
          />
          <MetricCard
            icon={<IconBox size={18} color={COLORS.orange[600]} />}
            iconBg={COLORS.orange[50]}
            title="Sample Distribution"
            value="320/400"
            bottomLabel="80% achieved"
            delta="+8%"
          />
          <MetricCard
            icon={<IconRupee size={18} color={COLORS.red[600]} />}
            iconBg={COLORS.red[50]}
            title="Expense Compliance"
            value="₹18.4k/₹25k"
            bottomLabel="74% achieved"
            delta="On track"
          />
        </View>

        {/* WEEKLY TREND */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Weekly Performance Trend</Text>
          <View style={{ marginTop: 8 }}>
            <WeeklyBar label="Week 1" percent={91} calls="32/35 calls" />
            <WeeklyBar label="Week 2" percent={109} calls="38/35 calls" />
            <WeeklyBar label="Week 3" percent={100} calls="35/35 calls" />
            <WeeklyBar label="Week 4" percent={106} calls="37/35 calls" />
          </View>
        </View>

        {/* TABS */}
        <View style={styles.tabsContainer}>
          <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />

          {activeTab === "leaderboard" && <LeaderboardTab />}
          {activeTab === "products" && <ProductsTab />}
          {activeTab === "territory" && <TerritoryTab />}
        </View>

        

        {/* Recent Achievements (kept separate from tabs) */}
        <RecentAchievements />

        {/* Monthly Goals Progress (last section) */}
        <MonthlyGoals />
      </ScrollView>
    </SafeAreaView>
  );
};



/* -------------------------------------------------------------------------- */
/* SUB COMPONENTS                                                             */
/* -------------------------------------------------------------------------- */

type MetricCardProps = {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  bottomLabel: string;
  delta?: string;
};

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  iconBg,
  title,
  value,
  bottomLabel,
  delta,
}) => (
  <View style={styles.metricCard}>
    <View style={styles.metricTopRow}>
      <View style={[styles.metricIconBubble, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      {delta && (
        <View style={styles.metricDeltaPill}>
          <Text style={styles.metricDeltaText}>{delta}</Text>
        </View>
      )}
    </View>
    <View style={{ marginTop: 8 }}>
      <Text style={styles.metricTitle}>{title}</Text>
      <Text style={styles.metricValue}>{value}</Text>
      <View style={styles.metricBarTrack}>
        <View style={[styles.metricBarFill, { width: "60%" }]} />
      </View>
      <Text style={styles.metricBottomText}>{bottomLabel}</Text>
    </View>
  </View>
);

type WeeklyBarProps = {
  label: string;
  percent: number;
  calls: string;
};

const WeeklyBar: React.FC<WeeklyBarProps> = ({ label, percent, calls }) => {
  // dynamic color: under/at 100 -> blue, over 100 -> green
  const fillColor = percent >= 100 ? COLORS.emerald[600] : COLORS.blue[600];
  const widthPct = `${Math.min(percent, 120)}%`;

  return (
    <View style={styles.weekRow}>
      <View style={styles.weekHeaderRow}>
        <Text style={styles.weekLabel}>{label}</Text>
        <Text style={styles.weekPercent}>{percent}%</Text>
      </View>
      <View style={styles.weekBarTrack}>
        <View style={[styles.weekBarFill, { width: (widthPct as any), backgroundColor: fillColor }]} />
      </View>
      <Text style={styles.weekCalls}>{calls}</Text>
    </View>
  );
};

type TabProps = {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
};

const TabSwitcher: React.FC<TabProps> = ({ activeTab, onChange }) => (
  <View style={styles.tabPillsBackground}>
    {(["leaderboard", "products", "territory"] as TabKey[]).map((tab) => {
      const label =
        tab === "leaderboard"
          ? "Leaderboard"
          : tab === "products"
          ? "Products"
          : "Territory";
      const isActive = activeTab === tab;
      return (
        <TouchableOpacity
          key={tab}
          style={[styles.tabPill, isActive && styles.tabPillActive]}
          onPress={() => onChange(tab)}
        >
          <Text
            style={[
              styles.tabPillText,
              isActive && styles.tabPillTextActive,
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      );
    })}
  </View>
);

/* ---------- Leaderboard Tab ---------- */

const LeaderboardTab: React.FC = () => (
  <View style={styles.tabContentCard}>
    {/* Rank banner */}
    <View style={styles.rankBanner}>
      <Text style={styles.rankBannerTitle}>You&apos;re Rank #1</Text>
      <Text style={styles.rankBannerSubtitle}>
        Top performer this month!
      </Text>
    </View>

    {/* List */}
    <View style={{ marginTop: 12 }}>
      <LeaderboardRow
        rank="#1"
        name="Rajesh Kumar (You)"
        calls="Calls: 142"
        coverage="Coverage: 87%"
        highlight
      />
      <LeaderboardRow
        rank="#2"
        name="Priya Sharma"
        calls="Calls: 138"
        coverage="Coverage: 85%"
      />
      <LeaderboardRow
        rank="#3"
        name="Amit Patel"
        calls="Calls: 135"
        coverage="Coverage: 83%"
      />
      <LeaderboardRow
        rank="#4"
        name="Sunita Mehta"
        calls="Calls: 128"
        coverage="Coverage: 79%"
      />
      <LeaderboardRow
        rank="#5"
        name="Vikram Singh"
        calls="Calls: 125"
        coverage="Coverage: 77%"
      />
    </View>

    {/* Achievements: moved out into RecentAchievements component (rendered separately) */}
  </View>
);

type LeaderboardRowProps = {
  rank: string;
  name: string;
  calls: string;
  coverage: string;
  highlight?: boolean;
};

const LeaderboardRow: React.FC<LeaderboardRowProps> = ({
  rank,
  name,
  calls,
  coverage,
  highlight,
}) => (
  <View
    style={[
      styles.leaderRow,
      highlight && styles.leaderRowHighlight,
    ]}
  >
    <Text style={styles.leaderRank}>{rank}</Text>
    <View style={{ flex: 1 }}>
      <Text style={styles.leaderName}>{name}</Text>
      <Text style={styles.leaderMeta}>
        {calls}   {coverage}
      </Text>
    </View>
    <Text style={styles.leaderTrophy}>🏅</Text>
  </View>
);

const AchievementBadge: React.FC<{ label: string; icon: string }> = ({
  label,
  icon,
}) => (
  <View style={styles.achievementBadge}>
    <Text style={styles.achievementIcon}>{icon}</Text>
    <Text style={styles.achievementText}>{label}</Text>
  </View>
);

/* ---------- Recent Achievements (separate component) ---------- */
const RecentAchievements: React.FC = () => {
  const items = [
    { key: 'top', label: 'Top Performer', icon: <IconCheckCircle size={20} color={COLORS.yellow[500]} /> },
    { key: 'calls', label: '100 Calls', icon: <IconPhoneCall size={20} color={COLORS.blue[600]} /> },
    { key: 'gold', label: 'Gold Coverage', icon: <IconSparkles size={20} color={COLORS.orange[600]} /> },
    { key: 'rising', label: 'Rising Star', icon: <IconTinyTrendUp size={20} color={COLORS.green[600]} /> },
    { key: 'consistency', label: 'Consistency', icon: <IconClipboard size={20} color={COLORS.green[600]} /> },
    { key: 'streak', label: '7 Day Streak', icon: <IconCalendar size={20} color={COLORS.green[600]} /> },
  ];

  return (
    <View style={styles.achievementsCard}>
      <Text style={styles.sectionTitle}>Recent Achievements</Text>
      <View style={styles.achievementsRow}>
        {items.map((it) => (
          <View key={it.key} style={styles.achievementBadge}>
            <View style={{ marginBottom: 8 }}>{it.icon}</View>
            <Text style={styles.achievementText}>{it.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

/* ---------- Monthly Goals Progress (last section) ---------- */
const MonthlyGoals: React.FC = () => {
  const goals = [
    { key: 'calls', label: 'Complete 160 calls', current: 142, total: 160 },
    { key: 'territory', label: 'Cover 90% territory', current: 87, total: 90 },
    { key: 'samples', label: 'Distribute 400 samples', current: 320, total: 400 },
  ];

  return (
    <View style={styles.goalsCard}>
      <Text style={styles.sectionTitle}>Monthly Goals Progress</Text>
      <View style={{ marginTop: 12 }}>
        {goals.map((g) => {
          const pct = Math.min(100, Math.round((g.current / g.total) * 100));
          return (
            <View key={g.key} style={styles.goalRow}>
              <Text style={styles.goalLabel}>{g.label}</Text>
              <View style={styles.goalRightRow}>
                <View style={styles.track}>
                  <View style={[styles.fill, { width: `${pct}%` }]} />
                </View>
                <Text style={styles.goalCount}>{`${g.current}/${g.total}`}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

/* ---------- Products Tab ---------- */

const ProductsTab: React.FC = () => {
  const products = [
    { name: "Product X - 10mg", samples: 145, calls: 89, adoption: 85 },
    { name: "Product Y - 20mg", samples: 98, calls: 72, adoption: 78 },
    { name: "Product Z - Syrup", samples: 77, calls: 54, adoption: 68 },
  ];

  return (
    <View style={styles.tabContentCard}>
      <Text style={styles.sectionTitle}>Product Performance</Text>
      <View style={{ marginTop: 16 }}>
        {products.map((p) => (
          <View key={p.name} style={styles.productRow}>
            <View style={styles.productTopRow}>
              <Text style={styles.productName}>{p.name}</Text>
              <View style={styles.adoptionPill}>
                <Text style={styles.adoptionPillText}>
                  {p.adoption}% adoption
                </Text>
              </View>
            </View>
            <View style={styles.productBarTrack}>
              <View
                style={[
                  styles.productBarFill,
                  { width: `${p.adoption}%` },
                ]}
              />
            </View>
            <Text style={styles.productMeta}>
              Samples: {p.samples}   Calls: {p.calls}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

/* ---------- Territory Tab ---------- */

const TerritoryTab: React.FC = () => {
  const territories = [
    {
      name: "South Mumbai",
      bg: "#ECFDF3",
      border: "#BBF7D0",
      badgeBg: COLORS.emerald[500],
      badgeText: "92%",
      meta: "85 HCPs in area",
      percent: 92,
    },
    {
      name: "Central Mumbai",
      bg: "#EEF2FF",
      border: "#C7D2FE",
      badgeBg: COLORS.blue[500],
      badgeText: "84%",
      meta: "78 HCPs in area",
      percent: 84,
    },
    {
      name: "North Mumbai",
      bg: "#FEF2F2",
      border: "#FECACA",
      badgeBg: COLORS.red[500],
      badgeText: "42%",
      meta: "85 HCPs in area",
      percent: 42,
    },
  ];

  return (
    <View style={styles.tabContentCard}>
      <Text style={styles.sectionTitle}>Territory Insights</Text>
      <View style={{ marginTop: 16, gap: 10 }}>
        {territories.map((t) => (
          <View
            key={t.name}
            style={[
              styles.territoryCard,
              {
                backgroundColor: t.bg,
                borderColor: t.border,
              },
            ]}
          >
            <View style={styles.territoryTopRow}>
              <Text style={styles.territoryName}>{t.name}</Text>
              <View
                style={[
                  styles.territoryBadge,
                  { backgroundColor: t.badgeBg },
                ]}
              >
                <Text style={styles.territoryBadgeText}>
                  {t.badgeText}
                </Text>
              </View>
            </View>
            <View style={styles.territoryBarTrack}>
              <View
                style={[
                  styles.territoryBarFill,
                  { width: `${t.percent}%` },
                ]}
              />
            </View>
            <Text style={styles.territoryMeta}>{t.meta}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

/* -------------------------------------------------------------------------- */
/* STYLES                                                                     */
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 5,
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
    fontSize: 26,
    color: COLORS.utility.white,
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.utility.white,
  },
  headerRightBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(3,2,19,0.25)",
  },
  headerRightText: {
    color: COLORS.utility.white,
    fontSize: 13,
  },

  body: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },

  /* AI banner */
  aiBanner: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  aiBannerTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  aiTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  aiIconCircle: {
    width: 30,
    height: 30,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  aiTitle: {
    color: COLORS.utility.white,
    fontSize: 14,
    fontWeight: "600",
  },
  aiPill: {
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.25)",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  aiPillText: {
    color: COLORS.utility.white,
    fontSize: 11,
    fontWeight: "500",
  },
  aiMainText: {
    color: COLORS.utility.white,
    fontSize: 13,
    marginTop: 4,
  },
  aiChipsRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  aiChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(15,23,42,0.25)",
  },
  aiChipText: {
    color: COLORS.utility.white,
    fontSize: 11,
    fontWeight: "500",
  },

  /* Month strip */
  monthStrip: {
    backgroundColor: COLORS.utility.white,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  monthTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray[900],
  },
  monthSubtitle: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  monthBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.emerald[50],
  },
  monthBadgeText: {
    fontSize: 12,
    color: COLORS.emerald[600],
    fontWeight: "600",
  },

  /* KPI grid */
  kpiGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 12,
  },
  metricCard: {
    width: "48%",
    backgroundColor: COLORS.utility.white,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    marginBottom: 12,
  },
  metricTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metricDeltaPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(2,6,23,0.05)',
  },
  metricDeltaText: {
    fontSize: 12,
    color: COLORS.gray[700],
    fontWeight: '600',
  },
  metricIconBubble: {
    width: 36,
    height: 36,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
  },
  metricTitle: {
    fontSize: 13,
    color: COLORS.gray[600],
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.gray[900],
    marginTop: 2,
  },
  metricBarTrack: {
    height: 6,
    borderRadius: 999,
    backgroundColor: COLORS.gray[200],
    marginTop: 8,
    overflow: "hidden",
  },
  metricBarFill: {
    height: "100%",
    backgroundColor: "#020014",
  },
  metricBottomText: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 4,
  },

  /* Weekly trend */
  sectionCard: {
    backgroundColor: COLORS.utility.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COLORS.gray[900],
  },
  weekRow: {
    marginTop: 8,
  },
  weekHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weekLabel: {
    fontSize: 13,
    color: COLORS.gray[700],
  },
  weekPercent: {
    fontSize: 13,
    color: COLORS.gray[700],
    fontWeight: "500",
  },
  weekBarTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.gray[200],
    marginTop: 4,
    overflow: "hidden",
  },
  weekBarFill: {
    height: "100%",
  },
  weekBarOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 2,
    backgroundColor: 'rgba(0,0,0,0.06)'
  },
  weekCalls: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 2,
  },

  /* Tabs */
  tabsContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  tabPillsBackground: {
    flexDirection: "row",
    backgroundColor: COLORS.gray[100],
    borderRadius: 999,
    padding: 4,
    marginBottom: 10,
  },
  tabPill: {
    flex: 1,
    borderRadius: 999,
    paddingVertical: 8,
    alignItems: "center",
  },
  tabPillActive: {
    backgroundColor: COLORS.utility.white,
  },
  tabPillText: {
    fontSize: 13,
    color: COLORS.gray[500],
    fontWeight: "500",
  },
  tabPillTextActive: {
    color: COLORS.gray[900],
  },
  tabContentCard: {
    backgroundColor: COLORS.utility.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },

  /* Leaderboard tab */
  rankBanner: {
    backgroundColor: "#FEF3C7",
    borderRadius: 12,
    padding: 10,
  },
  rankBannerTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.gray[900],
  },
  rankBannerSubtitle: {
    fontSize: 12,
    color: COLORS.gray[700],
    marginTop: 2,
  },
  leaderRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray[100],
  },
  leaderRowHighlight: {
    backgroundColor: "#E0F2FE",
    borderRadius: 8,
    marginTop: 8,
    paddingHorizontal: 8,
  },
  leaderRank: {
    width: 32,
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray[700],
  },
  leaderName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray[900],
  },
  leaderMeta: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  leaderTrophy: {
    fontSize: 18,
    marginLeft: 6,
  },
  achievementsCard: {
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#fff7fb',
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  achievementsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  achievementBadge: {
    width: '30%',
    minWidth: 100,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: COLORS.utility.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  achievementIcon: {
    fontSize: 20,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 12,
    color: COLORS.gray[700],
    textAlign: 'center',
  },

  /* Monthly Goals */
  goalsCard: {
    backgroundColor: COLORS.utility.white,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    marginTop: 14,
    marginBottom: 12,
  },
  goalRow: {
    marginBottom: 12,
  },
  goalLabel: {
    fontSize: 13,
    color: COLORS.gray[700],
  },
  goalRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  track: {
    flex: 1,
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.gray[200],
    marginRight: 10,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: '#020014',
  },
  goalCount: {
    fontSize: 12,
    color: COLORS.gray[800],
    fontWeight: '600',
  },

  /* Products tab */
  productRow: {
    marginBottom: 14,
  },
  productTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray[900],
  },
  adoptionPill: {
    borderRadius: 999,
    backgroundColor: COLORS.gray[100],
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  adoptionPillText: {
    fontSize: 11,
    color: COLORS.gray[800],
    fontWeight: "500",
  },
  productBarTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: COLORS.gray[200],
    marginTop: 6,
    overflow: "hidden",
  },
  productBarFill: {
    height: "100%",
    backgroundColor: "#020014",
  },
  productMeta: {
    fontSize: 11,
    color: COLORS.gray[600],
    marginTop: 4,
  },

  /* Territory tab */
  territoryCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  territoryTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  territoryName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray[900],
  },
  territoryBadge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  territoryBadgeText: {
    fontSize: 11,
    color: COLORS.utility.white,
    fontWeight: "600",
  },
  territoryBarTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    marginTop: 6,
    overflow: "hidden",
  },
  territoryBarFill: {
    height: "100%",
    backgroundColor: "#020014",
  },
  territoryMeta: {
    fontSize: 11,
    color: COLORS.gray[700],
    marginTop: 4,
  },
});
