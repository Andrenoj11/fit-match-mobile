import { Redirect, router, type Href } from "expo-router";
import { View } from "react-native";

import { useAppSelector } from "@/app/store/hooks";
import { spacing } from "@/core/theme/spacing";
import { WardrobeItemCard } from "@/features/wardrobe/components/WardrobeItemCard";
import { useInitializeWardrobe } from "@/features/wardrobe/hooks/useInitializeWardrobe";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppScreen } from "@/shared/components/ui/AppScreen";
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
    <AppScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Wardrobe"
          subtitle="Organize your clothing items for smarter outfit suggestions."
        />

        <AppButton
          title="Tambah Wardrobe Item"
          onPress={handleGoToAddWardrobe}
        />

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
    </AppScreen>
  );
}
