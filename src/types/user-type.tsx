export interface User {
  _id: string
  email: string
  fullName: string
  avatarUrl?: string
  role: 'admin' | 'student' | 'teacher' | 'manager'
  gender?: 'Male' | 'Female' | 'Other'
  date_of_birth?: string // ISO string nếu cần hiển thị
  phone_number?: string
  address?: string
  profile?: {
    bio?: string
    location?: string
    socialLinks?: {
      facebook?: string
      linkedin?: string
    }
  }
  status: 'active' | 'locked'
}