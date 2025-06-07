import axiosPublic from "../utils/axios/axiosPublic"
import axiosInstance from "../utils/axios/axiosPrivate"
import type { Course, CourseFormData, CourseFilters } from "../types/course-type"

export const CourseService = {
    // For authenticated users (center manager)
    getAllCourses: async () => {
        const response = await axiosInstance.get('http://localhost:4000/courses');
        return response.data;
    },
    getCourseById: async (id: string) => {
        const response = await axiosInstance.get<Course>(`http://localhost:4000/courses/${id}`)
        return response.data
    },

    createCourse: (courseData: CourseFormData) => {
        return axiosInstance.post<Course>("http://localhost:4000/courses", courseData)
    },

    updateCourse: (id: string, courseData: CourseFormData) => {
        return axiosInstance.patch<Course>(`http://localhost:4000/courses/${id}`, courseData)
    },

    deleteCourse: (id: string) => {
        return axiosInstance.delete<Course>(`http://localhost:4000/courses/${id}`)
    },

    // For guests
    getActiveCourses: async () => {
        const response = await axiosInstance.get('http://localhost:4000/courses/active');
        return response.data;
    },

    getActiveCourseById: async (id: string) => {
        const response = await axiosInstance.get<Course>(`http://localhost:4000/courses/${id}`)
        return response.data
    }
}