import { Redirect, router, type Href } from "expo-router";
import { View } from "react-native";

import { useAppSelector } from "@/app/store/hooks";
import { spacing } from "@/core/theme/spacing";
import { WardrobeItemCard } from "@/features/wardrobe/components/WardrobeItemCard";
import { useInitializeWardrobe } from "@/features/wardrobe/hooks/useInitializeWardrobe";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppText } from "@/shared/components/ui/AppText";
import { EmptyStateCard } from "@/shared/components/ui/EmptyStateCard";

export default function WardrobeScreen() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const wardrobeItems = useAppSelector((state) => state.wardrobe.items);

  useInitializeWardrobe();

  const handleGoToAddWardrobe = () => {
    router.push("/wardrobe-add");
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <AppScrollScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Wardrobe"
          subtitle="Organize your clothing items for smarter outfit suggestions."
        />

        <AppCard>
          <AppText variant="body">Your wardrobe at a glance</AppText>
          <AppText variant="caption">
            Keep your items organized so future recommendations can stay
            relevant and easy to explore.
          </AppText>
          <AppText variant="caption">
            Total items: {wardrobeItems.length}
          </AppText>
        </AppCard>

        <AppButton
          title="Tambah Wardrobe Item"
          onPress={handleGoToAddWardrobe}
        />

        <View style={{ gap: spacing.sm }}>
          <AppText variant="body">Saved items</AppText>
          <AppText variant="caption">
            Clothing pieces currently available for matching.
          </AppText>
        </View>

        {!wardrobeItems.length && (
          <EmptyStateCard
            title="Wardrobe masih kosong"
            description="Tambahkan item pertama kamu untuk mulai membangun outfit recommendation."
            actionLabel="Tambah Wardrobe Item"
            onPressAction={handleGoToAddWardrobe}
          />
        )}

        {!!wardrobeItems.length && (
          <View style={{ gap: spacing.md }}>
            {wardrobeItems.map((item) => (
              <WardrobeItemCard key={item.id} item={item} />
            ))}
          </View>
        )}
      </View>
    </AppScrollScreen>
  );
}
