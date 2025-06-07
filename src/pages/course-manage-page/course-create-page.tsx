import { useState } from "react"
import type { CourseFormData } from "@/types/course-type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
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
    Sparkles,
    CheckCircle,
    ArrowRight,
    Lightbulb,
    Target,
    Zap,
} from "lucide-react"
import { CourseService } from "../../services/courseService"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { languageColors } from "../../utils/constant-value/constant"

interface CourseCreatePageProps {
    onBack: () => void
    onSuccess: () => void
}

export function CourseCreatePage({ onBack, onSuccess }: CourseCreatePageProps) {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [activeTab, setActiveTab] = useState("basic")
    const [currentStep, setCurrentStep] = useState(1)
    const navigate = useNavigate();

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
        durationWeeks: 12,
        totalSlots: 20,
        feeFull: 299.99,
        feeInstallment: 99.99,
        createdBy: "Admin User",
        isActive: true,
        audioPracticeUrl: "",
        topics: [],
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese"]
    const levels = ["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced"]

    // Language-specific colors
    const bgGradient = formData.language
        ? languageColors[formData.language as keyof typeof languageColors] || "from-[#BF0008] to-[#d4001a]"
        : "from-[#BF0008] to-[#d4001a]"

    // Calculate completion percentage
    const getCompletionPercentage = () => {
        const requiredFields = ["code", "name", "description", "language", "level"]
        const completedFields = requiredFields.filter((field) => formData[field as keyof CourseFormData])
        return Math.round((completedFields.length / requiredFields.length) * 100)
    }

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

        setIsSubmitting(true)
        Object.keys(formData).forEach(field => {
            handleBlur(field as keyof CourseFormData);
        });
        if (Object.keys(errors).length === 0) {

            try {
                const response = await CourseService.createCourse(formData)
                console.log("Course created:", response.data)
                toast.success("Course created successfully!")
                // Redirect to detail page
                setTimeout(() => {
                    navigate(`/center/course-detail/${response.data.data._id}`)
                }, 1000);
            } catch (error) {
                console.error("Error creating course:", error)
                toast.error("Failed to create course. Please try again.")
            } finally {
                setIsSubmitting(false)
            }
        }

    }

    const updateFormData = (field: keyof CourseFormData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        validateField(field, value);
    };

    const handleBlur = (field: keyof CourseFormData) => {
        setTouched(prev => ({ ...prev, [field]: true }));
        validateField(field, formData[field]);
    };

    const completionPercentage = getCompletionPercentage()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            {/* Dynamic Hero Header */}
            <section
                className={`relative bg-gradient-to-r ${bgGradient} text-white overflow-hidden transition-all duration-1000`}
            >
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -translate-y-48 translate-x-48 animate-pulse"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full translate-y-32 -translate-x-32 animate-bounce"></div>
                        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full -translate-x-20 -translate-y-20 animate-ping"></div>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                        <Button variant="ghost" onClick={onBack} className="text-white hover:bg-white/20 rounded-full">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Courses
                        </Button>
                        <div className="h-6 w-px bg-white/30"></div>
                        <div className="flex items-center gap-2 text-white/80">
                            <Sparkles className="w-4 h-4" />
                            <span className="text-sm">Create New Course</span>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12 items-start">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <BookOpen className="w-6 h-6" />
                                </div>
                                <div>
                                    <h1 className="text-5xl font-bold">Create New Course</h1>
                                    <p className="text-xl text-white/80 mt-2">Build an amazing learning experience</p>
                                </div>
                            </div>

                            <p className="text-lg text-white/70 mb-8 leading-relaxed max-w-3xl">
                                Design a comprehensive language course that will inspire and educate your students. Use our intuitive
                                course builder to create engaging content with multimedia support.
                            </p>

                            {/* Progress Indicator */}
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Course Creation Progress</h3>
                                    <span className="text-2xl font-bold">{completionPercentage}%</span>
                                </div>
                                <Progress value={completionPercentage} className="h-3 bg-white/20" />
                                <div className="flex justify-between text-sm text-white/70 mt-2">
                                    <span>Getting started</span>
                                    <span>Ready to launch</span>
                                </div>
                            </div>

                            {/* Quick Tips */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Lightbulb className="w-5 h-5 text-yellow-300" />
                                    </div>
                                    <h4 className="font-medium mb-2">Be Descriptive</h4>
                                    <p className="text-sm text-white/70">
                                        Clear descriptions help students understand what they'll learn
                                    </p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Target className="w-5 h-5 text-blue-300" />
                                    </div>
                                    <h4 className="font-medium mb-2">Set Clear Goals</h4>
                                    <p className="text-sm text-white/70">Define learning objectives and outcomes for your course</p>
                                </div>

                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
                                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Zap className="w-5 h-5 text-green-300" />
                                    </div>
                                    <h4 className="font-medium mb-2">Engage Students</h4>
                                    <p className="text-sm text-white/70">Add interactive elements and multimedia content</p>
                                </div>
                            </div>
                        </div>

                        {/* Live Preview Panel */}
                        <div className="lg:w-96">
                            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl sticky top-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Eye className="w-5 h-5" />
                                    <h3 className="text-lg font-bold">Live Preview</h3>
                                </div>

                                <div className="bg-white/10 rounded-2xl p-4 mb-4">
                                    <div className="text-sm text-white/70 mb-2">Course Preview</div>
                                    <h4 className="font-bold text-lg mb-2">{formData.name || "Course Name"}</h4>
                                    <p className="text-sm text-white/80 mb-3 line-clamp-2">
                                        {formData.description || "Course description will appear here..."}
                                    </p>

                                    <div className="flex gap-2 mb-3">
                                        {formData.language && (
                                            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{formData.language}</span>
                                        )}
                                        {formData.level && (
                                            <span className="bg-white/20 text-xs px-2 py-1 rounded-full">{formData.level}</span>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 text-xs">
                                        <div className="bg-white/10 rounded-lg p-2 text-center">
                                            <div className="font-bold">{formData.durationWeeks}</div>
                                            <div className="text-white/70">weeks</div>
                                        </div>
                                        <div className="bg-white/10 rounded-lg p-2 text-center">
                                            <div className="font-bold">${formData.feeFull}</div>
                                            <div className="text-white/70">total</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isSubmitting || completionPercentage < 100}
                                        className="w-full bg-white text-[#BF0008] hover:bg-[#F6F6F8] rounded-xl font-medium disabled:opacity-50"
                                    >
                                        <Save className="w-4 h-4 mr-2" />
                                        {isSubmitting ? "Creating..." : "Create Course"}
                                    </Button>

                                    {/* <Button
                                        variant="outline"
                                        className="w-full border-white text-white hover:bg-white/20 rounded-xl font-medium"
                                        disabled={!formData.name}
                                    >
                                        <Eye className="w-4 h-4 mr-2" />
                                        Preview as Student
                                    </Button> */}
                                </div>

                                {completionPercentage < 100 && (
                                    <div className="mt-4 p-3 bg-yellow-500/20 rounded-xl">
                                        <div className="text-sm text-yellow-100">Complete all required fields to create your course</div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Builder Tabs */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                        <TabsList className="grid grid-cols-4 mb-8 bg-white/70 backdrop-blur-xl rounded-2xl p-2 w-full max-w-2xl mx-auto border border-white/20 shadow-lg">
                            <TabsTrigger
                                value="basic"
                                className="rounded-xl data-[state=active]:bg-[#BF0008] data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
                            >
                                <FileText className="w-4 h-4 mr-2" />
                                Basics
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
                                        <Sparkles className="w-5 h-5" />
                                        Course Fundamentals
                                        <span className="ml-auto text-sm font-normal text-gray-500">Step 1 of 4</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    {/* Course Identity */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-[#BF0008] rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">1</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Course Identity</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="code" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <FileText className="w-4 h-4" />
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
                                                {touched.code && formData.code && !errors.code && (
                                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                                        <CheckCircle className="w-4 h-4" /> Looks good!
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <BookOpen className="w-4 h-4" />
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
                                                {touched.name && formData.name && !errors.name && (
                                                    <p className="text-sm text-green-600 flex items-center gap-1">
                                                        <CheckCircle className="w-4 h-4" /> Perfect!
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label
                                                htmlFor="description"
                                                className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                            >
                                                <FileText className="w-4 h-4" />
                                                Course Description *
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
                                                    : formData.description ? "border-green-500" : "border-gray-200"
                                                    }`}
                                            />
                                            <div className="flex justify-between items-center">
                                                <div>
                                                    {touched.description && errors.description && (
                                                        <p className="text-sm text-red-600 flex items-center gap-1">
                                                            <span className="w-4 h-4">⚠️</span> {errors.description}
                                                        </p>
                                                    )}
                                                    {touched.description && formData.description && !errors.description && (
                                                        <p className="text-sm text-green-600 flex items-center gap-1">
                                                            <CheckCircle className="w-4 h-4" /> Great description!
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="text-sm text-gray-500">{formData.description.length}/500</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Language & Level */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-[#BF0008] rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">2</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Language & Level</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    Language *
                                                </Label>
                                                <Select
                                                    value={formData.language}
                                                    onValueChange={(value) => updateFormData("language", value)}
                                                >
                                                    <SelectTrigger
                                                        onBlur={() => handleBlur("language")}
                                                        className={`h-12 rounded-xl border-2 transition-all duration-300 ${touched.language && errors.language
                                                            ? "border-red-500"
                                                            : formData.language ? "border-green-500" : "border-gray-200"
                                                            }`}
                                                    >
                                                        <SelectValue placeholder="Choose the language you'll teach" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
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
                                                {touched.language && errors.language && (
                                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                                        <span className="w-4 h-4">⚠️</span> {errors.language}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label className="text-sm font-medium text-gray-700">Proficiency Level *</Label>
                                                <Select value={formData.level} onValueChange={(value) => updateFormData("level", value)}>
                                                    <SelectTrigger
                                                        onBlur={() => handleBlur("level")}
                                                        className={`h-12 rounded-xl border-2 transition-all duration-300 ${touched.level && errors.level
                                                            ? "border-red-500"
                                                            : formData.level ? "border-green-500" : "border-gray-200"
                                                            }`}
                                                    >
                                                        <SelectValue placeholder="Select the difficulty level" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-white">
                                                        {levels.map((level) => (
                                                            <SelectItem key={level} value={level}>
                                                                {level}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {touched.level && errors.level && (
                                                    <p className="text-sm text-red-600 flex items-center gap-1">
                                                        <span className="w-4 h-4">⚠️</span> {errors.level}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Next Step Button */}
                                    <div className="flex justify-end pt-6 border-t border-gray-200">
                                        <Button
                                            onClick={() => setActiveTab("details")}
                                            disabled={
                                                !formData.code ||
                                                !formData.name ||
                                                !formData.description ||
                                                !formData.language ||
                                                !formData.level
                                            }
                                            className="bg-[#BF0008] hover:bg-[#9f0007] text-white rounded-xl px-8"
                                        >
                                            Continue to Details
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="details" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <Settings className="w-5 h-5" />
                                        Course Configuration
                                        <span className="ml-auto text-sm font-normal text-gray-500">Step 2 of 4</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8 space-y-8">
                                    {/* Duration & Capacity */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-[#BF0008] rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">1</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Course Structure</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="duration" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    Duration (Weeks)
                                                </Label>
                                                <div className="relative">
                                                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        id="duration"
                                                        type="number"
                                                        min="1"
                                                        max="52"
                                                        value={formData.durationWeeks}
                                                        onChange={(e) => updateFormData("durationWeeks", Number.parseInt(e.target.value) || 1)}
                                                        className="pl-12 h-12 rounded-xl border-2 border-gray-200"
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-500">Recommended: 8-16 weeks for comprehensive learning</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="slots" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <Users className="w-4 h-4" />
                                                    Class Size (Students)
                                                </Label>
                                                <div className="relative">
                                                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        id="slots"
                                                        type="number"
                                                        min="1"
                                                        max="50"
                                                        value={formData.totalSlots}
                                                        onChange={(e) => updateFormData("totalSlots", Number.parseInt(e.target.value) || 1)}
                                                        className="pl-12 h-12 rounded-xl border-2 border-gray-200"
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    Optimal class size: 12-20 students for interactive learning
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-[#BF0008] rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">2</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Pricing Strategy</h3>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="feeFull" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                                    <DollarSign className="w-4 h-4" />
                                                    Full Course Fee ($)
                                                </Label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        id="feeFull"
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={formData.feeFull}
                                                        onChange={(e) => updateFormData("feeFull", Number.parseFloat(e.target.value) || 1)}
                                                        className="pl-12 h-12 rounded-xl border-2 border-gray-200"
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-500">One-time payment for the entire course</p>
                                            </div>

                                            <div className="space-y-2">
                                                <Label
                                                    htmlFor="feeInstallment"
                                                    className="text-sm font-medium text-gray-700 flex items-center gap-2"
                                                >
                                                    <DollarSign className="w-4 h-4" />
                                                    Monthly Installment ($)
                                                </Label>
                                                <div className="relative">
                                                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                                    <Input
                                                        id="feeInstallment"
                                                        type="number"
                                                        min="0"
                                                        step="0.01"
                                                        value={formData.feeInstallment}
                                                        onChange={(e) => updateFormData("feeInstallment", Number.parseFloat(e.target.value) || 1)}
                                                        className="pl-12 h-12 rounded-xl border-2 border-gray-200"
                                                    />
                                                </div>
                                                <p className="text-sm text-gray-500">Monthly payment option for students</p>
                                            </div>
                                        </div>

                                        {/* Pricing Calculator */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                                            <h4 className="font-medium text-blue-900 mb-3">Pricing Analysis</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <div className="text-blue-700 font-medium">Per Week Cost</div>
                                                    <div className="text-2xl font-bold text-blue-900">
                                                        ${(formData.feeFull / formData.durationWeeks).toFixed(2)}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-blue-700 font-medium">Total Installments</div>
                                                    <div className="text-2xl font-bold text-blue-900">
                                                        {Math.ceil(formData.feeFull / formData.feeInstallment) || 0}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-blue-700 font-medium">Revenue Potential</div>
                                                    <div className="text-2xl font-bold text-blue-900">
                                                        ${(formData.feeFull * formData.totalSlots).toLocaleString()}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Course Settings */}
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 bg-[#BF0008] rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">3</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900">Course Settings</h3>
                                        </div>

                                        <div className="flex items-center justify-between p-6 bg-[#F6F6F8] rounded-2xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-gray-900">Publish Course Immediately</h4>
                                                    <p className="text-sm text-gray-600">Make this course available for student enrollment</p>
                                                </div>
                                            </div>
                                            <Switch
                                                checked={formData.isActive}
                                                onCheckedChange={(checked) => updateFormData("isActive", checked)}
                                            />
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex justify-between pt-6 border-t border-gray-200">
                                        <Button variant="outline" onClick={() => setActiveTab("basic")} className="rounded-xl px-8">
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to Basics
                                        </Button>
                                        <Button
                                            onClick={() => setActiveTab("content")}
                                            className="bg-[#BF0008] hover:bg-[#9f0007] text-white rounded-xl px-8"
                                        >
                                            Continue to Content
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="content" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <BookOpen className="w-5 h-5" />
                                        Course Curriculum
                                        <span className="ml-auto text-sm font-normal text-gray-500">Step 3 of 4</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 bg-[#BF0008] rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">1</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">Learning Topics</h3>
                                                <p className="text-gray-600">Define the key topics and modules students will learn</p>
                                            </div>
                                        </div>

                                        <CourseTopicManager
                                            topics={formData.topics}
                                            onTopicsChange={(topics) => updateFormData("topics", topics)}
                                            disabled={isSubmitting}
                                        />

                                        {formData.topics.length > 0 && (
                                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100">
                                                <h4 className="font-medium text-green-900 mb-3">Curriculum Overview</h4>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <div className="text-green-700 font-medium">Total Topics</div>
                                                        <div className="text-2xl font-bold text-green-900">{formData.topics.length}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-green-700 font-medium">Estimated Hours</div>
                                                        <div className="text-2xl font-bold text-green-900">{formData.topics.length * 3}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-green-700 font-medium">Weeks to Complete</div>
                                                        <div className="text-2xl font-bold text-green-900">{formData.durationWeeks}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex justify-between pt-6 border-t border-gray-200">
                                        <Button variant="outline" onClick={() => setActiveTab("details")} className="rounded-xl px-8">
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to Details
                                        </Button>
                                        <Button
                                            onClick={() => setActiveTab("media")}
                                            className="bg-[#BF0008] hover:bg-[#9f0007] text-white rounded-xl px-8"
                                        >
                                            Continue to Media
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="media" className="space-y-8">
                            <Card className="bg-white/80 backdrop-blur-xl border border-white/20 shadow-xl rounded-3xl overflow-hidden">
                                <CardHeader className="bg-gradient-to-r from-[#F6F6F8] to-white border-b border-gray-100">
                                    <CardTitle className="flex items-center gap-2 text-[#BF0008]">
                                        <Volume2 className="w-5 h-5" />
                                        Multimedia Content
                                        <span className="ml-auto text-sm font-normal text-gray-500">Step 4 of 4</span>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-8">
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-8 h-8 bg-[#BF0008] rounded-full flex items-center justify-center">
                                                <span className="text-white text-sm font-bold">1</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900">Audio Practice Materials</h3>
                                                <p className="text-gray-600">Add audio content to enhance the learning experience</p>
                                            </div>
                                        </div>

                                        <CourseAudioUploader
                                            audioPracticeUrl={formData.audioPracticeUrl}
                                            onAudioUrlChange={(url) => updateFormData("audioPracticeUrl", url)}
                                            disabled={isSubmitting}
                                        />

                                        {formData.audioPracticeUrl && (
                                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
                                                <h4 className="font-medium text-purple-900 mb-3">Media Enhancement</h4>
                                                <p className="text-sm text-purple-700">
                                                    Great! Audio content will help students with pronunciation and listening skills. Consider
                                                    adding more multimedia elements in the future to create an immersive learning experience.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Final Review */}
                                    <div className="bg-gradient-to-r from-[#BF0008]/5 to-[#d4001a]/5 rounded-2xl p-6 border border-[#BF0008]/20">
                                        <h4 className="font-bold text-[#BF0008] mb-4">🎉 Ready to Launch!</h4>
                                        <p className="text-gray-700 mb-4">
                                            Your course is ready to be created. Students will be able to discover and enroll in this course
                                            once it's published.
                                        </p>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                            <div className="text-center">
                                                <div className="font-bold text-[#BF0008]">{formData.topics.length}</div>
                                                <div className="text-gray-600">Topics</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-[#BF0008]">{formData.durationWeeks}</div>
                                                <div className="text-gray-600">Weeks</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-[#BF0008]">{formData.totalSlots}</div>
                                                <div className="text-gray-600">Students</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="font-bold text-[#BF0008]">${formData.feeFull}</div>
                                                <div className="text-gray-600">Price</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Navigation */}
                                    <div className="flex justify-between pt-6 border-t border-gray-200">
                                        <Button variant="outline" onClick={() => setActiveTab("content")} className="rounded-xl px-8">
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Back to Content
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting || completionPercentage < 100}
                                            className="bg-gradient-to-r from-[#BF0008] to-[#d4001a] hover:from-[#9f0007] hover:to-[#BF0008] text-white rounded-xl px-8 shadow-lg"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            {isSubmitting ? "Creating Course..." : "Create Course"}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </section >

            {/* Floating Progress Indicator */}
            < div className="fixed bottom-8 left-8 z-50" >
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl border border-white/20">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-[#BF0008] to-[#d4001a] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{completionPercentage}%</span>
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-900">Course Creation</div>
                            <div className="text-xs text-gray-600">
                                {completionPercentage < 100 ? "In Progress" : "Ready to Create"}
                            </div>
                        </div>
                    </div>
                </div>
            </ div>
        </div >
    )
}
