import { ReactNode } from "react";
import { StyleProp, View, ViewStyle } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";

type AppCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppCard({ children, style }: AppCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
          borderRadius: 18,
          padding: spacing.lg,
          gap: spacing.sm,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
