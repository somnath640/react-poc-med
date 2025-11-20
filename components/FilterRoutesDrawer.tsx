import React, { useState } from "react";
import { Text, View } from "react-native";
import SideDrawer from "./SideDrawer";
import DropdownSelect from "./DropdownSelect";

export default function FilterRoutesDrawer({ visible, onClose,title = 'Filter Routes'  }) {
  const [tier, setTier] = useState("All Tiers");
  const [specialty, setSpecialty] = useState("All Specialties");

  return (
    <SideDrawer
      visible={visible}
      onClose={onClose}
      title={title}
      subtitle="Filter visits by tier and priority"
    >
      <View style={{ marginBottom: 20 }}>
        <DropdownSelect
          label="Tier"
          value={tier}
          onChange={setTier}
          options={["All Tiers", "Gold Tier", "Silver Tier", "Bronze Tier"]}
        />
      </View>

      <View style={{ marginBottom: 20 }}>
        <DropdownSelect
          label="Specialty"
          value={specialty}
          onChange={setSpecialty}
          options={["All Specialties", "Cardiologist", "Diabetologist", "Endocrinologist", "General Physician"]}
        />
      </View>

      <Text style={{ fontSize: 12, color: "#6b7280", marginTop: 10 }}>
        Showing 6 of 6 visits
      </Text>
    </SideDrawer>
  );
}
