import { Pressable, Text } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { typography } from "@/core/theme/typography";

type AppButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export function AppButton({
  title,
  onPress,
  disabled = false,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? colors.border : colors.primary,
        paddingHorizontal: 20,
        paddingVertical: spacing.md,
        borderRadius: spacing.md,
        minWidth: 180,
        alignItems: "center",
      }}
    >
      <Text
        style={{
          color: disabled ? colors.textSecondary : colors.primaryText,
          fontWeight: typography.fontWeight.semibold,
          fontSize: typography.fontSize.md,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
