import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ModalHcpProfile from './ModalHcpProfile';

type ScrollCardProps = {
  name: string;
  type?: string;
  tier?: string;
  time?: string;
  core?: string;
  address?: string;
  min?: string | number;
  km?: string;
  rx?: string;
  borderColor?: string;
};

const ScrollCards: React.FC<ScrollCardProps> = (props: ScrollCardProps) => {
  const {
    name,
    type,
    tier,
    time,
    core,
    address,
    min,
    km,
    rx,
    borderColor,
  } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => setModalVisible(false);
  return (
    <View style={[styles.card, { borderLeftColor: borderColor }]}>
      
      {/* Top Row: Time & Core Badges */}
      <View style={styles.row}>
        <Text style={[styles.badge, styles.timeBadge]}>{time}</Text>
        <Text style={[styles.badge, styles.coreBadge]}>{core}</Text>
      </View>

      {/* Name */}
      <Text style={styles.title}>{name}</Text>

      {/* Type */}
      <Text style={styles.type}>{type}</Text>

      {/* Tier Badge & Min */}
      <View style={styles.row}>
        <Text style={[styles.badge, styles.tierBadge]}>{tier}</Text>
        <Text style={styles.rightText}>{min}</Text>
      </View>

      {/* Address */}
      <Text style={styles.address}>{address}</Text>

      {/* Divider */}
      <View style={styles.divider} />

      {/* km & rx */}
      <View style={styles.row}>
        <Text style={styles.leftText}>{km}</Text>
        <Text style={styles.rightText}>{rx}</Text>
      </View>

      {/* View Details Button */}
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    <ModalHcpProfile 
        visible={modalVisible} 
        onClose={closeModal} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderLeftWidth: 5,
    borderRadius: 8,
    padding: 16,
    marginRight: 12,
    width: 220,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  /* === BADGES === */
  badge: {
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 11,
    fontWeight: '600',
    overflow: 'hidden',
    color: 'white',
  },

  timeBadge: { backgroundColor: '#4CAF50' },
  coreBadge: { backgroundColor: '#2196F3' },
  tierBadge: { backgroundColor: '#FF9800' },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 6,
  },

  type: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },

  leftText: { fontSize: 13, fontWeight: '500' },
  rightText: { fontSize: 13, fontWeight: '500' },

  address: {
    fontSize: 12,
    color: '#444',
    marginVertical: 6,
  },

  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },

  /* === UPDATED BUTTON === */
  button: {
    alignSelf: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginTop: 8,
  },

  buttonText: {
    fontSize: 13,
    color: '#1E88E5', // blue text only
    fontWeight: '600',
  },
});

export default ScrollCards;
