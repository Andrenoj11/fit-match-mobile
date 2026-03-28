import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { AppText } from "@/shared/components/ui/AppText";
import { HeaderBackAction } from "@/shared/components/ui/HeaderBackAction";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
  actionVariant?: "button" | "back";
};

export function AppHeader({
  title,
  subtitle,
  actionLabel,
  onPressAction,
  actionVariant = "button",
}: AppHeaderProps) {
  return (
    <View style={{ gap: spacing.lg }}>
      {!!actionLabel && !!onPressAction && actionVariant === "back" && (
        <HeaderBackAction label={actionLabel} onPress={onPressAction} />
      )}

      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">{title}</AppText>

        {!!subtitle && <AppText variant="caption">{subtitle}</AppText>}
      </View>
    </View>
  );
}
