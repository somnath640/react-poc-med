import { LinearGradient } from 'expo-linear-gradient'
import { router, useNavigation } from 'expo-router'
import React, { useState } from 'react'
import { Modal, Pressable, ScrollView as RNScroll, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import AttendanceModal from '../../app/modals/AttendanceModal'
import ProgressBar from '../../components/ProgressBar'
import ScrollCards from '../../components/ScrollCards'
import COLORS from '../../constants/LupinColors'
import {
	IconBox,
	IconButtonCheck,
	IconCalendar,
	IconCheckCircle,
	IconClipboard,
	IconMapPin,
	IconPhoneCall,
	IconRupee,
	IconSparkles,
	IconUserCircle
} from '../../constants/LupinIcons'
import DailyPlanningScreen from '../screens/modals/DailyPlanningScreen'

const HomeScreen = () => {
	const navigation = useNavigation();

	const [modalVisible, setModalVisible] = useState(false);
	const [welcomeModal, setWelcomeModal] = useState(true)

	return (
		<RNScroll style={styles.screen} contentContainerStyle={styles.container}>
			{/* Header */}
			<View style={styles.headerRow}>
				<View>
					<Text style={styles.title}>Dashboard</Text>
					<Text style={styles.subtitle}>Welcome back, demo</Text>
					<Text style={styles.date}>Thursday, November 6, 2025</Text>
				</View>
				<Pressable style={styles.attendanceBtn} onPress={() => setModalVisible(true)}>
					<Text style={styles.attendanceText}>Mark Attendance</Text>
				</Pressable>
	</View>
	<Modal
		  visible={welcomeModal}
		  animationType="fade"
		  transparent
		  onRequestClose={()=>setWelcomeModal(false)}
		>
        <DailyPlanningScreen setWelcomeModal={setWelcomeModal} />
      </Modal>
  <AttendanceModal visible={modalVisible} onClose={() => setModalVisible(false)} onConfirm={()=>setModalVisible(false)}/>
	{/* Banners */}
			<View style={styles.banners}>
				<LinearGradient colors={[COLORS.emerald[500], COLORS.emerald[600]]} style={styles.bannerCard}>
					<View style={styles.bannerLeft}>
						<View style={styles.bannerIconCircle}>
							<IconCalendar size={18} color={COLORS.utility.white} />
						</View>
						<View style={{ marginLeft: 10 }}>
							<Text style={styles.bannerSub}>Leave Balance</Text> 
							<Text style={styles.bannerHeader}>12 days remaining</Text>
						</View>
					</View>
					<Text style={styles.bannerAction}   onPress={() =>  router.push("/screens/field-activities/leave-attendance")}>Apply Leave →</Text>
				</LinearGradient>

				<LinearGradient colors={['#7C3AED', '#2563EB']} style={styles.bannerCardPurple}>
					<View style={styles.bannerLeft}>
						<View style={styles.bannerIconCirclePurple}>
							<IconCheckCircle size={18} color={COLORS.utility.white} />
						</View>
						<View style={{ marginLeft: 10 }}>
							<Text style={styles.bannerSub}>End-of-Day Review</Text>
							<Text style={styles.bannerHeader}>Review your performance</Text>
						</View>
					</View>
					<Text style={styles.bannerAction}>Start Review →</Text>
				</LinearGradient>
								<LinearGradient colors={['#7C3AED', '#2563EB']} style={styles.bannerCardAI}>
										<View style={styles.bannerLeft}>
												<View style={styles.bannerIconCircleAI}>
													<IconSparkles size={18} color={COLORS.utility.white} />
												</View>
												<View style={{ marginLeft: 10 }}>
													<Text style={styles.bannerSubWhite}>AI Insight</Text>
													<Text style={styles.bannerHeaderWhite}>You're on track to exceed monthly targets by 8%!</Text>
												</View>
										</View>
										<Text style={styles.bannerActionWhite}>Smart</Text>
								</LinearGradient>
			</View>

	{/* Sales Targets */}
			<View style={styles.sectionCard}>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Sales Targets - November</Text>
					<TouchableOpacity>
						<Text style={styles.viewDetails} onPress={() =>  router.push("/analytics")}>View Details</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.targetsList}>
					<ProgressBar label="Total Coverage" dotColor={COLORS.blue[600]} current={216} total={248} />
					<ProgressBar label="V1" dotColor={COLORS.green[600]} current={45} total={52} />
		  <ProgressBar label="V2 Coverage" dotColor={COLORS.ai.purple500} current={68} total={78} />
		  <ProgressBar label="V2 Frequency Coverage" dotColor={COLORS.blue[600]} current={52} total={60} />
		  <ProgressBar label="V3 Coverage" dotColor={COLORS.orange[500]} current={51} total={58} />
				</View>
			</View>

			{/* Today's Schedule */}
			<View style={styles.sectionCard}>
				<View style={styles.sectionHeader}>
					<Text style={styles.sectionTitle}>Today's Schedule (4 visits)</Text>
					<TouchableOpacity>
						<Text style={styles.viewDetails}>View Route</Text>
					</TouchableOpacity>
				</View>
				<ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
					<ScrollCards
						name="Dr. Sharma"
			type="Cardiologist"
			tier="Gold Tier"
			time="09:00 AM"
			core="Core"
			address="Breach Candy Hospital"
			min="45 min"
			km="2.3 km"
			rx="High"
			borderColor="#60A5FA"
					/>
					<ScrollCards
						name="Dr. Patel"
			type="Diabetologist"
			tier="Silver Tier"
			time="10:30 AM"
			core="Super Core"
			address="Malabar Hill Clinic"
			min="30 min"
			km="1.8 km"
			rx="Medium"
			borderColor="#FCA5A5"
					/>
					<ScrollCards
						name="Dr. Mehta"
			type="General Physician"
			tier="Gold Tier"
			time="12:00 PM"
			core="Core"
			address="Jaslok Hospital"
			min="20 min"
			km="3.2 km"
			rx="Low"
			borderColor="#34D399"
					/>
				</ScrollView>
			</View>
			{/* Pending Follow-ups (polished rows) */}
			<View style={styles.sectionCard}>
				<View style={styles.sectionHeader}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={styles.sectionTitle}>Pending Follow-ups</Text>
						<View style={styles.badgeRed}><Text style={styles.badgeText}>4</Text></View>
					</View>
					<TouchableOpacity>
						<Text style={styles.viewDetails} onPress={() =>  router.push("/hcps")}>View All</Text>
					</TouchableOpacity>
				</View>

				<View style={{ marginTop: 12, gap: 10 }}>
					{[
						{ name: 'Dr. Sharma', desc: 'Finalize order for Product X', place: 'Breach Candy Hospital', tint: '#FEE2E2', badge: '2 days overdue', badgeColor: COLORS.red[600] },
						{ name: 'Dr. Gupta', desc: 'Sample delivery and feedback', place: 'Bombay Hospital', tint: '#FEE2E2', badge: '5 days overdue', badgeColor: COLORS.red[600] },
						{ name: 'Dr. Singh', desc: 'Share Medical Literature', place: 'Grant Road Clinic', tint: '#FFFAEB', badge: '1 days overdue', badgeColor: COLORS.yellow[600] },
						{ name: 'Dr. Verma', desc: 'Share Competing Molecule info', place: 'Lilavati Hospital', tint: '#FFFAEB', badge: '3 days overdue', badgeColor: COLORS.yellow[600] },
					].map((f) => (
						<TouchableOpacity key={f.name} style={[styles.followUpRow, { backgroundColor: f.tint, borderColor: '#F3D4D8' }]}>
							<View style={styles.followUpContent}>
								<View style={styles.followUpText}>
									<View style={styles.followUpTitleRow}>
										<Text style={styles.followUpTitle}>{f.name}</Text>
										<View style={[styles.overduePill, { backgroundColor: f.badgeColor }]}>
											<Text style={styles.overdueText}>{f.badge}</Text>
										</View>
									</View>
									<Text style={styles.followUpDesc}>{f.desc}</Text>
									<Text style={styles.followUpMeta}>📍 {f.place}</Text>
								</View>
								<Text style={styles.rowChevron}>›</Text>
							</View>
						</TouchableOpacity>
					))}
				</View>
			</View>

			{/* Product Updates (polished list) */}
			<View style={styles.sectionCard}>
				<View style={styles.sectionHeader}>
					<View style={{ flexDirection: 'row', alignItems: 'center' }}>
						<Text style={styles.sectionTitle}>Product Updates</Text>
						<View style={styles.badgeBlue}><Text style={styles.badgeText}>3</Text></View>
					</View>
					<TouchableOpacity>
						<Text style={styles.viewDetails} onPress={() =>  router.push("/screens/field-activities/sample-tracking")}>View All</Text>
					</TouchableOpacity>
				</View>

				<View style={{ marginTop: 12, gap: 10 }}>
					<TouchableOpacity style={[styles.productUpdateRow, { backgroundColor: '#ECFDF5' }]}>
						<View style={styles.productLeft}>
							<View style={[styles.productIconCircle, { backgroundColor: COLORS.emerald[500] }]}>
								<IconBox size={18} color={COLORS.utility.white} />
							</View>
							<View style={{ marginLeft: 12 }}>
								<Text style={styles.productTitle}>New Launch: CardioPlus XR <Text style={styles.productPill}>New Product</Text></Text>
								<Text style={styles.productMeta}>Extended release formulation now available</Text>
								<Text style={styles.productTime}>2 days ago</Text>
							</View>
						</View>
						<Text style={styles.rowChevron}>›</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.productUpdateRow, { backgroundColor: '#FEF2F2' }]}>
						<View style={styles.productLeft}>
							<View style={[styles.productIconCircle, { backgroundColor: COLORS.red[500] }]}>
								<IconPhoneCall size={18} color={COLORS.utility.white} />
							</View>
							<View style={{ marginLeft: 12 }}>
								<Text style={styles.productTitle}>DiabetCare - Stock Alert <Text style={styles.productPillAlert}>Stock Alert</Text></Text>
								<Text style={styles.productMeta}>Limited stock remaining. Order soon.</Text>
								<Text style={styles.productTime}>1 day ago</Text>
							</View>
						</View>
						<Text style={styles.rowChevron}>›</Text>
					</TouchableOpacity>

					<TouchableOpacity style={[styles.productUpdateRow, { backgroundColor: '#EFF6FF' }]}>
						<View style={styles.productLeft}>
							<View style={[styles.productIconCircle, { backgroundColor: COLORS.blue[500] }]}>
								<IconClipboard size={18} color={COLORS.utility.white} />
							</View>
							<View style={{ marginLeft: 12 }}>
								<Text style={styles.productTitle}>Product Training: ImmunoBoost <Text style={styles.productPill}>Training</Text></Text>
								<Text style={styles.productMeta}>Mandatory online session on Jan 15</Text>
								<Text style={styles.productTime}>3 days ago</Text>
							</View>
						</View>
						<Text style={styles.rowChevron}>›</Text>
					</TouchableOpacity>
				</View>
			</View>

			{/* Quick Actions (with icon bubbles) */}
			<View style={styles.quickGrid}>
				<TouchableOpacity style={styles.quickActionItem}>
					<View style={[styles.quickActionIconCircle, { backgroundColor: COLORS.blue[500] }]}>
						<IconUserCircle size={18} color={COLORS.utility.white} />
					</View>
					<Text style={styles.quickActionLabel}>Start Call</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.quickActionItem}>
					<View style={[styles.quickActionIconCircle, { backgroundColor: COLORS.emerald[500] }]}>
						<IconRupee size={18} color={COLORS.utility.white} />
					</View>
					<Text style={styles.quickActionLabel}>Add Expense</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.quickActionItem}>
					<View style={[styles.quickActionIconCircle, { backgroundColor: COLORS.ai.purple500 }]}>
						<IconBox size={18} color={COLORS.utility.white} />
					</View>
					<Text style={styles.quickActionLabel}>Track Sample</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.quickActionItem}>
					<View style={[styles.quickActionIconCircle, { backgroundColor: COLORS.orange[500] }]}>
						<IconMapPin size={18} color={COLORS.utility.white} />
					</View>
					<Text style={styles.quickActionLabel}>View Route</Text>
				</TouchableOpacity>
			</View>
						{/* Top Performer */}
						<View style={{ marginTop: 12 }}>
							<View style={styles.topPerformerBanner}>
								<View style={styles.topPerformerLeft}>
									<View style={styles.topPerformerIconCircle}>
										<IconButtonCheck size={18} color={COLORS.utility.white} />
									</View>
									<View style={{ marginLeft: 12 }}>
										<Text style={styles.topPerformerTitle}>Top Performer</Text>
										<Text style={styles.topPerformerSubtitle}>You're in the top 10% this month!</Text>
									</View>
								</View>
							</View>
						</View>
		</RNScroll>
	)
}

export default HomeScreen

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.gray[100] },
  container: { padding: 16, paddingBottom: 80 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.gray[900] },
  subtitle: { fontSize: 14, color: COLORS.gray[700] },
  date: { fontSize: 12, color: COLORS.gray[500] },
  attendanceBtn: { backgroundColor: COLORS.blue[600], paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  attendanceText: { color: '#fff', fontWeight: '700' },

  banners: { marginTop: 8 },
  bannerCard: { borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  bannerCardPurple: { borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  bannerCardAI: { borderRadius: 12, padding: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  bannerSub: { color: COLORS.utility.white, fontSize: 12 },
  bannerHeader: { color: COLORS.utility.white, fontSize: 16, fontWeight: '700' },
  bannerSubWhite: { color: COLORS.utility.white, fontSize: 12 },
  bannerHeaderWhite: { color: COLORS.utility.white, fontSize: 14, fontWeight: '600' },
  bannerAction: { color: COLORS.utility.white, fontSize: 13, fontWeight: '600' },
  bannerActionWhite: { color: COLORS.utility.white, fontSize: 13, fontWeight: '600' },
	bannerLeft: { flexDirection: 'row', alignItems: 'center' },
	bannerIconCircle: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
	bannerIconCirclePurple: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
	bannerIconCircleAI: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },

  sectionCard: { backgroundColor: COLORS.utility.white, borderRadius: 12, padding: 14, marginTop: 12, borderWidth: 1, borderColor: COLORS.gray[200] },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.gray[900] },
  viewDetails: { fontSize: 13, color: COLORS.gray[500] },
  targetsList: { marginTop: 10 },

  badgeRed: { backgroundColor: COLORS.red[600], borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8, marginTop: -2 },
  badgeBlue: { backgroundColor: COLORS.blue[500], borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 8, marginTop: -2 },
  badgeText: { color: COLORS.utility.white, fontWeight: '700' },

  quickGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 12 },
	quickItem: { width: '48%', backgroundColor: COLORS.utility.white, padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 8 },
	quickText: { fontWeight: '700' },
	/* Follow-up rows */
	followUpRow: { borderRadius: 10, padding: 10, borderWidth: 1 },
	followUpContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	followUpText: { flex: 1, paddingRight: 8 },
	followUpTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	followUpTitle: { fontSize: 14, fontWeight: '700', color: COLORS.gray[900] },
	overduePill: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
	overdueText: { color: COLORS.utility.white, fontSize: 12, fontWeight: '700' },
	followUpDesc: { color: COLORS.gray[700], marginTop: 4 },
	followUpMeta: { color: COLORS.gray[500], marginTop: 6, fontSize: 12 },
	rowChevron: { fontSize: 24, color: COLORS.gray[400], marginLeft: 8 },
	/* Product updates */
	productUpdateRow: { borderRadius: 10, padding: 10, borderWidth: 0, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
	productLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
	productIconCircle: { width: 40, height: 40, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
	productTitle: { fontSize: 14, fontWeight: '700', color: COLORS.gray[900] },
	productPill: { fontSize: 12, fontWeight: '700', backgroundColor: 'transparent', color: COLORS.gray[700] },
	productPillAlert: { fontSize: 12, fontWeight: '700', color: COLORS.gray[700], backgroundColor: 'transparent' },
	productMeta: { color: COLORS.gray[700], marginTop: 4 },
	productTime: { color: COLORS.gray[500], marginTop: 6, fontSize: 12 },
	/* Quick actions */
	quickActionItem: { width: '48%', backgroundColor: COLORS.utility.white, padding: 12, borderRadius: 10, alignItems: 'center', marginTop: 8, justifyContent: 'center', borderWidth: 1, borderColor: COLORS.gray[200], height: 84 },
	quickActionIconCircle: { width: 36, height: 36, borderRadius: 9, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
	quickActionLabel: { fontSize: 13, fontWeight: '700', textAlign: 'center' },
	/* Top Performer banner */
	topPerformerBanner: { backgroundColor: '#FFF7ED', borderWidth: 1, borderColor: '#FEEBC8', borderRadius: 12, padding: 12, marginTop: 8 },
	topPerformerLeft: { flexDirection: 'row', alignItems: 'center' },
	topPerformerIconCircle: { width: 44, height: 44, borderRadius: 12, backgroundColor: COLORS.yellow[500], alignItems: 'center', justifyContent: 'center' },
	topPerformerTitle: { fontSize: 16, fontWeight: '700', color: COLORS.gray[900] },
	topPerformerSubtitle: { fontSize: 13, color: COLORS.gray[600], marginTop: 4 },
})