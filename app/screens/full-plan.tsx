// full-plan.tsx
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons';
import { router, useNavigation } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const doctors = [
  {
    name: 'Dr. Jamshed Dalal',
    speciality: 'Cardiology - Gold HCP',
    time: '9:00 AM - 9:45 AM',
    line1: 'Product X samples (10 units)',
    line2: 'Digital detailing planned',
    color: '#2196f3',
  },
  {
    name: 'Dr. Priya Patel',
    speciality: 'Diabetology - Gold HCP',
    time: '11:00 AM - 11:45 AM',
    line1: 'Product Y samples (8 units)',
    line2: 'Clinical data presentation',
    color: '#4caf50',
  },
  {
    name: 'Dr. Rajesh Mehta',
    speciality: 'Neurology - Silver HCP',
    time: '2:00 PM - 2:30 PM',
    line1: 'Product Z samples (5 units)',
    line2: 'New launch campaign',
    color: '#ab47bc',
  },
];

const FullPlan: React.FC = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.green} />

      {/* TOP GREEN HEADER */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoCircle}>
            <TouchableOpacity>
              <Ionicons name="chevron-back" size={20} onPress={() => router.replace({ pathname: '/(tabs)', params: { openDrawer: '1' } } as any)} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.headerTitle}>LUPIN CRM</Text>
            <Text style={styles.headerSubtitle}>Field Force Management</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        {/* START OF DAY */}
        <View style={styles.card}>
          <View style={styles.cardRow}>
            <View style={[styles.iconCircle, { backgroundColor: '#ffebee' }]}>
              <MaterialIcons name="wb-sunny" size={20} color="#ff7043" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>
                Start of the Day - Intelligent Planning
              </Text>
              <Text style={styles.cardSubtitle}>
                AI-powered daily planning assistant
              </Text>
            </View>
          </View>
        </View>

        {/* PRIORITIES FOR DAY (LIGHT BLUE STRIP) */}
        <View style={styles.prioritiesCard}>
          <Text style={styles.prioritiesTitle}>Priorities for Day</Text>

          <View style={styles.priorityRow}>
            <MaterialIcons
              name="bar-chart"
              size={18}
              color="#ff9800"
              style={styles.priorityIcon}
            />
            <View style={styles.priorityTextBlock}>
              <Text style={styles.priorityMain}>Sales Achievement</Text>
              <Text style={styles.prioritySub}>
                On track: 89% of monthly target achieved
              </Text>
            </View>
          </View>

          <View style={styles.priorityRow}>
            <MaterialCommunityIcons
              name="repeat"
              size={18}
              color="#42a5f5"
              style={styles.priorityIcon}
            />
            <View style={styles.priorityTextBlock}>
              <Text style={styles.priorityMain}>Sales Process</Text>
              <Text style={styles.prioritySub}>
                3 follow-ups pending from last week
              </Text>
            </View>
          </View>

          <View style={styles.priorityRow}>
            <MaterialCommunityIcons
              name="broom"
              size={18}
              color="#ab47bc"
              style={styles.priorityIcon}
            />
            <View style={styles.priorityTextBlock}>
              <Text style={styles.priorityMain}>Sales Hygiene</Text>
              <Text style={styles.prioritySub}>
                Update 2 pending call reports
              </Text>
            </View>
          </View>
        </View>

        {/* DOCTOR VISIT HEADER */}
        <View style={styles.sectionHeaderRow}>
          <View style={styles.sectionHeaderLeft}>
            <View style={styles.sectionDot} />
            <Text style={styles.sectionHeaderText}>
              Doctor Visit Plan &amp; Marketing Activity
            </Text>
          </View>
          <View style={styles.smallGreenPill}>
            <Text style={styles.smallGreenPillText}>5 Planned</Text>
          </View>
        </View>

        {/* DOCTOR LIST */}
        <View style={styles.doctorListCard}>
          {doctors.map((doc, index) => (
            <View
              key={doc.name}
              style={[
                styles.doctorRow,
                index < doctors.length - 1 && styles.doctorRowDivider,
              ]}
            >
              <View style={styles.doctorAvatar}>
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color={doc.color}
                />
              </View>

              <View style={styles.doctorContent}>
                <Text style={styles.doctorName}>{doc.name}</Text>
                <Text style={styles.doctorSpec}>{doc.speciality}</Text>

                <View style={styles.metaRow}>
                  <Feather
                    name="clock"
                    size={12}
                    color="#757575"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.metaText}>{doc.time}</Text>
                </View>

                <View style={styles.metaLineRow}>
                  <View style={styles.metaBullet} />
                  <Text style={styles.metaLineText}>{doc.line1}</Text>
                </View>
                <View style={styles.metaLineRow}>
                  <View style={styles.metaBullet} />
                  <Text style={styles.metaLineText}>{doc.line2}</Text>
                </View>
              </View>

              <View style={styles.planPill}>
                <Text style={styles.planPillText}>Planned</Text>
              </View>
            </View>
          ))}
        </View>

        {/* AI SUGGESTIONS HEADER */}
        <View style={styles.aiHeaderRow}>
          <View style={styles.aiHeaderLeft}>
            <MaterialIcons
              name="lightbulb-outline"
              size={16}
              color="#616161"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.aiHeaderText}>
              AI Suggestions - Additional Doctors
            </Text>
          </View>
        </View>

        {/* AI SUGGESTIONS CARD */}
        <View style={styles.aiWrapper}>
          <Text style={styles.aiHintText}>
            Based on your route plan, you can also visit:
          </Text>

          {/* AI doctor 1 */}
          <View style={styles.aiDoctorCard}>
            <View style={styles.aiDoctorRow}>
              <View style={[styles.doctorAvatar, { backgroundColor: '#fff8e1' }]}>
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color="#fbc02d"
                />
              </View>
              <View style={styles.doctorContent}>
                <Text style={styles.doctorName}>Dr. Amit Kumar</Text>
                <Text style={styles.doctorSpec}>Cardiology - Gold HCP</Text>

                <View style={styles.metaRow}>
                  <Feather
                    name="map-pin"
                    size={12}
                    color="#757575"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.metaText}>
                    On the way to Dr. Patel (10:15 AM)
                  </Text>
                </View>

                <View style={styles.metaRow}>
                  <MaterialIcons
                    name="bolt"
                    size={12}
                    color="#ffb300"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.metaText}>
                    AI Insight: Last visit 3 weeks ago. Prefers 10 AM slot.
                  </Text>
                </View>
              </View>
              <View style={[styles.priorityBadge, { backgroundColor: '#2e7d32' }]}>
                <Text style={styles.priorityBadgeText}>High Priority</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.addRouteStrip}>
              <Text style={styles.addRouteStripText}>Add to Route</Text>
            </TouchableOpacity>
          </View>

          {/* AI doctor 2 */}
          <View style={[styles.aiDoctorCard, { marginTop: 10 }]}>
            <View style={styles.aiDoctorRow}>
              <View style={[styles.doctorAvatar, { backgroundColor: '#ffebee' }]}>
                <MaterialCommunityIcons
                  name="account"
                  size={20}
                  color="#ef5350"
                />
              </View>
              <View style={styles.doctorContent}>
                <Text style={styles.doctorName}>Dr. Sneha Reddy</Text>
                <Text style={styles.doctorSpec}>
                  General Physician - Silver HCP
                </Text>

                <View style={styles.metaRow}>
                  <Feather
                    name="map-pin"
                    size={12}
                    color="#757575"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.metaText}>
                    Near Dr. Mehta (1:30 PM)
                  </Text>
                </View>

                <View style={styles.metaRow}>
                  <MaterialIcons
                    name="bolt"
                    size={12}
                    color="#ffb300"
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.metaText}>
                    AI Insight: New prescription potential. Available afternoons.
                  </Text>
                </View>
              </View>
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: '#eceff1' },
                ]}
              >
                <Text
                  style={[
                    styles.priorityBadgeText,
                    { color: '#37474f' },
                  ]}
                >
                  Medium Priority
                </Text>
              </View>
            </View>

            <TouchableOpacity style={styles.addRouteStrip}>
              <Text style={styles.addRouteStripText}>Add to Route</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* GPS LOCATION REMINDERS */}
        <View style={styles.gpsWrapper}>
          <View style={styles.gpsHeaderRow}>
            <View style={styles.sectionDot} />
            <Text style={styles.gpsHeaderText}>GPS Location Reminders</Text>
          </View>

          <View style={styles.gpsList}>
            <View style={styles.gpsLineRow}>
              <Feather
                name="check-circle"
                size={14}
                color={COLORS.green}
                style={styles.gpsIcon}
              />
              <Text style={styles.gpsLineText}>GPS tracking enabled</Text>
            </View>
            <View style={styles.gpsLineRow}>
              <Feather
                name="check-circle"
                size={14}
                color={COLORS.green}
                style={styles.gpsIcon}
              />
              <Text style={styles.gpsLineText}>
                Location-based reminders active
              </Text>
            </View>
            <View style={styles.gpsLineRow}>
              <Feather
                name="check-circle"
                size={14}
                color={COLORS.green}
                style={styles.gpsIcon}
              />
              <Text style={styles.gpsLineText}>
                Will prompt about missed doctors on route
              </Text>
            </View>
          </View>

          <View style={styles.gpsInfoStrip}>
            <MaterialIcons
              name="info-outline"
              size={14}
              color="#ffb300"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.gpsInfoText}>
              I’ll notify you when you’re near unplanned high-priority HCPs
              based on your GPS location
            </Text>
          </View>

          <View style={styles.gpsBottomRow}>
            <TouchableOpacity style={styles.navButton}>
              <Text style={styles.navButtonText}>Start Navigation</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.viewPlanButton}>
              <MaterialCommunityIcons
                name="file-document-outline"
                size={14}
                color="#455a64"
                style={{ marginRight: 6 }}
              />
              <Text style={styles.viewPlanText}>View Full Plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default FullPlan;

/* ---------- STYLES ---------- */

const COLORS = {
  green: '#00AB84',
  bg: '#f5f7fb',
  white: '#ffffff',
  blueStrip: '#f3f7ff',
  purpleStrip: '#faf0ff',
  gpsStrip: '#f1fff5',
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },

  /* HEADER */
  header: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 16,
    paddingVertical: 13,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
  headerSubtitle: {
    color: '#d9ffd7',
    fontSize: 11,
  },
  headerMenu: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 16,
  },
  menuDot: {
    width: 3,
    height: 3,
    borderRadius: 2,
    backgroundColor: COLORS.white,
  },

  /* GENERIC CARDS */
  card: {
    backgroundColor: COLORS.white,
    marginHorizontal: 12,
    marginTop: 10,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#263238',
  },
  cardSubtitle: {
    marginTop: 3,
    fontSize: 11,
    color: '#78909c',
  },

  /* PRIORITIES */
  prioritiesCard: {
    marginHorizontal: 12,
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: COLORS.blueStrip,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  prioritiesTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#263238',
  },
  priorityRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  priorityIcon: {
    marginRight: 8,
    marginTop: 2,
  },
  priorityTextBlock: {
    flex: 1,
  },
  priorityMain: {
    fontSize: 13,
    fontWeight: '600',
    color: '#37474f',
  },
  prioritySub: {
    fontSize: 11,
    color: '#607d8b',
    marginTop: 2,
  },

  /* SECTION HEADER */
  sectionHeaderRow: {
    flexDirection: 'row',
    marginHorizontal: 12,
    marginTop: 14,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.green,
    marginRight: 8,
  },
  sectionHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#37474f',
  },
  smallGreenPill: {
    backgroundColor: COLORS.green,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 16,
  },
  smallGreenPillText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
  },

  /* DOCTOR LIST */
  doctorListCard: {
    marginHorizontal: 12,
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  doctorRow: {
    flexDirection: 'row',
    paddingVertical: 8,
  },
  doctorRowDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  doctorAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  doctorContent: {
    flex: 1,
  },
  doctorName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#263238',
  },
  doctorSpec: {
    fontSize: 11,
    color: '#78909c',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  metaText: {
    fontSize: 11,
    color: '#616161',
    flex: 1,
  },
  metaLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  metaBullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#cfd8dc',
    marginRight: 5,
  },
  metaLineText: {
    fontSize: 11,
    color: '#607d8b',
    flex: 1,
  },
  planPill: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#cfd8dc',
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginLeft: 6,
    marginTop: 4,
  },
  planPillText: {
    fontSize: 10,
    color: '#78909c',
    fontWeight: '500',
  },

  /* AI SUGGESTIONS */
  aiHeaderRow: {
    marginTop: 16,
    marginHorizontal: 12,
  },
  aiHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#37474f',
  },
  aiWrapper: {
    marginHorizontal: 12,
    marginTop: 6,
    borderRadius: 10,
    backgroundColor: COLORS.purpleStrip,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  aiHintText: {
    fontSize: 11,
    color: '#616161',
    marginBottom: 8,
  },
  aiDoctorCard: {
    borderRadius: 8,
    backgroundColor: COLORS.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  aiDoctorRow: {
    flexDirection: 'row',
  },
  priorityBadge: {
    alignSelf: 'flex-start',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 6,
  },
  priorityBadgeText: {
    fontSize: 10,
    color: COLORS.white,
    fontWeight: '600',
  },
  addRouteStrip: {
    marginTop: 8,
    borderRadius: 6,
    backgroundColor: COLORS.green,
    alignItems: 'center',
    paddingVertical: 6,
  },
  addRouteStripText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },

  /* GPS SECTION */
  gpsWrapper: {
    marginHorizontal: 12,
    marginTop: 16,
    borderRadius: 10,
    backgroundColor: COLORS.gpsStrip,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  gpsHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gpsHeaderText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#37474f',
  },
  gpsList: {
    marginTop: 10,
  },
  gpsLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  gpsIcon: {
    marginRight: 6,
  },
  gpsLineText: {
    fontSize: 12,
    color: '#455a64',
  },
  gpsInfoStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  gpsInfoText: {
    fontSize: 10,
    color: '#616161',
    flex: 1,
  },
  gpsBottomRow: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
  },
  navButton: {
    flex: 1,
    borderRadius: 6,
    backgroundColor: COLORS.green,
    paddingVertical: 8,
    alignItems: 'center',
    marginRight: 8,
  },
  navButtonText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  viewPlanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#cfd8dc',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  viewPlanText: {
    fontSize: 11,
    color: '#455a64',
    fontWeight: '500',
  },
});
