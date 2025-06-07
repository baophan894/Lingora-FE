"use client"

import { useEffect, useState } from "react"
import type { Course } from "@/types/course-type"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { CourseTopicManager } from "@/components/course-management/course-topic-manager"
import { CourseAudioUploader } from "@/components/course-management/course-audio-uploader"
import { ArrowLeft, Edit, Save, X, Calendar, User, Clock, Users, DollarSign, Volume2, BookOpen, Globe, GraduationCap, Award, TrendingUp, Eye, Settings, FileText } from 'lucide-react'
import { CourseService } from "../../services/courseService"
import CourseLoadingPage from "../../utils/loading-page/course-loading"
import { languageColors } from "../../utils/constant-value/constant"

// Mock course data for demonstration
interface CourseDetailPageProps {
    courseId?: string
    onBack: () => void
    onEdit: (course: Course) => void
}

export function CourseDetailPage({ courseId, onBack, onEdit }: CourseDetailPageProps) {
    const [isEditingStatus, setIsEditingStatus] = useState(false)
    const [isEditingTopics, setIsEditingTopics] = useState(false)
    const [isEditingAudio, setIsEditingAudio] = useState(false)
    const [activeTab, setActiveTab] = useState("overview")
    const [course, setCourse] = useState<Course | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (courseId) {
            const fetchCourse = async () => {
                try {
                    const response = await CourseService.getCourseById(courseId)
                    setCourse(response.data)
                    setIsLoading(false)
                } catch (error) {
                    console.error("Failed to fetch course:", error)
                    alert("Failed to load course data")
                    onBack()
                }
            }
            fetchCourse()
        }
    }, [courseId, onBack])

    if (!course) return <CourseLoadingPage />

    const handleUpdate = (updates: Partial<Course>) => {
        setCourse((prev) => ({
            ...prev,
            ...updates,
            updatedAt: new Date().toISOString(),
        }))
        console.log("Updating course:", updates)
    }

    const handleEdit = () => {
        onEdit(course)
    }

    const handleStatusToggle = (isActive: boolean) => {
        handleUpdate({ isActive })
        setIsEditingStatus(false)
    }

    const handleTopicsUpdate = (topics: string[]) => {
        handleUpdate({ topics })
        setIsEditingTopics(false)
    }

    const handleAudioUpdate = (audioPracticeUrl: string) => {
        handleUpdate({ audioPracticeUrl })
        setIsEditingAudio(false)
    }

    // Language-specific colors

    const bgGradient = languageColors[course.language as keyof typeof languageColors] || "from-gray-500 to-gray-600"

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Header */}
            <section className={`relative bg-gradient-to-r ${bgGradient} text-white overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
                        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-12 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20 rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Courses
                        </Button>
                        <div className="h-6 w-px bg-white/30"></div>
                        <div className="flex items-center gap-2 text-white/80">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm">Course Management</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-full px-3 py-1">
                                    {course.code}
                                </Badge>
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-full px-3 py-1">
                                    {course.level}
                                </Badge>
                                <Badge
                                    className={`${course.isActive ? 'bg-green-500/20 text-green-100' : 'bg-gray-500/20 text-gray-200'} rounded-full px-3 py-1`}
                                >
                                    {course.isActive ? 'Active' : 'Inactive'}
                                </Badge>
                            </div>

                            <h1 className="text-4xl font-bold mb-4">{course.name}</h1>
                            <p className="text-xl text-white/80 mb-6 leading-relaxed max-w-3xl">{course.description}</p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Clock className="w-5 h-5" />
                                        <span className="text-sm font-medium">Duration</span>
                                    </div>
                                    <div className="text-2xl font-bold">{course.durationWeeks}</div>
                                    <div className="text-xs text-white/70">weeks</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <Users className="w-5 h-5" />
                                        <span className="text-sm font-medium">Capacity</span>
                                    </div>
                                    <div className="text-2xl font-bold">{course.totalSlots}</div>
                                    <div className="text-xs text-white/70">students</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <DollarSign className="w-5 h-5" />
                                        <span className="text-sm font-medium">Full Fee</span>
                                    </div>
                                    <div className="text-2xl font-bold">${course.feeFull}</div>
                                    <div className="text-xs text-white/70">total</div>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <BookOpen className="w-5 h-5" />
                                        <span className="text-sm font-medium">Topics</span>
                                    </div>
                                    <div className="text-2xl font-bold">{course.topics.length}</div>
                                    <div className="text-xs text-white/70">modules</div>
                                </div>
                            </div>
                        </div>

                        {/* Action Panel */}
                        <div className="lg:w-80">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                                <h3 className="text-lg font-bold mb-4">Quick Actions</h3>

                                <div className="space-y-3">
                                    <Button
                                        onClick={handleEdit}
                                        className="w-full bg-white text-[#BF0008] hover:bg-[#F6F6F8] rounded-xl font-medium"
                                    >
                                        <Edit className="w-4 h-4 mr-2" />
                                        Edit Course
                                    </Button>

                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <h4 className="text-sm font-medium mb-3">Course Metadata</h4>
                                    <div className="space-y-2 text-sm text-white/80">
                                        <div className="flex justify-between">
                                            <span>Created:</span>
                                            <span>{new Date(course.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Updated:</span>
                                            <span>{new Date(course.updatedAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Created by:</span>
                                            <span>{course.createdBy}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Tabs */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-4 mb-8 bg-white/70 backdrop-blur-xl rounded-2xl p-2 w-full max-w-2xl mx-auto border border-white/20 shadow-lg">
                            <TabsTrigger
                                value="overview"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="content"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Content
                            </TabsTrigger>
                            <TabsTrigger
                                value="settings"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </TabsTrigger>
                            <TabsTrigger
                                value="analytics"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <TrendingUp className="w-4 h-4 mr-2" />
                                Analytics
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="overview" className="space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {/* Main Content */}
                                <div className="lg:col-span-2 space-y-8">
                                    {/* Course Information */}
                                    <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                            <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                                <BookOpen className="w-5 h-5" />
                                                Course Information
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-500">Language & Level</p>
                                                    <div className="flex gap-2">
                                                        <Badge variant="outline" className={`bg-gradient-to-r ${bgGradient} text-white border-0`}>
                                                            {course.language}
                                                        </Badge>
                                                        <Badge variant="outline" className="border-gray-300">
                                                            Level {course.level}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-500">Duration & Capacity</p>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="w-4 h-4 text-gray-400" />
                                                            <span className="font-medium">{course.durationWeeks} weeks</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Users className="w-4 h-4 text-gray-400" />
                                                            <span className="font-medium">{course.totalSlots} slots</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-500">Pricing</p>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <div className="flex items-center gap-1">
                                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                                            <span className="font-medium">${course.feeFull} full</span>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <DollarSign className="w-4 h-4 text-gray-400" />
                                                            <span className="font-medium">${course.feeInstallment} monthly</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-1">
                                                    <p className="text-sm font-medium text-gray-500">Created By</p>
                                                    <div className="flex items-center gap-1">
                                                        <User className="w-4 h-4 text-gray-400" />
                                                        <span className="font-medium">{course.createdBy}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    {/* Topics */}
                                    <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                                    <BookOpen className="w-5 h-5" />
                                                    Course Topics
                                                </CardTitle>
                                                {/* {!isEditingTopics && (
                                                    <Button variant="outline" size="sm" onClick={() => setIsEditingTopics(true)}>
                                                        <Edit className="w-4 h-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                )} */}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            {isEditingTopics ? (
                                                <div className="space-y-4">
                                                    <CourseTopicManager topics={course.topics} onTopicsChange={handleTopicsUpdate} />
                                                    <div className="flex gap-2">
                                                        <Button
                                                            size="sm"
                                                            onClick={() => setIsEditingTopics(false)}
                                                            className="bg-[#BF0008] hover:bg-[#9f0007] text-white"
                                                        >
                                                            <Save className="w-4 h-4 mr-1" />
                                                            Save
                                                        </Button>
                                                        <Button variant="outline" size="sm" onClick={() => setIsEditingTopics(false)}>
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>
                                                    {course.topics.length > 0 ? (
                                                        <div className="flex flex-wrap gap-2">
                                                            {course.topics.map((topic, index) => (
                                                                <Badge key={index} variant="secondary" className="bg-[#F6F6F8] text-gray-700 rounded-full">
                                                                    {topic}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-500 italic">No topics added yet</p>
                                                    )}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </div>

                                {/* Sidebar */}
                                <div className="space-y-8">
                                    {/* Status Management */}
                                    <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                            <div className="flex justify-between items-center">
                                                <CardTitle className="text-[#BF0008]">Course Status</CardTitle>
                                                {/* {!isEditingStatus && (
                                                    <Button variant="outline" size="sm" onClick={() => setIsEditingStatus(true)}>
                                                        <Edit className="w-4 h-4 mr-1" />
                                                        Edit
                                                    </Button>
                                                )} */}
                                            </div>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            {isEditingStatus ? (
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center space-x-3">
                                                        <Switch checked={course.isActive} onCheckedChange={handleStatusToggle} />
                                                        <span className="font-medium">{course.isActive ? "Active" : "Inactive"}</span>
                                                    </div>
                                                    <Button variant="ghost" size="sm" onClick={() => setIsEditingStatus(false)}>
                                                        <X className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        variant={course.isActive ? "default" : "secondary"}
                                                        className={course.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                                                    >
                                                        {course.isActive ? "Active" : "Inactive"}
                                                    </Badge>
                                                    <span className="text-sm text-gray-600">
                                                        Course is currently{" "}
                                                        {course.isActive ? "active and available for enrollment" : "inactive and not available for enrollment"}
                                                    </span>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>

                                    {/* Course Metadata */}
                                    <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                        <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                            <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                                <Calendar className="w-5 h-5" />
                                                Course Metadata
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-6">
                                            <div className="space-y-4 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-500">Course ID</span>
                                                    <span className="text-gray-900 font-mono">{course.id}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-500">Created</span>
                                                    <span className="text-gray-900">{new Date(course.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-500">Last Updated</span>
                                                    <span className="text-gray-900">{new Date(course.updatedAt).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="font-medium text-gray-500">Created By</span>
                                                    <span className="text-gray-900">{course.createdBy}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent value="content" className="space-y-8">
                            {/* Audio Practice */}
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <div className="flex justify-between items-center">
                                        <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                            <Volume2 className="w-5 h-5" />
                                            Audio Practice Materials
                                        </CardTitle>
                                        {/* {!isEditingAudio && (
                                            <Button variant="outline" size="sm" onClick={() => setIsEditingAudio(true)}>
                                                <Edit className="w-4 h-4 mr-1" />
                                                Edit
                                            </Button>
                                        )} */}
                                    </div>
                                </CardHeader>
                                <CardContent className="p-6">
                                    {isEditingAudio ? (
                                        <div className="space-y-4">
                                            <CourseAudioUploader audioPracticeUrl={course.audioPracticeUrl} onAudioUrlChange={handleAudioUpdate} />
                                            <div className="flex gap-2">
                                                <Button
                                                    size="sm"
                                                    onClick={() => setIsEditingAudio(false)}
                                                    className="bg-[#BF0008] hover:bg-[#9f0007] text-white"
                                                >
                                                    <Save className="w-4 h-4 mr-1" />
                                                    Save
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => setIsEditingAudio(false)}>
                                                    Cancel
                                                </Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            {course.audioPracticeUrl ? (
                                                <div className="space-y-3">
                                                    <p className="text-sm text-gray-600 break-all">{course.audioPracticeUrl}</p>
                                                    {course.audioPracticeUrl.startsWith("http") && (
                                                        <audio controls className="w-full max-w-md">
                                                            <source src={course.audioPracticeUrl} />
                                                            Your browser does not support the audio element.
                                                        </audio>
                                                    )}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 italic">No audio practice file added</p>
                                            )}
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="settings" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <Settings className="w-5 h-5" />
                                        Course Settings
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between p-4 bg-[#F6F6F8] rounded-xl">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Course Visibility</h4>
                                                <p className="text-sm text-gray-600">Control whether this course is visible to students</p>
                                            </div>
                                            <Switch checked={course.isActive} onCheckedChange={(checked) => handleUpdate({ isActive: checked })} />
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#F6F6F8] rounded-xl">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Allow Enrollment</h4>
                                                <p className="text-sm text-gray-600">Enable or disable new student enrollments</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>

                                        <div className="flex items-center justify-between p-4 bg-[#F6F6F8] rounded-xl">
                                            <div>
                                                <h4 className="font-medium text-gray-900">Email Notifications</h4>
                                                <p className="text-sm text-gray-600">Send notifications for course updates</p>
                                            </div>
                                            <Switch defaultChecked />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="analytics" className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                    <CardContent className="p-6 text-center">
                                        <div className="text-3xl font-bold text-[#BF0008] mb-2">24</div>
                                        <div className="text-sm text-gray-600">Enrolled Students</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                    <CardContent className="p-6 text-center">
                                        <div className="text-3xl font-bold text-[#BF0008] mb-2">4.8</div>
                                        <div className="text-sm text-gray-600">Average Rating</div>
                                    </CardContent>
                                </Card>

                                <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                    <CardContent className="p-6 text-center">
                                        <div className="text-3xl font-bold text-[#BF0008] mb-2">89%</div>
                                        <div className="text-sm text-gray-600">Completion Rate</div>
                                    </CardContent>
                                </Card>
                            </div>

                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <TrendingUp className="w-5 h-5" />
                                        Enrollment Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6">
                                    <div className="h-64 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl flex items-center justify-center">
                                        <p className="text-gray-500">Analytics chart would go here</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </div>
    )
}
