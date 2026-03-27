import { Pressable, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { typography } from "@/core/theme/typography";
import { AppText } from "@/shared/components/ui/AppText";

type SelectOption = {
  label: string;
  value: string;
};

type AppSelectChipsProps = {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
};

export function AppSelectChips({
  options,
  value,
  onChange,
}: AppSelectChipsProps) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
      {options.map((option) => {
        const isSelected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={({ pressed }) => ({
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.md,
              borderRadius: 14,
              borderWidth: 1,
              borderColor: isSelected ? colors.primary : colors.border,
              backgroundColor: isSelected ? colors.primary : colors.surface,
              opacity: pressed ? 0.92 : 1,
            })}
          >
            <AppText
              style={{
                color: isSelected ? colors.primaryText : colors.text,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}
