"use client"

import type { CourseFilters } from "../../types/course-type"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Search, X } from "lucide-react"

interface CourseFilterBarProps {
    filters: CourseFilters
    onFiltersChange: (filters: CourseFilters) => void
    onReset: () => void
}

export function CourseFilterBar({ filters, onFiltersChange, onReset }: CourseFilterBarProps) {
    const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Chinese", "Japanese"]
    const levels = ["Beginner", "Elementary", "Intermediate", "Upper-Intermediate", "Advanced"]

    const hasActiveFilters = filters.search || filters.language || filters.level || filters.isActive !== null

    return (
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search courses by name or code..."
                        value={filters.search}
                        onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
                        className="pl-10"
                    />
                </div>

                {/* Language Filter */}
                <Select value={filters.language} onValueChange={(value) => onFiltersChange({ ...filters, language: value })}>
                    <SelectTrigger className="w-full lg:w-48">
                        <SelectValue placeholder="All Languages" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="All Languages">All Languages</SelectItem>
                        {languages.map((lang) => (
                            <SelectItem key={lang} value={lang} >
                                {lang}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Level Filter */}
                <Select value={filters.level} onValueChange={(value) => onFiltersChange({ ...filters, level: value })}>
                    <SelectTrigger className="w-full lg:w-48">
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

                {/* Status Filter */}
                <Select
                    value={filters.isActive === null ? "all" : filters.isActive.toString()}
                    onValueChange={(value) =>
                        onFiltersChange({
                            ...filters,
                            isActive: value === "all" ? null : value === "true",
                        })
                    }

                >
                    <SelectTrigger className="w-full lg:w-48">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="true">Active</SelectItem>
                        <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                </Select>

                {/* Reset Button */}
                {hasActiveFilters && (
                    <Button variant="outline" onClick={onReset} className="w-full lg:w-auto hover:bg-gray-50">
                        <X className="w-4 h-4 mr-2" />
                        Reset
                    </Button>
                )}
            </div>
        </div>
    )
}
