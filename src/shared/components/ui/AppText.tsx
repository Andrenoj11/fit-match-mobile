import { ReactNode } from "react";
import { StyleProp, Text, TextStyle } from "react-native";

import { colors } from "@/core/theme/colors";
import { typography } from "@/core/theme/typography";

type AppTextVariant = "title" | "body" | "caption";

type AppTextProps = {
  children: ReactNode;
  variant?: AppTextVariant;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function AppText({
  children,
  variant = "body",
  color = colors.text,
  style,
}: AppTextProps) {
  const variantStyle: TextStyle =
    variant === "title"
      ? {
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
        }
      : variant === "caption"
        ? {
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.regular,
          }
        : {
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.regular,
          };

  return <Text style={[variantStyle, { color }, style]}>{children}</Text>;
}
