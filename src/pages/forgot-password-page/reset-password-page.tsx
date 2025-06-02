import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { CustomToast, CustomSuccessToast, CustomFailedToast } from "../../components/toast/notificiation-toast";
import { useAppDispatch } from "../../store/hooks";
import { resetPassword } from "../../features/user/forgot-password/forgotPasswordThunk";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token"); // <-- đây là token bạn cần gửi lên API reset password

   console.log("Token reset password:", token);

  const handleSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      CustomFailedToast("Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (newPassword !== confirmPassword) {
      CustomFailedToast("Mật khẩu không khớp");
      return;
    }
    if (newPassword.length < 6) {
      CustomFailedToast("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }
    if (!token) {
      CustomFailedToast("Token không hợp lệ hoặc đã hết hạn");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(resetPassword({ token, newPassword })).unwrap();
      CustomSuccessToast("Đặt lại mật khẩu thành công!");
      navigate("/login");
    } catch (error: any) {
      CustomFailedToast(error.message || "Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen fixed inset-0 overflow-hidden flex items-center justify-center">
      <CustomToast />
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-center">Đặt lại mật khẩu</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Mật khẩu mới</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Nhập mật khẩu mới"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Xác nhận mật khẩu mới"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-800 to-red-400 text-white"
        >
          {isLoading ? "Đang đặt lại..." : "Xác nhận"}
        </Button>
      </div>
    </div>
  );
}