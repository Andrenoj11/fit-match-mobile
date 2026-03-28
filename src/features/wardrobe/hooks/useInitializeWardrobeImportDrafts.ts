import { useEffect } from "react";

import { analyzeWardrobeImagesBatchMock } from "@/features/wardrobe/api/wardrobe-import.api";
import { setImportDrafts } from "@/features/wardrobe/store/wardrobeImport.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useInitializeWardrobeImportDrafts() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector(
    (state) => state.wardrobeImport.isInitialized,
  );

  useEffect(() => {
    const initialize = async () => {
      if (isInitialized) {
        return;
      }

      const drafts = await analyzeWardrobeImagesBatchMock();
      dispatch(setImportDrafts(drafts));
    };

    initialize();
  }, [dispatch, isInitialized]);
}
