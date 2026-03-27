import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppInput } from "@/shared/components/ui/AppInput";
import { AppScreen } from "@/shared/components/ui/AppScreen";
import { AppText } from "@/shared/components/ui/AppText";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLoginDisabled = !email.trim() || !password.trim();

  const handleGoToHome = () => {
    router.replace("/home");
  };

  return (
    <AppScreen centered>
      <View style={{ width: "100%", gap: spacing.xl }}>
        <View style={{ gap: spacing.sm, alignItems: "center" }}>
          <AppText variant="title">Login</AppText>
          <AppText variant="caption">
            Masuk untuk melanjutkan ke Fit Match
          </AppText>
        </View>

        <View style={{ gap: spacing.lg }}>
          <AppInput
            placeholder="Masukkan email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <AppInput
            placeholder="Masukkan password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />
        </View>

        <AppButton
          title="Masuk ke Home"
          onPress={handleGoToHome}
          disabled={isLoginDisabled}
        />
      </View>
    </AppScreen>
  );
}
