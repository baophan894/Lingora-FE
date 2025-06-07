"use client"

import type React from "react"

import { useState } from "react"
import type { Course } from "../../types/course-type"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Checkbox } from "../../components/ui/checkbox"
import {
    Eye,
    Edit,
    Trash2,
    Clock,
    Users,
    DollarSign,
    Volume2,
    BookOpen,
    MoreHorizontal,
    Star,
    TrendingUp,
    Calendar,
    Filter,
    ArrowUpDown,
    ChevronDown,
    Download,
    Copy,
    Archive,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

interface CourseListTableProps {
    courses: Course[]
    onView: (course: Course) => void
    onEdit: (course: Course) => void
    onDelete: (course: Course) => void
}

type SortField = "name" | "language" | "level" | "durationWeeks" | "totalSlots" | "feeFull" | "createdAt"
type SortDirection = "asc" | "desc"

const languageColors = {
    English: {
        bg: "from-[#BF0008] to-[#d4001a]",
        light: "bg-blue-50 text-blue-700 border-blue-200",
        dot: "bg-blue-500",
    },
    Spanish: {
        bg: "from-[#BF0008] to-red-600",
        light: "bg-red-50 text-red-700 border-red-200",
        dot: "bg-red-500",
    },
    French: {
        bg: "from-[#BF0008] to-pink-600",
        light: "bg-pink-50 text-pink-700 border-pink-200",
        dot: "bg-pink-500",
    },
    German: {
        bg: "from-gray-600 to-[#BF0008]",
        light: "bg-gray-50 text-gray-700 border-gray-200",
        dot: "bg-gray-500",
    },
    Chinese: {
        bg: "from-[#BF0008] to-yellow-600",
        light: "bg-yellow-50 text-yellow-700 border-yellow-200",
        dot: "bg-yellow-500",
    },
    Italian: {
        bg: "from-green-600 to-[#BF0008]",
        light: "bg-green-50 text-green-700 border-green-200",
        dot: "bg-green-500",
    },
    Portuguese: {
        bg: "from-teal-600 to-[#BF0008]",
        light: "bg-teal-50 text-teal-700 border-teal-200",
        dot: "bg-teal-500",
    },
    Japanese: {
        bg: "from-[#BF0008] to-rose-600",
        light: "bg-rose-50 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
    },
}

export function CourseListTable({ courses, onView, onEdit, onDelete }: CourseListTableProps) {
    const [selectedCourses, setSelectedCourses] = useState<string[]>([])
    const [sortField, setSortField] = useState<SortField>("createdAt")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
    const [hoveredRow, setHoveredRow] = useState<string | null>(null)

    // Generate mock data for enhanced display
    const enhancedCourses = courses.map((course) => ({
        ...course,
        enrolledStudents: Math.floor(Math.random() * course.totalSlots),
        rating: (4.2 + Math.random() * 0.8).toFixed(1),
        completionRate: Math.floor(75 + Math.random() * 20),
        lastActivity: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    }))

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const sortedCourses = [...enhancedCourses].sort((a, b) => {
        let aValue = a[sortField]
        let bValue = b[sortField]

        if (typeof aValue === "string") {
            aValue = aValue.toLowerCase()
            bValue = (bValue as string).toLowerCase()
        }

        if (sortDirection === "asc") {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
        } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
        }
    })

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelectedCourses(courses.map((c) => c.id))
        } else {
            setSelectedCourses([])
        }
    }

    const handleSelectCourse = (courseId: string, checked: boolean) => {
        if (checked) {
            setSelectedCourses([...selectedCourses, courseId])
        } else {
            setSelectedCourses(selectedCourses.filter((id) => id !== courseId))
        }
    }

    const SortableHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
        <Button
            variant="ghost"
            onClick={() => handleSort(field)}
            className="h-auto p-0 font-semibold text-gray-700 hover:text-[#BF0008] transition-colors"
        >
            <div className="flex items-center gap-1">
                {children}
                <ArrowUpDown className="w-3 h-3 opacity-50" />
            </div>
        </Button>
    )

    if (courses.length === 0) {
        return (
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl overflow-hidden">
                <div className="text-center py-16">
                    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                    </div>
                    <div className="text-gray-500 text-xl mb-2">No courses found</div>
                    <div className="text-gray-400">Try adjusting your filters or create a new course</div>
                </div>
            </div>
        )
    }

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-xl overflow-hidden">
            {/* Enhanced Table Header */}
            <div className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-200 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3">
                            {/* <Checkbox
                                checked={selectedCourses.length === courses.length}
                                onCheckedChange={handleSelectAll}
                                className="rounded-md"
                            /> */}
                            {/* <span className="text-sm font-medium text-gray-700">
                                {selectedCourses.length > 0 ? `${selectedCourses.length} selected` : "Select all"}
                            </span> */}
                        </div>

                        {selectedCourses.length > 0 && (
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    <Download className="w-4 h-4 mr-1" />
                                    Export
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    <Copy className="w-4 h-4 mr-1" />
                                    Duplicate
                                </Button>
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    <Archive className="w-4 h-4 mr-1" />
                                    Archive
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* <Button variant="outline" size="sm" className="rounded-xl">
                            <Filter className="w-4 h-4 mr-1" />
                            Filter
                        </Button> */}
                        {/* <DropdownMenu >
                            <DropdownMenuTrigger asChild >
                                <Button variant="outline" size="sm" className="rounded-xl">
                                    <Download className="w-4 h-4 mr-1" />
                                    Export
                                    <ChevronDown className="w-4 h-4 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white">
                                <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                                <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                                <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                    </div>
                </div>
            </div>

            {/* Enhanced Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 hover:bg-gray-50">
                            <TableHead className="w-12 pl-6">
                                {/* <Checkbox
                                    checked={selectedCourses.length === courses.length}
                                    onCheckedChange={handleSelectAll}
                                    className="rounded-md"
                                /> */}
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <SortableHeader field="name">Course</SortableHeader>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <SortableHeader field="language">Language & Level</SortableHeader>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <SortableHeader field="durationWeeks">Duration</SortableHeader>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <SortableHeader field="totalSlots">Enrollment</SortableHeader>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">
                                <SortableHeader field="feeFull">Pricing</SortableHeader>
                            </TableHead>
                            <TableHead className="font-semibold text-gray-700">Performance</TableHead>
                            <TableHead className="font-semibold text-gray-700">Status</TableHead>
                            <TableHead className="font-semibold text-gray-700">Last Activity</TableHead>
                            <TableHead className="font-semibold text-gray-700 text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sortedCourses.map((course, index) => {
                            const colors = languageColors[course.language as keyof typeof languageColors] || {
                                bg: "from-gray-500 to-gray-600",
                                light: "bg-gray-50 text-gray-700 border-gray-200",
                                dot: "bg-gray-500",
                            }

                            const isSelected = selectedCourses.includes(course.id)
                            const isHovered = hoveredRow === course.id

                            return (
                                <TableRow
                                    key={course.id}
                                    className={`
                    group transition-all duration-300 border-b border-gray-100/50
                    ${isSelected ? "bg-[#BF0008]/5 border-[#BF0008]/20" : "hover:bg-gray-50/80"}
                    ${isHovered ? "shadow-lg scale-[1.01] z-10 relative" : ""}
                  `}
                                    onMouseEnter={() => setHoveredRow(course.id)}
                                    onMouseLeave={() => setHoveredRow(null)}
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                    }}
                                >
                                    <TableCell className="pl-6">
                                        {/* <Checkbox
                                            checked={isSelected}
                                            onCheckedChange={(checked) => handleSelectCourse(course.id, checked as boolean)}
                                            className="rounded-md"
                                        /> */}
                                    </TableCell>

                                    <TableCell className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-12 h-12 bg-gradient-to-br ${colors.bg} rounded-2xl flex items-center justify-center shadow-lg`}
                                            >
                                                <BookOpen className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="font-semibold text-gray-900 truncate group-hover:text-[#BF0008] transition-colors">
                                                    {course.name}
                                                </div>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-sm text-gray-500 font-mono">{course.code}</span>
                                                    {course.audioPracticeUrl && (
                                                        <div className="w-4 h-4 bg-purple-100 rounded-full flex items-center justify-center">
                                                            <Volume2 className="w-2.5 h-2.5 text-purple-600" />
                                                        </div>
                                                    )}
                                                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                                                        {course.topics.length} topics
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-3 h-3 rounded-full ${colors.dot}`}></div>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-xs ${colors.light} border-0 rounded-full font-medium`}
                                                >
                                                    {course.language}
                                                </Badge>
                                            </div>
                                            <Badge variant="outline" className="text-xs w-fit rounded-full border-gray-300">
                                                Level {course.level}
                                            </Badge>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center">
                                                <Clock className="w-4 h-4 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900">{course.durationWeeks}</div>
                                                <div className="text-xs text-gray-500">weeks</div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center">
                                                    <Users className="w-4 h-4 text-green-600" />
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-gray-900">
                                                        {course.enrolledStudents}/{course.totalSlots}
                                                    </div>
                                                    <div className="text-xs text-gray-500">enrolled</div>
                                                </div>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div
                                                    className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${(course.enrolledStudents / course.totalSlots) * 100}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="w-4 h-4 text-gray-400" />
                                                <span className="font-bold text-gray-900">${course.feeFull}</span>
                                            </div>
                                            {course.feeInstallment < course.feeFull && (
                                                <div className="text-xs text-gray-500">or ${course.feeInstallment}/month</div>
                                            )}
                                            <div className="text-xs text-green-600 font-medium">
                                                ${((course.feeFull * course.enrolledStudents) / 1000).toFixed(1)}k revenue
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                <span className="font-semibold text-gray-900">{course.rating}</span>
                                                <span className="text-xs text-gray-500">rating</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm font-medium text-gray-900">{course.completionRate}%</span>
                                                <span className="text-xs text-gray-500">completion</span>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge
                                                variant={course.isActive ? "default" : "secondary"}
                                                className={`${course.isActive
                                                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 shadow-lg"
                                                    : "bg-gray-100 text-gray-600"
                                                    } rounded-full px-3 py-1 text-xs font-medium`}
                                            >
                                                {course.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                            {course.isActive && <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>}
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-gray-400" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900">
                                                    {course.lastActivity.toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {course.lastActivity.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex items-center justify-center gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onView(course)}
                                                className="w-8 h-8 p-0 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-110"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onEdit(course)}
                                                className="w-8 h-8 p-0 rounded-xl hover:bg-green-50 hover:text-green-600 transition-all duration-300 hover:scale-110"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => onDelete(course)}
                                                className="w-8 h-8 p-0 rounded-xl hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:scale-110"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>

                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="w-8 h-8 p-0 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-110"
                                                    >
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48">
                                                    <DropdownMenuItem>
                                                        <Copy className="w-4 h-4 mr-2" />
                                                        Duplicate Course
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <Download className="w-4 h-4 mr-2" />
                                                        Export Data
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <TrendingUp className="w-4 h-4 mr-2" />
                                                        View Analytics
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem>
                                                        <Archive className="w-4 h-4 mr-2" />
                                                        Archive Course
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </div>

            {/* Enhanced Footer */}
            <div className="bg-gradient-to-r from-[#F6F6F8] to-white border-t border-gray-200 p-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                        <span>Showing {courses.length} courses</span>
                        {selectedCourses.length > 0 && (
                            <span className="text-[#BF0008] font-medium">{selectedCourses.length} selected</span>
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Active: {courses.filter((c) => c.isActive).length}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            <span>Inactive: {courses.filter((c) => !c.isActive).length}</span>
                        </div>
                        <div className="text-gray-400">|</div>
                        <span>
                            Total Revenue: $
                            {courses
                                .reduce((sum, c) => sum + c.feeFull * Math.floor(Math.random() * c.totalSlots), 0)
                                .toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
