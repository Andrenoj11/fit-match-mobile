export type WardrobeCategory =
  | "top"
  | "bottom"
  | "shoes"
  | "outerwear"
  | "accessory";

export type WardrobeItemSource = "manual" | "ai";

export type WardrobeItem = {
  id: string;
  name: string;
  category: WardrobeCategory;
  color: string;
  imageUrl: string;
  brand?: string;
  source?: WardrobeItemSource;
};
