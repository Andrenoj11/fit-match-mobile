import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { RecommendationItem } from "@/features/recommendations/api/recommendations.types";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppText } from "@/shared/components/ui/AppText";
import { MetaRow } from "@/shared/components/ui/MetaRow";

type RecommendationCardProps = {
  item: RecommendationItem;
};

export function RecommendationCard({ item }: RecommendationCardProps) {
  return (
    <AppCard>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="body">{item.title}</AppText>
        <AppText variant="caption">{item.note}</AppText>
      </View>

      <MetaRow label="Occasion" value={item.occasion} />
      <MetaRow label="Items" value={item.items.join(", ")} />
    </AppCard>
  );
}
