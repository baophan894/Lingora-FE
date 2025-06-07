import { useState, useMemo, useEffect } from "react"
import type { Course, CourseFilters } from "../../../types/course-type"
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { GuestCourseCard } from "../../../components/course-management/guest-course-card"
import { Search, Filter, X, ChevronDown, BookOpen, ArrowRight, Star, ChevronRight, ChevronLeft } from "lucide-react"
import { CourseService } from "../../../services/courseService"
import CourseLoadingPage from "../../../utils/loading-page/course-loading"

interface GuestCourseListPageProps {
    onViewCourse: (course: Course) => void
}

export function GuestCourseListPage({ onViewCourse }: GuestCourseListPageProps) {
    const [filters, setFilters] = useState<CourseFilters>({
        search: "",
        language: "All Languages",
        level: "All Levels",
        isActive: true, // Only show active courses for guests
    })
    const [showFilters, setShowFilters] = useState(false)
    const [courses, setCourses] = useState<Course[]>([])
    const [featuredCourse, setFeaturedCourse] = useState<Course>(courses[0])
    const [isLoading, setIsLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await CourseService.getActiveCourses()
                setCourses(response.data)
                // console.log("Courses fetched:", response.data)
                if (response.data.length > 0) {
                    setFeaturedCourse(response.data[0]) // Set first course as featured
                }
                setIsLoading(false)
            } catch (error) {
                console.error("Failed to fetch courses:", error)
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

            return matchesSearch && matchesLanguage && matchesLevel
        })
    }, [courses, filters])

    // Paginate filtered courses
    const paginatedCourses = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return filteredCourses.slice(startIndex, startIndex + itemsPerPage);
    }, [filteredCourses, currentPage]);


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
            isActive: true,
        })
        setCurrentPage(1)
    }
    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    if (isLoading) return <CourseLoadingPage />

    const languages = ["English", "Spanish", "French", "German", "Chinese"]
    const levels = ["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced"]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-[#BF0008] via-[#d4001a] to-[#e6002d] text-white">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 left-1/4 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                        <div className="absolute top-0 right-1/3 w-64 h-64 bg-[#BF0008] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                        <div className="absolute bottom-0 left-1/2 w-64 h-64 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-24 relative z-10">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/2">
                            <h1 className="text-5xl font-bold mb-6 leading-tight">Discover Your Path to Language Mastery</h1>
                            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                                Explore our diverse range of language courses designed to help you communicate confidently in a global
                                world.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    size="lg"
                                    className="bg-white text-[#BF0008] hover:bg-[#F6F6F8] rounded-full px-8 font-medium"
                                    onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
                                >
                                    Explore Courses
                                    <ArrowRight className="ml-2 h-5 w-5" />
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
                        <div className="md:w-1/2 relative">
                            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 shadow-2xl">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                        <Star className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-white/80">Featured Course</h3>
                                        <h2 className="text-2xl font-bold">{featuredCourse.name}</h2>
                                    </div>
                                </div>
                                <p className="text-blue-100 mb-6 line-clamp-2">{featuredCourse.description}</p>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-white/10 rounded-xl p-3 text-center">
                                        <div className="text-sm text-blue-200">Language</div>
                                        <div className="font-bold">{featuredCourse.language}</div>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-3 text-center">
                                        <div className="text-sm text-blue-200">Level</div>
                                        <div className="font-bold">{featuredCourse.level}</div>
                                    </div>
                                    <div className="bg-white/10 rounded-xl p-3 text-center">
                                        <div className="text-sm text-blue-200">Duration</div>
                                        <div className="font-bold">{featuredCourse.durationWeeks} weeks</div>
                                    </div>
                                </div>
                                <Button
                                    className="w-full bg-gradient-to-r from-[#BF0008] to-[#d4001a] hover:from-[#9f0007] hover:to-[#BF0008] text-white rounded-xl font-medium"
                                    onClick={() => onViewCourse(featuredCourse)}
                                >
                                    Learn More
                                </Button>
                            </div>


                            {/* Decorative elements */}
                            <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full opacity-50 blur-xl"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full opacity-50 blur-xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-900 mb-2">{courses.length}</div>
                            <div className="text-blue-700">Available Courses</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-900 mb-2">
                                {new Set(courses.map((c) => c.language)).size}
                            </div>
                            <div className="text-blue-700">Languages</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-900 mb-2">
                                {new Set(courses.map((c) => c.level)).size}
                            </div>
                            <div className="text-blue-700">Proficiency Levels</div>
                        </div>
                        <div className="text-center">
                            <div className="text-4xl font-bold text-blue-900 mb-2">98%</div>
                            <div className="text-blue-700">Student Satisfaction</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Listing Section */}
            <section id="courses" className="py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-blue-900 mb-4">Explore Our Language Courses</h2>
                        <p className="text-lg text-blue-700 max-w-3xl mx-auto">
                            Find the perfect language course to match your goals, schedule, and learning style.
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl mb-12">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <Input
                                    placeholder="Search courses by name..."
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
                                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                            </Button>
                        </div>

                        {/* Expandable Filters */}
                        {showFilters && (
                            <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                                    <Select
                                        value={filters.language}
                                        onValueChange={(value) => handleFiltersChange({ ...filters, language: value })}
                                    >
                                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200">
                                            <SelectValue placeholder="All Languages" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="All Languages">All Languages</SelectItem>
                                            {languages.map((lang) => (
                                                <SelectItem key={lang} value={lang}>
                                                    {lang}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                                    <Select
                                        value={filters.level}
                                        onValueChange={(value) => handleFiltersChange({ ...filters, level: value })}
                                    >
                                        <SelectTrigger className="w-full h-12 rounded-xl border-gray-200">
                                            <SelectValue placeholder="All Levels" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-white">
                                            <SelectItem value="All Levels">All Levels</SelectItem>
                                            {levels.map((level) => (
                                                <SelectItem key={level} value={level}>
                                                    {level}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="flex items-end">
                                    <Button
                                        variant="outline"
                                        onClick={handleResetFilters}
                                        className="h-12 px-6 rounded-xl border-gray-200 w-full"
                                    >
                                        <X className="w-4 h-4 mr-2" />
                                        Reset Filters
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Results Info */}
                    <div className="mb-8">
                        <p className="text-gray-600">
                            Showing <span className="font-semibold text-gray-900">{filteredCourses.length}</span> courses
                        </p>
                    </div>

                    {/* Course Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {paginatedCourses.map((course, index) => (
                            <div
                                key={course.id}
                                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <GuestCourseCard course={course} onView={() => onViewCourse(course)} />
                            </div>
                        ))}
                    </div>
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
                    {paginatedCourses.length === 0 && (
                        <div className="text-center py-16 bg-white/50 backdrop-blur-sm rounded-3xl border border-white/20">
                            <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-12 h-12 text-gray-400" />
                            </div>
                            <div className="text-gray-500 text-xl mb-2">No courses found</div>
                            <div className="text-gray-400 mb-6">
                                Try adjusting your filters to find a course that matches your needs
                            </div>
                            <Button
                                onClick={handleResetFilters}
                                className="bg-[#BF0008] hover:bg-[#9f0007] text-white px-8 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:scale-105"
                            >
                                Reset Filters
                            </Button>
                        </div>
                    )}
                </div>

            </section>


            <section className="py-16 bg-gradient-to-r from-[#BF0008] to-[#d4001a] text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Language Journey?</h2>
                            <p className="text-blue-100 text-lg">
                                Contact our admissions team to learn more about enrollment options and special offers.
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
                                Request Info
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

