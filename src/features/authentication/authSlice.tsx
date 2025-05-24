import { createSlice } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "./authThunk";
import type { AuthResponse, ErrorResponse } from "../../types/authentication-type";

interface AuthState {
  user: AuthResponse["user"] | null;
  token: string | null;
  loading: boolean;
  error: ErrorResponse | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder

      // .addCase để lắng nghe 1 trạng thái
      // .addMatcher để lắng nghe nhiều trạng thái

      .addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        localStorage.setItem("token", action.payload.accessToken);
      })

      .addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      // Xử lý chung cho tất cả rejected action
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || action.error.message || "Unknown error";
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
