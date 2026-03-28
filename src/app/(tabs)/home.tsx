import { Redirect, router, type Href } from "expo-router";
import { Alert, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { useMe } from "@/features/auth/hooks/useMe";
import { clearAuth } from "@/features/auth/store/auth.slice";
import { useRecommendations } from "@/features/recommendations/hooks/useRecommendations";
import { clearWardrobe } from "@/features/wardrobe/store/wardrobe.slice";
import { clearImportDrafts } from "@/features/wardrobe/store/wardrobeImport.slice";
import { tokenStorage } from "@/services/storage/tokenStorage";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppScreen } from "@/shared/components/ui/AppScreen";
import { AppText } from "@/shared/components/ui/AppText";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function HomeScreen() {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user: authUser } = useAppSelector(
    (state) => state.auth,
  );
  const wardrobeItems = useAppSelector((state) => state.wardrobe.items);
  const {
    user: meUser,
    isLoading: isMeLoading,
    errorMessage: meErrorMessage,
  } = useMe();
  const { items: recommendationItems } = useRecommendations();

  const handleLogout = async () => {
    await tokenStorage.removeAuth();
    dispatch(clearAuth());
    dispatch(clearWardrobe());
    dispatch(clearImportDrafts());
    router.replace("/login");
  };

  const handleResetDemoData = () => {
    Alert.alert(
      "Reset demo data",
      "This will clear the current wardrobe and import queue so the app can return to its default demo state. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => {
            dispatch(clearWardrobe());
            dispatch(clearImportDrafts());
            router.replace("/wardrobe");
          },
        },
      ],
    );
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <AppScreen>
      <View style={{ gap: spacing.xl }}>
        <View style={{ gap: spacing.sm }}>
          <AppText variant="title">Fit Match</AppText>
          <AppText variant="caption">
            Turn your wardrobe into outfit ideas with a simple, AI-assisted
            flow.
          </AppText>
        </View>

        <AppCard
          style={{
            backgroundColor: colors.primary,
            borderColor: colors.primary,
            gap: spacing.md,
          }}
        >
          <AppText variant="body" color={colors.primaryText}>
            Your wardrobe, ready to style
          </AppText>

          <AppText variant="caption" color={colors.primaryText}>
            Organize your clothing, import items from photos, and explore
            ready-made looks from the pieces you already own.
          </AppText>

          {!!authUser && (
            <AppText variant="caption" color={colors.primaryText}>
              Signed in as {authUser.name} ({authUser.email})
            </AppText>
          )}
        </AppCard>

        <View style={{ flexDirection: "row", gap: spacing.md }}>
          <AppCard style={{ flex: 1 }}>
            <AppText variant="caption">Wardrobe Items</AppText>
            <AppText variant="title">{wardrobeItems.length}</AppText>
          </AppCard>

          <AppCard style={{ flex: 1 }}>
            <AppText variant="caption">Looks Ready</AppText>
            <AppText variant="title">{recommendationItems.length}</AppText>
          </AppCard>
        </View>

        <AppCard>
          <AppText variant="body">Profile snapshot</AppText>

          {isMeLoading && (
            <AppText variant="caption">Loading profile...</AppText>
          )}

          {!!meErrorMessage && (
            <AppText variant="caption">{meErrorMessage}</AppText>
          )}

          {!!meUser && !isMeLoading && (
            <>
              <AppText variant="caption">Name: {meUser.name}</AppText>
              <AppText variant="caption">Email: {meUser.email}</AppText>
            </>
          )}
        </AppCard>

        <View style={{ gap: spacing.md }}>
          <AppButton
            title="Reset Demo Data"
            onPress={handleResetDemoData}
            variant="secondary"
          />
          <AppButton title="Sign Out" onPress={handleLogout} />
        </View>
      </View>
    </AppScreen>
  );
}
