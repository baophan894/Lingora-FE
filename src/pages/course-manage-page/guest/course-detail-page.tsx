"use client"

import { useEffect, useState } from "react"
import type { Course } from "../../../types/course-type"
import { Button } from "../../../components/ui/button"
import { Badge } from "../../../components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import {
    ArrowLeft,
    Clock,
    Users,
    CheckCircle,
    Calendar,
    Star,
    Volume2,
    GraduationCap,
    Globe,
    FileText,
    Play,
    Award,
    User,
} from "lucide-react"
import { CourseService } from "../../../services/courseService"
import CourseLoadingPage from "../../../utils/loading-page/course-loading"
import { languageColors } from "../../../utils/constant-value/constant"
interface GuestCourseDetailPageProps {
    courseId: string;
    onBack: () => void;
    onViewCourse: (course: Course) => void;
}

export function GuestCourseDetailPage({ courseId, onBack, onViewCourse, }: GuestCourseDetailPageProps) {
    const [course, setCourse] = useState<Course | null>(null)
    const [activeTab, setActiveTab] = useState("overview")
    const [courses, setCourses] = useState<Course[]>([])

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await CourseService.getActiveCourses()
                setCourses(response.data)
                console.log("Courses fetched:", response.data)
            } catch (error) {
                console.error("Failed to fetch courses:", error)
            }
        }
        fetchCourses()
    }, [])

    useEffect(() => {
        if (courseId) {
            const fetchCourse = async () => {
                try {
                    const response = await CourseService.getActiveCourseById(courseId)
                    setCourse(response.data)
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

    // Generate random rating between 4.5 and 5.0
    const rating = (4.5 + Math.random() * 0.5).toFixed(1)

    // Generate random enrollment count
    const enrolledCount = Math.floor(Math.random() * 50) + 10

    // Generate random instructor
    const instructors = [
        { name: "Dr. Sarah Johnson", title: "Senior Language Instructor", avatar: "/placeholder.svg?height=100&width=100" },
        { name: "Prof. Michael Chen", title: "Language Department Head", avatar: "/placeholder.svg?height=100&width=100" },
        { name: "Maria Rodriguez", title: "Native Speaker & Instructor", avatar: "/placeholder.svg?height=100&width=100" },
    ]

    const instructor = instructors[Math.floor(Math.random() * instructors.length)]

    const relatedCourses = courses
        .filter((c) => {
            const isDifferentCourse = c._id !== course._id;
            const isActive = c.isActive;
            const sameLanguage = c.language === course.language;
            const hasCommonTopic = c.topics.some((topic) => course.topics.includes(topic));
            return isDifferentCourse && isActive && sameLanguage && hasCommonTopic;
        })
        .slice(0, 3);

    const fallbackCourses = relatedCourses.length < 3
        ? courses
            .filter((c) => {
                const isDifferentCourse = c._id !== course._id;
                const isActive = c.isActive;
                const sameLanguage = c.language === course.language;
                return isDifferentCourse && isActive && sameLanguage;
            })
            .slice(0, 3 - relatedCourses.length)
        : [];

    const finalCourses = [...relatedCourses, ...fallbackCourses].slice(0, 3);


    const bgGradient = languageColors[course?.language as keyof typeof languageColors] || "from-gray-500 to-gray-600";
    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
                <div className="text-center p-8 bg-white/80 rounded-2xl shadow-lg">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-lg font-medium text-gray-700">Loading course details...</p>
                    <Button onClick={onBack} className="mt-4">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <section className={`relative bg-gradient-to-r ${bgGradient} text-white`}>
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute top-0 right-1/3 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    <Button variant="ghost" onClick={onBack} className="mb-8 text-white hover:bg-white/20 rounded-full">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Courses
                    </Button>

                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-2/3">
                            <div className="flex items-center gap-3 mb-4">
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-full px-3 py-1">{course.code}</Badge>
                                <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-full px-3 py-1">
                                    {course.level}
                                </Badge>
                            </div>

                            <h1 className="text-4xl font-bold mb-6">{course.name}</h1>

                            <p className="text-xl text-white/80 mb-8 leading-relaxed">{course.description}</p>

                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white/70">Duration</div>
                                        <div className="font-bold">{course.durationWeeks} weeks</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white/70">Enrolled</div>
                                        <div className="font-bold">{enrolledCount} students</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Star className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white/70">Rating</div>
                                        <div className="font-bold">{rating}/5.0</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-white/70">Language</div>
                                        <div className="font-bold">{course.language}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Button size="lg" className="bg-white text-[#BF0008] hover:bg-[#F6F6F8] rounded-full px-8 font-medium">
                                    Enroll Now
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-white text-white hover:bg-white/20 rounded-full px-8 font-medium"
                                >
                                    Download Syllabus
                                </Button>
                            </div>
                        </div>

                        <div className="md:w-1/3">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                                <div className="text-2xl font-bold mb-2">${course.feeFull}</div>
                                <div className="text-white/70 mb-6">Full course fee</div>

                                {course.feeInstallment < course.feeFull && (
                                    <div className="mb-6">
                                        <div className="text-lg font-bold">${course.feeInstallment}/month</div>
                                        <div className="text-white/70">Installment option available</div>
                                    </div>
                                )}

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-300" />
                                        <span>Full course materials</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-300" />
                                        <span>Certificate of completion</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-300" />
                                        <span>24/7 support</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <CheckCircle className="w-5 h-5 text-green-300" />
                                        <span>Access to community</span>
                                    </div>
                                </div>

                                <Button className="w-full bg-gradient-to-r from-[#BF0008] to-[#d4001a] hover:from-[#9f0007] hover:to-[#BF0008] text-white rounded-xl font-medium">
                                    Enroll Now
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Content Tabs */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-4 mb-8 bg-white/50 backdrop-blur-sm rounded-full p-1 w-full max-w-2xl mx-auto">
                            <TabsTrigger
                                value="overview"
                                className="rounded-full data-[state=active]:bg-[#BF0008] data-[state=active]:text-white"
                            >
                                Overview
                            </TabsTrigger>
                            <TabsTrigger
                                value="curriculum"
                                className="rounded-full data-[state=active]:bg-[#BF0008] data-[state=active]:text-white"
                            >
                                Curriculum
                            </TabsTrigger>
                            <TabsTrigger
                                value="instructor"
                                className="rounded-full data-[state=active]:bg-[#BF0008] data-[state=active]:text-white"
                            >
                                Instructor
                            </TabsTrigger>
                            <TabsTrigger
                                value="reviews"
                                className="rounded-full data-[state=active]:bg-[#BF0008] data-[state=active]:text-white"
                            >
                                Reviews
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent
                            value="overview"
                            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="md:col-span-2 space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Course Description</h3>
                                        <p className="text-gray-700 leading-relaxed mb-4">{course.description}</p>
                                        <p className="text-gray-700 leading-relaxed">
                                            This comprehensive course is designed to help students master the fundamentals of{" "}
                                            {course.language}
                                            at a {course.level.toLowerCase()} level. Through interactive lessons, practical exercises, and
                                            immersive activities, you'll develop the skills needed to communicate effectively in real-world
                                            situations.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            {course.topics.map((topic, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                    <span className="text-gray-700">{topic}</span>
                                                </div>
                                            ))}

                                            {/* Add some extra learning outcomes if topics are few */}
                                            {course.topics.length < 6 && (
                                                <>
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                        <span className="text-gray-700">Cultural context and nuances</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                        <span className="text-gray-700">Practical conversation skills</span>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                                        <span className="text-gray-700">Reading and writing proficiency</span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {course.audioPracticeUrl && (
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Audio Sample</h3>
                                            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                                                        <Volume2 className="w-5 h-5 text-white" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-blue-900">Audio Practice Sample</div>
                                                        <div className="text-sm text-blue-700">Listen to a sample of our audio materials</div>
                                                    </div>
                                                </div>

                                                <audio controls className="w-full">
                                                    <source src={course.audioPracticeUrl} />
                                                    Your browser does not support the audio element.
                                                </audio>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
                                        <CardHeader>
                                            <CardTitle className="text-xl">Course Details</CardTitle>
                                        </CardHeader>
                                        <CardContent className="space-y-4">
                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Calendar className="w-4 h-4 text-[#BF0008]" />
                                                    <span>Start Date</span>
                                                </div>
                                                <div className="font-medium">Flexible</div>
                                            </div>

                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Clock className="w-4 h-4 text-[#BF0008]" />
                                                    <span>Duration</span>
                                                </div>
                                                <div className="font-medium">{course.durationWeeks} weeks</div>
                                            </div>

                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Users className="w-4 h-4 text-[#BF0008]" />
                                                    <span>Class Size</span>
                                                </div>
                                                <div className="font-medium">Max {course.totalSlots} students</div>
                                            </div>

                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <GraduationCap className="w-4 h-4 text-[#BF0008]" />
                                                    <span>Level</span>
                                                </div>
                                                <div className="font-medium">{course.level}</div>
                                            </div>

                                            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Globe className="w-4 h-4 text-[#BF0008]" />
                                                    <span>Language</span>
                                                </div>
                                                <div className="font-medium">{course.language}</div>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-gray-700">
                                                    <Award className="w-4 h-4 text-[#BF0008]" />
                                                    <span>Certificate</span>
                                                </div>
                                                <div className="font-medium">Yes</div>
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <div className="mt-6">
                                        <Button className="w-full bg-[#BF0008] hover:bg-[#9f0007] text-white rounded-xl">
                                            Request More Information
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="curriculum"
                            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Curriculum</h3>

                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((module) => (
                                    <div key={module} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                                        <div className="bg-[#F6F6F8] p-4 border-b border-gray-200">
                                            <h4 className="text-lg font-bold text-[#BF0008]">
                                                Module {module}: {course.topics[module - 1] || `${course.language} Fundamentals ${module}`}
                                            </h4>
                                        </div>

                                        <div className="p-4 space-y-3">
                                            {[1, 2, 3].map((lesson) => (
                                                <div
                                                    key={lesson}
                                                    className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {Math.random() > 0.5 ? (
                                                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                                                <Play className="w-4 h-4 text-blue-600" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                                <FileText className="w-4 h-4 text-green-600" />
                                                            </div>
                                                        )}
                                                        <span className="text-gray-700">
                                                            Lesson {lesson}:{" "}
                                                            {course.topics[(module - 1) * 3 + lesson - 1] ||
                                                                `${course.language} Topic ${(module - 1) * 3 + lesson}`}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-500">{Math.floor(Math.random() * 30) + 15} min</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="instructor"
                            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl"
                        >
                            <h3 className="text-2xl font-bold text-gray-900 mb-6">Meet Your Instructor</h3>

                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="md:w-1/3">
                                    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                                        <img
                                            src={instructor.avatar || "/placeholder.svg"}
                                            alt={instructor.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                <div className="md:w-2/3">
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{instructor.name}</h4>
                                    <div className="text-[#BF0008] font-medium mb-4">{instructor.title}</div>

                                    <p className="text-gray-700 mb-6 leading-relaxed">
                                        With over 10 years of experience teaching {course.language}, {instructor.name.split(" ")[0]} brings
                                        a wealth of knowledge and a passion for language education. Having lived and worked in
                                        {course.language === "English"
                                            ? " the United Kingdom and United States"
                                            : course.language === "Spanish"
                                                ? " Spain and Mexico"
                                                : course.language === "French"
                                                    ? " France and Canada"
                                                    : course.language === "German"
                                                        ? " Germany and Austria"
                                                        : course.language === "Chinese"
                                                            ? " China and Taiwan"
                                                            : course.language === "Italian"
                                                                ? " Italy"
                                                                : course.language === "Portuguese"
                                                                    ? " Portugal and Brazil"
                                                                    : course.language === "Japanese"
                                                                        ? " Japan"
                                                                        : " various countries"}
                                        ,{instructor.name.split(" ")[0]} offers authentic cultural insights alongside language instruction.
                                    </p>

                                    <div className="flex gap-4">
                                        <div>
                                            <div className="text-2xl font-bold text-[#BF0008]">200+</div>
                                            <div className="text-sm text-gray-600">Students Taught</div>
                                        </div>

                                        <div>
                                            <div className="text-2xl font-bold text-[#BF0008]">15+</div>
                                            <div className="text-sm text-gray-600">Courses Created</div>
                                        </div>

                                        <div>
                                            <div className="text-2xl font-bold text-[#BF0008]">4.9</div>
                                            <div className="text-sm text-gray-600">Instructor Rating</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabsContent>

                        <TabsContent
                            value="reviews"
                            className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="md:w-1/3">
                                    <div className="bg-white rounded-2xl p-6 border border-gray-200 text-center">
                                        <div className="text-5xl font-bold text-[#BF0008] mb-2">{rating}</div>
                                        <div className="flex justify-center gap-1 mb-4">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <Star
                                                    key={star}
                                                    className={`w-5 h-5 ${star <= Math.floor(Number.parseFloat(rating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="text-gray-700 mb-6">Based on {Math.floor(Math.random() * 50) + 20} reviews</div>

                                        <div className="space-y-2">
                                            {[5, 4, 3, 2, 1].map((stars) => (
                                                <div key={stars} className="flex items-center gap-2">
                                                    <div className="text-sm text-gray-700 w-2">{stars}</div>
                                                    <div className="flex-shrink-0">
                                                        <Star className="w-4 h-4 text-yellow-400" />
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-yellow-400 h-2 rounded-full"
                                                            style={{
                                                                width: `${stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : stars === 2 ? 2 : 1
                                                                    }%`,
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-sm text-gray-500 w-8">
                                                        {stars === 5 ? "70%" : stars === 4 ? "20%" : stars === 3 ? "7%" : stars === 2 ? "2%" : "1%"}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="md:w-2/3 space-y-6">
                                    {[1, 2, 3].map((review) => (
                                        <div key={review} className="bg-white rounded-2xl p-6 border border-gray-200">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <User className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">Student {review}</div>
                                                        <div className="text-sm text-gray-500">{Math.floor(Math.random() * 3) + 1} months ago</div>
                                                    </div>
                                                </div>

                                                <div className="flex gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-4 h-4 ${star <= 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>

                                            <p className="text-gray-700">
                                                {review === 1
                                                    ? `This ${course.level.toLowerCase()} ${course.language} course exceeded my expectations. The instructor was knowledgeable and engaging, and the course materials were comprehensive. I feel much more confident in my language skills now.`
                                                    : review === 2
                                                        ? `I've tried several language courses before, but this one stands out. The curriculum is well-structured, and the interactive elements really help with retention. Highly recommended for anyone serious about learning ${course.language}.`
                                                        : `Great course for ${course.level.toLowerCase()} learners! The pace was perfect, and I appreciated the cultural context provided alongside the language instruction. The audio practice materials were especially helpful for improving my pronunciation.`}
                                            </p>
                                        </div>
                                    ))}

                                    <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                                        Load More Reviews
                                    </Button>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </section>

            {/* Related Courses */}
            <section className="py-16 bg-white/50">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-[#BF0008] mb-12 text-center">Related Courses</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {finalCourses
                            .map((relatedCourse) => {

                                const cardGradient = languageColors[relatedCourse.language as keyof typeof languageColors] || "from-gray-500 to-gray-600"

                                return (
                                    <div key={relatedCourse.id} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <Card className="h-full bg-white/90 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
                                            {/* Language Header */}
                                            <div className={`h-2 bg-gradient-to-r ${cardGradient}`}></div>

                                            <CardHeader className="pb-2">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${cardGradient}`}></div>
                                                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                        {relatedCourse.code}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-bold text-gray-900">{relatedCourse.name}</h3>
                                            </CardHeader>

                                            <CardContent className="pb-6">
                                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">{relatedCourse.description}</p>

                                                <div className="flex justify-between items-center">
                                                    <Badge variant="outline" className={`bg-gradient-to-r ${cardGradient} text-white border-0 rounded-full`}>
                                                        {relatedCourse.language}
                                                    </Badge>

                                                    <div className="text-lg font-bold text-gray-900">${relatedCourse.feeFull}</div>
                                                </div>
                                            </CardContent>

                                            <Button
                                                variant="outline"
                                                className={`w-full border-0 bg-gradient-to-r ${cardGradient} text-white hover:opacity-90`}
                                                onClick={() => onViewCourse(relatedCourse)}
                                            >
                                                View Details
                                            </Button>
                                        </Card>
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-[#BF0008] to-[#d4001a] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Language Journey?</h2>
                            <p className="text-blue-100 text-lg">
                                Enroll in {course.name} today and take the first step toward language mastery.
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <Button size="lg" className="bg-white text-[#BF0008] hover:bg-[#F6F6F8] rounded-full px-8 font-medium">
                                Enroll Now
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white text-white hover:bg-white/20 rounded-full px-8 font-medium"
                            >
                                Contact Us
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
