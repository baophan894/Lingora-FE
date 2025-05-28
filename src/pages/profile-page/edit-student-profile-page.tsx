import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Badge } from "../../components/ui/badge"
import { StudentInfoForm } from "../../components/profile/StudentInfoForm"
import { ChangePasswordForm } from "../../components/profile/ChangePasswordForm"
import { User, Lock, GraduationCap, Star, Calendar } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../../store/hooks"
import type { RootState } from "../../store/store"
import AvatarUploader, { type AvatarUploaderRef } from "../../components/upload/AvatarUploader"
import axiosPrivate from "../../utils/axios/axiosPrivate"
import { updateUser } from "../../features/authentication/authSlice"
import { CustomSuccessToast, CustomFailedToast, CustomToast } from "../../components/toast/notificiation-toast"

interface StudentData {
    id: string
    firstName: string
    lastName: string
    email: string
    phone: string
    address: string
    dateOfBirth: string
    gender: string
    avatar: string
    enrollmentDate: string
    level: string
    coursesCompleted: number
    totalHours: number
}

export default function StudentProfilePage() {
    const auth = useAppSelector((state: RootState) => state.auth);
    const currentUser = auth.user;
    const dispatch = useAppDispatch()
    const avatarUploaderRef = useRef<AvatarUploaderRef>(null)

    // Khởi tạo dữ liệu sinh viên từ currentUser
    const [studentData, setStudentData] = useState<StudentData>({
        id: currentUser?._id || "",
        firstName: currentUser?.fullName?.split(" ")[0] || "",
        lastName: currentUser?.fullName?.split(" ").slice(1).join(" ") || "",
        email: currentUser?.email || "",
        phone: currentUser?.phone_number || "",
        address: currentUser?.address || "",
        dateOfBirth: currentUser?.date_of_birth || "",
        gender: currentUser?.gender?.toLowerCase() || "",
        avatar: currentUser?.avatarUrl || "",
        enrollmentDate: new Date().toISOString(), // Mặc định ngày hiện tại
        level: "JLPT N4", // Mặc định hoặc lấy từ dữ liệu user nếu có
        coursesCompleted: 8, // Lấy từ dữ liệu thực tế nếu có
        totalHours: 240,
    })

    // Cập nhật studentData khi currentUser thay đổi
    useEffect(() => {
        if (currentUser) {
            setStudentData({
                id: currentUser._id || "",
                firstName: currentUser.fullName?.split(" ")[0] || "",
                lastName: currentUser.fullName?.split(" ").slice(1).join(" ") || "",
                email: currentUser.email || "",
                phone: currentUser.phone_number || "",
                address: currentUser.address || "",
                dateOfBirth: currentUser.date_of_birth || "",
                gender: currentUser.gender?.toLowerCase() || "",
                avatar: currentUser.avatarUrl || "",
                enrollmentDate: new Date().toISOString(),
                level: "JLPT N4",
                coursesCompleted: 8,
                totalHours: 240,
            })
        }
    }, [currentUser])

    const handleUpdateProfile = (updatedData: Partial<StudentData>) => {
        setStudentData((prev) => ({ ...prev, ...updatedData }))
    }

    // Hàm cập nhật hồ sơ người dùng qua API (bao gồm avatar)
    const updateUserProfile = async (profileData: Partial<StudentData>): Promise<boolean> => {
        try {
            // Tạo FormData cho multipart/form-data request
            const formData = new FormData()
            
            // Thêm dữ liệu người dùng vào FormData
            const userData = {
                fullName: `${profileData.firstName} ${profileData.lastName}`.trim(),
                email: profileData.email,
                phone_number: profileData.phone,
                address: profileData.address,
                date_of_birth: profileData.dateOfBirth,
                gender: profileData.gender ? profileData.gender.charAt(0).toUpperCase() + profileData.gender.slice(1) : undefined,
            }

            // Thêm từng trường vào FormData
            Object.entries(userData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    formData.append(key, value)
                }
            })

            // Thêm file avatar nếu có chọn mới
            if (avatarUploaderRef.current?.hasNewAvatar()) {
                const avatarFile = avatarUploaderRef.current.getSelectedFile()
                if (avatarFile) {
                    formData.append('avatar', avatarFile)
                }
            }
            
            // Gọi API cập nhật hồ sơ người dùng kèm avatar
            const response = await axiosPrivate.put(`/Users/${currentUser?._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.status === 200) {
                // Kiểm tra dữ liệu trả về
                const responseData = response.data.data || response.data

                // Cập nhật Redux store với dữ liệu mới
                if (currentUser) {
                    const updatedUser: typeof currentUser = {
                        ...currentUser,
                        fullName: userData.fullName,
                        email: userData.email || currentUser.email,
                        phone_number: userData.phone_number,
                        address: userData.address,
                        date_of_birth: userData.date_of_birth,
                        gender: userData.gender as 'Male' | 'Female' | 'Other' | undefined,
                        // Cập nhật avatar URL từ server trả về
                        avatarUrl: responseData.avatarUrl || currentUser.avatarUrl,
                    }
                    
                    dispatch(updateUser(updatedUser))
                    CustomSuccessToast("Cập nhật ảnh hồ sơ thành công!")

                    // Cập nhật localStorage
                    localStorage.setItem("user", JSON.stringify(updatedUser))
                }

                return true
            }
            return false
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ người dùng:", error)
            return false
        }
    }

    // Hàm xử lý lưu thay đổi hồ sơ (bao gồm avatar)
    const handleSaveChanges = async (formData: Partial<StudentData>): Promise<boolean> => {
        try {
            // Cập nhật dữ liệu hồ sơ và avatar trong một lần gọi API
            const updateSuccess = await updateUserProfile(formData)
            if (!updateSuccess) {
                CustomFailedToast("Cập nhật hồ sơ thất bại!")
                return false
            }

            // Cập nhật state local
            handleUpdateProfile(formData)
            
            // Xóa avatar đã chọn sau khi lưu thành công
            if (avatarUploaderRef.current?.hasNewAvatar()) {
                avatarUploaderRef.current.clearSelection()
            }
            
            CustomSuccessToast("Cập nhật hồ sơ thành công!")
            return true
        } catch (error) {
            console.error("Lỗi khi lưu thay đổi:", error)
            CustomFailedToast("Có lỗi xảy ra khi cập nhật hồ sơ!")
            return false
        }
    }

    return (
        <div className="min-h-screen bg-[#F6F6F8] relative overflow-hidden">
            <CustomToast/>
            {/* Các hiệu ứng nền động */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-50 rounded-full opacity-30 animate-bounce"></div>
            </div>

            {/* Header với chủ đề đỏ */}
            <div className="bg-red-800 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-800 via-red-700 to-red-900"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
                    <div className="absolute top-20 right-20 w-16 h-16 bg-white/5 rounded-full animate-float-delayed"></div>
                    <div className="absolute bottom-10 left-1/3 w-12 h-12 bg-white/10 rounded-full animate-pulse"></div>
                </div>

                <div className="container mx-auto px-4 py-12 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                        <div className="relative group">
                            <div className="transition-transform group-hover:scale-105">
                                <AvatarUploader 
                                    ref={avatarUploaderRef}
                                    size="lg" 
                                    className="border-4 border-white/30 shadow-2xl"
                                />
                            </div>

                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                            </div>
                        </div>

                        <div className="text-center lg:text-left flex-1">
                            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                                {currentUser?.fullName || "Tên người dùng"}
                            </h1>
                            <p className="text-red-100 mb-4 text-lg disabled:text-gray-500">{currentUser?.email}</p>

                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                                <Badge
                                    variant="secondary"
                                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                                >
                                    <GraduationCap className="w-4 h-4 mr-1" />
                                    {studentData.level}
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                                >
                                    <Star className="w-4 h-4 mr-1" />
                                    {studentData.coursesCompleted} Khóa học
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                                >
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {studentData.totalHours}h Tổng số giờ
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md lg:max-w-none">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-2xl font-bold">{studentData.coursesCompleted}</div>
                                    <div className="text-red-100 text-sm">Khóa học đã hoàn thành</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-2xl font-bold">{studentData.totalHours}</div>
                                    <div className="text-red-100 text-sm">Giờ học</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-2xl font-bold">A+</div>
                                    <div className="text-red-100 text-sm">Điểm trung bình</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Nội dung chính */}
            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <Tabs defaultValue="personal" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-xl border-0">
                            <TabsTrigger
                                value="personal"
                                className="flex items-center gap-2 data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 hover:bg-red-50"
                            >
                                <User className="" />
                                Thông tin cá nhân
                            </TabsTrigger>
                            <TabsTrigger
                                value="password"
                                className="flex items-center gap-2 data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 hover:bg-red-50"
                            >
                                <Lock className="w-5 h-5" />
                                Bảo mật & Đổi mật khẩu
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="personal" className="space-y-6">
                            <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                <CardHeader className=" border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-800 rounded-lg">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl ">Thông tin cá nhân</CardTitle>
                                            <CardDescription>Cập nhật thông tin cá nhân và hồ sơ của bạn</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <StudentInfoForm 
                                        studentData={studentData} 
                                        onUpdate={handleSaveChanges}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="password" className="space-y-6">
                            <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                <CardHeader className=" border-b border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-800 rounded-lg">
                                            <Lock className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-gray-800">Bảo mật & Đổi mật khẩu</CardTitle>
                                            <CardDescription>Cập nhật mật khẩu và các tùy chọn bảo mật</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <ChangePasswordForm />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>

            <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
        </div>
    )
}
