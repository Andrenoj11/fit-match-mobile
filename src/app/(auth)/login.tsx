import { Redirect, type Href } from "expo-router";
import { View } from "react-native";

import { useAppSelector } from "@/app/store/hooks";
import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { useLoginForm } from "@/features/auth/hooks/useLoginForm";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppInput } from "@/shared/components/ui/AppInput";
import { AppScreen } from "@/shared/components/ui/AppScreen";
import { AppText } from "@/shared/components/ui/AppText";

export default function LoginScreen() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const {
    email,
    setEmail,
    password,
    setPassword,
    isSubmitting,
    isLoginDisabled,
    errorMessage,
    handleSubmit,
  } = useLoginForm();

  if (isAuthenticated) {
    return <Redirect href={"/home" as Href} />;
  }

  return (
    <AppScreen centered>
      <View style={{ width: "100%", gap: spacing.xl }}>
        <View style={{ gap: spacing.sm, alignItems: "center" }}>
          <AppText variant="title">Fit Match</AppText>
          <AppText variant="caption" style={{ textAlign: "center" }}>
            Build outfit ideas from the wardrobe you already own.
          </AppText>
        </View>

        <AppCard>
          <View style={{ gap: spacing.sm }}>
            <AppText variant="body">Welcome back</AppText>
            <AppText variant="caption">
              Sign in to continue organizing your wardrobe and exploring looks.
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

            {!!errorMessage && (
              <AppText variant="caption" color={colors.danger}>
                {errorMessage}
              </AppText>
            )}
          </View>

          <AppButton
            title="Masuk"
            onPress={handleSubmit}
            disabled={isLoginDisabled}
            loading={isSubmitting}
          />
        </AppCard>
      </View>
    </AppScreen>
  );
}
