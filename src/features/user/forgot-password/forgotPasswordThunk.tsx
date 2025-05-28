import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ForgotPasswordPayload, ResetPasswordPayload } from "../../../types/forgot-password-type";
import type { ErrorResponse } from "../../../types/authentication-type";
import axiosPublic from "../../../utils/axios/axiosPublic";
import { FORGOT_PASSWORD_API, RESET_PASSWORD_API } from "./forgotPasswordAPI";

export const forgotPassword = createAsyncThunk<
  void,
  ForgotPasswordPayload,
  { rejectValue: ErrorResponse }
>("user/forgotPassword", async (payload, thunkAPI) => {
  try {
    await axiosPublic.post(FORGOT_PASSWORD_API, payload);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || "Forgot password failed",
      status: error.response?.status || "500"
    });
  }
});

export const resetPassword = createAsyncThunk<
  void,
  ResetPasswordPayload,
  { rejectValue: ErrorResponse }
>("user/resetPassword", async (payload, thunkAPI) => {
  try {
    await axiosPublic.post(RESET_PASSWORD_API, payload);
  } catch (error: any) {
    return thunkAPI.rejectWithValue({
      message: error.response?.data?.message || "Reset password failed",
      status: error.response?.status || "500"
    });
  }
});