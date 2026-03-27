import { ActivityIndicator, Pressable, Text } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { typography } from "@/core/theme/typography";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export function AppButton({
  title,
  onPress,
  disabled = false,
  loading = false,
}: AppButtonProps) {
  const isButtonDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isButtonDisabled}
      style={({ pressed }) => ({
        backgroundColor: isButtonDisabled
          ? colors.surfaceMuted
          : colors.primary,
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.md,
        borderRadius: 14,
        minWidth: 180,
        alignItems: "center",
        opacity: pressed && !isButtonDisabled ? 0.9 : 1,
      })}
    >
      {loading ? (
        <ActivityIndicator color={colors.primaryText} />
      ) : (
        <Text
          style={{
            color: isButtonDisabled ? colors.textSecondary : colors.primaryText,
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
