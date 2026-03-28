import { Pressable, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { AppImagePreview } from "@/shared/components/ui/AppImagePreview";
import { AppText } from "@/shared/components/ui/AppText";

type ImageOptionCardProps = {
  label: string;
  uri: string;
  isSelected: boolean;
  onPress: () => void;
};

export function ImageOptionCard({
  label,
  uri,
  isSelected,
  onPress,
}: ImageOptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        gap: spacing.sm,
      }}
    >
      <View
        style={{
          borderWidth: 2,
          borderColor: isSelected ? colors.primary : colors.border,
          borderRadius: 18,
          padding: 4,
        }}
      >
        <AppImagePreview uri={uri} label={label} height={120} />
      </View>

      <AppText variant="caption">{label}</AppText>
    </Pressable>
  );
}
