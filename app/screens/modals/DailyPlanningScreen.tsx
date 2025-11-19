import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import COLORS from '../../../constants/LupinColors';
import {
  IconAlertCircle,
  IconArrowUpRight,
  IconButtonCheck,
  IconCalendar,
  IconCheckCircle,
  IconClipboard,
  IconClock,
  IconPlan,
  IconSparkles,
  IconSunrise,
  IconTrendUp,
  IconUserCircle
} from '../../../constants/LupinIcons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_MAX_WIDTH = 420;

const DailyPlanningScreen: React.FC = () => {
  const cardWidth = Math.min(SCREEN_WIDTH - 24, CARD_MAX_WIDTH);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.backdrop}>
        <View style={[styles.modalCard, { width: cardWidth }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <LinearGradient
                colors={[COLORS.brand.lupinGreen, COLORS.brand.lupinGreenDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.headerIconBg}
              >
                <IconSunrise size={22} color={COLORS.utility.white} />
              </LinearGradient>
              <View>
                <Text style={styles.headerTitle}>Good Morning, admin! 🌅</Text>
                <Text style={styles.headerSubtitle}>
                  Let&apos;s start your day with AI-powered planning
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          {/* Body */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {/* Your Priorities for Today */}
            <View style={styles.sectionCardBlue}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <View style={styles.sectionIconBlueBg}>
                    <IconTrendUp size={16} color={COLORS.blue[600]} />
                  </View>
                  <Text style={styles.sectionTitle}>Your Priorities for Today</Text>
                </View>
              </View>

              <View style={styles.sectionInnerList}>
                <PriorityItem
                  icon={
                    <View style={[styles.priorityIconCircle, { backgroundColor: COLORS.emerald[50] }]}>
                      <IconCheckCircle size={18} color={COLORS.emerald[600]} />
                    </View>
                  }
                  title="Sales Achievement"
                  subtitle="On track: 89% of monthly target achieved"
                />
                <PriorityItem
                  icon={
                    <View style={[styles.priorityIconCircle, { backgroundColor: COLORS.orange[50] }]}>
                      <IconAlertCircle size={18} color={COLORS.orange[600]} />
                    </View>
                  }
                  title="Sales Process"
                  subtitle="3 follow-ups pending from last week"
                />
                <PriorityItem
                  icon={
                    <View style={[styles.priorityIconCircle, { backgroundColor: COLORS.blue[50] }]}>
                      <IconClipboard size={18} color={COLORS.blue[600]} />
                    </View>
                  }
                  title="Sales Hygiene"
                  subtitle="Update 2 pending call reports"
                />
              </View>
            </View>

            {/* Today's Visit Plan */}
            <View style={styles.sectionCardGreen}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <View style={styles.sectionIconGreenBg}>
                    <IconCalendar size={16} color={COLORS.green[600]} />
                  </View>
                  <Text style={styles.sectionTitle}>Today&apos;s Visit Plan</Text>
                </View>
                <View style={styles.badgePillGreen}>
                  <Text style={styles.badgePillText}>5 Planned</Text>
                </View>
              </View>

              <View style={styles.sectionInnerList}>
                <VisitItem
                  color={COLORS.blue[500]}
                  initialsIcon={<IconUserCircle size={22} color={COLORS.blue[500]} />}
                  name="Dr. Jamshed Dalal"
                  specialty="Cardiology - Gold HCP"
                  time="9:00 AM - 9:45 AM"
                />
                <VisitItem
                  color={COLORS.green[600]}
                  initialsIcon={<IconUserCircle size={22} color={COLORS.green[600]} />}
                  name="Dr. Priya Patel"
                  specialty="Diabetology - Gold HCP"
                  time="11:00 AM - 11:45 AM"
                />
              </View>

              <TouchableOpacity style={styles.moreDoctorsButton}>
                <Text style={styles.moreDoctorsText}>+ 3 more doctors scheduled</Text>
              </TouchableOpacity>
            </View>

            {/* AI Recommendations */}
            <View style={styles.sectionCardPurple}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionHeaderLeft}>
                  <View style={styles.sectionIconPurpleBg}>
                    <IconSparkles size={16} color={COLORS.ai.purple600} />
                  </View>
                  <Text style={styles.sectionTitle}>AI Recommendations</Text>
                </View>
                <View style={styles.badgePillPurple}>
                  <Text style={styles.badgePillPurpleText}>Smart Insights</Text>
                </View>
              </View>

              <View style={styles.sectionInnerList}>
                <AIItem
                  leadingIcon={
                    <View style={[styles.aiLeadingIcon, { borderColor: COLORS.ai.purple600 }]}>
                      <View
                        style={[
                          styles.aiInnerDot,
                          { backgroundColor: COLORS.ai.purple600 },
                        ]}
                      />
                    </View>
                  }
                  title="Optimal Route Suggested"
                  subtitle="Save 35 mins by visiting Dr. Sharma before Dr. Patel"
                />

                <AIItem
                  leadingIcon={
                    <IconArrowUpRight size={18} color={COLORS.emerald[600]} />
                  }
                  title="High-Value Opportunity"
                  subtitle="Dr. Dalal shows increased prescription trend (+15%)"
                />

                <AIItem
                  leadingIcon={
                    <View style={[styles.aiLeadingIcon, { borderColor: COLORS.orange[600] }]}>
                      <View
                        style={[
                          styles.aiInnerDot,
                          { backgroundColor: COLORS.orange[600] },
                        ]}
                      />
                    </View>
                  }
                  title="Follow-up Reminder"
                  subtitle="Dr. Mehta requested clinical data - prepare material"
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryFooterButton}>
              <LinearGradient
                colors={[COLORS.brand.lupinGreen, COLORS.brand.lupinGreenDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.primaryFooterGradient}
              >
                <IconButtonCheck size={20} color={COLORS.utility.white} />
                <Text style={styles.primaryFooterText}>Start My Day</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryFooterButton}>
              <IconPlan size={20} color={COLORS.gray[700]} />
              <Text style={styles.secondaryFooterText}>View Full Plan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

/* ------------------------------------------------------------------ */
/* Subcomponents                                                      */
/* ------------------------------------------------------------------ */

type PriorityItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

const PriorityItem: React.FC<PriorityItemProps> = ({
  icon,
  title,
  subtitle,
}) => (
  <View style={styles.priorityRow}>
    <View style={styles.priorityLeft}>
      {icon}
      <View>
        <Text style={styles.priorityTitle}>{title}</Text>
        <Text style={styles.prioritySubtitle}>{subtitle}</Text>
      </View>
    </View>
  </View>
);

type VisitItemProps = {
  color: string;
  initialsIcon: React.ReactNode;
  name: string;
  specialty: string;
  time: string;
};

const VisitItem: React.FC<VisitItemProps> = ({
  color,
  initialsIcon,
  name,
  specialty,
  time,
}) => (
  <View style={styles.visitCard}>
    <View style={styles.visitLeft}>
      <View style={[styles.visitAvatar, { backgroundColor: `${color}15` }]}>
        {initialsIcon}
      </View>
      <View style={styles.visitTextCol}>
        <Text style={styles.visitName}>{name}</Text>
        <Text style={styles.visitSpecialty}>{specialty}</Text>
        <View style={styles.visitTimeRow}>
          <IconClock size={14} color={COLORS.gray[500]} />
          <Text style={styles.visitTimeText}>{time}</Text>
        </View>
      </View>
    </View>
    <View style={styles.visitStatusPill}>
      <Text style={styles.visitStatusText}>Planned</Text>
    </View>
  </View>
);

type AIItemProps = {
  leadingIcon: React.ReactNode;
  title: string;
  subtitle: string;
};

const AIItem: React.FC<AIItemProps> = ({ leadingIcon, title, subtitle }) => (
  <View style={styles.aiItemCard}>
    <View style={styles.aiItemRow}>
      <View style={styles.aiItemLeft}>
        {leadingIcon}
        <View>
          <Text style={styles.aiTitle}>{title}</Text>
          <Text style={styles.aiSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  </View>
);

/* ------------------------------------------------------------------ */
/* Styles                                                             */
/* ------------------------------------------------------------------ */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#00000033',
  },
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  modalCard: {
    maxHeight: '92%',
    backgroundColor: COLORS.utility.white,
    borderRadius: 24,
    paddingTop: 12,
    paddingBottom: 10,
    shadowColor: COLORS.utility.black,
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 25,
    elevation: 12,
  },
  header: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 10,
  },
  headerIconBg: {
    width: 40,
    height: 40,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  closeButton: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  closeText: {
    fontSize: 22,
    color: COLORS.gray[400],
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    gap: 10,
  },

  // Sections
  sectionCardBlue: {
    borderRadius: 18,
    padding: 12,
    backgroundColor: '#edf4ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  sectionCardGreen: {
    borderRadius: 18,
    padding: 12,
    backgroundColor: '#ecfdf3',
    borderWidth: 1,
    borderColor: COLORS.greenBorder[200],
  },
  sectionCardPurple: {
    borderRadius: 18,
    padding: 12,
    backgroundColor: '#faf1ff',
    borderWidth: 1,
    borderColor: '#f3e8ff',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionIconBlueBg: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: COLORS.blue[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconGreenBg: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: COLORS.green[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIconPurpleBg: {
    width: 28,
    height: 28,
    borderRadius: 999,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray[800],
  },
  sectionInnerList: {
    gap: 8,
  },

  // Priorities
  priorityRow: {
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: COLORS.utility.white,
  },
  priorityLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  priorityIconCircle: {
    width: 28,
    height: 28,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray[800],
  },
  prioritySubtitle: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 2,
  },

  // Visits
  visitCard: {
    borderRadius: 14,
    backgroundColor: COLORS.utility.white,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  visitLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  visitAvatar: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visitTextCol: {
    flexShrink: 1,
  },
  visitName: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray[900],
  },
  visitSpecialty: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 1,
  },
  visitTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  visitTimeText: {
    fontSize: 11,
    color: COLORS.gray[500],
  },
  visitStatusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.gray[50],
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  visitStatusText: {
    fontSize: 11,
    color: COLORS.gray[700],
    fontWeight: '500',
  },
  moreDoctorsButton: {
    marginTop: 10,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e0edff',
  },
  moreDoctorsText: {
    fontSize: 12,
    color: COLORS.blue[600],
    fontWeight: '500',
  },

  // Badges
  badgePillGreen: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.green[600],
  },
  badgePillText: {
    fontSize: 11,
    color: COLORS.utility.white,
    fontWeight: '500',
  },
  badgePillPurple: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.ai.purple600,
  },
  badgePillPurpleText: {
    fontSize: 11,
    color: COLORS.utility.white,
    fontWeight: '500',
  },

  // AI items
  aiItemCard: {
    backgroundColor: COLORS.utility.white,
    borderRadius: 14,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  aiItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flexShrink: 1,
  },
  aiLeadingIcon: {
    width: 22,
    height: 22,
    borderRadius: 999,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aiInnerDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
  },
  aiTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.gray[800],
  },
  aiSubtitle: {
    fontSize: 11,
    color: COLORS.gray[500],
    marginTop: 2,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingTop: 6,
    gap: 10,
  },
  primaryFooterButton: {
    flex: 1,
  },
  primaryFooterGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 999,
    gap: 8,
  },
  primaryFooterText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.utility.white,
  },
  secondaryFooterButton: {
    flex: 1,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: COLORS.utility.white,
  },
  secondaryFooterText: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
  },
});

export default DailyPlanningScreen;
