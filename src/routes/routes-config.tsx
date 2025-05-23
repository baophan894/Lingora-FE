import type { RouteObject } from 'react-router-dom';
import { StudentLayout } from '../layouts/student-layout';
import { TeacherLayout } from '../layouts/teacher-layout';
import { CenterLayout } from '../layouts/center-layout';
import AuthenticateGate from '../pages/authentication-gate/authenticate-page';

export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    element: <StudentLayout />,
    children: [
      {
        path: 'login',
        element: <AuthenticateGate />
      },
    ]
  }
];

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
        element: <div>Student Profile</div>
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
    path: '/center',
    element: <CenterLayout />,
    children: [
      {
        path: 'management',
        element: <div>Center Management</div>
      }
    ]
  }
];