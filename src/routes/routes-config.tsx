import { Navigate, type RouteObject } from 'react-router-dom';
import { StudentLayout } from '../layouts/student-layout';
import { TeacherLayout } from '../layouts/teacher-layout';
import { CenterLayout } from '../layouts/center-layout';
import AuthenticateGate from '../pages/authentication-gate/authenticate-page';
import Chat from '../pages/Chat';
import LandingPage from '../pages/landing-page/landing-page';
import ReviewsPage from '../pages/review-page/review-page';
import ProfilePage from '../pages/profile-page/profile-page';
import EditStudentProfilePage from '../pages/profile-page/edit-student-profile-page';
import CoursesPage from '../pages/search-course-page/search-course-page';
import {
  CourseListPageWrapper,
  CourseCreatePageWrapper,
  CourseEditPageWrapper,
  CourseDetailPageWrapper,
  GuestCourseDetailPageWrapper,
  GuestCourseListPageWrapper,
} from "../components/wrapper/course-page-wrapper";

export const guestRoutes: RouteObject[] = [
  {
    path: '/login',
    element: <AuthenticateGate />
  },
  {
    path: '/search',
    element: <CoursesPage />
  },
  {
    path: '/',
    element: <StudentLayout />,
    children: [
      {
        path: '',
        element: <LandingPage />
      },
      {
        path: 'reviews',
        element: <ReviewsPage />
      },
      {
        path: 'courses',
        element: <GuestCourseListPageWrapper />
      },
      {
        path: 'course-detail/:courseId',
        element: <GuestCourseDetailPageWrapper />
      }

    ]
  }
];

export const chatRoutes: RouteObject[] = [
  {
    path: '/chat',
    element: <Chat />
  }
]

export const studentRoutes: RouteObject[] = [
  {
    path: '/student',
    element: <StudentLayout />,
    children: [
      {
        path: '',
        //   element: <HomePage />
      },
      {
        path: 'profile',
        element: <ProfilePage />
      },
      {
        path: 'profile-edit',
        element: <EditStudentProfilePage />
      }

    ]
  }
];

export const teacherRoutes: RouteObject[] = [
  {
    path: '/teacher',
    element: <TeacherLayout />,
    children: [
      // {
      //   path: '',
      //   element: <HomePage />
      // },
      {
        path: 'classes',
        element: <div>Teacher Classes</div>
      }
    ]
  }
];

export const centerRoutes: RouteObject[] = [
  {
    path: "/center",
    element: <CenterLayout />,
    children: [
      // Redirect /center to courses
      { index: true, element: <Navigate to="courses" replace /> },

      // Course list route
      { path: "courses", element: <CourseListPageWrapper /> },
      { path: "course-create", element: <CourseCreatePageWrapper /> },

      // Course editing route
      { path: "course-edit/:courseId", element: <CourseEditPageWrapper /> },

      // Course detail view route
      { path: "course-detail/:courseId", element: <CourseDetailPageWrapper /> },
    ],
  },
];