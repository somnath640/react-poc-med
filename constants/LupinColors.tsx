// LupinColors.tsx
// Lupin CRM – Centralized Color Tokens + Example Components

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';

// ────────────────────────────────
// Color Tokens
// ────────────────────────────────

export const COLORS = {
  // Brand / Primary
  brand: {
    lupinGreen: '#00AB84',       // Main brand color
    lupinGreenDark: '#008566',   // Darker shade
  },

  // Gradients
  gradients: {
    lupinGreen: ['#00AB84', '#008566'], // Lupin Green Gradient
    header: ['#059669', '#047857'],     // approx from-green-600 to-green-700
    aiInsights: ['#9333ea', '#2563eb'], // from-purple-600 to-blue-600
  },

  // Tailwind Green Shades
  green: {
    50:  '#f0fdf4',
    100: '#dcfce7',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
  },
  greenBorder: {
    100: '#dcfce7',
    200: '#bbf7d0',
  },

  // AI & Intelligent Features
  ai: {
    purple500: '#a855f7',
    purple600: '#9333ea',
    purple700: '#7e22ce',
  },

  // Functional Colors
  blue: {
    50:  '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },

  red: {
    50:  '#fef2f2',
    100: '#fee2e2',
    500: '#ef4444',
    600: '#dc2626',
    destructive: '#d4183d',
  },

  yellow: {
    50:  '#fefce8',
    100: '#fef9c3',
    500: '#eab308',
    600: '#ca8a04',
  },

  orange: {
    50:  '#fff7ed',
    500: '#f97316',
    600: '#ea580c',
  },

  emerald: {
    50:  '#ecfdf5',
    500: '#10b981',
    600: '#059669',
  },

  // Neutrals / Grays
  gray: {
    50:  '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  slate: {
    50:  '#f8fafc',
    100: '#f1f5f9',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
  },

  // Chart Colors (OKLCH strings – convert if needed)
  charts: {
    light: {
      chart1: 'oklch(0.646 0.222 41.116)',
      chart2: 'oklch(0.6 0.118 184.704)',
      chart3: 'oklch(0.398 0.07 227.392)',
      chart4: 'oklch(0.828 0.189 84.429)',
      chart5: 'oklch(0.769 0.188 70.08)',
    },
    dark: {
      chart1: 'oklch(0.488 0.243 264.376)',
      chart2: 'oklch(0.696 0.17 162.48)',
      chart3: 'oklch(0.769 0.188 70.08)',
      chart4: 'oklch(0.627 0.265 303.9)',
      chart5: 'oklch(0.645 0.246 16.439)',
    },
  },

  // System Colors
  system: {
    light: {
      background: '#ffffff',
      foreground: 'oklch(0.145 0 0)',
      card: '#ffffff',
      primary: '#030213',
      secondary: 'oklch(0.95 0.0058 264.53)',
      muted: '#ececf0',
      mutedForeground: '#717182',
      accent: '#e9ebef',
      border: 'rgba(0, 0, 0, 0.1)',
      inputBackground: '#f3f3f5',
      switchBackground: '#cbced4',
    },
    dark: {
      background: 'oklch(0.145 0 0)',
      foreground: 'oklch(0.985 0 0)',
      primary: 'oklch(0.985 0 0)',
      secondary: 'oklch(0.269 0 0)',
      muted: 'oklch(0.269 0 0)',
      accent: 'oklch(0.269 0 0)',
    },
  },

  // Specials / Utility
  utility: {
    white: '#ffffff',
    white90: 'rgba(255, 255, 255, 0.9)',
    white80: 'rgba(255, 255, 255, 0.8)',
    white20: 'rgba(255, 255, 255, 0.2)',
    black: '#000000',
  },

  // Component-Specific Tokens
  components: {
    lupinAiLogo: {
      backgroundGradient: ['#00AB84', '#008566'],
      letter: '#ffffff',
      sparkleBackground: '#a855f7',
      sparkleIcon: '#ffffff',
    },
    aiChatbot: {
      floatingButtonGradient: ['#00AB84', '#008566'],
      headerGradient: ['#00AB84', '#008566'],
      userMessageBackground: '#00AB84',
      userMessageText: '#ffffff',
      botMessageBackground: '#ffffff',
      botMessageBorder: '#e5e7eb', // gray-200
      quickActionHoverBorder: '#00AB84',
      quickActionHoverBackground: '#f0fdf4', // green-50
    },
    sideMenu: {
      lupinAiItemHoverBg: '#f0fdf4',
      lupinAiItemHoverBorder: '#00AB84',
      regularItemHoverBg: '#f3f4f6',
      lupinAiChevronHover: '#00AB84',
    },
    dashboard: {
      visitPlanCardGradient: ['#f0fdf4', '#ecfdf5'],
      visitPlanCardBorder: '#bbf7d0',
      aiInsightsGradient: ['#9333ea', '#2563eb'],
    },
  },
};

// ────────────────────────────────
// Helpers
// ────────────────────────────────

export type StatusType = 'success' | 'warning' | 'error' | 'info';

export const getStatusColor = (status: StatusType) => {
  switch (status) {
    case 'success':
      return COLORS.emerald[600];
    case 'warning':
      return COLORS.yellow[500];
    case 'error':
      return COLORS.red.destructive;
    case 'info':
    default:
      return COLORS.blue[600];
  }
};

// ────────────────────────────────
// Example Components
// ────────────────────────────────

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  useGradient?: boolean;
};

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  style,
  textStyle,
  useGradient = true,
}) => {
  if (useGradient) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={COLORS.gradients.lupinGreen as [string, string]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.primaryButton, style]}
        >
          <Text style={[styles.primaryButtonText, textStyle]}>{title}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[
        styles.primaryButton,
        { backgroundColor: COLORS.brand.lupinGreen },
        style,
      ]}
    >
      <Text style={[styles.primaryButtonText, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

type StatusBadgeProps = {
  label: string;
  status: StatusType;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  label,
  status,
  style,
  textStyle,
}) => {
  const bg = getStatusColor(status);

  return (
    <View style={[styles.badge, { backgroundColor: bg + '33' }, style]}>
      <View style={[styles.badgeDot, { backgroundColor: bg }]} />
      <Text style={[styles.badgeText, textStyle]}>{label}</Text>
    </View>
  );
};

// ────────────────────────────────
// Styles
// ────────────────────────────────

const styles = StyleSheet.create({
  primaryButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: COLORS.utility.white,
    fontWeight: '600',
    fontSize: 16,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    marginRight: 6,
  },
  badgeText: {
    color: COLORS.gray[700],
    fontSize: 12,
    fontWeight: '500',
  },
});

export default COLORS;
