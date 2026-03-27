import { Redirect, router, type Href } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { spacing } from "@/core/theme/spacing";
import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";
import { wardrobeCategoryOptions } from "@/features/wardrobe/constants";
import { addWardrobeItem } from "@/features/wardrobe/store/wardrobe.slice";
import { AppButton } from "@/shared/components/ui/AppButton";
import { AppHeader } from "@/shared/components/ui/AppHeader";
import { AppInput } from "@/shared/components/ui/AppInput";
import { AppScreen } from "@/shared/components/ui/AppScreen";
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
    <AppScreen>
      <View style={{ gap: spacing.xl }}>
        <AppHeader
          title="Add Wardrobe Item"
          subtitle="Tambahkan item dummy baru ke wardrobe"
          actionLabel="Kembali ke Wardrobe"
          onPressAction={handleBackToWardrobe}
        />

        <View style={{ gap: spacing.lg }}>
          <AppInput
            placeholder="Nama item, contoh: Blue Denim Jacket"
            value={name}
            onChangeText={setName}
          />

          <View style={{ gap: spacing.sm }}>
            <AppText variant="caption">Pilih category</AppText>
            <AppSelectChips
              options={wardrobeCategoryOptions}
              value={category}
              onChange={(selectedValue) =>
                setCategory(selectedValue as WardrobeCategory)
              }
            />
          </View>

          <AppInput
            placeholder="Color, contoh: Blue"
            value={color}
            onChangeText={setColor}
          />

          <AppInput
            placeholder="Brand (opsional)"
            value={brand}
            onChangeText={setBrand}
          />

          {!!successMessage && (
            <AppText variant="caption">{successMessage}</AppText>
          )}
        </View>

        <AppButton
          title="Simpan Item Dummy"
          onPress={handleSubmit}
          disabled={isSubmitDisabled}
          loading={isSubmitting}
        />
      </View>
    </AppScreen>
  );
}
