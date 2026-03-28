import { WardrobeImportDraft } from "@/features/wardrobe/api/wardrobe-import.types";

export async function analyzeWardrobeImagesBatchMock(): Promise<
  WardrobeImportDraft[]
> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return [
    {
      id: "draft-1",
      imageUri: "https://picsum.photos/seed/wardrobe-top/900/1200",
      predictedName: "White Oversized Shirt",
      predictedCategory: "top",
      predictedColor: "White",
      predictedBrand: "Fit Match",
      confidence: 0.94,
    },
    {
      id: "draft-2",
      imageUri: "https://picsum.photos/seed/wardrobe-bottom/900/1200",
      predictedName: "Black Wide Pants",
      predictedCategory: "bottom",
      predictedColor: "Black",
      predictedBrand: "Fit Match",
      confidence: 0.91,
    },
    {
      id: "draft-3",
      imageUri: "https://picsum.photos/seed/wardrobe-outerwear/900/1200",
      predictedName: "Gray Hoodie",
      predictedCategory: "outerwear",
      predictedColor: "Gray",
      predictedBrand: "Fit Match",
      confidence: 0.88,
    },
    {
      id: "draft-4",
      imageUri: "https://picsum.photos/seed/wardrobe-shoes/900/1200",
      predictedName: "White Sneakers",
      predictedCategory: "shoes",
      predictedColor: "White",
      predictedBrand: "Fit Match",
      confidence: 0.93,
    },
  ];
}
