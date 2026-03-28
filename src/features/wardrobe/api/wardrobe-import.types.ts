import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";

export type WardrobeImportDraft = {
  id: string;
  imageUri: string;
  predictedName: string;
  predictedCategory: WardrobeCategory;
  predictedColor: string;
  predictedBrand?: string;
  confidence: number;
};
