import { Ionicons } from "@expo/vector-icons";
import { Pressable, View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { AppText } from "@/shared/components/ui/AppText";

type HeaderBackActionProps = {
  onPress: () => void;
  label?: string;
};

export function HeaderBackAction({
  onPress,
  label = "Back",
}: HeaderBackActionProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        opacity: pressed ? 0.75 : 1,
        alignSelf: "flex-start",
      })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.xs,
        }}
      >
        <Ionicons name="chevron-back" size={18} color={colors.textSecondary} />
        <AppText variant="caption" color={colors.textSecondary}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}
