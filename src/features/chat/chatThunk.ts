import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosPrivate from "../../utils/axios/axiosPrivate";
import type {
  Chat,
  CreateChatRequest,
  FetchMessagesRequest,
  Message,
  SendMessageRequest,
} from "../../types/chat";
import { store } from "../../store/store";
import axios from "axios";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export const fetchChats = createAsyncThunk<
  Chat[],
  void,
  { rejectValue: string }
>("chat/fetchChats", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.get('/chats', {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message || "Failed to fetch chats"
    );
  }
});

export const createChat = createAsyncThunk<
  Chat,
  CreateChatRequest,
  { rejectValue: string }
>("chat/createChat", async (data, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.post('/chats', data, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message || "Failed to create chat"
    );
  }
});

export const fetchMessages = createAsyncThunk<
  Message[],
  FetchMessagesRequest,
  { rejectValue: string }
>("chat/fetchMessages", async ({ chatId }, { rejectWithValue }) => {
  try {
    const response = await axios.get(`http://localhost:4000/chats/${chatId}/messages`, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    console.log("response", response.data.data);
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message || "Failed to fetch messages"
    );
  }
});

export const sendMessage = createAsyncThunk<
  Message,
  SendMessageRequest,
  { rejectValue: string }
>("chat/sendMessage", async ({ content, chatId }, { rejectWithValue }) => {
  try {
    const response = await axiosPrivate.post(`http://localhost:4000/chats/${chatId}/messages`, {
      content
    }, {
      headers: {
        Authorization: `Bearer ${store.getState().auth.token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    const apiError = error as ApiError;
    return rejectWithValue(
      apiError.response?.data?.message || "Failed to send message"
    );
  }
});
