import { AiLabeledWardrobeDraft } from "@/features/wardrobe/api/wardrobe-ai.types";

export async function analyzeWardrobeImageMock(
  imageUri: string,
): Promise<AiLabeledWardrobeDraft> {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    imageUri:
      imageUri || "https://picsum.photos/seed/wardrobe-ai-review/900/1200",
    predictedName: "Blue Denim Jacket",
    predictedCategory: "outerwear",
    predictedColor: "Blue",
    predictedBrand: "Fit Match",
  };
}
