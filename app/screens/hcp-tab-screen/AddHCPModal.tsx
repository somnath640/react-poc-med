// AddHCPModal.tsx

import COLORS from "@/constants/LupinColors";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";


type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    name: string;
    specialty: string;
    tier: string;
    location: string;
    phone: string;
    email: string;
  }) => void;
};

const AddHCPModal: React.FC<Props> = ({ visible, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [tier, setTier] = useState("");
  const [location, setLocation] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    onSubmit?.({ name, specialty, tier, location, phone, email });
    // You can clear state after submit if you like:
    // setName(""); setSpecialty(""); ...
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.cardWrapper}>
          <View style={styles.card}>
            {/* Header */}
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.title}>Add New HCP</Text>
                <Text style={styles.subtitle}>
                  Register a new healthcare professional
                </Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <Text style={styles.closeText}>×</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.form}
              keyboardShouldPersistTaps="handled"
            >
              {/* Name */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                  placeholder="Dr. Full Name"
                  placeholderTextColor={COLORS.gray[400]}
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Specialty (simple select placeholder) */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Specialty</Text>
                <TouchableOpacity style={styles.selectField}>
                  <Text
                    style={
                      specialty ? styles.selectText : styles.selectPlaceholder
                    }
                    numberOfLines={1}
                  >
                    {specialty || "Select specialty"}
                  </Text>
                  <Text style={styles.chevron}>⌵</Text>
                </TouchableOpacity>
              </View>

              {/* Tier */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Tier</Text>
                <TouchableOpacity style={styles.selectField}>
                  <Text
                    style={tier ? styles.selectText : styles.selectPlaceholder}
                  >
                    {tier || "Select tier"}
                  </Text>
                  <Text style={styles.chevron}>⌵</Text>
                </TouchableOpacity>
              </View>

              {/* Location */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Location</Text>
                <TextInput
                  placeholder="Hospital/Clinic Name, City"
                  placeholderTextColor={COLORS.gray[400]}
                  style={styles.input}
                  value={location}
                  onChangeText={setLocation}
                />
              </View>

              {/* Phone */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Phone</Text>
                <TextInput
                  placeholder="+91 98765 43210"
                  placeholderTextColor={COLORS.gray[400]}
                  style={styles.input}
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>

              {/* Email */}
              <View style={styles.fieldGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  placeholder="doctor@hospital.com"
                  placeholderTextColor={COLORS.gray[400]}
                  style={styles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Submit button */}
              <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
                <Text style={styles.submitText}>Add HCP</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default AddHCPModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  cardWrapper: {
    width: "92%",
    maxWidth: 520,
  },
  card: {
    backgroundColor: COLORS.utility.white,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.gray[900],
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  closeBtn: {
    paddingLeft: 10,
    paddingTop: 2,
  },
  closeText: {
    fontSize: 24,
    color: COLORS.gray[500],
  },
  form: {
    paddingBottom: 8,
  },
  fieldGroup: {
    marginBottom: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.gray[700],
    marginBottom: 6,
  },
  input: {
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: COLORS.gray[800],
  },
  selectField: {
    borderRadius: 10,
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectText: {
    fontSize: 14,
    color: COLORS.gray[800],
  },
  selectPlaceholder: {
    fontSize: 14,
    color: COLORS.gray[400],
  },
  chevron: {
    fontSize: 18,
    color: COLORS.gray[400],
  },
  submitBtn: {
    marginTop: 8,
    borderRadius: 10,
    backgroundColor: "#04040D", // dark Lupin primary
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  submitText: {
    color: COLORS.utility.white,
    fontSize: 15,
    fontWeight: "600",
  },
});
