import type { User } from "./user-type"

export interface LoginPayload {
  email: string
  password: string
}

export interface RegisterPayload {
  fullName: string
  phone_number: string
  date_of_birth: string // ISO string
  email: string
  password: string
}

export interface GoogleAuthPayload {
  token: string
  avatar?: string
}

// Back-end trả về gì thì set ở đây là cái đó
export interface AuthResponse {
  data: any
  user: User
  access_token: string
  refresh_token: string
}
 
export interface LoginGoogleResponse {
}

export interface RegisterResponse {
  verifyToken: string
}

export interface ErrorResponse {
  message: string
  status: string
}