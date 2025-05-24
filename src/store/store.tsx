import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authentication/authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // các state khác
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
