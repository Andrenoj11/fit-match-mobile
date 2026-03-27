import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";

type AppScreenProps = {
  children: ReactNode;
  centered?: boolean;
  style?: ViewStyle;
};

export function AppScreen({
  children,
  centered = false,
  style,
}: AppScreenProps) {
  return (
    <SafeAreaView
      style={[
        {
          flex: 1,
          backgroundColor: colors.background,
          padding: spacing.xl,
        },
        centered && {
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      {children}
    </SafeAreaView>
  );
}
