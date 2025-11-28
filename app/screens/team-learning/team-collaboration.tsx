// App.tsx
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

type Metric = {
  label: string;
  value: string;
};

type Post = {
  id: string;
  author: string;
  role: string;
  timeAgo: string;
  title: string;
  body: string;
  tag: string;
  metrics?: Metric[];
  likes: number;
  comments: number;
};

type DataShape = {
  stats: {
    teamInsights: number;
    learningProgressPercent: number;
  };
  posts: Post[];
};

const DATA: DataShape = {
  stats: {
    teamInsights: 4,
    learningProgressPercent: 71,
  },
  posts: [
    {
      id: "1",
      author: "Rajesh Kumar",
      role: "Senior Medical Rep • Mumbai Central",
      timeAgo: "2 hours ago",
      title: "Increased Lupin Cardio-X adoption by 45% in Q4",
      body:
        "Successfully engaged with 12 cardiologists using the new e-detailing module. Key strategy: Focused on clinical trial data and patient outcomes. Scheduled follow-ups every 2 weeks to track prescription trends.",
      tag: "Success Story",
      metrics: [
        { label: "Doctors", value: "12" },
        { label: "Prescriptions", value: "340" },
        { label: "Revenue", value: "₹8.5L" },
      ],
      likes: 24,
      comments: 8,
    },
    {
      id: "2",
      author: "Priya Sharma",
      role: "Medical Rep • Delhi NCR",
      timeAgo: "5 hours ago",
      title: "Effective chemist relationship building technique",
      body:
        "Started monthly stock audit visits with top 10 chemists. This helped identify supply chain gaps early and increased trust. Now getting priority shelf space for Lupin products.",
      tag: "Best Practice",
      metrics: [],
      likes: 31,
      comments: 12,
    },
    {
      id: "3",
      author: "Amit Patel",
      role: "Area Manager • Gujarat Region",
      timeAgo: "1 day ago",
      title: "Competitor launched new diabetes combo - Response Strategy",
      body:
        "XYZ Pharma launched a new diabetes combination. Our Lupin Diabetes Care still has better efficacy profile and 15% better pricing. Preparing comparative chart for all reps to counter objections.",
      tag: "Market Intel",
      likes: 42,
      comments: 15,
    },
    {
      id: "4",
      author: "Sneha Reddy",
      role: "Medical Rep • Bangalore South",
      timeAgo: "1 day ago",
      title: "Doctors requesting smaller pack sizes for trial prescriptions",
      body:
        "Multiple physicians (Dr. Mehta, Dr. Rao, Dr. Singh) requested 5-day starter packs for new patients. Current 30-day packs create hesitation for first-time prescriptions. Escalating to product team.",
      tag: "Product Feedback",
      likes: 28,
      comments: 9,
    },
  ],
};

const TABS = ["Insights", "Meetings", "Learning", "Support"] as const;
type TabName = typeof TABS[number];

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabName>("Insights");
  const [search, setSearch] = useState<string>("");

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.headerLeft}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="account-group" size={20} color="#fff" />
        </View>
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Team Collaboration & Learning</Text>
          <Text style={styles.headerSubtitle}>Connect, learn, and grow together</Text>
        </View>
      </View>

      <View style={styles.headerStatsRow}>
        <View style={[styles.statCard, styles.statCardBlue]}>
          <Text style={styles.statLabel}>Team Insights</Text>
          <Text style={styles.statValue}>{DATA.stats.teamInsights}</Text>
          <MaterialCommunityIcons
            name="share-variant"
            size={20}
            color="#4E86FF"
            style={{ position: "absolute", right: 14, top: 14 }}
          />
        </View>

        <View style={[styles.statCard, styles.statCardPink]}>
          <Text style={styles.statLabel}>Learning Progress</Text>
          <Text style={styles.statValue}>{DATA.stats.learningProgressPercent}%</Text>
          <MaterialCommunityIcons
            name="book-open-page-variant"
            size={20}
            color="#7B3CFF"
            style={{ position: "absolute", right: 14, top: 14 }}
          />
        </View>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabsContainer}>
      {TABS.map((t) => {
        const active = t === activeTab;
        return (
          <TouchableOpacity
            key={t}
            style={[styles.tabButton, active && styles.tabButtonActive]}
            onPress={() => setActiveTab(t)}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons
              name={
                t === "Insights"
                  ? "share-variant"
                  : t === "Meetings"
                  ? "video"
                  : t === "Learning"
                  ? "school"
                  : "message-text-outline"
              }
              size={16}
              color={active ? "#161616" : "#6b6b6b"}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.tabText, active && styles.tabTextActive]}>{t}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );

  const renderShareBox = () => (
    <View style={styles.shareBox}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
        <View style={styles.shareIcon}>
          <MaterialCommunityIcons name="share-variant" size={18} color="#fff" />
        </View>
        <Text style={styles.shareTitle}>Share Team Insights</Text>
      </View>
      <Text style={styles.shareDesc}>
        Share success stories, best practices, and market intelligence with your team
      </Text>
      <TouchableOpacity style={styles.shareBtn} activeOpacity={0.85}>
        <MaterialCommunityIcons name="share-variant" size={14} color="#fff" />
        <Text style={styles.shareBtnText}>  Share New Insight</Text>
      </TouchableOpacity>
    </View>
  );

  const renderPost = ({ item }: { item: Post }) => {
    return (
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.author.charAt(0)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.postAuthor}>{item.author}</Text>
            <Text style={styles.postRole}>
              {item.role} • {item.timeAgo}
            </Text>
          </View>
          <View
            style={[
              styles.postTag,
              item.tag === "Success Story"
                ? styles.tagSuccess
                : item.tag === "Best Practice"
                ? styles.tagBlue
                : item.tag === "Market Intel"
                ? styles.tagPurple
                : styles.tagOrange,
            ]}
          >
            <Text style={styles.postTagText}>{item.tag}</Text>
          </View>
        </View>

        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postBody}>{item.body}</Text>

        {item.metrics && item.metrics.length > 0 && item.metrics[0].label !== "" && (
          <View style={styles.metricsRow}>
            {item.metrics.map((m, idx) => (
              <View
                key={idx}
                style={[
                  styles.metricBox,
                  idx === 0 ? { borderColor: "#CFE5FF" } : idx === 1 ? { borderColor: "#DFF7E8" } : { borderColor: "#F1E6FF" },
                ]}
              >
                <Text style={[styles.metricLabel, idx === 0 && { color: "#2C69D9" }]}>{m.label}</Text>
                <Text style={[styles.metricValue, idx === 0 && { color: "#2C69D9" }]}>{m.value}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.divider} />
        <View style={styles.postFooter}>
          <View style={styles.footerLeft}>
            <MaterialCommunityIcons name="trending-up" size={18} color="#3E7BFF" />
            <Text style={styles.footerCount}>{item.likes}</Text>
            <MaterialCommunityIcons name="comment-outline" size={18} color="#6b6b6b" style={{ marginLeft: 12 }} />
            <Text style={styles.footerCount}>{item.comments}</Text>
          </View>
          <MaterialCommunityIcons name="share-variant" size={18} color="#6b6b6b" />
        </View>
      </View>
    );
  };

  const filtered = DATA.posts.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.body.toLowerCase().includes(search.toLowerCase()) ||
      p.author.toLowerCase().includes(search.toLowerCase())
  );

  const renderInsights = () => (
    <View style={{ paddingBottom: 120 }}>
      {renderShareBox()}
      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={18} color="#8f8f8f" />
        <TextInput
          placeholder="Search insights..."
          placeholderTextColor="#9a9a9a"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList data={filtered} keyExtractor={(item) => item.id} renderItem={renderPost} contentContainerStyle={{ paddingBottom: 60 }} />
    </View>
  );

  const renderPlaceholderTab = (title: string) => (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 16, color: "#333" }}>{title} content will appear here. (You said you'll provide screenshots later)</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        {renderHeader()}
        {renderTabs()}

        {activeTab === "Insights" && renderInsights()}
        {activeTab === "Meetings" && renderPlaceholderTab("Meetings")}
        {activeTab === "Learning" && renderPlaceholderTab("Learning")}
        {activeTab === "Support" && renderPlaceholderTab("Support")}
      </ScrollView>

      {/* floating action button */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <Text style={{ color: "#fff", fontWeight: "700" }}>L</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F6F7FB",
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  /* Header */
  headerContainer: {
    marginTop: 12,
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#5B46FF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#161616",
  },
  headerSubtitle: {
    fontSize: 12,
    color: "#7c7c7c",
    marginTop: 2,
  },

  headerStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  statCard: {
    flex: 1,
    height: 72,
    borderRadius: 8,
    padding: 14,
    marginRight: 10,
    justifyContent: "center",
    position: "relative",
  },
  statCardBlue: {
    backgroundColor: "#E9F5FF",
    marginRight: 12,
  },
  statCardPink: {
    backgroundColor: "#F6EAFE",
  },
  statLabel: {
    fontSize: 12,
    color: "#6b6b6b",
  },
  statValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2a2a2a",
    marginTop: 6,
  },

  /* Tabs */
  tabsContainer: {
    flexDirection: "row",
    marginTop: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    alignItems: "center",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: "transparent",
  },
  tabButtonActive: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  tabText: {
    color: "#6b6b6b",
    fontWeight: "600",
  },
  tabTextActive: {
    color: "#161616",
  },

  /* Share box */
  shareBox: {
    marginTop: 14,
    backgroundColor: "#EEF9F0",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#DFF7E8",
  },
  shareIcon: {
    width: 28,
    height: 28,
    borderRadius: 28,
    backgroundColor: "#0BA44D",
    alignItems: "center",
    justifyContent: "center",
  },
  shareTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
    color: "#123e26",
  },
  shareDesc: {
    color: "#5a7b61",
    marginTop: 8,
    marginBottom: 12,
    lineHeight: 18,
  },
  shareBtn: {
    backgroundColor: "#09893b",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 6,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  shareBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
    marginLeft: 6,
  },

  /* Search */
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 14,
    borderWidth: 1,
    borderColor: "#efefef",
  },
  searchInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#333",
  },

  /* Post card */
  postCard: {
    backgroundColor: "#fff",
    marginTop: 14,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eef0f3",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#B4A9FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#fff",
    fontWeight: "700",
  },
  postAuthor: {
    fontWeight: "700",
    fontSize: 14,
    color: "#161616",
  },
  postRole: {
    fontSize: 12,
    color: "#8d8d8d",
    marginTop: 4,
  },
  postTag: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    marginLeft: 8,
  },
  postTagText: {
    fontSize: 12,
    fontWeight: "600",
  },
  tagSuccess: {
    backgroundColor: "#ECFFF4",
    borderColor: "#C7F2D7",
  },
  tagBlue: {
    backgroundColor: "#F1F7FF",
    borderColor: "#D6E9FF",
  },
  tagPurple: {
    backgroundColor: "#FCF4FF",
    borderColor: "#F0DBFF",
  },
  tagOrange: {
    backgroundColor: "#FFF7EF",
    borderColor: "#FFE7C9",
  },

  postTitle: {
    fontWeight: "700",
    marginTop: 6,
    marginBottom: 8,
    color: "#111",
  },
  postBody: {
    color: "#6a6a6a",
    lineHeight: 20,
    marginBottom: 12,
    fontSize: 13,
  },

  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
  },
  metricBox: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    marginRight: 8,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  metricLabel: {
    fontSize: 12,
    color: "#4c4c4c",
    marginBottom: 6,
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2b2b2b",
  },

  divider: {
    height: 1,
    backgroundColor: "#eef0f3",
    marginVertical: 10,
  },
  postFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerCount: {
    marginLeft: 6,
    marginRight: 12,
    color: "#6b6b6b",
    fontSize: 13,
  },

  /* FAB */
  fab: {
    position: "absolute",
    right: 16,
    bottom: 22,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#07A86B",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
});
