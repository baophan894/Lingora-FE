import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { BASE_URL } from "../../utils/constant-value/constant";
import { CustomSuccessToast } from "../../components/toast/notificiation-toast";
import axios from "axios";

export default function VerifyTokenPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerify, setIsVerify] = useState<null | boolean>(null); // null: loading, true: success, false: fail
  const [verifyMessage, setVerifyMessage] = useState("");
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const verifyEmailToken = async (token: string) => {
    setIsVerify(null);
    try {
      const response = await axios.get(
        `${BASE_URL}/users/verify-email?token=${token}`
      );
      // Nếu backend trả về message thành công
      setIsVerify(true);
      setVerifyMessage(response.data.message || "Xác thực email thành công!");
      CustomSuccessToast("Xác thực email thành công!");
    } catch (error: any) {
      setIsVerify(false);
      setVerifyMessage(
        error?.response?.data?.message || "Token không hợp lệ hoặc đã hết hạn"
      );
    }
  };

  useEffect(() => {
    if (token) {
      verifyEmailToken(token);
    }
  }, [token]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-primary-200 via-primary-500 to-primary-700">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-12 flex flex-col items-center max-w-md">
        {isVerify === null && (
          <div className="w-16 h-16 mb-4 animate-spin border-4 border-green-400 border-t-transparent rounded-full" />
        )}
        {isVerify === true && (
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        )}
        {isVerify === false && (
          <XCircle className="w-16 h-16 text-red-500 mb-4" />
        )}
        <h2
          className={`text-3xl font-bold mb-2 ${
            isVerify === true
              ? "text-green-700"
              : isVerify === false
              ? "text-red-700"
              : "text-gray-700"
          }`}
        >
          {isVerify === true
            ? "Xác thực thành công!"
            : isVerify === false
            ? "Xác thực thất bại"
            : "Đang xác thực..."}
        </h2>
        <p
          className={`${
            isVerify === true
              ? "text-green-800"
              : isVerify === false
              ? "text-red-800"
              : "text-gray-800"
          } text-lg mb-6 text-center`}
        >
          {isVerify === null
            ? "Vui lòng chờ trong giây lát..."
            : verifyMessage}
        </p>
        <button
          onClick={() => navigate("/login")}
          className={`bg-gradient-to-r ${
            isVerify === true
              ? "from-green-600 to-green-400"
              : "from-primary-800 to-primary-500"
          } text-white px-6 py-3 rounded-xl font-semibold shadow hover:from-green-700 hover:to-green-500 transition`}
        >
          Đăng nhập ngay
        </button>
      </div>
    </div>
  );
}