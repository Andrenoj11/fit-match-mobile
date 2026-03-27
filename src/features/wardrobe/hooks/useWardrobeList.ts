import { useEffect, useState } from "react";

import { getWardrobeItems } from "@/features/wardrobe/api/wardrobe.api";
import { WardrobeItem } from "@/features/wardrobe/api/wardrobe.types";

export function useWardrobeList() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWardrobeItems = async () => {
      try {
        setErrorMessage("");
        setIsLoading(true);

        const response = await getWardrobeItems();
        setItems(response);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Gagal mengambil wardrobe items");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchWardrobeItems();
  }, []);

  return {
    items,
    isLoading,
    errorMessage,
  };
}
