import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const LUPIN_GREEN_LEFT = '#01963f';
const LUPIN_GREEN_RIGHT = '#008a37';

const LupinHeader: React.FC = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    (navigation as any).toggleDrawer?.();
  };

  return (
    <LinearGradient
      colors={[LUPIN_GREEN_LEFT, LUPIN_GREEN_RIGHT]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          {/* Left: logo + titles */}
          <View style={styles.left}>
            <View style={styles.logoBox}>
              <Image
                source={require('../assets/images/logo-lu.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View>
              <Text style={styles.title}>
                <Text style={styles.titleBold}>LUPIN </Text>
                <Text style={styles.titleLight}>CRM</Text>
              </Text>
              <Text style={styles.subTitle}>Field Force Management</Text>
            </View>
          </View>

          {/* Right: menu icon */}
          <TouchableOpacity
            onPress={openDrawer}
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Open menu"
          >
            <Ionicons name="menu" size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 24 : 0,
  },
  safeArea: {
    width: '100%',
  },
  content: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logo: {
    width: 28,
    height: 28,
  },
  title: {
    fontSize: 18,
    color: '#ffffff',
  },
  titleBold: {
    fontWeight: '700',
  },
  titleLight: {
    fontWeight: '400',
  },
  subTitle: {
    marginTop: 2,
    fontSize: 12,
    color: 'rgba(255,255,255,0.9)',
  },
  menuButton: {
    padding: 8,
  },
});

export default LupinHeader;
