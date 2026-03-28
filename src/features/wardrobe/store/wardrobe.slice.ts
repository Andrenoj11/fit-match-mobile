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
    addWardrobeItems(state, action: PayloadAction<WardrobeItem[]>) {
      state.items = [...action.payload, ...state.items];
    },
    removeWardrobeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearWardrobe(state) {
      state.items = [];
      state.isInitialized = false;
    },
  },
});

export const {
  setWardrobeItems,
  addWardrobeItem,
  addWardrobeItems,
  removeWardrobeItem,
  clearWardrobe,
} = wardrobeSlice.actions;

export const wardrobeReducer = wardrobeSlice.reducer;
