"use client"

import type { Course } from "../../types/course-type"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Eye, Edit, Trash2, Clock, Users, DollarSign, Volume2, BookOpen } from "lucide-react"

interface CourseCardProps {
    course: Course
    onView: (course: Course) => void
    onEdit: (course: Course) => void
    onDelete: (course: Course) => void
}

const languageColors = {
    English: "from-blue-500 to-blue-600",
    Spanish: "from-orange-500 to-red-500",
    French: "from-purple-500 to-pink-500",
    German: "from-gray-600 to-gray-700",
    Chinese: "from-red-600 to-yellow-500",
    Italian: "from-green-500 to-green-600",
    Portuguese: "from-teal-500 to-cyan-500",
    Japanese: "from-pink-500 to-rose-500",
}

export function CourseCard({ course, onView, onEdit, onDelete }: CourseCardProps) {
    const languageGradient = languageColors[course.language as keyof typeof languageColors] || "from-gray-500 to-gray-600"

    return (
        <Card className="group h-full bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 rounded-2xl overflow-hidden">
            {/* Language Header */}
            <div className={`h-2 bg-gradient-to-r ${languageGradient}`}></div>

            <CardHeader className="pb-4 relative">
                <div className="flex justify-between items-start">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${languageGradient}`}></div>
                            <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{course.code}</span>
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#BF0008] transition-colors">
                            {course.name}
                        </CardTitle>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <Badge
                            variant={course.isActive ? "default" : "secondary"}
                            className={`${course.isActive
                                ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0"
                                : "bg-gray-100 text-gray-600"
                                } rounded-full px-3 py-1 text-xs font-medium`}
                        >
                            {course.isActive ? "Active" : "Inactive"}
                        </Badge>

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
                    <Badge
                        variant="outline"
                        className={`text-xs bg-gradient-to-r ${languageGradient} text-white border-0 rounded-full`}
                    >
                        {course.language}
                    </Badge>
                    <Badge variant="outline" className="text-xs rounded-full border-gray-300">
                        Level {course.level}
                    </Badge>
                </div>

                {/* Course Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
                        <div className="flex items-center gap-2 text-blue-600 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-medium">Duration</span>
                        </div>
                        <div className="text-sm font-bold text-blue-700">{course.durationWeeks} weeks</div>
                    </div>

                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                        <div className="flex items-center gap-2 text-purple-600 mb-1">
                            <Users className="w-4 h-4" />
                            <span className="text-xs font-medium">Capacity</span>
                        </div>
                        <div className="text-sm font-bold text-purple-700">{course.totalSlots} slots</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
                        <div className="flex items-center gap-2 text-green-600 mb-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-xs font-medium">Price</span>
                        </div>
                        <div className="text-sm font-bold text-green-700">${course.feeFull}</div>
                    </div>

                    <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl p-3 border border-orange-100">
                        <div className="flex items-center gap-2 text-orange-600 mb-1">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-xs font-medium">Topics</span>
                        </div>
                        <div className="text-sm font-bold text-orange-700">{course.topics.length}</div>
                    </div>
                </div>

                {/* Topics Preview */}
                {course.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {course.topics.slice(0, 2).map((topic, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                {topic}
                            </span>
                        ))}
                        {course.topics.length > 2 && (
                            <span className="text-xs text-gray-400 px-2 py-1">+{course.topics.length - 2} more</span>
                        )}
                    </div>
                )}
            </CardContent>

            <CardFooter className="pt-4 border-t border-gray-100/50">
                <div className="flex gap-2 w-full">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(course)}
                        className="flex-1 rounded-xl border-gray-200 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-300"
                    >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(course)}
                        className="flex-1 rounded-xl border-gray-200 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-all duration-300"
                    >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(course)}
                        className="flex-1 rounded-xl border-gray-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-300"
                    >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}
