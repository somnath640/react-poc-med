import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const DistributorManagementScreen = () => {

    const distributors = [
        {
            name: "Mumbai Medical Supplies",
            area: "South Mumbai",
            orders: 156,
            revenue: "12.5L",
            status: "Healthy",
        },
        {
            name: "Prime Healthcare Dist.",
            area: "Central Mumbai",
            orders: 98,
            revenue: "8.2L",
            status: "Low",
        }
    ];

    const totals = () => {
        return {
            totalOrders: distributors.reduce((sum, e) => sum + (e.orders || 0), 0),
            totalRevenue: distributors.reduce((sum, e) => sum + (parseFloat(e.revenue) || 0), 0)
        };
    }

    return (
        <ScrollView style={styles.container}>

            <Text style={styles.header}>Distributor Management</Text>

            {/* Distributor Cards */}
            {distributors.map((d, index) => (
                <View key={index} style={styles.card}>
                    {/* Status Badge (Top Right) */}
                    <View style={[
                        styles.statusBadge,
                        d.status === "Healthy" ? styles.statusHealthy : styles.statusLow
                    ]}>
                        <Text style={styles.statusText}>{d.status}</Text>
                    </View>

                    {/* Row 1: Icon + Name */}
                    <View style={styles.row}>
                        <View style={styles.iconBox}>
                            <Ionicons name="business-outline" size={28} color="#2563EB" />
                        </View>

                        <View>
                            <Text style={styles.name}>{d.name}</Text>
                            <Text style={styles.area}>{d.area}</Text>
                        </View>
                    </View>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={[styles.statBox, { backgroundColor: "#EEF4FF" }]}>
                            <Text style={styles.statLabel}>Orders</Text>
                            <Text style={styles.statValue}>{d.orders}</Text>
                        </View>

                        <View style={[styles.statBox, { backgroundColor: "#ECFDF5" }]}>
                            <Text style={styles.statLabel}>Revenue</Text>
                            <Text style={styles.statValue}>₹{d.revenue}</Text>
                        </View>
                    </View>

                    {/* View Details Button */}
                    <TouchableOpacity style={styles.detailsBtn}>
                        <Text style={styles.detailsText}>View Details</Text>
                    </TouchableOpacity>

                </View>
            ))}

            {/* Summary Section */}
            <View style={styles.summaryRow}>
                <View style={[styles.summaryBox, { backgroundColor: "#EEF4FF", borderColor: "#d2e0f8ff" }]}>
                    <Ionicons name="cube-outline" size={26} color="#2563EB" style={{paddingBottom: 20}} />
                    <Text style={styles.summaryValue}>{totals().totalOrders}</Text>
                    <Text style={styles.summaryLabel}>Total Orders</Text>
                </View>

                <View style={[styles.summaryBox, { backgroundColor: "#ECFDF5", borderColor: "rgba(189, 246, 235, 1)" }]}>
                    <MaterialCommunityIcons name="currency-inr" size={28} color="#059669" style={{paddingBottom: 20}} />
                    <Text style={styles.summaryValue}>₹{totals().totalRevenue}L</Text>
                    <Text style={styles.summaryLabel}>Total Revenue</Text>
                </View>
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

    header: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 16,
        color: "#111827",
    },

    card: {
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 16,
        marginBottom: 18,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        position: "relative",
    },

    statusBadge: {
        position: "absolute",
        top: 10,
        right: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },

    statusHealthy: {
        backgroundColor: "#111",
    },

    statusLow: {
        backgroundColor: "#d61212ff",
    },

    statusText: {
        fontSize: 12,
        fontWeight: "600",
        color: "#fff",
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 14,
    },

    iconBox: {
        width: 45,
        height: 45,
        borderRadius: 10,
        backgroundColor: "#EBF5FF",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },

    name: {
        fontSize: 16,
        fontWeight: "700",
        color: "#111",
    },

    area: {
        color: "#6B7280",
        marginTop: 2,
    },

    statsRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
        paddingBottom: 20
    },

    statBox: {
        width: "49%",
        padding: 10,
        borderRadius: 10,
    },

    statLabel: {
        color: "#6B7280",
        marginBottom: 4,
    },

    statValue: {
        fontSize: 18,
        fontWeight: "400",
        color: "#111",
    },

    detailsBtn: {
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#E5E7EB",
    },

    detailsText: {
        color: "#111",
        fontWeight: "600",
    },

    summaryRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    summaryBox: {
        width: "49%",
        padding: 20,
        borderRadius: 12,
        borderWidth: 1
    },

    summaryValue: {
        fontSize: 22,
        fontWeight: "600",
        marginTop: 10,
        marginBottom: 4,
    },

    summaryLabel: {
        color: "#6B7280",
    },
});

export default DistributorManagementScreen;
