import { ActivityIndicator, Pressable, Text } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { typography } from "@/core/theme/typography";

type AppButtonVariant = "primary" | "secondary" | "danger";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: AppButtonVariant;
};

export function AppButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
}: AppButtonProps) {
  const isButtonDisabled = disabled || loading;

  const getBackgroundColor = () => {
    if (isButtonDisabled) {
      return colors.surfaceMuted;
    }

    if (variant === "secondary") {
      return colors.surface;
    }

    if (variant === "danger") {
      return colors.surface;
    }

    return colors.primary;
  };

  const getBorderColor = () => {
    if (isButtonDisabled) {
      return colors.border;
    }

    if (variant === "secondary") {
      return colors.border;
    }

    if (variant === "danger") {
      return colors.danger;
    }

    return colors.primary;
  };

  const getTextColor = () => {
    if (isButtonDisabled) {
      return colors.textSecondary;
    }

    if (variant === "secondary") {
      return colors.text;
    }

    if (variant === "danger") {
      return colors.danger;
    }

    return colors.primaryText;
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={isButtonDisabled}
      style={({ pressed }) => ({
        backgroundColor: getBackgroundColor(),
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: 14,
        minWidth: 180,
        alignItems: "center",
        borderWidth: 1,
        borderColor: getBorderColor(),
        opacity: pressed && !isButtonDisabled ? 0.9 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={{
            color: getTextColor(),
            fontWeight: typography.fontWeight.semibold,
            fontSize: typography.fontSize.md,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
