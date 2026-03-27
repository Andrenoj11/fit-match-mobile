import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthUser } from "@/features/auth/api/auth.types";

type AuthState = {
  accessToken: string | null;
  isAuthenticated: boolean;
  user: AuthUser | null;
};

type SetAuthPayload = {
  accessToken: string;
  user: AuthUser;
};

const initialState: AuthState = {
  accessToken: null,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<SetAuthPayload>) {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    clearAuth(state) {
      state.accessToken = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
