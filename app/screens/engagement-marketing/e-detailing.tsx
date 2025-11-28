import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DeckDetailModal from './DeckDetailModal';

interface DeckItem {
    title: string;
    subtitle: string;
    slides: number;
    time: string;
    views: number;
    tag: string;
    thumbnail: any;
    icon: any;
    lastUsed: string;
    highlights: string[];
}

export default function EDetailingScreen() {

    const [selectedDeck, setSelectedDeck] = useState<DeckItem | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [activeDeck, setActiveDeck] = useState<any>(null);
    const [activeTab, setActiveTab] = useState<"all" | "recent" | "popular">("all");

    const decks = [
        {
            title: 'Product X - Clinical Excellence',
            subtitle: 'Product X - 10mg',
            slides: 24,
            time: '15 min',
            views: 42,
            tag: 'Product Launch',
            thumbnail: require('../../../assets/images/deck-thumb-1.png'),
            icon: '📊',
            lastUsed: '2 days ago',
            highlights: [
                'Clinical data',
                'Safety profile',
                'Dosing guidelines',
            ],
            progress: 11,
            elapsed: "6:30"
        },

        {
            title: 'Product Y - Patient Benefits',
            subtitle: 'Product Y - 20mg',
            slides: 18,
            time: '12 min',
            views: 38,
            tag: 'Patient Education',
            thumbnail: require('../../../assets/images/deck-thumb-2.png'),
            icon: '💊',
            lastUsed: '5 days ago',
            highlights: [
                'Efficacy data',
                'Patient testimonials',
                'Cost comparison',
            ],
            progress: 11,
            elapsed: "6:30"
        },

        {
            title: 'Cardiovascular Care Solutions',
            subtitle: 'Multiple Products',
            slides: 32,
            time: '20 min',
            views: 28,
            tag: 'Therapy Area',
            thumbnail: require('../../../assets/images/deck-thumb-3.png'),
            icon: '❤️',
            lastUsed: '1 week ago',
            highlights: [
                'Complete portfolio',
                'Treatment algorithms',
                'Case studies',
            ],
            progress: 11,
            elapsed: "6:30"
        },
    ];

    const recent = [
        { title: 'Product X - Clinical Excellence', doctor: 'Dr. Sharma', days: '2 days ago', score: 95 },
        { title: 'Product Y - Patient Benefits', doctor: 'Dr. Patel', days: '5 days ago', score: 88 },
        { title: 'Product X - Clinical Excellence', doctor: 'Dr. Mehta', days: '1 week ago', score: 92 },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
            {/* Top header row */}
            <View style={styles.headerTop}>
                <Text style={styles.pageTitle}>E-Detailing</Text>
                <TouchableOpacity style={styles.syncBtn}>
                    <Ionicons name="download-outline" size={18} color="#0f172a" />
                    <Text style={styles.syncText}>Sync</Text>
                </TouchableOpacity>
            </View>

            {/* AI Suggestion banner */}
            <View style={styles.aiBanner}>
                <View style={styles.aiLeft}>
                    <Ionicons name="sparkles-outline" size={18} color="#4338ca" />
                    <Text style={styles.aiTitle}>AI Suggests for Next Visit</Text>
                </View>
                <View style={styles.aiContent}>
                    <Text style={styles.aiProduct}>Product X - Clinical Excellence</Text>
                    <Text style={styles.aiSub}>Best match for Dr. Sharma (Cardiologist), 95% relevance score.</Text>
                </View>
            </View>

            {/* Stat cards row */}
            <View style={styles.statsRow}>
                <View style={[styles.statCard, { backgroundColor: '#f0fbff', borderColor: '#ddebf4ff' }]}>
                    <View style={styles.statIconWrap}><Ionicons name="document-text-outline" size={24} color="#2563eb" /></View>
                    <Text style={styles.statNumber}>3</Text>
                    <Text style={styles.statLabel}>Active Decks</Text>
                </View>

                <View style={[styles.statCard, { backgroundColor: '#f1fff6', borderColor: 'rgba(203, 246, 242, 1)' }]}>
                    <View style={styles.statIconWrap}><Ionicons name="eye-outline" size={24} color="#059669" /></View>
                    <Text style={styles.statNumber}>108</Text>
                    <Text style={styles.statLabel}>Total Views</Text>
                </View>

                <View style={[styles.statCard, { backgroundColor: '#fff5ff', borderColor: '#f9e5f9ff' }]}>
                    <View style={styles.statIconWrap}><Ionicons name="checkmark-circle-outline" size={24} color="#d946ef" /></View>
                    <Text style={styles.statNumber}>92%</Text>
                    <Text style={styles.statLabel}>Avg Engagement</Text>
                </View>
            </View>

            {/*  PRESENTATION ACTIVE BANNER     */}
            {activeDeck && (

                <View style={styles.bannerWrapper}>
                    <View style={styles.bannerCard}>

                        {/* END BUTTON */}
                        <TouchableOpacity style={styles.endBtn} onPress={() => setActiveDeck(null)}>
                            <Text style={styles.endBtnText}>End</Text>
                        </TouchableOpacity>

                        {/* TITLE ROW */}
                        <View style={styles.row}>
                            <Ionicons name="play-outline" size={18} color="#fff" />
                            <Text style={styles.bannerTitle}>Presentation Active</Text>
                        </View>

                        {/* DECK TITLE */}
                        <Text style={styles.activeDeckTitle}>{activeDeck.title}</Text>

                        {/* PROGRESS BAR TRACK */}
                        <View style={styles.progressTrack}>
                            <View
                                style={[
                                    styles.progressFill,
                                    {
                                        width: `${(activeDeck.progress / activeDeck.slides) * 100}%`,
                                    },
                                ]}
                            />
                        </View>

                        {/* SLIDE COUNT */}
                        <Text style={styles.slideInfo}>
                            Slide {activeDeck.progress} of {activeDeck.slides} • {activeDeck.elapsed} elapsed
                        </Text>
                    </View>
                </View>
            )}

            {/* Tabs row (All / Recent / Popular) */}
            <View style={styles.tabsRow}>
                <TouchableOpacity
                    style={[styles.tabItem, activeTab === 'all' && styles.tabActive]}
                    onPress={() => setActiveTab('all')}
                >
                    <Text style={activeTab === 'all' ? styles.tabTextActive : styles.tabText}>All ({decks.length})</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabItem, activeTab === 'recent' && styles.tabActive]}
                    onPress={() => setActiveTab('recent')}
                >
                    <Text style={activeTab === 'recent' ? styles.tabTextActive : styles.tabText}>Recent</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.tabItem, activeTab === 'popular' && styles.tabActive]}
                    onPress={() => setActiveTab('popular')}
                >
                    <Text style={activeTab === 'popular' ? styles.tabTextActive : styles.tabText}>Popular</Text>
                </TouchableOpacity>
            </View>

            {/* Deck list */}
            {activeTab === 'recent' ? (
                <View style={styles.listContainer}>
                    {decks.map((d, i) => (
                        <TouchableOpacity key={i} style={styles.card}>
                            <View>
                                <Text style={styles.cardTitle}>{d.title}</Text>
                                <Text style={styles.cardSubTitle}>Last used {d.lastUsed}</Text>
                            </View>

                            <TouchableOpacity style={styles.presentBtnSmall} onPress={() => setActiveDeck(d)}>
                                <Ionicons name="play-outline" color="#fff" size={16} />
                                <Text style={styles.presentTextSmall}>Present</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>

            ) : activeTab === 'popular' ? (
                <View style={styles.listContainer}>
                    {decks.map((d, i) => (
                        <TouchableOpacity key={i} style={styles.card}>
                            <View>
                                <Text style={styles.cardTitle}>{d.title}</Text>
                                <Text style={styles.cardSubTitle}>{d.views} total views</Text>
                            </View>

                            <TouchableOpacity style={styles.presentBtnSmall} onPress={() => setActiveDeck(d)}>
                                <Ionicons name="play-outline" color="#fff" size={16} />
                                <Text style={styles.presentTextSmall}>Present</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    ))}
                </View>
            ) : (
                <>
                    {decks.map((d, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.deckCard}
                            onPress={() => { setSelectedDeck(d); setModalVisible(true); }}
                            activeOpacity={0.8}
                        >
                            <Image source={d.thumbnail} style={styles.deckThumb} />

                            <View style={styles.deckContent}>
                                <View style={styles.topRow}>
                                    <Text style={styles.deckTitle}>{d.title}</Text>
                                    <View style={styles.deckTagTop}>
                                        <Text style={styles.deckTagTopText}>{d.tag}</Text>
                                    </View>
                                </View>

                                <Text style={styles.deckSubtitle}>{d.subtitle}</Text>

                                <View style={styles.deckMetaRow}>
                                    <Text style={styles.metaText}>{d.slides} slides</Text>
                                    <Text style={styles.metaText}>{d.time}</Text>
                                    <Text style={styles.metaText}>{d.views} views</Text>
                                </View>

                                <View style={styles.presentRow}>
                                    <TouchableOpacity
                                        style={styles.presentBtn}
                                        onPress={() => setActiveDeck(d)}
                                    >
                                        <Ionicons name="play-outline" size={16} color="#fff" style={{ marginRight: 6 }} />
                                        <Text style={styles.presentText}>Present</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={styles.shareBtn}>
                                        <Ionicons name="share-social" size={18} color="#111827" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </>
            )}


            {/* Recent Presentations */}
            <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>Recent Presentations</Text>

                {recent.map((r, idx) => (
                    <View key={idx} style={styles.recentRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.recentTitle}>{r.title}</Text>
                            <Text style={styles.recentMeta}>Presented to {r.doctor}</Text>

                            <View style={styles.engBarBg}>
                                <View style={[styles.engBarFill, { width: `${r.score}%` }]} />
                            </View>
                            <Text style={styles.engLabel}>Engagement score</Text>
                        </View>

                        <View style={styles.recentRight}>
                            <View style={styles.recentTime}><Text style={styles.recentTimeText}>{r.days}</Text></View>
                            <Text style={styles.recentScore}>{r.score}%</Text>
                        </View>
                    </View>
                ))}
            </View>

            {/* Pro Tips */}
            <View style={styles.proTips}>
                <Text style={styles.proTitle}>Pro Tips</Text>
                <Text>• Presentations work offline after sync</Text>
                <Text>• Swipe left/right to navigate slides</Text>
                <Text>• Engagement metrics track HCP attention</Text>
            </View>
            <DeckDetailModal
                visible={modalVisible}
                deck={selectedDeck}
                onClose={() => setModalVisible(false)}
                onPresent={(deck) => {
                    setActiveDeck(deck);
                    setModalVisible(false);
                }}
            />
        </ScrollView>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f6f7fb', padding: 16 },
    headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    pageTitle: { fontSize: 20, fontWeight: '600' },
    syncBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#e6e9ee' },
    syncText: { marginLeft: 6 },

    aiBanner: { backgroundColor: '#eef2ff', padding: 12, borderRadius: 10, marginBottom: 16, borderWidth: 1, borderColor: '#dceef9ff' },
    aiLeft: { flexDirection: 'row', alignItems: 'center', gap: 8 },
    aiTitle: { fontWeight: '600', marginLeft: 8, fontSize: 16 },
    aiContent: { marginTop: 28 },
    aiProduct: { fontWeight: '600' },
    aiSub: { color: '#4b5563' },

    statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 14 },
    statCard: { flex: 1, marginRight: 10, padding: 12, borderRadius: 10, borderWidth: 1 },
    statIconWrap: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', marginBottom: 8 },
    statNumber: { fontSize: 22, fontWeight: '700' },
    statLabel: { color: '#475569' },

    tabsRow: { flexDirection: 'row', backgroundColor: '#f3f4f6', padding: 6, borderRadius: 18, marginBottom: 12 },
    tabItem: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 18 },
    tabActive: { backgroundColor: '#fff' },
    tabText: { color: '#475569' },
    tabTextActive: { fontWeight: '700' },

    bannerWrapper: {
        marginTop: 14,
        marginBottom: 14
    },
    bannerCard: {
        backgroundColor: "#114FF5",
        borderRadius: 12,
        padding: 22,
        position: "relative",
    },

    // END BUTTON TOP-RIGHT
    endBtn: {
        position: "absolute",
        right: 16,
        top: 14,
        backgroundColor: "#fff",
        paddingHorizontal: 14,
        paddingVertical: 5,
        borderRadius: 8,
    },
    endBtnText: {
        fontWeight: "600",
        color: "#111",
    },

    // TITLE ROW
    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },
    bannerTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#fff",
        marginLeft: 6,
    },

    // DECK NAME
    activeDeckTitle: {
        fontSize: 15,
        color: "#fff",
        marginBottom: 18,
    },

    deckTitle: { fontWeight: '600' },

    // PROGRESS BAR TRACK
    progressTrack: {
        height: 6,
        backgroundColor: "rgba(255,255,255,0.35)",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 12,
    },

    // PROGRESS BAR FILL
    progressFill: {
        height: 6,
        backgroundColor: "#fff",
    },

    // SLIDE LABEL
    slideInfo: {
        color: "#fff",
        fontSize: 13,
    },

    deckCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 10, padding: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e6e9ee' },
    deckThumb: { width: 56, height: 56, borderRadius: 10, marginRight: 12, marginTop: 4 },
    deckContent: { flex: 1 },
    deckSubtitle: { color: '#6b7280', marginTop: 4 },
    deckMetaRow: { flexDirection: 'row', gap: 12, marginTop: 8 },
    metaText: { color: '#475569' },
    presentText: { color: '#fff', fontWeight: '700' },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    deckTagTop: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e6e9ee',
        marginTop: 4
    },

    deckTagTopText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#4b5563',
    },

    presentRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },

    presentBtn: {
        flex: 1,                       // <-- makes Present stretch inside the row
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f172a',
        paddingVertical: 10,
        borderRadius: 8,
    },

    shareBtn: {
        marginLeft: 10,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e6e9ee',
    },

    listContainer: {
        marginTop: 10,
        gap: 12,
    },

    card: {
        width: "100%",
        paddingVertical: 18,
        paddingHorizontal: 14,
        backgroundColor: "#fff",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111",
    },

    cardSubTitle: {
        marginTop: 4,
        color: "#6B7280",
    },

    presentBtnSmall: {
        backgroundColor: "#000",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
        flexDirection: "row",
        alignItems: "center",
    },

    presentTextSmall: {
        color: "#fff",
        marginLeft: 6,
    },
    sectionBox: { backgroundColor: '#fff', borderRadius: 10, padding: 12, marginTop: 12, borderWidth: 1, borderColor: '#e6e9ee' },
    sectionTitle: { fontWeight: '500', marginBottom: 10, fontSize: 16 },
    recentRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f7f9fbff', padding: 12, borderRadius: 10, marginTop: 12 },
    recentTitle: { fontWeight: '700' },
    recentMeta: { color: '#6b7280', marginBottom: 6 },
    engBarBg: { height: 8, backgroundColor: '#eee', borderRadius: 6, overflow: 'hidden', marginVertical: 6 },
    engBarFill: { height: '100%', backgroundColor: '#111827' },
    engLabel: { color: '#6b7280', fontSize: 12 },
    recentRight: { alignItems: 'flex-end', marginLeft: 12 },
    recentTime: { backgroundColor: '#fff', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: '#e6e9ee' },
    recentTimeText: { fontSize: 12, fontWeight: 500 },
    recentScore: { marginTop: 6 },

    proTips: { backgroundColor: '#eef6ff', padding: 12, borderRadius: 10, marginTop: 12, borderWidth: 1, borderColor: 'rgba(191, 224, 241, 1)' },
    proTitle: { fontWeight: '700', marginBottom: 18 },
});
