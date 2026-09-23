import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../../constants/theme';

function TabIcon({ icon, focused }: { icon: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 20, opacity: focused ? 1 : 0.5 }}>{icon}</Text>
  );
}

function ScanButton({ focused }: { focused: boolean }) {
  return (
    <View style={styles.scanButtonWrap}>
      <View style={[styles.scanButton, focused && styles.scanButtonFocused]}>
        <Text style={styles.scanIcon}>⌗</Text>
      </View>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon icon="🏠" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ focused }) => <TabIcon icon="🗂️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: '',
          tabBarIcon: ({ focused }) => <ScanButton focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="warranties"
        options={{
          title: 'Warranties',
          tabBarIcon: ({ focused }) => <TabIcon icon="🛡️" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon icon="👤" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 78,
    paddingTop: 10,
    paddingBottom: 16,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  scanButtonWrap: {
    top: -22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  scanButtonFocused: {
    backgroundColor: colors.primaryDark,
  },
  scanIcon: {
    fontSize: 24,
    color: colors.white,
  },
});
