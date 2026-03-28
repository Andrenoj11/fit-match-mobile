import { Redirect, router, type Href } from "expo-router";
import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { WardrobeItemCard } from "@/features/wardrobe/components/WardrobeItemCard";
import { useInitializeWardrobe } from "@/features/wardrobe/hooks/useInitializeWardrobe";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppText } from "@/shared/components/ui/AppText";
import { EmptyStateCard } from "@/shared/components/ui/EmptyStateCard";
import { useAppSelector } from "@/store/hooks";

export default function WardrobeScreen() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wardrobeItems = useAppSelector((state) => state.wardrobe.items);

  useInitializeWardrobe();

  const handleGoToAddWardrobe = () => {
    router.push("/wardrobe-add");
  };

  const handleOpenDetail = (id: string) => {
    router.push(`/wardrobe/${id}`);
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <AppScrollScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Wardrobe"
          subtitle="Manage your saved clothing items and prepare them for styling."
        />

        <AppCard>
          <AppText variant="body">Your wardrobe overview</AppText>
          <AppText variant="caption">
            Keep your clothing items organized so outfit suggestions stay
            relevant and easy to explore.
          </AppText>
          <AppText variant="caption">
            Total items: {wardrobeItems.length}
          </AppText>
        </AppCard>

        <View style={{ gap: spacing.md }}>
          <AppButton
            title="Add Item Manually"
            onPress={handleGoToAddWardrobe}
          />
          <AppButton
            title="Import Wardrobe Photos"
            onPress={() => router.push("/wardrobe-import")}
            variant="secondary"
          />
        </View>

        <View style={{ gap: spacing.sm }}>
          <AppText variant="body">Saved items</AppText>
          <AppText variant="caption">
            Browse the clothing pieces currently available for matching and
            recommendations.
          </AppText>
        </View>

        {!wardrobeItems.length && (
          <EmptyStateCard
            title="Your wardrobe is empty"
            description="Add your first clothing item to start building outfit recommendations."
            actionLabel="Add Item Manually"
            onPressAction={handleGoToAddWardrobe}
          />
        )}

        {!!wardrobeItems.length && (
          <View style={{ gap: spacing.md }}>
            {wardrobeItems.map((item) => (
              <WardrobeItemCard
                key={item.id}
                item={item}
                onPress={() => handleOpenDetail(item.id)}
              />
            ))}
          </View>
        )}
      </View>
    </AppScrollScreen>
  );
}
