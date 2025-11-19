import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const AttendanceModal: React.FC<Props> = ({ visible, onClose, onConfirm }) => {
  const [timeStr, setTimeStr] = useState('00:00:00');
  const [locationLabel, setLocationLabel] = useState<string>('Fetching location...');
  const [coords, setCoords] = useState<{ latitude?: number; longitude?: number }>({});

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}:${ss}`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    let mounted = true;

    async function fetchLocation() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (mounted) setLocationLabel('Location permission denied');
          return;
        }

        const pos = await Location.getCurrentPositionAsync({});
        if (!mounted) return;
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });

        const rev = await Location.reverseGeocodeAsync({ latitude, longitude });
        if (rev && rev.length > 0) {
          const place = rev[0];
          const label = [place.city || place.name, place.region]
            .filter(Boolean)
            .join(', ');
          setLocationLabel(label || 'Unknown location');
        } else {
          setLocationLabel('Unknown location');
        }
      } catch (e) {
        setLocationLabel('Unable to fetch location');
      }
    }

    if (visible) {
      fetchLocation();
    }

    return () => {
      mounted = false;
    };
  }, [visible]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.close} onPress={onClose}>
            <Ionicons name="close" size={20} color="#222" />
          </TouchableOpacity>

          <Text style={styles.title}>Mark Your Attendance</Text>
          <Text style={styles.subtitle}>Confirm your location and mark attendance for today</Text>

          <View style={styles.infoCardPrimary}>
            <View style={styles.rowHead}>
              <Ionicons name="location" size={22} color="#2563eb" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.infoTitle}>Current Location</Text>
                <Text style={styles.infoValue}>{locationLabel}</Text>
                <Text style={styles.infoMuted}>Lat: {coords.latitude?.toFixed(4) ?? '-'}, Long: {coords.longitude?.toFixed(4) ?? '-'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.rowHead}>
              <Ionicons name="time" size={22} color="#6b7280" style={{ marginRight: 12 }} />
              <View>
                <Text style={styles.infoTitle}>Time</Text>
                <Text style={styles.infoValue}>{timeStr}</Text>
              </View>
            </View>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onClose}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmBtn}
              onPress={() => {
                // confirm => pass up to parent
                onConfirm();
                Alert.alert('Attendance confirmed', 'Your attendance has been recorded.');
              }}
            >
              <Text style={styles.confirmText}>Confirm Attendance</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: "20%",
  },
  card: {
    width: '100%',
    maxWidth: 780,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  close: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 6,
  },
  title: { fontSize: 22, fontWeight: '700', color: '#111827' },
  subtitle: { fontSize: 14, color: '#6b7280', marginTop: 6, marginBottom: 16 },
  infoCardPrimary: {
    backgroundColor: '#EEF4FF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#F7F7F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 18,
  },
  rowHead: { flexDirection: 'row', alignItems: 'center' },
  infoTitle: { fontSize: 16, fontWeight: '700', color: '#111827' },
  infoValue: { fontSize: 14, color: '#374151', marginTop: 2 },
  infoMuted: { fontSize: 13, color: '#94a3b8', marginTop: 6 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 12,
  },
  cancelText: { color: '#111827', fontSize: 16 },
  confirmBtn: {
    flex: 1.6,
    backgroundColor: '#0bb33b',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});

export default AttendanceModal;
