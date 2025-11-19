// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router/tabs';
import React from 'react';
import LupinBottomTabBar from '../../components/LupinBottomTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,    // header is handled by the drawer (LupinHeader)
        tabBarStyle: { display: 'none' }, // we use our custom bar
      }}
      tabBar={(props) => <LupinBottomTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{ title: 'Home' }}
      />
      <Tabs.Screen
        name="route"
        options={{ title: 'Route' }}
      />
      <Tabs.Screen
        name="hcps"
        options={{ title: 'HCPs' }}
      />
      <Tabs.Screen
        name="calls"
        options={{ title: 'Calls' }}
      />
      <Tabs.Screen
        name="analytics"
        options={{ title: 'Analytics' }}
      />
    </Tabs>
  );
}
