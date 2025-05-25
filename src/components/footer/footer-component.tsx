import { Link } from "react-router-dom";

export const FooterComponent = () => {
  return (
    <>
      <footer className="w-full flex justify-center py-6 bg-primary-800 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Link to="/">
                  <span className="text-2xl font-bold">LINGORA</span>
                </Link>
              </div>
              <p className="text-white text-start">
                Trung tâm ngoại ngữ tiếng Nhật hàng đầu với phương pháp giảng
                dạy hiện đại và hiệu quả.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Khóa học</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/courses/jlpt"
                    className="text-gray-300 hover:text-white"
                  >
                    Luyện thi JLPT
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/communication"
                    className="text-gray-300 hover:text-white"
                  >
                    Giao tiếp
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/business"
                    className="text-gray-300 hover:text-white"
                  >
                    Tiếng Nhật thương mại
                  </Link>
                </li>
                <li>
                  <Link
                    to="/courses/culture"
                    className="text-gray-300 hover:text-white"
                  >
                    Văn hóa Nhật Bản
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Liên kết</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/teachers"
                    className="text-gray-300 hover:text-white"
                  >
                    Giáo viên
                  </Link>
                </li>
                <li>
                  <Link
                    to="/reviews"
                    className="text-gray-300 hover:text-white"
                  >
                    Đánh giá
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-300 hover:text-white">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Liên hệ</h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span className="text-gray-300">0123 456 789</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                  <span className="text-gray-300">info@lingora.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="text-gray-300">
                    123 Đường ABC, Quận 1, TP.HCM
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className=" border-gray-700 mt-8 pt-6 text-center text-gray-300">
            <p>
              © {new Date().getFullYear()} Lingora. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
