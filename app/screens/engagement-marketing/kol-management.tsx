import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const KOLManagementScreen = () => {

    const kols = [
        {
            name: "Dr. Arvind Kumar",
            specialty: "Cardiology",
            tier: "Tier 1",
            events: 12,
            influence: "High",
            engagement: "95%",
        },
        {
            name: "Dr. Meera Patel",
            specialty: "Endocrinology",
            tier: "Tier 1",
            events: 8,
            influence: "High",
            engagement: "88%",
        }
    ];

    const upcomingEvents = [
        {
            title: "CME Session - Diabetes",
            date: "Nov 15, 2025",
            doctor: "Dr. Patel",
            status: "Confirmed",
        },
        {
            title: "Advisory Board Meeting",
            date: "Nov 22, 2025",
            doctor: "Dr. Kumar",
            status: "Pending",
        }
    ];

    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.headerRow}>
                <Text style={styles.headerText}>KOL Management</Text>
                <TouchableOpacity style={styles.addBtn}>
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text style={styles.addBtnText}>Add KOL</Text>
                </TouchableOpacity>
            </View>

            {/* KOL CARDS */}
            {kols.map((k, i) => (
                <View key={i} style={styles.kolCard}>

                    {/* Name & Tier Row */}
                    <View style={styles.row}>
                        <View style={styles.starIcon}>
                            <Ionicons name="star-outline" size={26} color="#F2A900" />
                        </View>

                        <View style={{ flex: 1 }}>
                            <View style={styles.nameRow}>
                                <Text style={styles.kolName}>{k.name}</Text>
                                <View style={styles.tierBadge}>
                                    <Text style={styles.tierText}>{k.tier}</Text>
                                </View>
                            </View>

                            <Text style={styles.specialtyText}>{k.specialty}</Text>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={[styles.statBox, { backgroundColor: "#EEF4FF" }]}>
                            <Text style={styles.statValue}>{k.events}</Text>
                            <Text style={styles.statLabel}>Events</Text>
                        </View>
                        <View style={[styles.statBox, { backgroundColor: "#F0FFF4" }]}>
                            <Text style={styles.statValue}>{k.influence}</Text>
                            <Text style={styles.statLabel}>Influence</Text>
                        </View>
                        <View style={[styles.statBox, { backgroundColor: "#F9F5FF" }]}>
                            <Text style={styles.statValue}>{k.engagement}</Text>
                            <Text style={styles.statLabel}>Engagement</Text>
                        </View>
                    </View>

                    {/* Schedule Button */}
                    <TouchableOpacity style={styles.scheduleBtn}>
                        <Ionicons name="calendar-outline" size={18} color="#374151" />
                        <Text style={styles.scheduleText}>Schedule Event</Text>
                    </TouchableOpacity>

                </View>
            ))}

            {/* UPCOMING EVENTS */}

            <View style={styles.upcomingContainer}>
                <Text style={styles.sectionTitle}>Upcoming Events</Text>
                {upcomingEvents.map((e, i) => (
                    <View key={i} style={styles.upcomingEventBox}>

                        {/* Status at Top Right */}
                        <View
                            style={[
                                styles.statusBadgeWrapper,
                                {
                                    backgroundColor:
                                        e.status === "Confirmed" ? "#DCFCE7" : "#FEF9C3",
                                },
                            ]}
                        >
                            <Text style={styles.statusText}>{e.status}</Text>
                        </View>

                        {/* Content Below */}
                        <Text style={styles.eventTitle}>{e.title}</Text>
                        <Text style={styles.eventSubText}>
                            {e.date} • {e.doctor}
                        </Text>

                    </View>
                ))}
            </View>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        padding: 16,
    },

    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },

    headerText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },

    addBtn: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#000",
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 8,
    },

    addBtnText: {
        color: "#fff",
        marginLeft: 6,
        fontWeight: "600",
    },

    kolCard: {
        backgroundColor: "#fff",
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
    },

    starIcon: {
        width: 46,
        height: 46,
        borderRadius: 23,
        backgroundColor: "#FFF7E6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    nameRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    kolName: {
        fontSize: 18,
        fontWeight: "700",
        color: "#111",
        marginRight: 8,
    },

    tierBadge: {
        backgroundColor: "#fcaa4dff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 8,
    },

    tierText: {
        fontSize: 12,
        fontWeight: "600",
        color: "white",
    },

    specialtyText: {
        marginTop: 2,
        color: "#6B7280",
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 14,
    },

    statBox: {
        width: "33%",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
    },

    statValue: {
        fontSize: 18,
        fontWeight: "400",
        color: "#111",
    },

    statLabel: {
        marginTop: 2,
        color: "#6B7280",
        fontSize: 12,
    },

    scheduleBtn: {
        marginTop: 14,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
        paddingVertical: 10,
        borderRadius: 10,
    },

    scheduleText: {
        marginLeft: 6,
        fontWeight: "600",
        color: "#374151",
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 20,
    },

    eventCard: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 12,
    },

    eventTitle: {
        fontSize: 16,
        fontWeight: "500",
        color: "#111",
    },

    eventSubText: {
        marginTop: 4,
        color: "#6B7280",
    },

    statusBadge: {
        alignSelf: "flex-end",
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 12,
        marginTop: 6,
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#000",
    },
    upcomingContainer: {
        backgroundColor: "#fff",
        padding: 14,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        marginBottom: 18,
    },

    upcomingEventBox: {
        backgroundColor: "#f8fafdff", // grey background
        padding: 14,
        borderRadius: 12,
        marginBottom: 12,
        position: "relative",
    },

    statusBadgeWrapper: {
        position: "absolute",
        top: 10,
        right: 10,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 10,
    }


});


export default KOLManagementScreen;

