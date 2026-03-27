import { RecommendationItem } from "@/features/recommendations/api/recommendations.types";

export async function getRecommendations(): Promise<RecommendationItem[]> {
  await new Promise((resolve) => setTimeout(resolve, 900));

  return [
    {
      id: "1",
      title: "Clean Casual Look",
      occasion: "Casual",
      items: ["White Oversized Shirt", "Black Wide Pants", "White Sneakers"],
      note: "Kombinasi aman untuk aktivitas santai dengan warna netral yang mudah dipadukan.",
    },
    {
      id: "2",
      title: "Minimal Office Style",
      occasion: "Office",
      items: ["White Oversized Shirt", "Black Wide Pants"],
      note: "Cocok untuk tampilan kerja yang rapi dan sederhana.",
    },
  ];
}
