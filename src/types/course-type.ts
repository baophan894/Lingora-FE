export type Course = {
    id: string
    code: string
    name: string
    description: string
    language: string
    level: string
    durationWeeks: number
    totalSlots: number
    feeFull: number
    feeInstallment: number
    createdBy: string
    createdAt: string
    updatedAt: string
    isActive: boolean
    audioPracticeUrl: string
    topics: string[]
}

export type CourseFilters = {
    search: string
    language: string
    level: string
    isActive: boolean | null
}

export type CourseFormData = Omit<Course, "id" | "createdAt" | "updatedAt">
