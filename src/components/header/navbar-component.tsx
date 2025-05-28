import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, Search, User } from "lucide-react";
import { AnimatedButton } from "../animation/motion.config";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../features/authentication/authSlice";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";
import type { RootState } from "../../store/store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";

export const NavbarComponent = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  console.log("Thong tin user tu navbar", JSON.stringify(auth.user, null, 2));

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white">
        <div className="container max-w-screen-2xl mx-auto px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            {" "}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl tracking-widest bg-primary-800 letter-sp text-white px-2 py-1 rounded-md">
                <h1 className="title-lingora">LINGORA</h1>
              </span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {" "}
            <Link
              to="/"
              className="text-sm font-medium text-gray-900 hover:text-primary"
            >
              Trang chủ
            </Link>
            <Link
              to="/courses"
              className="text-sm font-medium text-gray-900 hover:text-primary"
            >
              Khóa học
            </Link>
            <Link
              to="/teachers"
              className="text-sm font-medium text-gray-900 hover:text-primary"
            >
              Giáo viên
            </Link>
            <Link
              to="/reviews"
              className="text-sm font-medium text-gray-900 hover:text-primary"
            >
              Đánh giá
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-gray-900 hover:text-primary"
            >
              Về chúng tôi
            </Link>
            <Link
              to="/chat"
              className="text-sm font-medium text-gray-900 hover:text-primary"
            >
              Trò chuyện
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {auth.user ? (
              <Link
                to="/chat"
                className="text-sm font-medium text-gray-900 hover:text-primary"
              >
                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5 text-gray-600" />
              </Link>
            ) : (
              ""
            )}
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Tìm kiếm</span>
            </Button>

            {auth.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="md:flex bg-white text-primary-800 hover:bg-primary-800 hover:text-white shadow-md"
                  >
                    <Avatar className="mr-2 h-7 w-7">
                      <AvatarImage
                        src={auth.user?.avatarUrl || "https://ui-avatars.com/api/?name=CN&background=random&size=128"}
                        alt="@shadcn"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {auth.user.fullName || "Tài khoản"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-48 bg-white shadow-md border border-gray-200 rounded-md"
                >
                  <DropdownMenuItem
                    asChild
                    className="text-black hover:text-primary-800 cursor-pointer"
                  >
                    <Link to="/student/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Tài khoản</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200 m-1" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-black hover:text-primary-800 cursor-pointer"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <AnimatedButton>
                    <Button
                      variant="outline"
                      className="hidden md:flex hover:bg-black hover:text-white"
                    >
                      Đăng nhập
                    </Button>
                  </AnimatedButton>
                </Link>
                <Link to="/login">
                  <AnimatedButton>
                    <Button className="bg-primary-800 text-white hover:bg-primary-500">
                      Đăng ký học thử
                    </Button>
                  </AnimatedButton>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};
