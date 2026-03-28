import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { WardrobeImportDraft } from "@/features/wardrobe/api/wardrobe-import.types";
import { getAiConfidenceLabel } from "@/features/wardrobe/utils/aiConfidence";
import { formatWardrobeCategory } from "@/features/wardrobe/utils/wardrobeFormatter";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppImagePreview } from "@/shared/components/ui/AppImagePreview";
import { AppText } from "@/shared/components/ui/AppText";
import { MetaRow } from "@/shared/components/ui/MetaRow";
import { StatusBadge } from "@/shared/components/ui/StatusBadge";

type WardrobeImportDraftCardProps = {
  draft: WardrobeImportDraft;
  onReview: () => void;
  onApprove: () => void;
  onReject: () => void;
};

export function WardrobeImportDraftCard({
  draft,
  onReview,
  onApprove,
  onReject,
}: WardrobeImportDraftCardProps) {
  const confidenceMeta = getAiConfidenceLabel(draft.confidence);

  return (
    <AppCard>
      <AppImagePreview uri={draft.imageUri} label="Detected Image" />

      <View style={{ gap: spacing.xs }}>
        <StatusBadge
          label={`${confidenceMeta.label} · ${Math.round(draft.confidence * 100)}%`}
          tone={confidenceMeta.tone}
        />

        <AppText variant="body">{draft.predictedName}</AppText>
        <AppText variant="caption">
          AI-detected wardrobe draft ready for review.
        </AppText>
      </View>

      <View style={{ flexDirection: "row", gap: spacing.xl }}>
        <View style={{ flex: 1 }}>
          <MetaRow
            label="Category"
            value={formatWardrobeCategory(draft.predictedCategory)}
          />
        </View>

        <View style={{ flex: 1 }}>
          <MetaRow label="Color" value={draft.predictedColor} />
        </View>
      </View>

      {!!draft.predictedBrand && (
        <MetaRow label="Brand" value={draft.predictedBrand} />
      )}

      <View
        style={{
          marginTop: spacing.xs,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <AppText variant="caption" color={colors.textSecondary}>
          Review this detected item
        </AppText>

        <Ionicons
          name="chevron-forward"
          size={16}
          color={colors.textSecondary}
        />
      </View>

      <View style={{ gap: spacing.sm }}>
        <AppButton
          title="Review Draft"
          onPress={onReview}
          variant="secondary"
        />
        <AppButton title="Approve Draft" onPress={onApprove} />
        <AppButton title="Reject Draft" onPress={onReject} variant="danger" />
      </View>
    </AppCard>
  );
}
