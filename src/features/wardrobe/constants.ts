import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";

export const wardrobeCategoryOptions: {
  label: string;
  value: WardrobeCategory;
}[] = [
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
  { label: "Shoes", value: "shoes" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Accessory", value: "accessory" },
];
