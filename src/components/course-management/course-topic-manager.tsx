"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Badge } from "../../components/ui/badge"
import { Plus, X } from "lucide-react"

interface CourseTopicManagerProps {
    topics: string[]
    onTopicsChange: (topics: string[]) => void
    disabled?: boolean
}

export function CourseTopicManager({ topics, onTopicsChange, disabled = false }: CourseTopicManagerProps) {
    const [newTopic, setNewTopic] = useState("")

    const addTopic = () => {
        if (newTopic.trim() && !topics.includes(newTopic.trim())) {
            onTopicsChange([...topics, newTopic.trim()])
            setNewTopic("")
        }
    }

    const removeTopic = (topicToRemove: string) => {
        onTopicsChange(topics.filter((topic) => topic !== topicToRemove))
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addTopic()
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    placeholder="Enter topic name..."
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={disabled}
                    className="flex-1"
                />
                <Button
                    type="button"
                    onClick={addTopic}
                    disabled={!newTopic.trim() || disabled}
                    size="sm"
                    className="bg-[#BF0008] hover:bg-[#9f0007] text-white"
                >
                    <Plus className="w-4 h-4 mr-1" />
                    Add
                </Button>
            </div>

            {topics.length > 0 && (
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Topics ({topics.length})</label>
                    <div className="flex flex-wrap gap-2">
                        {topics.map((topic, index) => (
                            <Badge
                                key={index}
                                variant="secondary"
                                className="bg-[#F6F6F8] text-gray-700 hover:bg-gray-200 transition-colors"
                            >
                                {topic}
                                {!disabled && (
                                    <button
                                        type="button"
                                        onClick={() => removeTopic(topic)}
                                        className="ml-2 hover:text-red-600 transition-colors"
                                    >
                                        <X className="w-3 h-3" />
                                    </button>
                                )}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            {topics.length === 0 && (
                <div className="text-sm text-gray-500 italic">
                    No topics added yet. Add topics to help organize course content.
                </div>
            )}
        </div>
    )
}
