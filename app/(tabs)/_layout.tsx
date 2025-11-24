import { Tabs } from 'expo-router/tabs';
import React from 'react';
import { View } from 'react-native';
import LupinBottomTabBar from '../../components/LupinBottomTabBar';
import LupinHeader from '../../components/LupinHeader';

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: true,
          header: () => <LupinHeader />,
          tabBarStyle: { display: 'none' }, // hide the default expo tab bar
        }}
      >
        <Tabs.Screen name="index" options={{ title: 'Home' }} />
        <Tabs.Screen name="route" options={{ title: 'Route' }} />
        <Tabs.Screen name="hcps" options={{ title: 'HCPs' }} />
        <Tabs.Screen name="calls" options={{ title: 'Calls' }} />
        <Tabs.Screen name="analytics" options={{ title: 'Analytics' }} />
      </Tabs>

      {/* 👇 Render custom tab bar once, fixed at bottom */}
      <LupinBottomTabBar />
    </View>
  );
}
