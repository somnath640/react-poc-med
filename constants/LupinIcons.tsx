// LupinIcons.native.tsx
// React Native (Expo) SVG icon set for Lupin CRM

import React from "react";
import Svg, {
  Circle,
  Line,
  Path,
  Polyline,
  Rect,
} from "react-native-svg";

export interface IconProps {
  size?: number;
  strokeWidth?: number;
  color?: string;
}

/* ----------------------------------------------------
   BASE ICON WRAPPER (React Native version)
-----------------------------------------------------*/
export const BaseIcon: React.FC<
  IconProps & { children: React.ReactNode }
> = ({
  size = 24,
  strokeWidth = 2,
  color = "currentColor",
  children,
  ...rest
}) => (
  <Svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {children}
  </Svg>
);

/* ----------------------------------------------------
   ICONS (converted from your web version)
-----------------------------------------------------*/

// Sunrise icon
export const IconSunrise = (props: IconProps) => (
  <BaseIcon {...props}>
    <Circle cx="12" cy="10" r="3.5" />
    <Path d="M12 3.5v2" />
    <Path d="M6 6l1.4 1.4" />
    <Path d="M18 6l-1.4 1.4" />
    <Path d="M4 16h16" />
    <Path d="M7 19h10" />
  </BaseIcon>
);

// Trend UP
export const IconTrendUp = (props: IconProps) => (
  <BaseIcon {...props}>
    <Polyline points="4 17 10 11 14 15 20 9" />
    <Polyline points="14 9 20 9 20 15" />
  </BaseIcon>
);

// Home icon
export const IconHome = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M3 12l9-8 9 8" />
    <Path d="M5 10v8a2 2 0 002 2h3v-5a2 2 0 012-2h2a2 2 0 012 2v5h3a2 2 0 002-2v-8" />
  </BaseIcon>
);

// Check circle
export const IconCheckCircle = (props: IconProps) => (
  <BaseIcon {...props}>
    <Circle cx="12" cy="12" r="9" />
    <Path d="M9 12.5l2 2 4-4" />
  </BaseIcon>
);

// Alert circle
export const IconAlertCircle = (props: IconProps) => (
  <BaseIcon {...props}>
    <Circle cx="12" cy="12" r="9" />
    <Path d="M12 8v4" />
    <Circle cx="12" cy="16" r="0.75" fill="currentColor" stroke="none" />
  </BaseIcon>
);

// Clipboard (Sales Hygiene)
export const IconClipboard = (props: IconProps) => (
  <BaseIcon {...props}>
    <Rect x="7" y="5" width="10" height="14" rx="2" />
    <Path d="M9 5V4a2 2 0 012-2h2a2 2 0 012 2v1" />
    <Path d="M10 11h4" />
    <Path d="M10 14h3" />
  </BaseIcon>
);

// Calendar
export const IconCalendar = (props: IconProps) => (
  <BaseIcon {...props}>
    <Rect x="4" y="5" width="16" height="15" rx="2" />
    <Path d="M8 3v4" />
    <Path d="M16 3v4" />
    <Path d="M4 10h16" />
  </BaseIcon>
);

// User profile circle
export const IconUserCircle = (props: IconProps) => (
  <BaseIcon {...props}>
    <Circle cx="12" cy="12" r="9" />
    <Circle cx="12" cy="10" r="3" />
    <Path d="M6.5 17.5a6 6 0 0 1 11 0" />
  </BaseIcon>
);

// Clock
export const IconClock = (props: IconProps) => (
  <BaseIcon {...props}>
    <Circle cx="12" cy="12" r="9" />
    <Path d="M12 7v5l3 2" />
  </BaseIcon>
);

// (Duplicate declaration removed)

// Route arrow
export const IconRoute = (props: IconProps) => (
  <BaseIcon {...props}>
    <Circle cx="7" cy="6" r="2.2" />
    <Circle cx="17" cy="18" r="2.2" />
    <Path d="M9 6h3a5 5 0 0 1 5 5v1.5" />
    <Path d="M7 8.2V10a4 4 0 0 0 4 4h2" />
  </BaseIcon>
);

// Opportunity arrow
export const IconArrowUpRight = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M7 17L17 7" />
    <Polyline points="9 7 17 7 17 15" />
  </BaseIcon>
);

// Circular check (Start My Day)
export const IconButtonCheck = (props: IconProps) => (
  <BaseIcon {...props}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="M8.5 12.5l2.3 2.3L16 9.5" />
  </BaseIcon>
);

// Plan icon
export const IconPlan = (props: IconProps) => (
  <BaseIcon {...props}>
    <Rect x="4" y="5" width="16" height="14" rx="2" />
    <Path d="M8 9h8" />
    <Path d="M8 13h6" />
    <Path d="M8 17h4" />
  </BaseIcon>
);

/* ----------------------------------------------------
   EXPORT AS A COLLECTION
-----------------------------------------------------*/
export const LupinIcons = {
  Sunrise: IconSunrise,
  TrendUp: IconTrendUp,
  Home: IconHome,
  CheckCircle: IconCheckCircle,
  AlertCircle: IconAlertCircle,
  Clipboard: IconClipboard,
  Calendar: IconCalendar,
  UserCircle: IconUserCircle,
  Clock: IconClock,
  Route: IconRoute,
  ArrowUpRight: IconArrowUpRight,
  ButtonCheck: IconButtonCheck,
  Plan: IconPlan,
};

export default LupinIcons;


/* ----------------------------------------------------
   EXTRA ICONS YOU REQUESTED
-----------------------------------------------------*/

// Phone Call
export const IconPhoneCall = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M6.5 3.5l2 3.5-1.5 1.5a11 11 0 005.5 5.5l1.5-1.5 3.5 2a1 1 0 01.5.86V19a1 1 0 01-1.1 1A15 15 0 015 5.1 1 1 0 016 4h3.09a1 1 0 01.86.5z" />
  </BaseIcon>
);

// Map Pin
export const IconMapPin = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M12 21s-6-5.1-6-11a6 6 0 1112 0c0 5.9-6 11-6 11z" />
    <Circle cx="12" cy="10" r="2.5" />
  </BaseIcon>
);

// Box / Samples
export const IconBox = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M3 7l9-4 9 4-9 4-9-4z" />
    <Path d="M3 7v10l9 4 9-4V7" />
    <Path d="M12 11v10" />
  </BaseIcon>
);

// Rupee
export const IconRupee = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M8 7h8" />
    <Path d="M8 4h8" />
    <Path d="M11 4a4 4 0 010 8H8l5 8" />
  </BaseIcon>
);

// Sparkles (AI)
export const IconSparkles = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M6 10l1.2-3.2L10 5.5 7.2 4 6 1l-1.2 3L2 5.5l2.8 1.3L6 10z" />
    <Path d="M18 21l1-2.5 2.5-1L19 16l-1-2.5L17 16l-2.5 1.5L17 18.5 18 21z" />
    <Path d="M13 12.5l.6-1.5 1.6-.7-1.6-.7L13 8.1l-.6 1.5-1.6.7 1.6.7.6 1.5z" />
  </BaseIcon>
);

// Tiny Trend Up (small arrow for KPI badges)
export const IconTinyTrendUp = (props: IconProps) => (
  <BaseIcon {...props} strokeWidth={2}>
    <Path d="M5 15l4-4 3 3 5-6" />
    <Path d="M13 8h4v4" />
  </BaseIcon>
);

export const IconArrowLeft = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M15 7L9 12L15 17" /> 
    <Line x1="9" y1="12" x2="17" y2="12" />
  </BaseIcon>
);

export const IconBackIOS = (props: IconProps) => (
  <BaseIcon {...props}>
    <Path d="M15 6L9 12L15 18" />
  </BaseIcon>
);