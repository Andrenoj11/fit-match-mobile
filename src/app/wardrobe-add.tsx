import { Redirect, router, type Href } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { colors } from "@/core/theme/colors";
import { spacing } from "@/core/theme/spacing";
import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";
import { wardrobeCategoryOptions } from "@/features/wardrobe/constants";
import { addWardrobeItem } from "@/features/wardrobe/store/wardrobe.slice";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppCard } from "@/shared/components/ui/AppCard";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppInput } from "@/shared/components/ui/AppInput";
import { AppScrollScreen } from "@/shared/components/ui/AppScrollScreen";
import { AppSelectChips } from "@/shared/components/ui/AppSelectChips";
import { AppText } from "@/shared/components/ui/AppText";

export default function AddWardrobeItemScreen() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<WardrobeCategory | "">("");
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isSubmitDisabled = !name.trim() || !category.trim() || !color.trim();

  const handleBackToWardrobe = () => {
    router.back();
  };

  const handleSubmit = async () => {
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
          imageUrl: "https://example.com/new-item.jpg",
          brand: brand.trim() || undefined,
        }),
      );

      setSuccessMessage("Item wardrobe berhasil ditambahkan (dummy)");

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
          title="Add Wardrobe Item"
          subtitle="Add a new clothing piece to improve future outfit suggestions."
          actionLabel="Kembali ke Wardrobe"
          onPressAction={handleBackToWardrobe}
        />

        <AppCard>
          <AppText variant="body">New item details</AppText>
          <AppText variant="caption">
            Start with the essential information so the item can be used in
            future looks.
          </AppText>
        </AppCard>

        <View style={{ gap: spacing.lg }}>
          <View style={{ gap: spacing.sm }}>
            <AppText variant="caption">Item name</AppText>
            <AppInput
              placeholder="Contoh: Blue Denim Jacket"
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
              placeholder="Contoh: Blue"
              value={color}
              onChangeText={setColor}
            />
          </View>

          <View style={{ gap: spacing.sm }}>
            <AppText variant="caption">Brand (optional)</AppText>
            <AppInput
              placeholder="Contoh: Fit Match"
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
          title="Simpan Item Dummy"
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
          loading={isSubmitting}
        />
      </View>
    </AppScrollScreen>
  );
}
