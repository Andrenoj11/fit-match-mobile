import { View } from "react-native";

import { spacing } from "@/core/theme/spacing";
import { AppText } from "@/shared/components/ui/AppText";

type MetaRowProps = {
  label: string;
  value: string;
};

export function MetaRow({ label, value }: MetaRowProps) {
  return (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="caption">{label}</AppText>
      <AppText variant="body">{value}</AppText>
    </View>
  );
}
