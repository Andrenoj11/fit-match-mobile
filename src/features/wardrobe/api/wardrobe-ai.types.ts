import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";

export type AiLabeledWardrobeDraft = {
  imageUri: string;
  predictedName: string;
  predictedCategory: WardrobeCategory;
  predictedColor: string;
  predictedBrand?: string;
};
