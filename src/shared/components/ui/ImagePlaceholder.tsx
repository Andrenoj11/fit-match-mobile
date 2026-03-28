import { View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { AppText } from "@/shared/components/ui/AppText";

type ImagePlaceholderProps = {
  label?: string;
  height?: number;
};

export function ImagePlaceholder({
  label = "Image Preview",
  height = 140,
}: ImagePlaceholderProps) {
  return (
    <View
      style={{
        height,
        borderRadius: 16,
        backgroundColor: colors.surfaceMuted,
        borderWidth: 1,
        borderColor: colors.border,
        alignItems: "center",
        justifyContent: "center",
        padding: spacing.lg,
      }}
    >
      <AppText variant="caption">{label}</AppText>
    </View>
  );
}
