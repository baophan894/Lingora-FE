export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'admin' | 'teacher' | 'student',
  // Các thuộc tính còn lại
}
