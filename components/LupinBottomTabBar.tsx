import { Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const BLUE = '#2563eb';
const BLUE_50 = '#eef4ff';
const GRAY_500 = '#6b7280';
const GRAY_800 = '#111827';

const LupinBottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.outer}>
        <View style={styles.pill}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];

            const label =
              (options.tabBarLabel as string) ??
              options.title ??
              route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const iconName = getIconName(route.name, isFocused);

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                style={styles.itemWrapper}
                activeOpacity={0.85}
              >
                <View
                  style={[
                    styles.item,
                    isFocused && styles.itemActive,
                  ]}
                >
                  <Ionicons
                    name={iconName}
                    size={20}
                    color={isFocused ? BLUE : GRAY_500}
                  />
                  <Text
                    style={[
                      styles.label,
                      isFocused ? styles.labelActive : styles.labelInactive,
                    ]}
                  >
                    {label}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

function getIconName(routeName: string, focused: boolean): any {
  switch (routeName) {
    case 'index':
      return focused ? 'home' : 'home-outline';
    case 'route':
      return focused ? 'navigate' : 'navigate-outline';
    case 'hcps':
      return focused ? 'people' : 'people-outline';
    case 'calls':
      return focused ? 'document-text' : 'document-text-outline';
    case 'analytics':
      return focused ? 'analytics' : 'analytics-outline';
    default:
      return 'ellipse-outline';
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent',
  },
  outer: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingBottom: 8,
    // paddingTop: 4,
  },
  pill: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    // borderRadius: 24,
    paddingHorizontal: 4,
    paddingVertical: 4,
    width: '100%', // looks good on mobile + tablet
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  itemWrapper: {
    flex: 1,
  },
  item: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemActive: {
    backgroundColor: BLUE_50,
  },
  label: {
    fontSize: 12,
    marginTop: 4,
  },
  labelActive: {
    color: BLUE,
    fontWeight: '600',
  },
  labelInactive: {
    color: GRAY_500,
    fontWeight: '500',
  },
});

export default LupinBottomTabBar;
