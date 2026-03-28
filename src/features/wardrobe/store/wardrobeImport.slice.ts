import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { WardrobeImportDraft } from "@/features/wardrobe/api/wardrobe-import.types";

type WardrobeImportState = {
  drafts: WardrobeImportDraft[];
  isInitialized: boolean;
  totalDetected: number;
  approvedCount: number;
  rejectedCount: number;
};

const initialState: WardrobeImportState = {
  drafts: [],
  isInitialized: false,
  totalDetected: 0,
  approvedCount: 0,
  rejectedCount: 0,
};

const wardrobeImportSlice = createSlice({
  name: "wardrobeImport",
  initialState,
  reducers: {
    setImportDrafts(state, action: PayloadAction<WardrobeImportDraft[]>) {
      state.drafts = action.payload;
      state.isInitialized = true;
      state.totalDetected = action.payload.length;
      state.approvedCount = 0;
      state.rejectedCount = 0;
    },
    approveImportDraft(state, action: PayloadAction<string>) {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload,
      );
      state.approvedCount += 1;
    },
    rejectImportDraft(state, action: PayloadAction<string>) {
      state.drafts = state.drafts.filter(
        (draft) => draft.id !== action.payload,
      );
      state.rejectedCount += 1;
    },
    approveAllImportDrafts(state) {
      state.approvedCount += state.drafts.length;
      state.drafts = [];
    },
    clearImportDrafts(state) {
      state.drafts = [];
      state.isInitialized = false;
      state.totalDetected = 0;
      state.approvedCount = 0;
      state.rejectedCount = 0;
    },
  },
});

export const {
  setImportDrafts,
  approveImportDraft,
  rejectImportDraft,
  approveAllImportDrafts,
  clearImportDrafts,
} = wardrobeImportSlice.actions;

export const wardrobeImportReducer = wardrobeImportSlice.reducer;
