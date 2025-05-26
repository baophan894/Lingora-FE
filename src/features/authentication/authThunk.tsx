import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  AuthResponse,
  ErrorResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
  GoogleAuthPayload,
} from "../../types/authentication-type";
import axiosPublic from "../../utils/axios/axiosPublic";
import { LOGIN_API, REGISTER_API, GOOGLE_LOGIN_API } from "./authAPI";

export const signInWithEmailAndPassword = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: ErrorResponse } // type of error payload
>("auth/login", async (payload, thunkAPI) => {
  try {
    const response = await axiosPublic.post(LOGIN_API, payload);
    
    console.log("-----------------------------------------------------")
    console.log("Dữ liệu login trả về:", response.data);
    console.log("-----------------------------------------------------")

    return response.data.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response?.data?.message || error.message || "Login failed",
      status: error.response?.status || "500",
    };
    return thunkAPI.rejectWithValue(errorResponse);
  }
});

// register
export const signUpWithEmailAndPassword = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: ErrorResponse } // type of error payload
>("auth/register", async (payload, thunkAPI) => {
  try {
    const response = await axiosPublic.post(REGISTER_API, payload);
    console.log("-----------------------------------------------------")
    console.log("Dữ liệu đăng ký trả về:", response.data);
    console.log("-----------------------------------------------------")
    return response.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message:
        error.response?.data?.message || error.message || "Register failed",
      status: error.response?.status || "500",
    };
    return thunkAPI.rejectWithValue(errorResponse);
  }
});

// Google Authentication
export const signInWithGoogle = createAsyncThunk<
  AuthResponse,
  GoogleAuthPayload,
  { rejectValue: ErrorResponse }
>("auth/google", async (payload, thunkAPI) => {
  try {
    const response = await axiosPublic.post(GOOGLE_LOGIN_API, payload);
    console.log("-----------------------------------------------------")
    console.log("Dữ liệu Google login trả về:", response.data);
    console.log("-----------------------------------------------------")
    return response.data.data;
  } catch (error: any) {
    const errorResponse: ErrorResponse = {
      message: error.response?.data?.message || error.message || "Google login failed",
      status: error.response?.status || "500",
    };
    return thunkAPI.rejectWithValue(errorResponse);
  }
});

// update
// delete
