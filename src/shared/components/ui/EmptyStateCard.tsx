import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppText } from "@/shared/components/ui/AppText";

type EmptyStateCardProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

export function EmptyStateCard({
  title,
  description,
  actionLabel,
  onPressAction,
}: EmptyStateCardProps) {
  return (
    <AppCard>
      <View style={{ gap: spacing.sm }}>
        <AppText variant="body">{title}</AppText>
        <AppText variant="caption">{description}</AppText>
      </View>

      {!!actionLabel && !!onPressAction && (
        <AppButton title={actionLabel} onPress={onPressAction} />
      )}
    </AppCard>
  );
}
