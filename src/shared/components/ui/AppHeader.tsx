import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppText } from "@/shared/components/ui/AppText";

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function AppHeader({
  title,
  subtitle,
  actionLabel,
  onPressAction,
}: AppHeaderProps) {
  return (
    <View style={{ gap: spacing.lg }}>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="title">{title}</AppText>

        {!!subtitle && <AppText variant="caption">{subtitle}</AppText>}
      </View>

      {!!actionLabel && !!onPressAction && (
        <View style={{ maxWidth: 220 }}>
          <AppButton title={actionLabel} onPress={onPressAction} />
        </View>
      )}
    </View>
  );
}
