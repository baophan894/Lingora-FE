import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  signInWithGoogle,
  verifyEmail,
} from "./authThunk";
import type { AuthResponse, ErrorResponse } from "../../types/authentication-type";

interface AuthState {
  user: AuthResponse["user"] | null;
  token: string | null;
  loading: boolean;
  error: ErrorResponse | null;
  verifyStatus?: "pending" | "success" | "error";
  verifyMessage?: string;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  verifyStatus: undefined,
  verifyMessage: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.access_token);
      })

      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.token = action.payload.data.access_token;
        localStorage.setItem("user", JSON.stringify(action.payload.data.user));
        localStorage.setItem("token", action.payload.data.access_token);
      })

      .addCase(signUpWithEmailAndPassword.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(verifyEmail.pending, (state) => {
        state.verifyStatus = "pending";
        state.verifyMessage = "";
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.verifyStatus = "success";
        state.verifyMessage = action.payload.message;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.verifyStatus = "error";
        state.verifyMessage = action.payload?.message || "Xác thực thất bại";
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
        (state, action: PayloadAction<ErrorResponse>) => {
          state.loading = false;
          state.error = action.payload || { message: "Unknown error" };
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
