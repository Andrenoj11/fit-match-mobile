import { configureStore } from "@reduxjs/toolkit";

import { authReducer } from "@/features/auth/store/auth.slice";
import { wardrobeReducer } from "@/features/wardrobe/store/wardrobe.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wardrobe: wardrobeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
