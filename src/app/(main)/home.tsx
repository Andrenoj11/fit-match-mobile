import { router } from "expo-router";
import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppScreen } from "@/shared/components/ui/AppScreen";
import { AppText } from "@/shared/components/ui/AppText";

export default function HomeScreen() {
  const handleBackToLogin = () => {
    router.replace("/login");
  };

  return (
    <AppScreen centered>
      <View style={{ gap: spacing.lg, alignItems: "center" }}>
        <AppText variant="title">Home</AppText>
        <AppText variant="caption">Kamu berhasil masuk ke halaman home</AppText>

        <AppButton title="Kembali ke Login" onPress={handleBackToLogin} />
      </View>
    </AppScreen>
  );
}
