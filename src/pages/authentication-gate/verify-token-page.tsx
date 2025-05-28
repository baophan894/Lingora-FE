import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { verifyEmail } from "../../features/authentication/authThunk";

export default function VerifyTokenPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");

  const { verifyStatus, verifyMessage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (token) dispatch(verifyEmail(token));
  }, [token, dispatch]);

  console.log("Token from URL:", token);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-green-200 to-green-400">
      <div className="bg-white rounded-2xl shadow-xl px-10 py-12 flex flex-col items-center max-w-md">
        {verifyStatus === "pending" && (
          <div className="w-16 h-16 mb-4 animate-spin border-4 border-green-400 border-t-transparent rounded-full" />
        )}
        {verifyStatus === "success" && (
          <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
        )}
        {verifyStatus === "error" && (
          <XCircle className="w-16 h-16 text-red-500 mb-4" />
        )}
        <h2
          className={`text-3xl font-bold mb-2 ${
            verifyStatus === "success" ? "text-green-700" : "text-red-700"
          }`}
        >
          {verifyStatus === "success"
            ? "Xác thực thành công!"
            : verifyStatus === "error"
            ? "Xác thực thất bại"
            : "Đang xác thực..."}
        </h2>
        <p
          className={`${
            verifyStatus === "success" ? "text-green-800" : "text-red-800"
          } text-lg mb-6 text-center`}
        >
          {verifyMessage}
        </p>
        <button
          onClick={() => navigate("/login")}
          className={`bg-gradient-to-r ${
            verifyStatus === "success"
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