import { useMemo } from "react";

import { RecommendationItem } from "@/features/recommendations/api/recommendations.types";
import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";
import { useAppSelector } from "@/store/hooks";

export function useRecommendations() {
  const wardrobeItems = useAppSelector((state) => state.wardrobe.items);

  const availableCategories = useMemo(() => {
    return new Set(wardrobeItems.map((item) => item.category));
  }, [wardrobeItems]);

  const missingCategories = useMemo(() => {
    const requiredCategories: WardrobeCategory[] = ["top", "bottom", "shoes"];

    return requiredCategories.filter(
      (category) => !availableCategories.has(category),
    );
  }, [availableCategories]);

  const items = useMemo<RecommendationItem[]>(() => {
    const top = wardrobeItems.find((item) => item.category === "top");
    const bottom = wardrobeItems.find((item) => item.category === "bottom");
    const shoes = wardrobeItems.find((item) => item.category === "shoes");
    const outerwear = wardrobeItems.find(
      (item) => item.category === "outerwear",
    );

    const recommendations: RecommendationItem[] = [];

    if (top && bottom && shoes) {
      recommendations.push({
        id: "rec-1",
        title: "Daily Casual Recommendation",
        occasion: "Casual",
        items: [top.name, bottom.name, shoes.name],
        note: "Kombinasi dasar dari top, bottom, dan shoes yang tersedia di wardrobe kamu.",
      });
    }

    if (top && bottom) {
      recommendations.push({
        id: "rec-2",
        title: "Simple Clean Outfit",
        occasion: "Daily",
        items: [top.name, bottom.name],
        note: "Pilihan sederhana dan aman untuk aktivitas harian.",
      });
    }

    if (outerwear && top && bottom) {
      recommendations.push({
        id: "rec-3",
        title: "Layered Look",
        occasion: "Outdoor",
        items: [outerwear.name, top.name, bottom.name],
        note: "Cocok untuk tampilan yang lebih berlapis dan stylish.",
      });
    }

    return recommendations;
  }, [wardrobeItems]);

  return {
    items,
    isLoading: false,
    errorMessage: "",
    missingCategories,
    hasMinimumWardrobe: missingCategories.length === 0,
  };
}
