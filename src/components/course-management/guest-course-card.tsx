"use client"

import type { Course } from "@/types/course-type"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Clock, Users, Volume2, ArrowRight, Star } from "lucide-react"

interface GuestCourseCardProps {
    course: Course
    onView: () => void
}

const languageColors = {
    English: {
        bg: "from-[#BF0008] to-[#d4001a]",
        light: "bg-[#F6F6F8] text-[#BF0008] border-red-100",
        icon: "text-[#BF0008]",
    },
    Spanish: {
        bg: "from-[#BF0008] to-red-600",
        light: "bg-red-50 text-red-700 border-red-100",
        icon: "text-red-600",
    },
    French: {
        bg: "from-[#BF0008] to-pink-600",
        light: "bg-pink-50 text-pink-700 border-pink-100",
        icon: "text-pink-600",
    },
    German: {
        bg: "from-gray-600 to-[#BF0008]",
        light: "bg-[#F6F6F8] text-gray-700 border-gray-200",
        icon: "text-gray-600",
    },
    Chinese: {
        bg: "from-[#BF0008] to-yellow-600",
        light: "bg-yellow-50 text-yellow-700 border-yellow-100",
        icon: "text-yellow-600",
    },
    Italian: {
        bg: "from-green-600 to-[#BF0008]",
        light: "bg-green-50 text-green-700 border-green-100",
        icon: "text-green-600",
    },
    Portuguese: {
        bg: "from-teal-600 to-[#BF0008]",
        light: "bg-teal-50 text-teal-700 border-teal-100",
        icon: "text-teal-600",
    },
    Japanese: {
        bg: "from-[#BF0008] to-rose-600",
        light: "bg-rose-50 text-rose-700 border-rose-100",
        icon: "text-rose-600",
    },
}

export function GuestCourseCard({ course, onView }: GuestCourseCardProps) {
    const colors = languageColors[course.language as keyof typeof languageColors] || {
        bg: "from-gray-500 to-gray-600",
        light: "bg-gray-50 text-gray-700 border-gray-200",
        icon: "text-gray-500",
    }

    // Generate random rating between 4.5 and 5.0
    const rating = (4.5 + Math.random() * 0.5).toFixed(1)

    // Generate random enrollment count
    const enrolledCount = Math.floor(Math.random() * 50) + 10

    return (
        <Card className="group h-full bg-white/90 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 rounded-2xl overflow-hidden">
            {/* Language Header */}
            <div className={`h-2 bg-gradient-to-r ${colors.bg}`}></div>

            <CardHeader className="pb-4 relative">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colors.bg}`}></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{course.code}</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#BF0008] transition-colors">
                            {course.name}
                        </h3>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded-full text-xs font-medium">
                            <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                            {rating}
                        </div>

                        {course.audioPracticeUrl && (
                            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <Volume2 className="w-3 h-3 text-white" />
                            </div>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 pb-4">
                <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">{course.description}</p>

                {/* Language and Level */}
                <div className="flex gap-2">
                    <Badge variant="outline" className={`text-xs bg-gradient-to-r ${colors.bg} text-white border-0 rounded-full`}>
                        {course.language}
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full border-gray-300">
                        Level {course.level}
                    </Badge>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-xl p-3 border ${colors.light}`}>
                        <div className={`flex items-center gap-2 ${colors.icon} mb-1`}>
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-medium">Duration</span>
                        </div>
                        <div className="text-sm font-bold">{course.durationWeeks} weeks</div>
                    </div>

                    <div className={`rounded-xl p-3 border ${colors.light}`}>
                        <div className={`flex items-center gap-2 ${colors.icon} mb-1`}>
                            <Users className="w-4 h-4" />
                            <span className="text-xs font-medium">Enrolled</span>
                        </div>
                        <div className="text-sm font-bold">{enrolledCount} students</div>
                    </div>
                </div>

                {/* Price and Topics */}
                <div className="flex justify-between items-center">
                    <div>
                        <div className="text-xs text-gray-500 mb-1">Course Fee</div>
                        <div className="text-xl font-bold text-gray-900">${course.feeFull}</div>
                        {course.feeInstallment < course.feeFull && (
                            <div className="text-xs text-gray-500">or ${course.feeInstallment}/month</div>
                        )}
                    </div>

                    <div className="text-right">
                        <div className="text-xs text-gray-500 mb-1">Topics</div>
                        <div className="text-sm font-medium text-gray-700">{course.topics.length} modules</div>
                    </div>
                </div>
            </CardContent>

            <CardFooter className="pt-4 border-t border-gray-100/50">
                <Button
                    onClick={onView}
                    className={`w-full rounded-xl bg-gradient-to-r ${colors.bg} text-white hover:opacity-90 transition-all duration-300`}
                >
                    View Course Details
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </CardFooter>
        </Card>
    )
}
