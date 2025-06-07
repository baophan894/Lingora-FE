"use client"

import { use, useEffect, useState } from "react"
import type { Course, CourseFormData } from "@/types/course-type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CourseTopicManager } from "@/components/course-management/course-topic-manager"
import { CourseAudioUploader } from "@/components/course-management/course-audio-uploader"
import {
    Save,
    ArrowLeft,
    BookOpen,
    Settings,
    Volume2,
    FileText,
    Globe,
    DollarSign,
    Clock,
    Users,
    Eye,
    AlertCircle,
} from "lucide-react"
import { CourseService } from "../../services/courseService"
import { useNavigate } from "react-router-dom"
import CourseLoadingPage from "../../utils/loading-page/course-loading"
import { toast } from "sonner"
import { languageColors } from "../../utils/constant-value/constant"


interface CourseEditPageProps {
    courseId?: string
    onBack: () => void
    onSuccess: () => void
}

export function CourseEditPage({ courseId, onBack, onSuccess }: CourseEditPageProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeTab, setActiveTab] = useState("basic")
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

    const [course, setCourse] = useState<Course | null>(null);
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [touched, setTouched] = useState<Record<keyof CourseFormData, boolean>>({
        code: false,
        name: false,
        description: false,
        language: false,
        level: false,
        durationWeeks: false,
        totalSlots: false,
        feeFull: false,
        feeInstallment: false,
        createdBy: false,
        isActive: false,
        audioPracticeUrl: false,
        topics: false,
    });

    const [formData, setFormData] = useState<CourseFormData>({
        code: "",
        name: "",
        description: "",
        language: "",
        level: "",
        durationWeeks: 0,
        totalSlots: 0,
        feeFull: 0,
        feeInstallment: 0,
        createdBy: "",
        isActive: false,
        audioPracticeUrl: "",
        topics: [],
    });

    useEffect(() => {
        if (courseId) {
            const fetchCourse = async () => {
                try {
                    const response = await CourseService.getCourseById(courseId)
                    console.log(response.data)
                    setCourse(response.data)
                    const data = response.data
                    setFormData({
                        code: data.code,
                        name: data.name,
                        description: data.description,
                        language: data.language,
                        level: data.level,
                        durationWeeks: data.durationWeeks,
                        totalSlots: data.totalSlots,
                        feeFull: data.feeFull,
                        feeInstallment: data.feeInstallment,
                        createdBy: data.createdBy,
                        isActive: data.isActive,
                        audioPracticeUrl: data.audioPracticeUrl,
                        topics: data.topics,
                    })
                    setIsLoading(false)
                } catch (error) {
                    console.error("Failed to fetch course:", error)
                    toast.error("Failed to load course data")
                    onBack()
                }
            }
            fetchCourse()
        }
    }, [courseId, onBack])

    const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese"]
    const levels = ["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced"]

    // Language-specific colors

    const bgGradient = languageColors[formData.language as keyof typeof languageColors] || "from-gray-500 to-gray-600"

    const validateField = (field: keyof CourseFormData, value: any) => {
        const newErrors = { ...errors };
        const codeRegex = /^[A-Z]{3}-\d{3}$/;
        const nameRegex = /^[a-zA-Z0-9\s.,:;!?()-]{5,100}$/;

        switch (field) {
            case 'code':
                if (!value.trim() || !codeRegex.test(value)) {
                    newErrors.code = "Course code must be in ABC-123 format";
                } else {
                    delete newErrors.code;
                }
                break;
            case 'name':
                if (!value.trim() || !nameRegex.test(value)) {
                    newErrors.name = "Course name contains invalid characters or is shorter than 5";
                } else {
                    delete newErrors.name;
                }
                break;
            case 'description':
                if (!value.trim()) {
                    newErrors.description = "Description is required";
                } else {
                    delete newErrors.description;
                }
                break;
            case 'language':
                if (!value) {
                    newErrors.language = "Language is required";
                } else {
                    delete newErrors.language;
                }
                break;
            case 'level':
                if (!value) {
                    newErrors.level = "Level is required";
                } else {
                    delete newErrors.level;
                }
                break;
            case 'durationWeeks':
                if (value < 1) {
                    newErrors.durationWeeks = "Duration must be at least 1 week";
                } else {
                    delete newErrors.durationWeeks;
                }
                break;
            case 'totalSlots':
                if (value < 1) {
                    newErrors.totalSlots = "Total slots must be at least 1";
                } else {
                    delete newErrors.totalSlots;
                }
                break;
            case 'feeFull':
                if (value < 0) {
                    newErrors.feeFull = "Full fee cannot be negative";
                } else {
                    delete newErrors.feeFull;
                }
                break;
            case 'feeInstallment':
                if (value < 0) {
                    newErrors.feeInstallment = "Installment fee cannot be negative";
                } else {
                    delete newErrors.feeInstallment;
                }
                break;
            default:
                break;
        }

        setErrors(newErrors);
    };

    const handleSubmit = async () => {
        if (!courseId) return

        setIsSubmitting(true)
        Object.keys(formData).forEach(field => {
            handleBlur(field as keyof CourseFormData);
        });
        if (Object.keys(errors).length === 0) {

            try {
                const response = await CourseService.updateCourse(courseId, formData)
                console.log("Course updated:", response.data)
                toast.success("Course updated successfully!")
                setTimeout(() => {
                    window.location.reload();
                    onSuccess();
                }, 1000);
            } catch (error) {
                console.error("Error updating course:", error)
                toast.error("Failed to update course. Please try again.")
            } finally {
                setIsSubmitting(false)
            }
        }
    }

    const updateFormData = (field: keyof CourseFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        setHasUnsavedChanges(true)
        validateField(field, value);
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }

    }

    const handleBlur = (field: keyof CourseFormData) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    if (isLoading) {
        return <CourseLoadingPage />;
    }


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
                            Back to Course
                        </Button>
                        <div className="h-6 w-px bg-white/30"></div>
                        <div className="flex items-center gap-2 text-white/80">
                            <BookOpen className="w-4 h-4" />
                            <span className="text-sm">Edit Course</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <h1 className="text-4xl font-bold mb-4">Edit Course: {formData.name}</h1>
                            <p className="text-xl text-white/80 mb-6 leading-relaxed">
                                Update course information, content, and settings to keep your curriculum current and engaging.
                            </p>

                            {hasUnsavedChanges && (
                                <div className="bg-yellow-500/20 border border-yellow-300/30 rounded-2xl p-4 mb-6">
                                    <div className="flex items-center gap-2 text-yellow-100">
                                        <AlertCircle className="w-5 h-5" />
                                        <span className="font-medium">You have unsaved changes</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Panel */}
                        <div className="lg:w-80">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl">
                                <h3 className="text-lg font-bold mb-4">Save Changes</h3>

                                <div className="space-y-3">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting}
                                        className="w-full bg-white text-[#BF0008] hover:bg-[#F6F6F8] rounded-xl font-medium"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {isSubmitting ? "Saving..." : "Save Changes"}
                                    </Button>

                                </div>

                                <div className="mt-6 pt-6 border-t border-white/20">
                                    <h4 className="text-sm font-medium mb-3">Quick Stats</h4>
                                    <div className="space-y-2 text-sm text-white/80">
                                        <div className="flex justify-between">
                                            <span>Duration:</span>
                                            <span>{formData.durationWeeks} weeks</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Capacity:</span>
                                            <span>{formData.totalSlots} students</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Topics:</span>
                                            <span>{formData.topics.length} modules</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Edit Form Tabs */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-4 mb-8 bg-white/70 backdrop-blur-xl rounded-2xl p-2 w-full max-w-2xl mx-auto border border-white/20 shadow-lg">
                            <TabsTrigger
                                value="basic"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Basic Info
                            </TabsTrigger>
                            <TabsTrigger
                                value="details"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <Settings className="w-4 h-4 mr-2" />
                                Details
                            </TabsTrigger>
                            <TabsTrigger
                                value="content"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <BookOpen className="w-4 h-4 mr-2" />
                                Content
                            </TabsTrigger>
                            <TabsTrigger
                                value="media"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <Volume2 className="w-4 h-4 mr-2" />
                                Media
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <FileText className="w-5 h-5" />
                                        Basic Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="code" className="text-sm font-medium text-gray-700">
                                                Course Code *
                                            </Label>
                                            <Input
                                                id="code"
                                                value={formData.code}
                                                onChange={(e) => updateFormData("code", e.target.value)}
                                                placeholder="e.g., ENG-101, SPA-201"
                                                onBlur={() => handleBlur("code")}
                                                className={`h-12 rounded-xl border-2 transition-all duration-300 ${touched.code && errors.code
                                                    ? "border-red-500"
                                                    : formData.code ? "border-green-500" : "border-gray-200"
                                                    }`}
                                            />
                                            {touched.code && errors.code && (
                                                <p className="text-sm text-red-600 flex items-center gap-1">
                                                    <span className="w-4 h-4">⚠️</span> {errors.code}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                                Course Name *
                                            </Label>
                                            <Input
                                                id="name"
                                                value={formData.name}
                                                onChange={(e) => updateFormData("name", e.target.value)}
                                                placeholder="e.g., English for Beginners"
                                                onBlur={() => handleBlur("name")}
                                                className={`h-12 rounded-xl border-2 transition-all duration-300 ${touched.code && errors.code
                                                    ? "border-red-500"
                                                    : formData.name ? "border-green-500" : "border-gray-200"
                                                    }`}
                                            />

                                            {touched.name && errors.name && (
                                                <p className="text-sm text-red-600 flex items-center gap-1">
                                                    <span className="w-4 h-4">⚠️</span> {errors.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                            Description *
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => updateFormData("description", e.target.value)}
                                            placeholder="Describe what students will learn, the course objectives, and what makes it special..."
                                            rows={4}
                                            onBlur={() => handleBlur("description")}
                                            className={`h-12 rounded-xl border-2 transition-all duration-300 ${touched.code && errors.code
                                                ? "border-red-500"
                                                : formData.name ? "border-green-500" : "border-gray-200"
                                                }`}
                                        />
                                        <div className="flex justify-between items-center">
                                            <div>
                                                {touched.description && errors.description && (
                                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                                        <span className="w-4 h-4">⚠️</span> {errors.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Language *</Label>
                                                <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                                                    <SelectTrigger
                                                        onBlur={() => handleBlur("language")}
                                                        className={`h-12 rounded-xl border-2 transition-all duration-300 ${touched.language && errors.language
                                                            ? "border-red-500"
                                                            : formData.language ? "border-green-500" : "border-gray-200"
                                                            }`}
                                                    >
                                                        <SelectValue placeholder="Select language" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        {languages.map((lang) => (
                                                            <SelectItem key={lang} value={lang}>
                                                                <div className="flex items-center gap-2">
                                                                    <Globe className="w-4 h-4" />
                                                                    {lang}
                                                                </div>
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.language && <p className="text-sm text-red-600 mt-1">{errors.language}</p>}
                                            </div>

                                            <div>
                                                <Label className="text-sm font-medium text-gray-700">Level *</Label>
                                                <Select value={formData.level} onValueChange={(value) => updateFormData("level", value)}>
                                                    <SelectTrigger
                                                        onBlur={() => handleBlur("level")}
                                                        className={`h-12 rounded-xl border-2 transition-all duration-300 ${touched.level && errors.level
                                                            ? "border-red-500"
                                                            : formData.level ? "border-green-500" : "border-gray-200"
                                                            }`}
                                                    >
                                                        <SelectValue placeholder="Select level" />
                                                    </SelectTrigger>
                                                    <SelectContent className='bg-white'>
                                                        {levels.map((level) => (
                                                            <SelectItem key={level} value={level}>
                                                                {level}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {errors.level && <p className="text-sm text-red-600 mt-1">{errors.level}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="details" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <Settings className="w-5 h-5" />
                                        Course Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="duration" className="text-sm font-medium text-gray-700">
                                                Duration (Weeks) *
                                            </Label>
                                            <div className="relative mt-2">
                                                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <Input
                                                    id="duration"
                                                    type="number"
                                                    min="1"
                                                    value={formData.durationWeeks}
                                                    onChange={(e) => updateFormData("durationWeeks", Number.parseInt(e.target.value) || 1)}
                                                    className={`pl-12 h-12 rounded-xl ${errors.durationWeeks ? "border-red-500" : "border-gray-200"}`}
                                                />
                                            </div>
                                            {errors.durationWeeks && <p className="text-sm text-red-600 mt-1">{errors.durationWeeks}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="slots" className="text-sm font-medium text-gray-700">
                                                Total Slots *
                                            </Label>
                                            <div className="relative mt-2">
                                                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <Input
                                                    id="slots"
                                                    type="number"
                                                    min="1"
                                                    value={formData.totalSlots}
                                                    onChange={(e) => updateFormData("totalSlots", Number.parseInt(e.target.value) || 1)}
                                                    className={`pl-12 h-12 rounded-xl ${errors.totalSlots ? "border-red-500" : "border-gray-200"}`}
                                                />
                                            </div>
                                            {errors.totalSlots && <p className="text-sm text-red-600 mt-1">{errors.totalSlots}</p>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <Label htmlFor="feeFull" className="text-sm font-medium text-gray-700">
                                                Full Fee ($) *
                                            </Label>
                                            <div className="relative mt-2">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <Input
                                                    id="feeFull"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={formData.feeFull}
                                                    onChange={(e) => updateFormData("feeFull", Number.parseFloat(e.target.value) || 0)}
                                                    className={`pl-12 h-12 rounded-xl ${errors.feeFull ? "border-red-500" : "border-gray-200"}`}
                                                />
                                            </div>
                                            {errors.feeFull && <p className="text-sm text-red-600 mt-1">{errors.feeFull}</p>}
                                        </div>

                                        <div>
                                            <Label htmlFor="feeInstallment" className="text-sm font-medium text-gray-700">
                                                Installment Fee ($) *
                                            </Label>
                                            <div className="relative mt-2">
                                                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                <Input
                                                    id="feeInstallment"
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={formData.feeInstallment}
                                                    onChange={(e) => updateFormData("feeInstallment", Number.parseFloat(e.target.value) || 0)}
                                                    className={`pl-12 h-12 rounded-xl ${errors.feeInstallment ? "border-red-500" : "border-gray-200"}`}
                                                />
                                            </div>
                                            {errors.feeInstallment && <p className="text-sm text-red-600 mt-1">{errors.feeInstallment}</p>}
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 p-4 bg-[#F6F6F8] rounded-xl">
                                        <Switch
                                            id="isActive"
                                            checked={formData.isActive}
                                            onCheckedChange={(checked) => updateFormData("isActive", checked)}
                                        />
                                        <Label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                                            Course is active and available for enrollment
                                        </Label>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="content" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <BookOpen className="w-5 h-5" />
                                        Course Topics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <CourseTopicManager
                                        topics={formData.topics}
                                        onTopicsChange={(topics) => updateFormData("topics", topics)}
                                        disabled={isSubmitting}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="media" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <Volume2 className="w-5 h-5" />
                                        Audio Practice Materials
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <CourseAudioUploader
                                        audioPracticeUrl={formData.audioPracticeUrl}
                                        onAudioUrlChange={(url) => updateFormData("audioPracticeUrl", url)}
                                        disabled={isSubmitting}
                                    />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>

                    {/* Floating Save Button */}
                    <div className="fixed bottom-8 right-8 z-50">
                        <Button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-[#BF0008] hover:bg-[#9f0007] text-white rounded-full px-8 py-4 shadow-2xl transition-all duration-300 hover:scale-105"
                        >
                            <Save className="w-5 h-5 mr-2" />
                            {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    )
}
