import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, resetPassword } from "./forgotPasswordThunk";

interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  success: false,
};

const forgotPasswordSlice = createSlice({
  name: "forgotPassword",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Forgot password failed";
        state.success = false;
      })
      // Reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Reset password failed";
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess } = forgotPasswordSlice.actions;
export default forgotPasswordSlice.reducer;