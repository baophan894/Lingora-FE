"use client"

import type { Course } from "../../types/course-type"
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../components/ui/dialog"
import { AlertTriangle } from "lucide-react"

interface CourseConfirmDeleteModalProps {
    course: Course | null
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    isDeleting?: boolean
}

export function CourseConfirmDeleteModal({
    course,
    isOpen,
    onClose,
    onConfirm,
    isDeleting = false,
}: CourseConfirmDeleteModalProps) {
    if (!course) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                        </div>
                        <div>
                            <DialogTitle className="text-lg font-semibold text-gray-900">Delete Course</DialogTitle>
                            <DialogDescription className="text-sm text-gray-600 mt-1">
                                This action cannot be undone.
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="py-4">
                    <p className="text-sm text-gray-700 mb-4">Are you sure you want to delete the following course?</p>

                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="font-medium text-gray-900">{course.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                            Code: {course.code} • {course.language} • Level {course.level}
                        </div>
                        <div className="text-sm text-gray-500 mt-2">
                            {course.totalSlots} slots • {course.durationWeeks} weeks • ${course.feeFull}
                        </div>
                    </div>
                </div>

                <DialogFooter className="flex gap-3">
                    <Button variant="outline" onClick={onClose} disabled={isDeleting} className="flex-1">
                        Cancel
                    </Button>
                    <Button onClick={onConfirm} disabled={isDeleting} className="flex-1 bg-red-600 hover:bg-red-700 text-white">
                        {isDeleting ? "Deleting..." : "Delete Course"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
