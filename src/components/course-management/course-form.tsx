"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Course, CourseFormData } from "../../types/course-type"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Switch } from "../../components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { CourseTopicManager } from "./course-topic-manager"
import { CourseAudioUploader } from "./course-audio-uploader"
import { Save, ArrowLeft } from "lucide-react"

interface CourseFormProps {
    initialData?: Course
    onSubmit: (data: CourseFormData) => void
    onCancel: () => void
    isSubmitting?: boolean
    mode: "create" | "edit"
}

export function CourseForm({ initialData, onSubmit, onCancel, isSubmitting = false, mode }: CourseFormProps) {
    const [formData, setFormData] = useState<CourseFormData>({
        code: "",
        name: "",
        description: "",
        language: "",
        level: "",
        durationWeeks: 1,
        totalSlots: 1,
        feeFull: 0,
        feeInstallment: 0,
        createdBy: "Admin User",
        isActive: true,
        audioPracticeUrl: "",
        topics: [],
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        if (initialData) {
            setFormData({
                code: initialData.code,
                name: initialData.name,
                description: initialData.description,
                language: initialData.language,
                level: initialData.level,
                durationWeeks: initialData.durationWeeks,
                totalSlots: initialData.totalSlots,
                feeFull: initialData.feeFull,
                feeInstallment: initialData.feeInstallment,
                createdBy: initialData.createdBy,
                isActive: initialData.isActive,
                audioPracticeUrl: initialData.audioPracticeUrl,
                topics: initialData.topics,
            })
        }
    }, [initialData])

    const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese"]
    const levels = ["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced"]

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}

        if (!formData.code.trim()) newErrors.code = "Course code is required"
        if (!formData.name.trim()) newErrors.name = "Course name is required"
        if (!formData.description.trim()) newErrors.description = "Description is required"
        if (!formData.language) newErrors.language = "Language is required"
        if (!formData.level) newErrors.level = "Level is required"
        if (formData.durationWeeks < 1) newErrors.durationWeeks = "Duration must be at least 1 week"
        if (formData.totalSlots < 1) newErrors.totalSlots = "Total slots must be at least 1"
        if (formData.feeFull < 0) newErrors.feeFull = "Full fee cannot be negative"
        if (formData.feeInstallment < 0) newErrors.feeInstallment = "Installment fee cannot be negative"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (validateForm()) {
            onSubmit(formData)
        }
    }

    const updateFormData = (field: keyof CourseFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: "" }))
        }
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <Button variant="ghost" size="sm" onClick={onCancel} className="hover:bg-gray-100">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back
                    </Button>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{mode === "create" ? "Create New Course" : "Edit Course"}</h1>
                <p className="text-gray-600 mt-1">
                    {mode === "create"
                        ? "Fill in the details below to create a new course."
                        : "Update the course information below."}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Basic Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="code">Course Code *</Label>
                                <Input
                                    id="code"
                                    value={formData.code}
                                    onChange={(e) => updateFormData("code", e.target.value)}
                                    placeholder="e.g., ENG-101"
                                    className={errors.code ? "border-red-500" : ""}
                                />
                                {errors.code && <p className="text-sm text-red-600 mt-1">{errors.code}</p>}
                            </div>

                            <div>
                                <Label htmlFor="name">Course Name *</Label>
                                <Input
                                    id="name"
                                    value={formData.name}
                                    onChange={(e) => updateFormData("name", e.target.value)}
                                    placeholder="e.g., English for Beginners"
                                    className={errors.name ? "border-red-500" : ""}
                                />
                                {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="description">Description *</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => updateFormData("description", e.target.value)}
                                placeholder="Describe the course content and objectives..."
                                rows={3}
                                className={errors.description ? "border-red-500" : ""}
                            />
                            {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label>Language *</Label>
                                <Select value={formData.language} onValueChange={(value) => updateFormData("language", value)}>
                                    <SelectTrigger className={errors.language ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select language" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {languages.map((lang) => (
                                            <SelectItem key={lang} value={lang} >
                                                {lang}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.language && <p className="text-sm text-red-600 mt-1">{errors.language}</p>}
                            </div>

                            <div>
                                <Label>Level *</Label>
                                <Select value={formData.level} onValueChange={(value) => updateFormData("level", value)}>
                                    <SelectTrigger className={errors.level ? "border-red-500" : ""}>
                                        <SelectValue placeholder="Select level" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white">
                                        {levels.map((level) => (
                                            <SelectItem key={level} value={level} >
                                                {level}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.level && <p className="text-sm text-red-600 mt-1">{errors.level}</p>}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Course Details */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Course Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="duration">Duration (Weeks) *</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    min="1"
                                    value={formData.durationWeeks}
                                    onChange={(e) => updateFormData("durationWeeks", Number.parseInt(e.target.value) || 1)}
                                    className={errors.durationWeeks ? "border-red-500" : ""}
                                />
                                {errors.durationWeeks && <p className="text-sm text-red-600 mt-1">{errors.durationWeeks}</p>}
                            </div>

                            <div>
                                <Label htmlFor="slots">Total Slots *</Label>
                                <Input
                                    id="slots"
                                    type="number"
                                    min="1"
                                    value={formData.totalSlots}
                                    onChange={(e) => updateFormData("totalSlots", Number.parseInt(e.target.value) || 1)}
                                    className={errors.totalSlots ? "border-red-500" : ""}
                                />
                                {errors.totalSlots && <p className="text-sm text-red-600 mt-1">{errors.totalSlots}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="feeFull">Full Fee ($) *</Label>
                                <Input
                                    id="feeFull"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.feeFull}
                                    onChange={(e) => updateFormData("feeFull", Number.parseFloat(e.target.value) || 0)}
                                    className={errors.feeFull ? "border-red-500" : ""}
                                />
                                {errors.feeFull && <p className="text-sm text-red-600 mt-1">{errors.feeFull}</p>}
                            </div>

                            <div>
                                <Label htmlFor="feeInstallment">Installment Fee ($) *</Label>
                                <Input
                                    id="feeInstallment"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={formData.feeInstallment}
                                    onChange={(e) => updateFormData("feeInstallment", Number.parseFloat(e.target.value) || 0)}
                                    className={errors.feeInstallment ? "border-red-500" : ""}
                                />
                                {errors.feeInstallment && <p className="text-sm text-red-600 mt-1">{errors.feeInstallment}</p>}
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="isActive"
                                checked={formData.isActive}
                                onCheckedChange={(checked) => updateFormData("isActive", checked)}
                            />
                            <Label htmlFor="isActive">Course is active</Label>
                        </div>
                    </CardContent>
                </Card>

                {/* Topics */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Course Topics</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CourseTopicManager
                            topics={formData.topics}
                            onTopicsChange={(topics) => updateFormData("topics", topics)}
                            disabled={isSubmitting}
                        />
                    </CardContent>
                </Card>

                {/* Audio Practice */}
                <Card className="bg-white">
                    <CardHeader>
                        <CardTitle className="text-lg">Audio Practice</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CourseAudioUploader
                            audioPracticeUrl={formData.audioPracticeUrl}
                            onAudioUrlChange={(url) => updateFormData("audioPracticeUrl", url)}
                            disabled={isSubmitting}
                        />
                    </CardContent>
                </Card>

                {/* Form Actions */}
                <div className="flex gap-3 pt-6 border-t border-gray-200">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1 md:flex-none bg-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 md:flex-none bg-[#BF0008] hover:bg-[#9f0007] text-white"
                    >
                        <Save className="w-4 h-4 mr-2" />
                        {isSubmitting
                            ? mode === "create"
                                ? "Creating..."
                                : "Updating..."
                            : mode === "create"
                                ? "Create Course"
                                : "Update Course"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
