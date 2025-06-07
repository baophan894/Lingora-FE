
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CourseListPage } from "../../pages/course-manage-page/course-list-page";
import { CourseCreatePage } from "../../pages/course-manage-page/course-create-page";
import { CourseEditPage } from "../../pages/course-manage-page/course-edit-page";
import { CourseDetailPage } from "../../pages/course-manage-page/course-detail-page";
import type { Course } from "../../types/course-type"; // Adjust if your Course type is elsewhere
import { GuestCourseDetailPage } from "../../pages/course-manage-page/guest/course-detail-page";
import { GuestCourseListPage } from "../../pages/course-manage-page/guest/course-list-page";

export function CourseListPageWrapper() {
    const navigate = useNavigate();

    return (
        <CourseListPage
            onCreateCourse={() => navigate("/center/course-create")}
            onViewCourse={(course: Course) =>
                navigate(`/center/course-detail/${course._id}`)
            }
            onEditCourse={(course: Course) =>
                navigate(`/center/course-edit/${course._id}`)
            }
        />
    );
}

export function CourseCreatePageWrapper() {
    const navigate = useNavigate();

    return (
        <CourseCreatePage
            onBack={() => navigate("/center/courses")}
            onSuccess={() => navigate("/center/courses")}
        />
    );
}

export function CourseEditPageWrapper() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    return (
        <CourseEditPage
            courseId={courseId}
            onBack={() => navigate("/center/courses")}
            onSuccess={() => navigate("/center/courses")}
        />
    );
}

export function CourseDetailPageWrapper() {
    const navigate = useNavigate();
    const { courseId } = useParams();

    return (
        <CourseDetailPage
            courseId={courseId}
            onBack={() => navigate("/center/courses")}
            onEdit={(course: Course) =>
                navigate(`/center/course-edit/${course._id}`)
            }
        />
    );
}

export function GuestCourseDetailPageWrapper() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    if (!courseId) return <div>Invalid course ID</div>;

    return (
        <GuestCourseDetailPage
            courseId={courseId}
            onBack={() => navigate("/courses")}
            onViewCourse={(course) => navigate(`/course-detail/${course._id}`)}
        />
    );
}

export function GuestCourseListPageWrapper() {
    const navigate = useNavigate();

    return (
        <GuestCourseListPage
            onViewCourse={(course: Course) => navigate(`/course-detail/${course._id}`)}
        />
    );
}
