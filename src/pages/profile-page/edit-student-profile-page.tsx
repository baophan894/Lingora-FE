import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StudentInfoForm } from "@/components/profile/StudentInfoForm"
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm"
import { User, Lock, GraduationCap } from "lucide-react"
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
    })

    const auth = useAppSelector((state: RootState) => state.auth);
    const currentUser = auth.user;

    const handleUpdateProfile = (updatedData: Partial<StudentData>) => {
        setStudentData((prev) => ({ ...prev, ...updatedData }))
    }

    return (
        <div className="min-h-screen bg-[#F6F6F8]">
            {/* Header Section with Gradient */}
            <div className="bg-red-800 text-white">
                <div className="container mx-auto px-4 py-8">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <Avatar className="h-24 w-24 border-4 border-white/20">
                            <AvatarImage src={studentData.avatar || "/placeholder.svg"} alt={currentUser?.fullName} />
                            <AvatarFallback className="text-2xl bg-white/10 text-white">
                                {currentUser?.fullName
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>

                        <div className="text-center md:text-left">
                            <h1 className="text-3xl font-bold mb-2">{currentUser?.fullName}</h1>
                            <p className="text-white/80 mb-3">{currentUser?.email}</p>
                            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                    <GraduationCap className="w-4 h-4 mr-1" />
                                    {studentData.level}
                                </Badge>
                                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                                    Student ID: {studentData.id}
                                </Badge>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    <Tabs defaultValue="personal" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2 bg-white shadow-sm">
                            <TabsTrigger
                                value="personal"
                                className="flex items-center gap-2 data-[state=active]:bg-red-800 data-[state=active]:text-white"
                            >
                                <User className="w-4 h-4" />
                                Personal Information
                            </TabsTrigger>
                            <TabsTrigger
                                value="password"
                                className="flex items-center gap-2 data-[state=active]:bg-red-800 data-[state=active]:text-white"
                            >
                                <Lock className="w-4 h-4" />
                                Change Password
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="personal" className="space-y-6">
                            <Card className="shadow-sm border-0">
                                <CardHeader className="bg-red-800/5">
                                    <CardTitle className="text-xl text-gray-800">Personal Information</CardTitle>
                                    <CardDescription>Update your personal details and profile information</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <StudentInfoForm studentData={studentData} onUpdate={handleUpdateProfile} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="password" className="space-y-6">
                            <Card className="shadow-sm border-0">
                                <CardHeader className="bg-red-800/5">
                                    <CardTitle className="text-xl text-gray-800">Change Password</CardTitle>
                                    <CardDescription>Update your password to keep your account secure</CardDescription>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <ChangePasswordForm />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
