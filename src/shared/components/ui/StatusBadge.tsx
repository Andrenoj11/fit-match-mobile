import { View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { AppText } from "@/shared/components/ui/AppText";

type StatusBadgeTone = "neutral" | "success" | "warning";

type StatusBadgeProps = {
  label: string;
  tone?: StatusBadgeTone;
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  const backgroundColor =
    tone === "success"
      ? "#ECFDF3"
      : tone === "warning"
        ? "#FFFAEB"
        : colors.surfaceMuted;

  const textColor =
    tone === "success"
      ? "#027A48"
      : tone === "warning"
        ? "#B54708"
        : colors.textSecondary;

  return (
    <View
      style={{
        alignSelf: "flex-start",
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderRadius: 999,
        backgroundColor,
      }}
    >
      <AppText variant="caption" color={textColor}>
        {label}
      </AppText>
    </View>
  );
}
