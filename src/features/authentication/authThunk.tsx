import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AuthResponse,
  ErrorResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "../../types/authentication-type";
import axiosPublic from "../../utils/axios/axiosPublic";
import { LOGIN_API, REGISTER_API } from "./authAPI";

export const signInWithEmailAndPassword = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: ErrorResponse } // type of error payload
>("auth/login", async (payload, thunkAPI) => {
    try {

      const response = await axiosPublic.post(LOGIN_API, payload);

      return response.data;

    } catch (error: any) {
      const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || "Login failed",
        status: error.response.status,
      };
      return thunkAPI.rejectWithValue(errorResponse || "Login failed");
    }
  }
);

// register
export const signUpWithEmailAndPassword = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: ErrorResponse } // type of error payload
>("auth/register", async (payload, thunkAPI) => {
  try {

    const response = await axiosPublic.post(REGISTER_API, payload);

    return response.data;

  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response?.data?.message || "Register failed",
      status: error.response.status,
    };
    return thunkAPI.rejectWithValue(errorResponse || "Register failed");
  }
});

// update
// delete
