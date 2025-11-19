// app/components/SuccessPanel.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    GestureResponderEvent,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View
} from "react-native";

type Product = {
  id: string;
  name: string;
  subtitle?: string;
  slides?: number;
  completed?: boolean;
};

type Props = {
  doctorName?: string;
  productCount?: number;
  specialty?: string;
  onSubmit?: (e?: GestureResponderEvent) => void;
  products?: Product[];
};

// Local image (developer provided). The platform running this preview will convert the path to a URL.
const mockupUri = "file:///mnt/data/09f48c2c-1b28-405a-a0c3-22afd7d85c33.png";

export default function SuccessPanel({
  doctorName = "Dr. Sharma",
  productCount = 3,
  specialty = "Cardiologist",
  onSubmit,
  products = [
    { id: "1", name: "Tonact EZ 40", subtitle: "Statin Combination", slides: 4, completed: true },
    { id: "2", name: "Starpress AM", subtitle: "Beta Blocker + CCB Combination", slides: 3, completed: true },
    { id: "3", name: "Ramistar 10", subtitle: "ACE Inhibitor", slides: 3, completed: true },
  ],
}: Props) {
  const completedCount = products.filter((p) => p.completed).length;
  const progress = productCount === 0 ? 0 : Math.round((completedCount / productCount) * 100);

  return (
    <ScrollView style={styles.outer} contentContainerStyle={styles.contentContainer}>
      {/* Header area that matches the screenshot's top area */}
      <View style={styles.headerCard}>
        <View style={styles.headerTopRow}>
          <Text style={styles.headerTitle}>Detailing Sequence</Text>
          <Pressable style={styles.closeBtn} onPress={() => { /* close handler (caller can wrap) */ }}>
            <Ionicons name="close" size={20} color="#374151" />
          </Pressable>
        </View>

        <Text style={styles.headerSubtitle}>{doctorName} • {specialty}</Text>

        <View style={styles.metaRow}>
          <View style={styles.metaLeft}>
            <Ionicons name="calendar" size={14} color="#6b7280" />
            <Text style={styles.metaText}> 19/11/2025</Text>
          </View>
          <Text style={styles.metaText}>2:22 PM</Text>
        </View>

        <View style={styles.progressWrapper}>
          <View style={styles.progressLabelRow}>
            <Text style={styles.overallText}>Overall Progress</Text>
            <Text style={styles.overallText}>{`${completedCount} of ${productCount} completed`}</Text>
          </View>
          <View style={styles.progressBarBG}>
            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            <View style={styles.progressDot} />
          </View>
        </View>
      </View>

      {/* Products list area - mimic the card stack in screenshot */}
      <View style={styles.productsWrapper}>
        <Text style={styles.sectionTitle}>Products to Detail ({productCount})</Text>

        {products.map((p) => (
          <View key={p.id} style={styles.productCard}>
            <View style={styles.productRowTop}>
              <View style={styles.productLeft}> 
                <View style={styles.productBadge}>
                  <Ionicons name={p.completed ? "checkmark" : "ellipse"} size={18} color={p.completed ? "#10b981" : "#6b7280"} />
                </View>
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <Text style={styles.productTitle}>{p.name}</Text>
                  <Text style={styles.productSubtitle}>{p.subtitle}</Text>
                </View>
              </View>
              <Ionicons name="chevron-down" size={20} color="#10b981" />
            </View>

            <View style={styles.productRowBottom}>
              <Text style={styles.slidesText}>{p.slides} slides</Text>
              <View style={styles.completedBadge}>
                <Text style={styles.completedText}>{p.completed ? "Completed" : "Pending"}</Text>
              </View>
            </View>
          </View>
        ))}

        {/* Success card (the previous implementation upgraded to be part of this screen) */}
        <View style={styles.successCardWrapper}>
          <View style={styles.successCard}>
            <View style={styles.outerCircle}>
              <View style={styles.innerCircle}>
                <Ionicons name="checkmark" size={40} color="#fff" />
              </View>
            </View>

            <Text style={styles.title}>🎉 All Products Detailed Successfully!</Text>

            <Text style={styles.subtitle}>
              You've completed the detailing sequence for{''}
              <Text style={styles.doctorName}>{doctorName}</Text>
              {'\n'}
              <Text style={styles.metaText}>{productCount} products • {specialty}</Text>
            </Text>

            <Pressable
              style={({ pressed }) => [
                styles.cta,
                pressed ? styles.ctaPressed : undefined,
              ]}
              onPress={onSubmit}
            >
              <View style={styles.ctaContent}>
                <Ionicons name="checkmark-done" size={18} color="#fff" />
                <Text style={styles.ctaText}>Complete Call & Submit Report</Text>
              </View>
            </Pressable>

            <Text style={styles.caption}>Click to proceed to call report form</Text>
          </View>
        </View>

        {/* Optional: show the provided mockup image at the bottom for reference */}
        {/* <View style={styles.mockupPreview}> 
          <Image source={{ uri: mockupUri }} style={styles.mockupImage} resizeMode="contain" />
        </View> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 40,
    backgroundColor: "#fff",
  },
  headerCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#e6e7eb",
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0f172a",
  },
  closeBtn: {
    padding: 6,
    borderRadius: 6,
  },
  headerSubtitle: {
    color: "#475569",
    marginBottom: 8,
    fontSize: 13,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  metaLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    color: "#6b7280",
    fontSize: 12,
  },
  progressWrapper: {
    marginTop: 6,
  },
  progressLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  overallText: {
    color: "#374151",
    fontSize: 12,
  },
  progressBarBG: {
    height: 8,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    position: "relative",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#10b981",
  },
  progressDot: {
    position: "absolute",
    right: 6,
    top: -6,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#065f46",
  },

  productsWrapper: {
    marginTop: 6,
  },
  sectionTitle: {
    fontWeight: "700",
    color: "#065f46",
    marginBottom: 8,
  },
  productCard: {
    backgroundColor: "#ecfdf5",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#d1fae5",
    marginBottom: 8,
  },
  productRowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  productLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  productBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#d1fae5",
  },
  productTitle: {
    fontWeight: "800",
    color: "#065f46",
  },
  productSubtitle: {
    color: "#065f46",
    fontSize: 12,
  },
  productRowBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  slidesText: {
    color: "#065f46",
    fontSize: 12,
  },
  completedBadge: {
    backgroundColor: "#ecfdf5",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#d1fae5",
  },
  completedText: {
    color: "#065f46",
    fontWeight: "700",
    fontSize: 12,
  },

  successCardWrapper: {
    marginTop: 12,
    marginBottom: 12,
  },
  successCard: {
    backgroundColor: "#ecfdf5",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#d1fae5",
  },

  outerCircle: {
    width: 78,
    height: 78,
    borderRadius: 78 / 2,
    backgroundColor: "#ecfdf5",
    borderWidth: 6,
    borderColor: "#d1fae5",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  innerCircle: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: "#10b981",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "800",
    fontSize: 18,
    color: "#065f46",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    color: "#065f46",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
    fontSize: 13,
  },
  doctorName: {
    fontWeight: "800",
    color: "#065f46",
  },
//   metaText: {
//     fontWeight: "700",
//     color: "#065f46",
//   },
  cta: {
    backgroundColor: "#10b981",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 8,
    minWidth: 260,
    alignItems: "center",
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#059669",
        shadowOpacity: 0.12,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
      },
      android: {
        elevation: 2,
      },
    }),
  },
  ctaPressed: {
    opacity: 0.9,
  },
  ctaContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  ctaText: {
    color: "#fff",
    fontWeight: "800",
    marginLeft: 8,
  },
  caption: {
    color: "#059669",
    fontSize: 12,
    textAlign: "center",
  },

  mockupPreview: {
    marginTop: 18,
    alignItems: "center",
  },
  mockupImage: {
    width: 300,
    height: 220,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e6e7eb",
  },
});
