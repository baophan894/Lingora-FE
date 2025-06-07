"use client"

import { useState } from "react"
import type { Course } from "../../types/course-type"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Switch } from "../../components/ui/switch"
import { CourseTopicManager } from "./course-topic-manager"
import { CourseAudioUploader } from "./course-audio-uploader"
import { Edit, Save, X, Calendar, User, Clock, Users, DollarSign, Volume2, BookOpen } from "lucide-react"

interface CourseDetailSectionProps {
    course: Course
    onUpdate: (updates: Partial<Course>) => void
    onEdit: () => void
}

export function CourseDetailSection({ course, onUpdate, onEdit }: CourseDetailSectionProps) {
    const [isEditingStatus, setIsEditingStatus] = useState(false)
    const [isEditingTopics, setIsEditingTopics] = useState(false)
    const [isEditingAudio, setIsEditingAudio] = useState(false)

    const handleStatusToggle = (isActive: boolean) => {
        onUpdate({ isActive })
        setIsEditingStatus(false)
    }

    const handleTopicsUpdate = (topics: string[]) => {
        onUpdate({ topics })
        setIsEditingTopics(false)
    }

    const handleAudioUpdate = (audioPracticeUrl: string) => {
        onUpdate({ audioPracticeUrl })
        setIsEditingAudio(false)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">{course.name}</h1>
                        <p className="text-gray-600 font-medium">{course.code}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Badge
                            variant={course.isActive ? "default" : "secondary"}
                            className={course.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}
                        >
                            {course.isActive ? "Active" : "Inactive"}
                        </Badge>
                        <Button onClick={onEdit} className="bg-[#BF0008] hover:bg-[#9f0007] text-white">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Course
                        </Button>
                    </div>
                </div>

                <p className="text-gray-700 leading-relaxed">{course.description}</p>
            </div>

            {/* Basic Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Course Information
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Language & Level</p>
                            <div className="flex gap-2">
                                <Badge variant="outline">{course.language}</Badge>
                                <Badge variant="outline">Level {course.level}</Badge>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Duration</p>
                            <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{course.durationWeeks} weeks</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Capacity</p>
                            <div className="flex items-center gap-1">
                                <Users className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">{course.totalSlots} slots</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Full Fee</p>
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">${course.feeFull}</span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-gray-500">Installment Fee</p>
                            <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-gray-400" />
                                <span className="font-medium">${course.feeInstallment}</span>
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

            {/* Status Management */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Course Status</CardTitle>
                        {!isEditingStatus && (
                            <Button variant="outline" size="sm" onClick={() => setIsEditingStatus(true)}>
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
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

            {/* Topics Management */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Course Topics</CardTitle>
                        {!isEditingTopics && (
                            <Button variant="outline" size="sm" onClick={() => setIsEditingTopics(true)}>
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
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
                                        <Badge key={index} variant="secondary" className="bg-[#F6F6F8] text-gray-700">
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

            {/* Audio Practice */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="flex items-center gap-2">
                            <Volume2 className="w-5 h-5" />
                            Audio Practice
                        </CardTitle>
                        {!isEditingAudio && (
                            <Button variant="outline" size="sm" onClick={() => setIsEditingAudio(true)}>
                                <Edit className="w-4 h-4 mr-1" />
                                Edit
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
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

            {/* Metadata */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Course Metadata
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="font-medium text-gray-500 mb-1">Created</p>
                            <p className="text-gray-900">{new Date(course.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="font-medium text-gray-500 mb-1">Last Updated</p>
                            <p className="text-gray-900">{new Date(course.updatedAt).toLocaleDateString()}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
