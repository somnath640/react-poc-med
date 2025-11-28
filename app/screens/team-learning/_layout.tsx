import LupinHeader from "@/components/LupinHeader";
import { Stack } from "expo-router";

export default function HeaderLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        header: () => <LupinHeader showBack={true} />,
      }}
    />
  );
}