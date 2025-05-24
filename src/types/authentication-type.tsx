import type { User } from "./user-type"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  name: string
  email: string
  password: string
}

// Back-end trả về gì thì set ở đây là cái đó
export interface AuthResponse {
  user: User
  accessToken: string
}
 
export interface RegisterResponse {
  verifyToken: string
}

export interface ErrorResponse {
  message: string
  status: string
}