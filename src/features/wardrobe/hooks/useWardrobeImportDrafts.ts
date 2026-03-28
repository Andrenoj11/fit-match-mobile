import { useEffect, useState } from "react";

import { analyzeWardrobeImagesBatchMock } from "@/features/wardrobe/api/wardrobe-import.api";
import { WardrobeImportDraft } from "@/features/wardrobe/api/wardrobe-import.types";

export function useWardrobeImportDrafts() {
  const [drafts, setDrafts] = useState<WardrobeImportDraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setErrorMessage("");
        setIsLoading(true);

        const response = await analyzeWardrobeImagesBatchMock();
        setDrafts(response);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Failed to analyze wardrobe images");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  return {
    drafts,
    isLoading,
    errorMessage,
  };
}
