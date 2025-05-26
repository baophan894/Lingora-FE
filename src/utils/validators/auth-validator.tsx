import { CustomFailedToast } from "../../components/toast/notificiation-toast";

export interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
}

export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
};

export const validateDateOfBirth = (date: string): boolean => {
  const birthDate = new Date(date);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  return age >= 13;
};

export const validateForm = (formData: FormData, isLogin: boolean): boolean => {
  if (!formData.email || !formData.password) {
    CustomFailedToast("Vui lòng điền email và mật khẩu");
    return false;
  }

  if (!isLogin) {
    if (!formData.fullName) {
      CustomFailedToast("Vui lòng điền họ và tên");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      CustomFailedToast("Mật khẩu không khớp");
      return false;
    }
    if (!formData.dateOfBirth || !validateDateOfBirth(formData.dateOfBirth)) {
      CustomFailedToast("Ngày sinh không hợp lệ hoặc tuổi phải lớn hơn 13");
      return false;
    }
    if (!formData.phoneNumber || !validatePhoneNumber(formData.phoneNumber)) {
      CustomFailedToast("Số điện thoại không hợp lệ");
      return false;
    }
  }
  return true;
};