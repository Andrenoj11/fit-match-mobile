import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { WardrobeItem } from "@/features/wardrobe/api/wardrobe.types";
import { formatWardrobeCategory } from "@/features/wardrobe/utils/wardrobeFormatter";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppText } from "@/shared/components/ui/AppText";
import { MetaRow } from "@/shared/components/ui/MetaRow";

type WardrobeItemCardProps = {
  item: WardrobeItem;
};

export function WardrobeItemCard({ item }: WardrobeItemCardProps) {
  return (
    <AppCard>
      <View style={{ gap: spacing.xs }}>
        <AppText variant="body">{item.name}</AppText>
        <AppText variant="caption">
          Wardrobe item ready for outfit matching
        </AppText>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.xl }}>
        <View style={{ flex: 1 }}>
          <MetaRow
            label="Category"
            value={formatWardrobeCategory(item.category)}
          />
        </View>

        <View style={{ flex: 1 }}>
          <MetaRow label="Color" value={item.color} />
        </View>
      </View>

      {!!item.brand && <MetaRow label="Brand" value={item.brand} />}
    </AppCard>
  );
}
