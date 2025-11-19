// app/components/DetailingSequence.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import type { Product } from "../types/products";

type Props = {
  onClose: () => void;
  onBack?: () => void;
  onStartDetailing?: (
    p?: Partial<Product>,
    products?: Product[],
    index?: number
  ) => void;
  completedMap?: Record<string, boolean>;
};

// Example product list (same as your demo)
const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Tonact EZ 40",
    tagline: "Statin Combination",
    indication: "Hyperlipidemia, CVD Prevention",
    slides: [
      {
        id: "s1",
        title: "Introduction - Tonact EZ 40",
        description: "Intro description",
        keyPoints: [
          "Dual mechanism: HMG-CoA reductase inhibition + cholesterol absorption inhibition",
          "Superior LDL-C reduction vs statin alone",
          "Established cardiovascular protection",
          "Excellent safety profile with proven clinical data",
        ],
      },
      {
        id: "s2",
        title: "Clinical Evidence",
        description:
          "Multiple landmark trials have demonstrated superior efficacy of Atorvastatin + Ezetimibe combination therapy.",
        keyPoints: [
          "IMPROVE-IT: 18% relative reduction in CV events",
          "Greater LDL-C reduction: Additional 15-20% vs statin alone",
          "Complementary mechanisms for maximum efficacy",
          "Proven safety with combination therapy",
        ],
      },
      {
        id: "s3",
        title: "Dosing & Administration",
        description:
          "Tonact EZ offers convenient once-daily combination dosing for optimal patient compliance.",
        keyPoints: [
          "Fixed-dose combination: Atorvastatin 10mg + Ezetimibe 10mg",
          "Once-daily dosing improves adherence",
          "Can be taken any time of day, with or without food",
          "Suitable for patients not at LDL goal with statin alone",
          "Monthly monitoring of lipid profile recommended",
        ],
      },
      {
        id: "s4",
        title: "Safety & Tolerability",
        description:
          "Tonact EZ has an excellent safety profile with proven tolerability in clinical practice.",
        keyPoints: [
          "Well-tolerated combination therapy",
          "Monitor liver function at baseline and periodically",
          "Minimal drug-drug interactions",
          "Safe in elderly and patients with comorbidities",
          "No additional safety concerns vs individual components",
        ],
      },
    ],
  },
  {
    id: "p2",
    name: "Starpress AM",
    tagline: "Beta Blocker + CCB Combination",
    indication: "Hypertension, Angina",
    slides: [
      {
        id: "s1",
        title: "Introduction - Starpress AM",
        description:
          "Starpress AM combines Metoprolol Succinate 50mg with Amlodipine 5mg for comprehensive cardiovascular protection through dual mechanisms.",
          keyPoints: [
            "Dual mechanism: β1-blockade + calcium channel blockade",
"Superior BP control vs monotherapy",
"Extended-release for 24-hour efficacy",
"Reduces heart rate and vascular resistance"
          ]},
      { id: "s2", title: "Clinical Benefits", description: "Evidence-based combination therapy for optimal cardiovascular outcomes.",
      keyPoints: [
        "Greater BP reduction with combination therapy",
"Complementary mechanisms minimize side effects",
"Proven efficacy in angina and hypertension",
"Reduced cardiovascular events",
"Once-daily convenience improves compliance"
      ]},
      { id: "s3", title: "Dosing Guidelines", description: "Fixed-dose combination simplifies therapy and ensures optimal compliance.",
     keyPoints: [
        "Fixed combination: Metoprolol 50mg + Amlodipine 5mg",
"Once-daily dosing",
"Take with or immediately after meals",
"Monitor heart rate and blood pressure regularly",
"Suitable for patients requiring dual therapy"
     ]},
    ],
  },
  {
    id: "p3",
    name: "Ramistar 10",
    tagline: "ACE Inhibitor",
    indication: "Hypertension, Heart Failure",
    slides: [
      { id: "s1", title: "Introduction - Ramistar 10", description: "Ramistar 10 (Ramipril 10mg) is a long-acting ACE inhibitor with proven cardiovascular and renal protective effects beyond blood pressure lowering.",
      keyPoints: [
        "Potent ACE inhibition with tissue specificity",
"Cardiovascular risk reduction proven in HOPE trial",
"Renoprotective in diabetic nephropathy",
"Once-daily dosing for improved adherence"
      ] },
      { id: "s2", title: "Landmark Trials", description: "Extensive clinical evidence supporting ramipril across cardiovascular indications.", 
      keyPoints: [
        "HOPE Trial: 22% reduction in CV death, MI, stroke",
"AIRE Study: Reduced mortality post-MI",
"ONTARGET: Non-inferior to telmisartan",
"Beneficial in high-risk patients without HF"
      ] },
      { id: "s3", title: "Dosing & Monitoring", description: "Start low, go slow approach with appropriate monitoring ensures safety and efficacy.",
      keyPoints: [
        "Initial: 2.5mg once daily",
"Maintenance: 5-10mg once daily",
"Monitor serum creatinine and potassium",
"Watch for dry cough (10% incidence)",
"Contraindicated in pregnancy"
      ] },
    ],
  },
];

export default function DetailingSequence({
  onClose,
  onBack,
  onStartDetailing,
  completedMap = {},
}: Props) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const total = PRODUCTS.length;
  const completedCount = useMemo(() => {
    return PRODUCTS.reduce((acc, p) => (completedMap[p.id] ? acc + 1 : acc), 0);
  }, [completedMap]);

  const progressPercent = total > 0 ? (completedCount / total) * 100 : 0;

  return (
    <View style={s.container}>
      {/* header */}
      <View style={s.header}>
        <View style={s.headerRow}>
          <View>
            <Text style={s.title}>Detailing Sequence</Text>
            <Text style={s.subtitle}>Dr. Sharma - Cardiologist</Text>
            <View style={s.metaRow}>
              <Ionicons name="calendar" size={14} color="#4b5563" />
              <Text style={s.metaText}> 19/11/2025</Text>
              <Text style={[s.metaText, { marginLeft: 12 }]}> 12:13 PM</Text>
            </View>
          </View>

          <View style={s.headerActions}>
            {onBack ? (
              <Pressable onPress={onBack} style={s.iconBtn}>
                <Ionicons name="chevron-back" size={20} color="#0f172a" />
              </Pressable>
            ) : null}
            <Pressable onPress={onClose} style={s.iconBtn}>
              <Ionicons name="close" size={20} color="#6b7280" />
            </Pressable>
          </View>
        </View>

        {/* progress */}
        <View style={s.progressWrapper}>
          <View style={s.progressTextRow}>
            <Text style={s.progressLabel}>Overall Progress</Text>
            <Text
              style={s.progressCount}
            >{`${completedCount} of ${total} completed`}</Text>
          </View>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={s.content}>
        <Text style={s.sectionTitle}>
          Products to Detail ({PRODUCTS.length})
        </Text>

        {PRODUCTS.map((p, idx) => {
          const isOpen = expandedId === p.id;
          const done = Boolean(completedMap[p.id]);

          return (
            <View key={p.id} style={[s.card, done && s.cardDone]}>
              <View style={s.cardRow}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={[s.numberBadge, done && s.numberBadgeDone]}>
                      {!done ? (
                        <Text style={s.numberText}>{idx + 1}</Text>
                      ) : (
                        <Ionicons name="checkmark" size={18} color="#fff" />
                      )}
                    </View>

                    <View style={{ marginLeft: 12, flexShrink: 1 }}>
                      <Text style={s.productTitle} numberOfLines={1}>
                        {p.name}
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          flexWrap: "wrap",
                          marginTop: 6,
                        }}
                      >
                        <View style={s.pill}>
                          <Text style={s.pillText}>{p.tagline}</Text>
                        </View>
                        <Text style={s.indication} numberOfLines={1}>
                          {" "}
                          {p.indication}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 8,
                        }}
                      >
                        <Text style={s.slidesText}>
                          {p.slides.length} slides
                        </Text>
                        {done ? (
                          <View style={s.completedBadge}>
                            <Text style={s.completedBadgeText}>Completed</Text>
                          </View>
                        ) : null}
                      </View>
                    </View>
                  </View>
                </View>

                <Pressable
                  onPress={() => toggleExpand(p.id)}
                  style={s.chevronBtn}
                >
                  <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#6b7280"
                  />
                </Pressable>
              </View>

              {isOpen && (
                <View style={s.expanded}>
                  <View style={s.divider} />
                  <Text style={s.expandedTitle}>Slide Sequence:</Text>
                  <View style={{ marginTop: 6 }}>
                    {p.slides.map((sld, i) => (
                      <Text
                        key={sld.id}
                        style={s.slideItem}
                      >{`${i + 1}. ${sld.title ?? "Untitled"}`}</Text>
                    ))}
                  </View>
                </View>
              )}

              <Pressable
                onPress={() => {
                  if (onStartDetailing) onStartDetailing(p, PRODUCTS, idx);
                }}
                style={({ pressed }) => [
                  s.ctaFull,
                  pressed && { opacity: 0.9 },
                ]}
              >
                <Ionicons name="play" size={16} color="#fff" />
                <Text style={s.ctaFullText}>Start Detailing</Text>
              </Pressable>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8fafc" },
  header: {
    paddingHorizontal: 14,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#eef2f7",
    backgroundColor: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: { fontWeight: "800", fontSize: 16, color: "#0f172a" },
  subtitle: { color: "#6b7280", marginTop: 6 },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 6 },
  metaText: { color: "#4b5563", fontSize: 12 },
  headerActions: { flexDirection: "row", alignItems: "center" },
  iconBtn: { padding: 6, marginLeft: 6 },
  progressWrapper: { marginTop: 12 },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: { color: "#6b7280" },
  progressCount: { color: "#6b7280", fontSize: 12 },
  progressBar: {
    height: 8,
    backgroundColor: "#eef2f7",
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 8,
  },
  progressFill: { height: "100%", backgroundColor: "#0f172a" },

  content: { padding: 14, paddingBottom: 28 },
  sectionTitle: { fontWeight: "700", marginBottom: 12 },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eef2f7",
    padding: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: { elevation: 2 },
    }),
  },

  cardDone: { backgroundColor: "#ecfdf1", borderColor: "#bbf7d0" },

  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#1e90ff",
    alignItems: "center",
    justifyContent: "center",
  },
  numberBadgeDone: { backgroundColor: "#10b981" },
  numberText: { color: "#fff", fontWeight: "800" },

  productTitle: { fontWeight: "800", fontSize: 14, color: "#0f172a" },
  pill: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#eef2f7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    backgroundColor: "#fff",
  },
  pillText: { fontSize: 12, color: "#0f172a", fontWeight: "600" },
  indication: { color: "#6b7280", fontSize: 12 },
  slidesText: { color: "#6b7280", marginTop: 8 },

  chevronBtn: { padding: 8, marginLeft: 8 },

  expanded: { marginTop: 12 },
  divider: { height: 1, backgroundColor: "#f1f5f9", marginVertical: 8 },
  expandedTitle: { fontWeight: "700", color: "#374151", fontSize: 13 },
  slideItem: { color: "#6b7280", marginTop: 6, marginLeft: 8, fontSize: 13 },

  ctaFull: {
    marginTop: 16,
    alignSelf: "stretch",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f172a",
    paddingVertical: 12,
    borderRadius: 8,
  },
  ctaFullText: { color: "#fff", fontWeight: "700", marginLeft: 8 },

  completedBadge: {
    marginLeft: 10,
    backgroundColor: "#ecfdf5",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#bbf7d0",
  },
  completedBadgeText: { color: "#065f46", fontWeight: "700" },
});
