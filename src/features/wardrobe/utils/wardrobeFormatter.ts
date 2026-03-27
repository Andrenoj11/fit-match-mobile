import { WardrobeCategory } from "@/features/wardrobe/api/wardrobe.types";

export function formatWardrobeCategory(category: WardrobeCategory): string {
  switch (category) {
    case "top":
      return "Top";
    case "bottom":
      return "Bottom";
    case "shoes":
      return "Shoes";
    case "outerwear":
      return "Outerwear";
    case "accessory":
      return "Accessory";
    default:
      return category;
  }
}
