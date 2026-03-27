import { WardrobeItem } from "@/features/wardrobe/api/wardrobe.types";

export async function getWardrobeItems(): Promise<WardrobeItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "1",
      name: "White Oversized Shirt",
      category: "top",
      color: "White",
      imageUrl: "https://example.com/shirt.jpg",
      brand: "Fit Match",
    },
    {
      id: "2",
      name: "Black Wide Pants",
      category: "bottom",
      color: "Black",
      imageUrl: "https://example.com/pants.jpg",
      brand: "Fit Match",
    },
    {
      id: "3",
      name: "White Sneakers",
      category: "shoes",
      color: "White",
      imageUrl: "https://example.com/sneakers.jpg",
      brand: "Fit Match",
    },
  ];
}
