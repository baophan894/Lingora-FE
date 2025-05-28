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
        path: "reviews",
        element: <ReviewsPage />,
      },
      {
        path: "/courses-list",
        element: <CoursesPage />,
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
        path: "management",
        element: <div>Center Management</div>,
      },
    ],
  },
];
