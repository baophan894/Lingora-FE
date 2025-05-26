import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StudentInfoForm } from "@/components/profile/StudentInfoForm"
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm"
import { User, Lock, GraduationCap, Star, Calendar } from "lucide-react"
import { useAppSelector } from "../../store/hooks"
import type { RootState } from "../../store/store"

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
    const [studentData, setStudentData] = useState<StudentData>({
        id: "STU001",
        firstName: "John",
        lastName: "Doe",
        email: "emma.johnson@email.com",
        phone: "+1 (555) 123-4567",
        address: "123 Main Street, New York, NY 10001",
        dateOfBirth: "1995-06-15",
        gender: "female",
        avatar: "/placeholder.svg?height=120&width=120",
        enrollmentDate: "2023-09-01",
        level: "JLPT N4",
        coursesCompleted: 8,
        totalHours: 240,

    })

    const auth = useAppSelector((state: RootState) => state.auth);
    const currentUser = auth.user;

    const handleUpdateProfile = (updatedData: Partial<StudentData>) => {
        setStudentData((prev) => ({ ...prev, ...updatedData }))
    }

    return (
        <div className="min-h-screen bg-[#F6F6F8] relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-red-50 rounded-full opacity-30 animate-bounce"></div>
            </div>

            {/* Header Section with Red Theme */}
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
                            <Avatar className="h-32 w-32 border-4 border-white/30 shadow-2xl transition-transform group-hover:scale-105">
                                <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={currentUser?.fullName} />
                                <AvatarFallback className="text-3xl bg-white/20 text-white backdrop-blur-sm">
                                    {currentUser?.fullName
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")}
                                </AvatarFallback>
                            </Avatar>

                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center">
                                <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
                            </div>
                        </div>

                        <div className="text-center lg:text-left flex-1">
                            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                                {currentUser?.fullName}
                            </h1>
                            <p className="text-red-100 mb-4 text-lg">{studentData.email}</p>

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
                                    {studentData.coursesCompleted} Courses
                                </Badge>
                                <Badge
                                    variant="secondary"
                                    className="bg-white/20 text-white border-white/30 hover:bg-white/30 transition-colors"
                                >
                                    <Calendar className="w-4 h-4 mr-1" />
                                    {studentData.totalHours}h Total
                                </Badge>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md lg:max-w-none">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-2xl font-bold">{studentData.coursesCompleted}</div>
                                    <div className="text-red-100 text-sm">Courses Completed</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-2xl font-bold">{studentData.totalHours}</div>
                                    <div className="text-red-100 text-sm">Study Hours</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/20 transition-colors">
                                    <div className="text-2xl font-bold">A+</div>
                                    <div className="text-red-100 text-sm">Average Grade</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}

            <div className="container mx-auto px-4 py-8 relative z-10">
                <div className="max-w-5xl mx-auto">
                    <Tabs defaultValue="personal" className="space-y-8">
                        <TabsList className="grid w-full grid-cols-2 bg-white shadow-lg rounded-xl border-0">
                            <TabsTrigger
                                value="personal"
                                className="flex items-center gap-2 data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 hover:bg-red-50"
                            >
                                <User className="w-5 h-5" />
                                Personal Information
                            </TabsTrigger>
                            <TabsTrigger
                                value="password"
                                className="flex items-center gap-2 data-[state=active]:bg-red-800 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg transition-all duration-300 hover:bg-red-50"
                            >
                                <Lock className="w-5 h-5" />
                                Security Settings
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="personal" className="space-y-6">
                            <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                <CardHeader className="bg-red-800/5 border-b border-red-100 ">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-800 rounded-lg">
                                            <User className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-gray-800">Personal Information</CardTitle>
                                            <CardDescription>Update your personal details and profile information</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <StudentInfoForm studentData={studentData} onUpdate={handleUpdateProfile} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="password" className="space-y-6">
                            <Card className="shadow-xl border-0 overflow-hidden hover:shadow-2xl transition-shadow duration-300">
                                <CardHeader className="bg-red-800/5 border-b border-red-100">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-800 rounded-lg">
                                            <Lock className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl text-gray-800">Security Settings</CardTitle>
                                            <CardDescription>Update your password and security preferences</CardDescription>
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
