// // SampleTracking.tsx
// import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
// import { LinearGradient } from "expo-linear-gradient";
// import React, { JSX, useState } from "react";
// import {
//     Pressable,
//     ScrollView,
//     StatusBar,
//     Text,
//     View,
//     useWindowDimensions,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import SampleDetailsModal from "./modals/SampleDetailsModal";

// /* ---------- Types & mock data ---------- */

// type StockStatus = "Healthy" | "Restock";

// type StockItem = {
//   id: string;
//   name: string;
//   batch: string;
//   expiry: string;
//   location?: string;
//   total: number;
//   distributed: number;
//   status: StockStatus;
// };

// const STOCK_ITEMS: StockItem[] = [
//   {
//     id: "1",
//     name: "Acemiz Plus Tablet",
//     batch: "ACM2024A",
//     expiry: "Dec 2026",
//     total: 50,
//     distributed: 5,
//     status: "Healthy",
//   },
//   {
//     id: "2",
//     name: "Clopitab-CV Gold Capsule",
//     batch: "CLO2024B",
//     expiry: "Jan 2025",
//     total: 30,
//     distributed: 18,
//     status: "Restock",
//   },
//   {
//     id: "3",
//     name: "Telmisartan (40mg)",
//     batch: "TEL2024C",
//     expiry: "Feb 2025",
//     total: 25,
//     distributed: 17,
//     status: "Restock",
//   },
// ];

// /* ---------- Responsive helper ---------- */

// function useResponsive() {
//   const { width } = useWindowDimensions();
//   const isPhone = width < 768;
//   const isTablet = width >= 768 && width < 1200;
//   const isLaptop = width >= 1200;

//   let containerWidth = Math.min(width - 24, 1000);
//   if (isTablet) containerWidth = Math.min(width - 64, 1400);
//   if (isLaptop) containerWidth = Math.min(width - 160, 1800);

//   return { isPhone, containerWidth };
// }

// /* ---------- Main component ---------- */

// export default function SampleTracking(): JSX.Element {
//   const { containerWidth } = useResponsive();

//   const [activeTab, setActiveTab] = useState<
//     "Stock" | "Distribution" | "NearExp" | "Replace"
//   >("Stock");

//   const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const totalStock = 156;
//   const distributed = 40;
//   const lowStockCount = 3;

//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: "#f8fafc" }}>
//       <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

//       <ScrollView contentContainerStyle={{ paddingVertical: 16 }}>
//         <View
//           style={{
//             width: containerWidth,
//             alignSelf: "center",
//             paddingHorizontal: 8,
//           }}
//         >
//           {/* Title row */}
//           <View
//             style={{
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               marginBottom: 10,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 20,
//                 fontWeight: "800",
//                 color: "#0f172a",
//               }}
//             >
//               Sample Tracking
//             </Text>

//             {/* Top-right "Request" button */}
//             <Pressable
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 backgroundColor: "#020617",
//                 paddingHorizontal: 14,
//                 paddingVertical: 6,
//                 borderRadius: 999,
//                 gap: 6,
//               }}
//             >
//               <Ionicons name="add" size={16} color="#ffffff" />
//               <Text
//                 style={{
//                   color: "#ffffff",
//                   fontWeight: "700",
//                   fontSize: 13,
//                 }}
//               >
//                 Request
//               </Text>
//             </Pressable>
//           </View>

//           {/* AI stock forecast banner */}
//           <LinearGradient
//             colors={["#2563eb", "#1d4ed8"]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={{
//               borderRadius: 12,
//               paddingHorizontal: 14,
//               paddingVertical: 10,
//               marginBottom: 14,
//             }}
//           >
//             <View
//               style={{
//                 flexDirection: "row",
//                 alignItems: "center",
//                 marginBottom: 6,
//               }}
//             >
//               <MaterialCommunityIcons
//                 name="robot-happy-outline"
//                 size={18}
//                 color="#ffffff"
//               />
//               <Text
//                 style={{
//                   marginLeft: 8,
//                   fontSize: 13,
//                   fontWeight: "700",
//                   color: "#ffffff",
//                 }}
//               >
//                 AI Stock Forecast
//               </Text>
//               <MaterialCommunityIcons
//                 name="lightning-bolt-outline"
//                 size={16}
//                 color="#bfdbfe"
//                 style={{ marginLeft: 4 }}
//               />
//             </View>
//             <Text style={{ fontSize: 11, color: "#e0f2fe", lineHeight: 16 }}>
//               Clopitab-CV Gold will run out in 3 days at current pace. Request
//               50 units by Nov 7 to avoid stockout.
//             </Text>
//           </LinearGradient>

//           {/* Summary + cube icon card */}
//           <View
//             style={{
//               backgroundColor: "#fdf2ff",
//               borderRadius: 12,
//               padding: 14,
//               borderWidth: 1,
//               borderColor: "#f3e8ff",
//               marginBottom: 14,
//               position: "relative",
//             }}
//           >
//             <View
//               style={{
//                 position: "absolute",
//                 right: 14,
//                 top: 10,
//                 width: 28,
//                 height: 28,
//                 borderRadius: 999,
//                 backgroundColor: "#ede9fe",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               <MaterialCommunityIcons
//                 name="cube-outline"
//                 size={16}
//                 color="#4f46e5"
//               />
//             </View>

//             <View style={{ marginBottom: 16 }}>
//               <Text style={{ fontSize: 11, color: "#6b7280" }}>Total Stock</Text>
//               <Text
//                 style={{
//                   fontSize: 24,
//                   fontWeight: "800",
//                   color: "#0f172a",
//                   marginTop: 2,
//                 }}
//               >
//                 {totalStock}
//               </Text>
//             </View>

//             <View
//               style={{
//                 flexDirection: "row",
//                 borderRadius: 10,
//                 overflow: "hidden",
//                 backgroundColor: "#f9fafb",
//                 borderWidth: 1,
//                 borderColor: "#e5e7eb",
//               }}
//             >
//               {/* Distributed */}
//               <View
//                 style={{
//                   flex: 1,
//                   paddingVertical: 10,
//                   paddingHorizontal: 12,
//                   borderRightWidth: 1,
//                   borderRightColor: "#e5e7eb",
//                 }}
//               >
//                 <Text style={{ fontSize: 11, color: "#6b7280" }}>
//                   Distributed
//                 </Text>
//                 <Text
//                   style={{
//                     marginTop: 4,
//                     fontSize: 16,
//                     fontWeight: "700",
//                     color: "#0f172a",
//                   }}
//                 >
//                   {distributed}
//                 </Text>
//               </View>

//               {/* Low stock count */}
//               <View
//                 style={{
//                   width: 120,
//                   paddingVertical: 10,
//                   paddingHorizontal: 12,
//                   flexDirection: "row",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                 }}
//               >
//                 <View
//                   style={{ flexDirection: "row", alignItems: "center" }}
//                 >
//                   <MaterialCommunityIcons
//                     name="alert-outline"
//                     size={16}
//                     color="#f97316"
//                     style={{ marginRight: 4 }}
//                   />
//                   <Text style={{ fontSize: 11, color: "#6b7280" }}>
//                     Low Stock
//                   </Text>
//                 </View>
//                 <Text
//                   style={{
//                     fontSize: 15,
//                     fontWeight: "700",
//                     color: "#b91c1c",
//                   }}
//                 >
//                   {lowStockCount}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           {/* Tabs row */}
//           <View
//             style={{
//               flexDirection: "row",
//               backgroundColor: "#f3f4f6",
//               borderRadius: 999,
//               padding: 3,
//               marginBottom: 10,
//             }}
//           >
//             {[
//               ["Stock", "Stock"],
//               ["Distribution", "Distribution"],
//               ["Near Expiry", "NearExp"],
//               ["Replace", "Replace"],
//             ].map(([label, key]) => {
//               const active =
//                 activeTab ===
//                 (key as "Stock" | "Distribution" | "NearExp" | "Replace");
//               return (
//                 <Pressable
//                   key={key}
//                   style={{
//                     flex: 1,
//                     paddingVertical: 7,
//                     borderRadius: 999,
//                     alignItems: "center",
//                     backgroundColor: active ? "#ffffff" : "transparent",
//                   }}
//                   onPress={() =>
//                     setActiveTab(
//                       key as "Stock" | "Distribution" | "NearExp" | "Replace"
//                     )
//                   }
//                 >
//                   <Text
//                     style={{
//                       fontSize: 12,
//                       fontWeight: active ? "700" : "500",
//                       color: active ? "#111827" : "#6b7280",
//                     }}
//                   >
//                     {label}
//                   </Text>
//                 </Pressable>
//               );
//             })}
//           </View>

//           {/* Stock cards list */}
//           <View style={{ marginBottom: 18 }}>
//             {STOCK_ITEMS.map((item) => {
//               const utilization = item.distributed / item.total;
//               const statusIsHealthy = item.status === "Healthy";

//               return (
//                 <View
//                   key={item.id}
//                   style={{
//                     backgroundColor: "#ffffff",
//                     borderRadius: 12,
//                     borderWidth: 1,
//                     borderColor: "#e5e7eb",
//                     paddingHorizontal: 12,
//                     paddingVertical: 10,
//                     marginBottom: 10,
//                   }}
//                 >
//                   {/* Header row: name, batch/expiry & details link */}
//                   <View
//                     style={{
//                       flexDirection: "row",
//                       justifyContent: "space-between",
//                       alignItems: "flex-start",
//                       marginBottom: 6,
//                     }}
//                   >
//                     <View style={{ flex: 1 }}>
//                       <Text
//                         style={{
//                           fontSize: 13,
//                           fontWeight: "700",
//                           color: "#111827",
//                           marginBottom: 2,
//                         }}
//                       >
//                         {item.name}
//                       </Text>
//                       <Text
//                         style={{
//                           fontSize: 10,
//                           color: "#6b7280",
//                         }}
//                       >
//                         Batch: {item.batch} • Expiry: {item.expiry}
//                       </Text>
//                     </View>

//                     {/* Right side ratio + details button */}
//                     <View
//                       style={{
//                         alignItems: "flex-end",
//                         minWidth: 80,
//                       }}
//                     >
//                       <Text
//                         style={{
//                           fontSize: 11,
//                           fontWeight: "600",
//                           color: "#6b7280",
//                         }}
//                       >
//                         {item.distributed}/{item.total}
//                       </Text>

//                       <Pressable
//                         onPress={() => {
//                           setSelectedItem(item); // store clicked item
//                           setModalVisible(true); // open modal
//                         }}
//                         style={{
//                           marginTop: 6,
//                           alignSelf: "flex-end",
//                           borderRadius: 4,
//                           borderWidth: 1,
//                           borderColor: "#e5e7eb",
//                           backgroundColor: "#f9fafb",
//                           paddingVertical: 4,
//                           paddingHorizontal: 10,
//                           flexDirection: "row",
//                           alignItems: "center",
//                           justifyContent: "center",
//                         }}
//                       >
//                         <Ionicons
//                           name="eye-outline"
//                           size={12}
//                           color="#111827"
//                           style={{ marginRight: 4 }}
//                         />
//                         <Text
//                           style={{
//                             fontSize: 11,
//                             fontWeight: "600",
//                             color: "#111827",
//                           }}
//                         >
//                           Details
//                         </Text>
//                       </Pressable>
//                     </View>
//                   </View>

//                   {/* Progress bar */}
//                   <View
//                     style={{
//                       height: 6,
//                       borderRadius: 999,
//                       backgroundColor: "#e5e7eb",
//                       overflow: "hidden",
//                       marginTop: 6,
//                     }}
//                   >
//                     <View
//                       style={{
//                         flex: utilization,
//                         backgroundColor: "#020617",
//                       }}
//                     />
//                   </View>

//                   {/* Status pill row */}
//                   <View style={{ marginTop: 8 }}>
//                     <View
//                       style={{
//                         flexDirection: "row",
//                         alignItems: "center",
//                       }}
//                     >
//                       <MaterialCommunityIcons
//                         name={
//                           statusIsHealthy
//                             ? "check-decagram"
//                             : "alert-decagram"
//                         }
//                         size={14}
//                         color={statusIsHealthy ? "#16a34a" : "#eab308"}
//                       />
//                       <Text
//                         style={{
//                           marginLeft: 6,
//                           fontSize: 11,
//                           color: statusIsHealthy ? "#16a34a" : "#b45309",
//                           fontWeight: "600",
//                         }}
//                       >
//                         {statusIsHealthy
//                           ? "Stock healthy"
//                           : "Restock needed"}
//                       </Text>
//                     </View>
//                   </View>
//                 </View>
//               );
//             })}
//           </View>

//           {/* UCPMP Compliance card */}
//           <View
//             style={{
//               backgroundColor: "#eff6ff",
//               borderRadius: 12,
//               borderWidth: 1,
//               borderColor: "#dbeafe",
//               paddingHorizontal: 14,
//               paddingVertical: 12,
//               marginBottom: 40,
//             }}
//           >
//             <Text
//               style={{
//                 fontSize: 13,
//                 fontWeight: "700",
//                 color: "#0f172a",
//                 marginBottom: 8,
//               }}
//             >
//               UCPMP Compliance
//             </Text>

//             {[
//               "Digital logging enabled",
//               "Batch tracking active",
//               "HCP acknowledgment mandatory",
//               "Within monthly distribution limits",
//             ].map((line) => (
//               <View
//                 key={line}
//                 style={{
//                   flexDirection: "row",
//                   alignItems: "center",
//                   marginBottom: 4,
//                 }}
//               >
//                 <MaterialCommunityIcons
//                   name="check-circle-outline"
//                   size={14}
//                   color="#16a34a"
//                 />
//                 <Text
//                   style={{
//                     marginLeft: 6,
//                     fontSize: 11,
//                     color: "#111827",
//                   }}
//                 >
//                   {line}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       </ScrollView>

//       {/* Details Modal rendered once, outside the list */}
//       <SampleDetailsModal
//         visible={modalVisible}
//         onClose={() => setModalVisible(false)}
//         product={selectedItem as any}
//       />
//     </SafeAreaView>
//   );
// }
