import { TextInput, TextInputProps, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { typography } from "@/core/theme/typography";

type AppInputProps = TextInputProps;

export function AppInput(props: AppInputProps) {
  return (
    <View
      style={{
        width: "100%",
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: spacing.md,
        backgroundColor: colors.white,
        paddingHorizontal: spacing.lg,
      }}
    >
      <TextInput
        placeholderTextColor={colors.textSecondary}
        style={{
          height: 48,
          color: colors.text,
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.regular,
        }}
        {...props}
      />
    </View>
  );
}
