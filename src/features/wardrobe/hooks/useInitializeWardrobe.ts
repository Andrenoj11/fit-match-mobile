import { useEffect } from "react";

import { getWardrobeItems } from "@/features/wardrobe/api/wardrobe.api";
import { setWardrobeItems } from "@/features/wardrobe/store/wardrobe.slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function useInitializeWardrobe() {
  const dispatch = useAppDispatch();
  const isInitialized = useAppSelector((state) => state.wardrobe.isInitialized);

  useEffect(() => {
    const initialize = async () => {
      if (isInitialized) {
        return;
      }

      const items = await getWardrobeItems();
      dispatch(setWardrobeItems(items));
    };

    initialize();
  }, [dispatch, isInitialized]);
}
