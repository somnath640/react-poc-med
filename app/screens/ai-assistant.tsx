import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import LupinIcons, { IconBackIOS } from '../../constants/LupinIcons';


const Index = () => {
  const smartNudges = ["Location Alert", "Post-Call Check", "Literature Help"];
  const [open, setOpen] = useState(false);
  const scaleAnim = new Animated.Value(0);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const openWidget = () => {
    setOpen(true);
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const closeWidget = () => {
    Animated.spring(scaleAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => setOpen(false));
  };
  const quickQuestions = [
    "GPS, voice, camera inputs from mobile",
    "MR conversation notes with doctors/chemists",
    "Query based on responses for knowledge",
    "Voice call auto-transcribe & categorize feedback",
    "Detect keywords for next steps & actions",
    "Workflow for closure of action items",
    "Answer quick on-field questions",
    "Suggest mid-day plan optimization",
    "Side effects of Acemiz Plus",
    "Compare our product with Competitor A",
    "Dosage for elderly patients",
    "Latest clinical trial results",
    "Drug interaction information",
  ];

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View style={[{ flex: 1, backgroundColor: "#fff" }]}>
        <StatusBar translucent={false} barStyle={'default'} backgroundColor="#039F73" />
        {/* Header: Lupin AI Assistant */}
        <SafeAreaView edges={['top', 'left', 'right']}>
          <View style={styles.header}>

            <View style={styles.headerLeft}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.replace({ pathname: '/(tabs)', params: { openDrawer: '1' } } as any)}>
                <IconBackIOS color={'#fff'} />
              </TouchableOpacity>

              {/* <View style={styles.avatar}>
            <Text style={styles.avatarText}>L</Text>
          </View> */}

              <View style={styles.headerText}>
                <Text style={styles.headerTitle}>Lupin AI Assistant</Text>
                <Text style={styles.headerSubtitle}>Powered by Intelligent Insights</Text>
              </View>
            </View>


          </View>
        </SafeAreaView>
        <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
          {/* Smart Nudges Section */}
          <Text style={styles.sectionTitle}>💡 Smart Nudges</Text>

          <View style={styles.row}>
            {smartNudges.map((item, index) => (
              <TouchableOpacity key={index} style={styles.pill}>
                <Text style={styles.pillText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Questions Section */}
          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Quick Questions</Text>

          <View style={styles.wrapContainer}>
            {quickQuestions.map((item, index) => (
              <TouchableOpacity key={index} style={styles.pill}>
                <Text style={styles.pillText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>



          {/* Smart Notification */}
          <View style={styles.smartNotificationContainer}>
            <Text style={styles.smartNotificationLabel}>🌟  Smart Notification</Text>

            <View style={styles.notificationBubble}>
              <Text style={styles.notificationText}>
                👋  Good Morning, Vaibhav! Welcome to a new day!
              </Text>
            </View>
            <Text style={styles.timeText}>08:00 AM</Text>
          </View>
          <View style={{ marginBottom: 16, marginTop: 20 }}>
            <Image source={require('../../assets/images/logo-lu.png')} style={styles.headerLogo} />
          </View>

          {/* Chat Message 1 */}
          <View style={styles.chatContainer}>
            <View style={styles.chatBubble}>
              <Text style={styles.chatText}>
                Ready to make today count? Here’s what’s on your agenda:
              </Text>
            </View>
            <Text style={styles.timeText}>08:00 AM</Text>
          </View>
          <View style={{ marginBottom: 16, marginTop: 20 }}>
            <Image source={require('../../assets/images/logo-lu.png')} style={styles.headerLogo} />
          </View>

          {/* Chat Message 2 – Doctor List Card */}
          <View style={styles.chatContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>
                Today you’re working in **Borivali patch**. You have **10 doctors** scheduled to meet:
              </Text>

              <Text style={styles.doctorHeading}>👨‍⚕️ **Doctors to Meet Today**</Text>

              <View style={{ marginTop: 6 }}>
                {[
                  "Dr. Rajesh Kumar – City Care Clinic (9:00 AM)",
                  "Dr. Anil Mehta – Global Heart Institute (10:30 AM)",
                  "Dr. Priya Singh – Diabetes Care Center (11:30 AM)",
                  "Dr. Suresh Patel – Wellness Multispecialty (1:00 PM)",
                  "Dr. Meera Iyer – Apollo Clinic (2:30 PM)",
                  "Dr. Amit Shah – Fortis Healthcare (3:30 PM)",
                  "Dr. Neha Desai – Lilavati Hospital (4:30 PM)",
                  "Dr. Ravi Kumar – Koladeb Hospital (5:00 PM)",
                  "Dr. Sneha Reddy – Hinduja Hospital (5:30 PM)",
                  "Dr. Karan Malhotra – Breach Candy Hospital (6:00 PM)",
                ].map((item, idx) => (
                  <Text key={idx} style={styles.doctorItem}>• {item}</Text>
                ))}
              </View>

              {/* Grey pill */}
              <View style={styles.locationPill}>
                <Text style={styles.locationPillText}>📍 Working in Borivali</Text>
              </View>

              {/* Buttons */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>View Route Map</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.secondaryButton}>
                  <Text style={styles.secondaryButtonText}>Download Schedule</Text>
                </TouchableOpacity>
              </View>

            </View>

            <Text style={styles.timeText}>08:02 AM</Text>
          </View>

          {/* Bottom input / help bar (matches provided image) */}
          <View style={styles.footerContainer}>
            <View style={styles.inputRow}>
              <TextInput
                style={styles.input}
                placeholder="Ask me anything about products, dosing, competitors..."
                placeholderTextColor="#9AA0A6"
                multiline={false}
                returnKeyType="send"
              />

              <TouchableOpacity style={styles.sendButton}>
                <LupinIcons.ArrowUpRight size={18} color="#fff" strokeWidth={2} />
              </TouchableOpacity>
            </View>

          </View>
          <Text style={styles.footerCaption}>Powered by Lupin AI • Your intelligent field assistant</Text>
        </ScrollView>

        {/* Floating Bubble */}
        {!open && (
          <TouchableOpacity
            style={styles.fab}
            onPress={() => openWidget()}
          >
            <Text style={styles.fabText}>+</Text>
          </TouchableOpacity>
        )}

        {/* Floating Chat Widget */}
        {open && (
          <Animated.View style={[styles.widget, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.bubbleheader}>
              <Text style={styles.title}>Chat Support</Text>
              <TouchableOpacity onPress={closeWidget}>
                <Text style={{ color: "red" }}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.body}>
              <Text>Hello! How can I help you?</Text>
            </View>
          </Animated.View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default Index
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  wrapContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },

  pill: {
    backgroundColor: "#F1F1F1",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  pillText: {
    fontSize: 13,
    color: "#333",
  },


  /* Smart Notification */
  smartNotificationContainer: { marginBottom: 22 },
  smartNotificationLabel: {
    backgroundColor: "#FFFBEA",
    padding: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    color: "#6A5E00",
    alignSelf: "flex-start",
    fontSize: 12,
    marginBottom: 8,
  },
  notificationBubble: {
    backgroundColor: "#E8FFF0",
    padding: 14,
    borderRadius: 15,
    maxWidth: "85%",
  },
  notificationText: { fontSize: 14, color: "#333" },

  /* Chat Bubbles */
  chatContainer: { marginBottom: 22 },
  chatBubble: {
    backgroundColor: "#E8FFF0",
    padding: 14,
    borderRadius: 15,
    maxWidth: "85%",
  },
  chatText: { fontSize: 14, color: "#333" },
  timeText: { fontSize: 11, color: "#888", marginTop: 4 },

  /* Info Card */
  infoCard: {
    backgroundColor: "#F6F7FB",
    padding: 15,
    borderRadius: 15,
    maxWidth: "90%",
  },
  cardTitle: { fontSize: 14, color: "#333", fontWeight: "500", marginBottom: 8 },

  doctorHeading: { fontSize: 15, fontWeight: "700", marginTop: 6, marginBottom: 6 },

  doctorItem: { fontSize: 13, color: "#444", marginBottom: 4 },

  /* Location Pill */
  locationPill: {
    backgroundColor: "#E6E6E6",
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginTop: 12,
    alignSelf: "flex-start",
  },
  locationPillText: { color: "#333", fontSize: 12 },

  /* Buttons */
  buttonRow: { flexDirection: "row", marginTop: 16, gap: 10 },

  primaryButton: {
    backgroundColor: "#00916E",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  primaryButtonText: { color: "white", fontWeight: "600", fontSize: 14 },

  secondaryButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#CCC",
  },
  secondaryButtonText: { color: "#333", fontSize: 14, fontWeight: "500" },
  scrollContent: { paddingBottom: 20 },

  /* Footer input bar */
  footerContainer: {
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: {
    flex: 1,
    backgroundColor: '#F1F3F4',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 14,
    color: '#222',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#00A88A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: { color: 'white', fontSize: 18 },
  footerCaption: { fontSize: 11, color: '#888', marginTop: 25, marginBottom: 10, textAlign: 'center' },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 110,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#00C08B',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.22,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  fabText: { color: '#fff', fontSize: 24, fontWeight: '700' },
  header: {
    height: 60,
    backgroundColor: '#039F73',
    paddingHorizontal: 12,
    // paddingTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  backButton: {
    width: 35,
    height: 35,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  backText: { color: '#E6FFF4', fontSize: 20 },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#0FBF8A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: { color: '#fff', fontWeight: '700' },
  headerText: { flexDirection: 'column' },
  headerTitle: { color: '#fff', fontWeight: '700', fontSize: 14 },
  headerSubtitle: { color: '#E6FFF4', fontSize: 11, marginTop: 2 },
  headerRight: {
    width: 36,
    height: 36,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  headerRightText: { color: '#fff', fontSize: 16 },
  headerLogo: { width: 18, height: 18, resizeMode: 'contain' },
  bubble: {
    position: "absolute",
    bottom: 70,
    right: 20,
    backgroundColor: "#007bff",
    width: 55,
    height: 55,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },

  widget: {
    position: "absolute",
    bottom: 40,
    right: 20,
    width: 280,
    height: 360,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 10,
    overflow: "hidden",
  },

  bubbleheader: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
  },

  body: {
    flex: 1
  },
});