import { Redirect, router, useLocalSearchParams, type Href } from "expo-router";
import { Alert, View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { removeWardrobeItem } from "@/features/wardrobe/store/wardrobe.slice";
import { formatWardrobeCategory } from "@/features/wardrobe/utils/wardrobeFormatter";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppImagePreview } from "@/shared/components/ui/AppImagePreview";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppText } from "@/shared/components/ui/AppText";
import { EmptyStateCard } from "@/shared/components/ui/EmptyStateCard";
import { MetaRow } from "@/shared/components/ui/MetaRow";
import { StatusBadge } from "@/shared/components/ui/StatusBadge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function WardrobeItemDetailScreen() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const { id } = useLocalSearchParams<{ id?: string }>();

  const item = useAppSelector((state) =>
    state.wardrobe.items.find((wardrobeItem) => wardrobeItem.id === id),
  );

  const handleBack = () => {
    router.back();
  };

  const handleDelete = () => {
    if (!item) {
      return;
    }

    Alert.alert(
      "Delete item",
      `Are you sure you want to delete "${item.name}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            dispatch(removeWardrobeItem(item.id));
            router.replace("/wardrobe");
          },
        },
      ],
    );
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  if (!item) {
    return (
      <AppScrollScreen>
        <EmptyStateCard
          title="Item not found"
          description="This wardrobe item is no longer available."
          actionLabel="Back to Wardrobe"
          onPressAction={() => router.replace("/wardrobe")}
        />
      </AppScrollScreen>
    );
  }

  return (
    <AppScrollScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Wardrobe Item"
          subtitle="View the saved details and source information for this wardrobe item."
          actionLabel="Back"
          onPressAction={handleBack}
          actionVariant="back"
        />

        <AppCard>
          <AppImagePreview
            uri={item.imageUrl}
            label="Wardrobe Item Image"
            height={240}
          />
        </AppCard>

        <AppCard>
          {item.source === "ai" && (
            <StatusBadge label="Imported from AI" tone="warning" />
          )}

          {item.source === "manual" && (
            <StatusBadge label="Added manually" tone="success" />
          )}

          <AppText variant="title">{item.name}</AppText>
          <AppText variant="caption">
            This item is available for styling, matching, and future
            recommendations.
          </AppText>
        </AppCard>

        <AppCard>
          <MetaRow
            label="Category"
            value={formatWardrobeCategory(item.category)}
          />
          <MetaRow label="Color" value={item.color} />
          {!!item.brand && <MetaRow label="Brand" value={item.brand} />}
        </AppCard>

        <AppButton
          title="Delete Item"
          onPress={handleDelete}
          variant="danger"
        />
      </View>
    </AppScrollScreen>
  );
}
