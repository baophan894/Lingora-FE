import { useState, useMemo, useEffect } from "react"
import type { Course, CourseFilters } from "../../types/course-type"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { CourseFilterBar } from "../../components/course-management/course-filter-bar"
import { CourseCard } from "../../components/course-management/course-card"
import { CourseListTable } from "../../components/course-management/course-list-table"
import { CourseConfirmDeleteModal } from "../../components/course-management/course-confirm-delete-modal"
import { Plus, Grid, List, ChevronLeft, ChevronRight, Search, Filter, TrendingUp, Users, BookOpen } from "lucide-react"
import { CourseService } from "../../services/courseService"
import CourseLoadingPage from "../../utils/loading-page/course-loading"
import { toast } from "sonner"

interface CourseListPageProps {
    onCreateCourse: () => void
    onViewCourse: (course: Course) => void
    onEditCourse: (course: Course) => void
}

export function CourseListPage({ onCreateCourse, onViewCourse, onEditCourse }: CourseListPageProps) {
    const [filters, setFilters] = useState<CourseFilters>({
        search: "",
        language: "All Languages",
        level: "All Levels",
        isActive: null,
    })
    const [viewMode, setViewMode] = useState<"grid" | "table">("grid")
    const [currentPage, setCurrentPage] = useState(1)
    const [courseToDelete, setCourseToDelete] = useState<Course | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [courses, setCourses] = useState<Course[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const itemsPerPage = 4
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await CourseService.getAllCourses()
                setCourses(response.data)
                setIsLoading(false)
            } catch (error) {
                console.error("Failed to fetch courses:", error)
                alert("Failed to load courses")
            }
        }
        fetchCourses()
    }, [])

    // Filter courses based on current filters
    const filteredCourses = useMemo(() => {
        return courses.filter((course) => {
            const matchesSearch =
                !filters.search ||
                course.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                course.code.toLowerCase().includes(filters.search.toLowerCase())

            const matchesLanguage = filters.language === "All Languages" || course.language === filters.language
            const matchesLevel = filters.level === "All Levels" || course.level === filters.level
            const matchesStatus = filters.isActive === null || course.isActive === filters.isActive

            return matchesSearch && matchesLanguage && matchesLevel && matchesStatus
        })
    }, [courses, filters])

    // Paginate filtered courses
    const paginatedCourses = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage
        return filteredCourses.slice(startIndex, startIndex + itemsPerPage)
    }, [filteredCourses, currentPage])

    const totalPages = Math.ceil(filteredCourses.length / itemsPerPage)

    const handleFiltersChange = (newFilters: CourseFilters) => {
        setFilters(newFilters)
        setCurrentPage(1)
    }

    const handleResetFilters = () => {
        setFilters({
            search: "",
            language: "All Languages",
            level: "All Levels",
            isActive: null,
        })
        setCurrentPage(1)
    }


    const handleDeleteCourse = async () => {
        if (!courseToDelete) return;

        setIsDeleting(true);
        try {
            await CourseService.deleteCourse(courseToDelete._id); // Change id to _id
            setCourses((prev) => prev.filter((c) => c._id !== courseToDelete._id)); // Change id to _id
            setCourseToDelete(null);
            toast.success("Course deleted successfully");
        } catch (error) {
            console.error("Failed to delete course:", error);
            toast.error("Failed to delete course");
        } finally {
            setIsDeleting(false);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const activeCourses = courses.filter((c) => c.isActive).length
    const totalStudents = courses.reduce((sum, c) => sum + c.totalSlots, 0)

    if (isLoading) return <CourseLoadingPage />

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Hero Header */}
                <div className="relative overflow-hidden bg-gradient-to-r from-[#BF0008] via-[#ff4757] to-[#ff6b7a] rounded-3xl p-8 text-white">
                    <div className="relative z-10">
                        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                            <div>
                                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                                    Course Management
                                </h1>
                                <p className="text-xl text-white/90 mb-6">Manage your language center courses with style</p>

                                {/* Quick Stats */}
                                <div className="flex gap-6">
                                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <BookOpen className="w-5 h-5" />
                                            <span className="text-sm font-medium">Total Courses</span>
                                        </div>
                                        <div className="text-2xl font-bold">{courses.length}</div>
                                    </div>

                                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="w-5 h-5" />
                                            <span className="text-sm font-medium">Active</span>
                                        </div>
                                        <div className="text-2xl font-bold">{activeCourses}</div>
                                    </div>

                                    <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Users className="w-5 h-5" />
                                            <span className="text-sm font-medium">Total Slots</span>
                                        </div>
                                        <div className="text-2xl font-bold">{totalStudents}</div>
                                    </div>
                                </div>
                            </div>

                            <Button
                                onClick={onCreateCourse}
                                className="bg-white text-[#BF0008] hover:bg-gray-100 font-semibold px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                <Plus className="w-5 h-5 mr-2" />
                                Create New Course
                            </Button>
                        </div>
                    </div>

                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full translate-y-24 -translate-x-24"></div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Search courses by name or code..."
                                value={filters.search}
                                onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                                className="pl-12 h-12 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <Button
                            variant="outline"
                            onClick={() => setShowFilters(!showFilters)}
                            className="h-12 px-6 rounded-xl border-gray-200 bg-white/80 backdrop-blur-sm hover:bg-white"
                        >
                            <Filter className="w-5 h-5 mr-2" />
                            Filters
                        </Button>

                        {/* View Toggle */}
                        <div className="flex bg-gray-100 rounded-xl p-1">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("grid")}
                                className={`rounded-lg ${viewMode === "grid" ? "bg-white shadow-sm" : ""}`}
                            >
                                <Grid className="w-4 h-4 mr-2" />
                                Grid
                            </Button>
                            <Button
                                variant={viewMode === "table" ? "default" : "ghost"}
                                size="sm"
                                onClick={() => setViewMode("table")}
                                className={`rounded-lg ${viewMode === "table" ? "bg-white shadow-sm" : ""}`}
                            >
                                <List className="w-4 h-4 mr-2" />
                                Table
                            </Button>
                        </div>
                    </div>

                    {/* Expandable Filters */}
                    {showFilters && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <CourseFilterBar filters={filters} onFiltersChange={handleFiltersChange} onReset={handleResetFilters} />
                        </div>
                    )}
                </div>

                {/* Results Info */}
                <div className="flex justify-between items-center">
                    <div className="text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{paginatedCourses.length}</span> of{" "}
                        <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
                    </div>
                </div>

                {/* Course List */}
                {viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedCourses.map((course, index) => (
                            <div
                                key={course.id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <CourseCard course={course} onView={onViewCourse} onEdit={onEditCourse} onDelete={setCourseToDelete} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <CourseListTable
                            courses={paginatedCourses}
                            onView={onViewCourse}
                            onEdit={onEditCourse}
                            onDelete={setCourseToDelete}
                        />
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 pt-8">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-xl"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            Previous
                        </Button>

                        <div className="flex gap-1">
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                const page = i + 1
                                return (
                                    <Button
                                        key={page}
                                        variant={currentPage === page ? "default" : "outline"}
                                        size="sm"
                                        onClick={() => handlePageChange(page)}
                                        className={`rounded-xl ${currentPage === page ? "bg-[#BF0008] hover:bg-[#9f0007] text-white" : ""}`}
                                    >
                                        {page}
                                    </Button>
                                )
                            })}
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-xl"
                        >
                            Next
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20">
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <BookOpen className="w-12 h-12 text-gray-400" />
                        </div>
                        <div className="text-gray-500 text-xl mb-2">No courses found</div>
                        <div className="text-gray-400 mb-6">
                            {filters.search || filters.language || filters.level || filters.isActive !== null
                                ? "Try adjusting your filters or create a new course"
                                : "Get started by creating your first course"}
                        </div>
                        <Button
                            onClick={onCreateCourse}
                            className="bg-[#BF0008] hover:bg-[#9f0007] text-white px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                        >
                            <Plus className="w-5 h-5 mr-2" />
                            Create New Course
                        </Button>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            <CourseConfirmDeleteModal
                course={courseToDelete}
                isOpen={!!courseToDelete}
                onClose={() => setCourseToDelete(null)}
                onConfirm={handleDeleteCourse}
                isDeleting={isDeleting}
            />
        </div>
    )
}
