import React, { useState } from "react";
import { Button } from "../../components/ui/button";
import { CustomToast, CustomSuccessToast, CustomFailedToast } from "../../components/toast/notificiation-toast";
import { useAppDispatch } from "../../store/hooks";
import { forgotPassword } from "../../features/user/forgot-password/forgotPasswordThunk";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    if (!email) {
      CustomFailedToast("Vui lòng nhập email");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(forgotPassword({ email })).unwrap();
      CustomSuccessToast("Đã gửi mail đặt lại mật khẩu. Vui lòng kiểm tra email!");
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
        <h2 className="text-2xl font-bold mb-4 text-center">Quên mật khẩu</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-red-800 to-red-400 text-white"
        >
          {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
        </Button>
      </div>
    </div>
  );
}