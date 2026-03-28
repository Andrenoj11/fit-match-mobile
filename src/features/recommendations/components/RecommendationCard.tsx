import { View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { RecommendationItem } from "@/features/recommendations/api/recommendations.types";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppImagePreview } from "@/shared/components/ui/AppImagePreview";
import { AppText } from "@/shared/components/ui/AppText";
import { MetaRow } from "@/shared/components/ui/MetaRow";
import { StatusBadge } from "@/shared/components/ui/StatusBadge";

type RecommendationCardProps = {
  item: RecommendationItem;
};

export function RecommendationCard({ item }: RecommendationCardProps) {
  return (
    <AppCard>
      <AppImagePreview
        uri={`https://picsum.photos/seed/recommendation-${item.id}/900/1200`}
        label="Look Preview"
        height={180}
      />

      <View style={{ gap: spacing.xs }}>
        <StatusBadge label={item.occasion} tone="neutral" />

        <AppText variant="title">{item.title}</AppText>
        <AppText variant="caption">{item.note}</AppText>
      </View>

      <View style={{ gap: spacing.sm }}>
        <AppText variant="body">Included pieces</AppText>

        <View
          style={{
            padding: spacing.md,
            borderRadius: 14,
            backgroundColor: colors.surfaceMuted,
            gap: spacing.xs,
          }}
        >
          {item.items.map((piece, index) => (
            <AppText key={`${item.id}-${index}`} variant="caption">
              • {piece}
            </AppText>
          ))}
        </View>
      </View>

      <MetaRow
        label="Styling note"
        value="Built from currently available wardrobe items."
      />
    </AppCard>
  );
}
