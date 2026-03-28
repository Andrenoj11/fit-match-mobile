import { Redirect, router, type Href } from "expo-router";
import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { RecommendationCard } from "@/features/recommendations/components/RecommendationCard";
import { useRecommendations } from "@/features/recommendations/hooks/useRecommendations";
import { formatWardrobeCategory } from "@/features/wardrobe/utils/wardrobeFormatter";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppText } from "@/shared/components/ui/AppText";
import { EmptyStateCard } from "@/shared/components/ui/EmptyStateCard";
import { useAppSelector } from "@/store/hooks";

export default function RecommendationsScreen() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const {
    items,
    isLoading,
    errorMessage,
    missingCategories,
    hasMinimumWardrobe,
  } = useRecommendations();

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <AppScrollScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Looks"
          subtitle="Curated outfit ideas based on the wardrobe pieces you already own."
        />

        <AppCard>
          <AppText variant="body">Your styling overview</AppText>
          <AppText variant="caption">
            These looks are generated from the wardrobe categories currently
            available in your closet.
          </AppText>
          <AppText variant="caption">Looks ready: {items.length}</AppText>
        </AppCard>

        {isLoading && (
          <AppText variant="caption">Loading dummy recommendations...</AppText>
        )}

        {!!errorMessage && <AppText variant="caption">{errorMessage}</AppText>}

        {!isLoading && !items.length && !hasMinimumWardrobe && (
          <EmptyStateCard
            title="Recommendations are not ready yet"
            description={`Add these categories first: ${missingCategories
              .map((category) => formatWardrobeCategory(category))
              .join(", ")}`}
            actionLabel="Go to Wardrobe"
            onPressAction={() => router.push("/wardrobe")}
          />
        )}

        {!isLoading && !!items.length && (
          <View style={{ gap: spacing.sm }}>
            <View style={{ gap: spacing.xs }}>
              <AppText variant="body">Suggested looks</AppText>
              <AppText variant="caption">
                Explore outfit combinations created from your available wardrobe
                items.
              </AppText>
            </View>

            <View style={{ gap: spacing.lg }}>
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
