import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { WardrobeItem } from "@/features/wardrobe/api/wardrobe.types";
import { formatWardrobeCategory } from "@/features/wardrobe/utils/wardrobeFormatter";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppImagePreview } from "@/shared/components/ui/AppImagePreview";
import { AppText } from "@/shared/components/ui/AppText";
import { MetaRow } from "@/shared/components/ui/MetaRow";
import { StatusBadge } from "@/shared/components/ui/StatusBadge";

type WardrobeItemCardProps = {
  item: WardrobeItem;
  onPress?: () => void;
};

export function WardrobeItemCard({ item, onPress }: WardrobeItemCardProps) {
  const content = (
    <AppCard>
      <AppImagePreview uri={item.imageUrl} label="Wardrobe Photo" />

      <View style={{ gap: spacing.xs }}>
        {item.source === "ai" && (
          <StatusBadge label="Imported from AI" tone="warning" />
        )}

        {item.source === "manual" && (
          <StatusBadge label="Added manually" tone="success" />
        )}
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

      {!!onPress && (
        <View
          style={{
            marginTop: spacing.xs,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <AppText variant="caption" color={colors.textSecondary}>
            View details
          </AppText>

          <Ionicons
            name="chevron-forward"
            size={16}
            color={colors.textSecondary}
          />
        </View>
      )}
    </AppCard>
  );

  if (!onPress) {
    return content;
  }

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.96 : 1,
      })}
    >
      {content}
    </Pressable>
  );
}
