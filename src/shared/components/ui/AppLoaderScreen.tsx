import { ActivityIndicator, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { AppScreen } from "@/shared/components/ui/AppScreen";
import { AppText } from "@/shared/components/ui/AppText";

export function AppLoaderScreen() {
  return (
    <AppScreen centered>
      <View style={{ alignItems: "center", gap: spacing.lg }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <AppText variant="caption">Menyiapkan aplikasi...</AppText>
      </View>
    </AppScreen>
  );
}
