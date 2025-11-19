// app/_layout.tsx
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import LupinHeader from '../components/LupinHeader';

export default function RootLayout() {
  return (
    <Drawer
      screenOptions={{
        drawerPosition: 'right',
        header: (props) => <LupinHeader {...props} />,
      }}
    >
      {/* Main dashboard with tabs */}
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Dashboard',
        }}
      />
      {/* Example extra screen in drawer */}
      <Drawer.Screen
        name="settings"
        options={{
          title: 'Settings',
        }}
      />
    </Drawer>
  );
}
