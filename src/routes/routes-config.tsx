import EditStudentProfilePage from "../pages/profile-page/edit-student-profile-page";
import type { RouteObject } from "react-router-dom";
import { StudentLayout } from "../layouts/student-layout";
import { TeacherLayout } from "../layouts/teacher-layout";
import { CenterLayout } from "../layouts/center-layout";
import AuthenticateGate from "../pages/authentication-gate/authenticate-page";
import Chat from "../pages/Chat";
import LandingPage from "../pages/landing-page/landing-page";
import ReviewsPage from "../pages/review-page/review-page";
import ProfilePage from "../pages/profile-page/profile-page";
import CoursesPage from "../pages/search-course-page/search-course-page";
import ForgotPasswordPage from "../pages/forgot-password-page/forgot-password-page";
import ResetPasswordPage from "../pages/forgot-password-page/reset-password-page";
import VerifyTokenPage from "../pages/authentication-gate/verify-token-page";
import StudentAttendancePage from "../pages/student-attendance-page/student-attendance-page";
import TeacherAccountPage from "../pages/teacher-account-page/teacher-account-page";
import StudentAccountPage from "../pages/student-account-page/student-account-page";
import ClassManagementPage from "../pages/class-management-page";
import {
  CreateCoursePage,
  CourseDashboardPage,
} from "../pages/course-management-page";
import { CourseViewPage } from "../pages/course-view-page";

export const guestRoutes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthenticateGate />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage />,
  },
  {
    path: "/verify-email",
    element: <VerifyTokenPage />,
  },
  {
    path: "/",
    element: <StudentLayout />,
    children: [
      {
        path: "",
        element: <LandingPage />,
      },
      {
        path: "/reviews",
        element: <ReviewsPage />,
      },
      {
        path: "/courses-list",
        element: <CoursesPage />,
      },
      {
        path: "/courses/:courseId",
        element: <CourseViewPage />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
    ],
  },
];

export const chatRoutes: RouteObject[] = [
  {
    path: "/chat",
    element: <Chat />,
  },
];

export const studentRoutes: RouteObject[] = [
  {
    path: "/student",
    element: <StudentLayout />,
    children: [
      {
        path: "",
        //   element: <HomePage />
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "profile-edit",
        element: <EditStudentProfilePage />,
      },
      {
        path: "progress",
        element: <StudentAttendancePage />,
      },
    ],
  },
];

export const teacherRoutes: RouteObject[] = [
  {
    path: "/teacher",
    element: <TeacherLayout />,
    children: [
      // {
      //   path: '',
      //   element: <HomePage />
      // },
      {
        path: "classes",
        element: <div>Teacher Classes</div>,
      },
    ],
  },
];

export const centerRoutes: RouteObject[] = [
  {
    path: "/center",
    element: <CenterLayout />,
    children: [
      {
        path: "attendance",
        element: <StudentAttendancePage />,
      },
      {
        path: "teacher-accounts",
        element: <TeacherAccountPage />,
      },
      {
        path: "student-accounts",
        element: <StudentAccountPage />,
      },
      {
        path: "class-management",
        element: <ClassManagementPage />,
      },
      {
        path: "course-management",
        element: <CourseDashboardPage />,
      },
      {
        path: "create-course",
        element: <CreateCoursePage />,
      },
      {
        path: "courses-list",
        element: <CourseDashboardPage />,
      },
    ],
  },
];
