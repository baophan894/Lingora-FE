"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Link, X, Volume2 } from "lucide-react"

interface CourseAudioUploaderProps {
    audioPracticeUrl: string
    onAudioUrlChange: (url: string) => void
    disabled?: boolean
}

export function CourseAudioUploader({
    audioPracticeUrl,
    onAudioUrlChange,
    disabled = false,
}: CourseAudioUploaderProps) {
    const [urlInput, setUrlInput] = useState(audioPracticeUrl)
    const [isEditing, setIsEditing] = useState(false)

    const handleSaveUrl = () => {
        onAudioUrlChange(urlInput)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setUrlInput(audioPracticeUrl)
        setIsEditing(false)
    }

    const handleRemove = () => {
        onAudioUrlChange("")
        setUrlInput("")
        setIsEditing(false)
    }

    return (
        <div className="space-y-4">
            <Label className="text-sm font-medium text-gray-700">Audio Practice URL</Label>

            {!isEditing && !audioPracticeUrl && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <Volume2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">Add an audio practice file for this course</p>
                    <div className="flex gap-2 justify-center">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(true)}
                            disabled={disabled}
                            className="hover:bg-gray-50"
                        >
                            <Link className="w-4 h-4 mr-2" />
                            Add URL
                        </Button>
                    </div>
                </div>
            )}

            {!isEditing && audioPracticeUrl && (
                <div className="bg-[#F6F6F8] rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <Volume2 className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">Audio Practice File</span>
                            </div>
                            <p className="text-sm text-gray-600 break-all">{audioPracticeUrl}</p>
                            {audioPracticeUrl.startsWith("http") && (
                                <audio controls className="mt-3 w-full max-w-md">
                                    <source src={audioPracticeUrl} />
                                    Your browser does not support the audio element.
                                </audio>
                            )}
                        </div>
                        {!disabled && (
                            <div className="flex gap-1 ml-3">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                        setUrlInput(audioPracticeUrl)
                                        setIsEditing(true)
                                    }}
                                    className="hover:bg-gray-200"
                                >
                                    <Link className="w-4 h-4" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleRemove}
                                    className="hover:bg-red-50 hover:text-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isEditing && (
                <div className="space-y-3">
                    <Input
                        placeholder="Enter audio file URL (e.g., https://example.com/audio.mp3)"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        disabled={disabled}
                    />
                    <div className="flex gap-2">
                        <Button
                            type="button"
                            onClick={handleSaveUrl}
                            disabled={disabled}
                            size="sm"
                            className="bg-[#BF0008] hover:bg-[#9f0007] text-white"
                        >
                            Save URL
                        </Button>
                        <Button type="button" variant="outline" onClick={handleCancel} disabled={disabled} size="sm">
                            Cancel
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
