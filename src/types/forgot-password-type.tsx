export interface ChangePasswordPayload {
  old_password: string;
  new_password: string;
  confirm_password: string;
}

export interface ChangePasswordResponse {
  message: string;
  status: number;
}