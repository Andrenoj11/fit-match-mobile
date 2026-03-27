import { Redirect, router, type Href } from "expo-router";
import { View } from "react-native";

import { useAppSelector } from "@/app/store/hooks";
import { spacing } from "@/core/theme/spacing";
import { RecommendationCard } from "@/features/recommendations/components/RecommendationCard";
import { useRecommendations } from "@/features/recommendations/hooks/useRecommendations";
import { formatWardrobeCategory } from "@/features/wardrobe/utils/wardrobeFormatter";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppText } from "@/shared/components/ui/AppText";
import { EmptyStateCard } from "@/shared/components/ui/EmptyStateCard";

export default function RecommendationsScreen() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const {
    items,
    isLoading,
    errorMessage,
    missingCategories,
    hasMinimumWardrobe,
  } = useRecommendations();

  const handleGoToWardrobe = () => {
    router.push("/wardrobe");
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <AppScrollScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Looks"
          subtitle="Simple outfit ideas generated from the wardrobe items you already have."
        />

        <AppCard>
          <AppText variant="body">Outfit suggestions overview</AppText>
          <AppText variant="caption">
            We build simple looks from the categories currently available in
            your wardrobe.
          </AppText>
          <AppText variant="caption">Looks generated: {items.length}</AppText>
        </AppCard>

        {isLoading && (
          <AppText variant="caption">
            Mengambil recommendations dummy...
          </AppText>
        )}

        {!!errorMessage && <AppText variant="caption">{errorMessage}</AppText>}

        {!isLoading && !items.length && !hasMinimumWardrobe && (
          <EmptyStateCard
            title="Recommendation belum siap"
            description={`Tambahkan category berikut terlebih dahulu: ${missingCategories
              .map((category) => formatWardrobeCategory(category))
              .join(", ")}`}
            actionLabel="Pergi ke Wardrobe"
            onPressAction={handleGoToWardrobe}
          />
        )}

        {!isLoading && !!items.length && (
          <View style={{ gap: spacing.sm }}>
            <View style={{ gap: spacing.xs }}>
              <AppText variant="body">Generated looks</AppText>
              <AppText variant="caption">
                Simple recommendations based on the items currently available.
              </AppText>
            </View>

            <View style={{ gap: spacing.md }}>
              {items.map((item) => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </View>
          </View>
        )}
      </View>
    </AppScrollScreen>
  );
}
