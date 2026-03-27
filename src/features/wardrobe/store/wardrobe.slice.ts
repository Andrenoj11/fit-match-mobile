import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WardrobeItem } from "@/features/wardrobe/api/wardrobe.types";

type WardrobeState = {
  items: WardrobeItem[];
  isInitialized: boolean;
};

const initialState: WardrobeState = {
  items: [],
  isInitialized: false,
};

const wardrobeSlice = createSlice({
  name: "wardrobe",
  initialState,
  reducers: {
    setWardrobeItems(state, action: PayloadAction<WardrobeItem[]>) {
      state.items = action.payload;
      state.isInitialized = true;
    },
    addWardrobeItem(state, action: PayloadAction<WardrobeItem>) {
      state.items = [action.payload, ...state.items];
    },
    clearWardrobe(state) {
      state.items = [];
      state.isInitialized = false;
    },
  },
});

export const { setWardrobeItems, addWardrobeItem, clearWardrobe } =
  wardrobeSlice.actions;
export const wardrobeReducer = wardrobeSlice.reducer;
