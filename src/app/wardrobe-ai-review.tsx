import { Redirect, router, useLocalSearchParams, type Href } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";
import { wardrobeCategoryOptions } from "@/features/wardrobe/constants";
import { addWardrobeItem } from "@/features/wardrobe/store/wardrobe.slice";
import { approveImportDraft } from "@/features/wardrobe/store/wardrobeImport.slice";
import { getAiConfidenceLabel } from "@/features/wardrobe/utils/aiConfidence";
import { formatWardrobeCategory } from "@/features/wardrobe/utils/wardrobeFormatter";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppImagePreview } from "@/shared/components/ui/AppImagePreview";
import { AppInput } from "@/shared/components/ui/AppInput";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppSelectChips } from "@/shared/components/ui/AppSelectChips";
import { AppText } from "@/shared/components/ui/AppText";
import { MetaRow } from "@/shared/components/ui/MetaRow";
import { StatusBadge } from "@/shared/components/ui/StatusBadge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export default function WardrobeAiReviewScreen() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const params = useLocalSearchParams<{
    draftId?: string;
    imageUri?: string;
    predictedName?: string;
    predictedCategory?: string;
    predictedColor?: string;
    predictedBrand?: string;
    confidence?: string;
  }>();
  const confidenceValue = params.confidence ? Number(params.confidence) : null;
  const confidenceMeta =
    confidenceValue !== null ? getAiConfidenceLabel(confidenceValue) : null;
  const confidencePercentage =
    confidenceValue !== null ? Math.round(confidenceValue * 100) : null;
  const [name, setName] = useState(params.predictedName ?? "");
  const [category, setCategory] = useState<WardrobeCategory | "">(
    (params.predictedCategory as WardrobeCategory) ?? "",
  );
  const [color, setColor] = useState(params.predictedColor ?? "");
  const [brand, setBrand] = useState(params.predictedBrand ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isSubmitDisabled = !name.trim() || !category.trim() || !color.trim();

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
    if (!name.trim() || !category || !color.trim()) {
      return;
    }

    try {
      setSuccessMessage("");
      setIsSubmitting(true);

      await new Promise((resolve) => setTimeout(resolve, 500));

      dispatch(
        addWardrobeItem({
          id: Date.now().toString(),
          name: name.trim(),
          category,
          color: color.trim(),
          imageUrl:
            params.imageUri ||
            "https://picsum.photos/seed/wardrobe-ai-review/900/1200",
          brand: brand.trim() || undefined,
          source: "ai",
        }),
      );

      if (params.draftId) {
        dispatch(approveImportDraft(params.draftId));
      }

      setSuccessMessage("Item saved successfully.");
      setTimeout(() => {
        router.replace("/wardrobe");
      }, 700);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return <Redirect href={"/login" as Href} />;
  }

  return (
    <AppScrollScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Review AI Labels"
          subtitle="Review the detected details and adjust anything before saving this item."
          actionLabel="Back"
          onPressAction={handleBack}
          actionVariant="back"
        />

        <AppCard>
          <AppText variant="body">Mock AI result</AppText>
          <AppText variant="caption">
            This preview simulates the future AI-assisted image analysis flow.
          </AppText>

          <AppImagePreview
            uri={params.imageUri}
            label="AI Image Review"
            height={180}
          />
        </AppCard>

        <AppCard>
          {confidenceMeta && confidencePercentage !== null ? (
            <StatusBadge
              label={`${confidenceMeta.label} · ${confidencePercentage}%`}
              tone={confidenceMeta.tone}
            />
          ) : (
            <StatusBadge label="AI suggestion" tone="neutral" />
          )}
          <AppText variant="body">Predicted by AI</AppText>
          <AppText variant="caption">
            These are the automatically detected values before your edits.
          </AppText>

          <MetaRow
            label="Name"
            value={params.predictedName ?? "Unknown item"}
          />
          <MetaRow
            label="Category"
            value={
              params.predictedCategory
                ? formatWardrobeCategory(
                    params.predictedCategory as WardrobeCategory,
                  )
                : "Unknown category"
            }
          />
          <MetaRow
            label="Color"
            value={params.predictedColor ?? "Unknown color"}
          />
          {!!params.predictedBrand && (
            <MetaRow label="Brand" value={params.predictedBrand} />
          )}
        </AppCard>

        <AppCard>
          <AppText variant="body">Edit before saving</AppText>
          <AppText variant="caption">
            Update any detail that looks incorrect before adding this item to
            your wardrobe.
          </AppText>
        </AppCard>

        <View style={{ gap: spacing.lg }}>
          <View style={{ gap: spacing.sm }}>
            <AppText variant="caption">Item name</AppText>
            <AppInput
              placeholder="Example: Blue Denim Jacket"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={{ gap: spacing.sm }}>
            <AppText variant="caption">Category</AppText>
            <AppSelectChips
              options={wardrobeCategoryOptions}
              value={category}
              onChange={(selectedValue) =>
                setCategory(selectedValue as WardrobeCategory)
              }
            />
          </View>

          <View style={{ gap: spacing.sm }}>
            <AppText variant="caption">Color</AppText>
            <AppInput
              placeholder="Example: Blue"
              value={color}
              onChangeText={setColor}
            />
          </View>

          <View style={{ gap: spacing.sm }}>
            <AppText variant="caption">Brand (optional)</AppText>
            <AppInput
              placeholder="Example: Fit Match"
              value={brand}
              onChangeText={setBrand}
            />
          </View>

          {!!successMessage && (
            <AppCard
              style={{
                backgroundColor: colors.surfaceMuted,
              }}
            >
              <AppText variant="caption" color={colors.success}>
                {successMessage}
              </AppText>
            </AppCard>
          )}
        </View>

        <AppButton
          title="Save Item"
          onPress={handleSave}
          disabled={isSubmitDisabled}
          loading={isSubmitting}
        />
      </View>
    </AppScrollScreen>
  );
}
