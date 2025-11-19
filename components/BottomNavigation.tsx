import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import COLORS from '../constants/LupinColors'
import { IconHome, IconPhoneCall, IconRoute, IconTrendUp, IconUserCircle } from '../constants/LupinIcons'

const items = [
  { key: 'home', label: 'Home', Icon: IconHome },
  { key: 'route', label: 'Route', Icon: IconRoute },
  { key: 'hcps', label: 'HCPs', Icon: IconUserCircle },
  { key: 'calls', label: 'Calls', Icon: IconPhoneCall },
  { key: 'analytics', label: 'Analytics', Icon: IconTrendUp },
]

const BottomNavigation: React.FC<{ onChange?: (k: string) => void }> = ({ onChange }) => {
  const [active, setActive] = useState<string>('home')

  const handlePress = (key: string) => {
    setActive(key)
    onChange && onChange(key)
  }

  return (
    <SafeAreaView style={styles.shell}>
      <View style={styles.container}>
        {items.map((it) => {
          const selected = it.key === active
          return (
            <TouchableOpacity key={it.key} style={styles.item} activeOpacity={0.85} onPress={() => handlePress(it.key)}>
              <View style={[styles.iconWrap, selected ? styles.iconWrapActive : null]}>
                <it.Icon size={18} color={selected ? COLORS.blue[600] : COLORS.gray[500]} />
              </View>
              <Text style={[styles.label, selected ? styles.labelActive : null]}>{it.label}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </SafeAreaView>
  )
}

export default BottomNavigation

const styles = StyleSheet.create({
  shell: {
    backgroundColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 8,
    backgroundColor: COLORS.utility.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: COLORS.gray[200],
    borderTopWidth: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 6,
  },
  item: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(59,130,246,0.06)',
    marginBottom: 6,
  },
  iconWrapActive: {
    backgroundColor: 'rgba(59,130,246,0.12)'
  },
  label: { fontSize: 12, color: COLORS.gray[600], textAlign: 'center' },
  labelActive: { color: COLORS.blue[600], fontWeight: '700' },
})
