import { useState } from "react";
import {
  Home,
  Users,
  Book,
  Settings,
  LogOut,
  User,
  UserPlus,
  UserCheck,
  BookOpen,
  BookMarked,
  GraduationCap,
  X,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  CustomSuccessToast,
  CustomFailedToast,
} from "../toast/notificiation-toast";
import { Link } from "react-router-dom";

interface CenterManagerSidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function CenterManagerSidebar({ 
  isOpen = true, 
  onToggle 
}: CenterManagerSidebarProps) {
  const [openStudent, setOpenStudent] = useState(false);
  const [openCourse, setOpenCourse] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const handleLogout = () => {
    try {
      CustomSuccessToast("Đăng xuất thành công!");
      // window.location.href = "/login";
    } catch {
      CustomFailedToast("Đăng xuất thất bại!");
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        h-auto w-80 bg-primary-800 border-r border-primary-700 shadow-xl flex-shrink-0
        fixed lg:relative inset-y-0 left-0 z-50
        transform transition-transform duration-300 ease-in-out lg:transform-none
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="bg-primary-800 h-full flex flex-col">
          {/* Header with close button for mobile */}
          <div className="p-6 border-b border-primary-700/50">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white mb-2">Trung tâm</div>
                <div className="text-sm text-primary-200">Hệ thống quản lý</div>
              </div>
              {/* Close button for mobile */}
              <button
                onClick={onToggle}
                className="lg:hidden text-white hover:bg-primary-700 rounded-lg p-2 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

        <div className="flex-1 p-4">
          <div className="space-y-2">              <div>
                <Link to="/center">
                  <button className="w-full text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg p-3 flex items-center">
                    <Home className="w-5 h-5 text-primary-200" />
                    <span className="ml-3">Thống kê</span>
                  </button>
                </Link>
              </div>              {/* Quản lý học viên với submenu */}
              <div>
                <button
                  onClick={() => setOpenStudent((v) => !v)}
                  className="w-full text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg p-3 flex items-center"
                >
                  <Users className="w-5 h-5 text-primary-200" />
                  <span className="ml-3 flex-1 text-left">
                    Quản lý học viên
                  </span>
                  <span className="text-primary-200 text-xs">
                    {openStudent ? "▲" : "▼"}
                  </span>
                </button>
                {openStudent && (
                  <div className="ml-8 mt-2 space-y-1 border-l-2 border-primary-600 pl-4">
                    <Link to="/center/student/add">
                      <button className="w-full text-primary-100 hover:bg-primary-700/70 transition-colors duration-200 rounded-md p-2 text-sm flex items-center">
                        <UserPlus className="w-4 h-4 text-primary-300" />
                        <span className="ml-2">Thêm học viên</span>
                      </button>
                    </Link>
                    <Link to="/center/student/list">
                      <button className="w-full text-primary-100 hover:bg-primary-700/70 transition-colors duration-200 rounded-md p-2 text-sm flex items-center">
                        <UserCheck className="w-4 h-4 text-primary-300" />
                        <span className="ml-2">Danh sách học viên</span>
                      </button>
                    </Link>
                    <Link to="/center/attendance">
                      <button className="w-full text-primary-100 hover:bg-primary-700/70 transition-colors duration-200 rounded-md p-2 text-sm flex items-center">
                        <UserCheck className="w-4 h-4 text-primary-300" />
                        <span className="ml-2">Duyệt học viên</span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>              {/* Khóa học với submenu */}
              <div>
                <button
                  onClick={() => setOpenCourse((v) => !v)}
                  className="w-full text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg p-3 flex items-center"
                >
                  <Book className="w-5 h-5 text-primary-200" />
                  <span className="ml-3 flex-1 text-left">Khóa học</span>
                  <span className="text-primary-200 text-xs">
                    {openCourse ? "▲" : "▼"}
                  </span>
                </button>
                {openCourse && (
                  <div className="ml-8 mt-2 space-y-1 border-l-2 border-primary-600 pl-4">
                    <Link to="/center/course-management">
                      <button className="w-full text-primary-100 hover:bg-primary-700/70 transition-colors duration-200 rounded-md p-2 text-sm flex items-center">
                        <BookOpen className="w-4 h-4 text-primary-300" />
                        <span className="ml-2">Danh sách khóa học</span>
                      </button>
                    </Link>
                    <Link to="/center/create-course">
                      <button className="w-full text-primary-100 hover:bg-primary-700/70 transition-colors duration-200 rounded-md p-2 text-sm flex items-center">
                        <BookMarked className="w-4 h-4 text-primary-300" />
                        <span className="ml-2">Tạo khóa học mới</span>
                      </button>
                    </Link>
                  </div>                )}
              </div>

              {/* Quản lý lớp học */}
              <div>
                <Link to="/center/class-management">
                  <button className="w-full text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg p-3 flex items-center">
                    <GraduationCap className="w-5 h-5 text-primary-200" />
                    <span className="ml-3">Quản lý lớp học</span>
                  </button>
                </Link>
              </div>
            
              <div>
              <button
                onClick={() => setOpenEducation((v) => !v)}
                className="w-full text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg p-3 flex items-center"
              >
                <Users className="w-5 h-5 text-primary-200" />
                <span className="ml-3 flex-1 text-left">
                  Quản lý tài khoản
                </span>
                <span className="text-primary-200 text-xs">
                  {openEducation ? "▲" : "▼"}
                </span>
              </button>
              {openEducation && (
                <div className="ml-8 mt-2 space-y-1 border-l-2 border-primary-600 pl-4">
                  <Link to="/center/teacher-accounts">
                    <button className="w-full text-primary-100 hover:bg-primary-700/70 transition-colors duration-200 rounded-md p-2 text-sm flex items-center">
                      <UserCheck className="w-4 h-4 text-primary-300" />
                      <span className="ml-2">Giáo viên</span>
                    </button>
                  </Link>
                  <Link to="/center/student-accounts">
                    <button className="w-full text-primary-100 hover:bg-primary-700/70 transition-colors duration-200 rounded-md p-2 text-sm flex items-center">
                      <UserCheck className="w-4 h-4 text-primary-300" />
                      <span className="ml-2">Sinh viên</span>
                    </button>
                  </Link>
                </div>
              )}
            </div>
            <div>
                <button className="w-full text-white hover:bg-primary-700 transition-colors duration-200 rounded-lg p-3 flex items-center">
                  <Settings className="w-5 h-5 text-primary-200" />
                  <span className="ml-3">Cài đặt</span>
                </button>
              </div>
            </div>
          </div>

        <div className="border-t border-primary-700"></div>

        <div className="bg-primary-800 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 px-3 py-3 hover:bg-primary-700 rounded-lg transition-colors duration-200 group">
                <Avatar className="w-10 h-10 ring-2 ring-primary-600">
                  <AvatarImage src="/avatar.png" alt="Avatar" />
                  <AvatarFallback className="bg-primary-600 text-white font-semibold">
                    CM
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">Quản lý</div>
                  <div className="text-primary-200 text-xs">
                    Trung tâm học tập
                  </div>
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-white border border-gray-200 shadow-lg"
            >
              <DropdownMenuItem className="hover:bg-gray-50">
                <User className="w-4 h-4 mr-3 text-gray-500" />
                <span>Thông tin cá nhân</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-50">
                <Settings className="w-4 h-4 mr-3 text-gray-500" />
                <span>Cài đặt tài khoản</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />              <DropdownMenuItem
                className="text-red-600 hover:bg-red-50 focus:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>            
              </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
    </>
  );
}
