import { ReactNode } from "react";
import { ScrollView, StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";

type AppScrollScreenProps = {
  children: ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle>;
};

export function AppScrollScreen({
  children,
  contentContainerStyle,
}: AppScrollScreenProps) {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.background }}
      edges={["top", "left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          {
            padding: spacing.xl,
            paddingBottom: spacing.xl,
            gap: spacing.xl,
          },
          contentContainerStyle,
        ]}
      >
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}
