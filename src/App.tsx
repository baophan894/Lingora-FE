import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Toaster } from 'sonner'
import { guestRoutes, studentRoutes, teacherRoutes, centerRoutes, chatRoutes } from './routes/routes-config';
import './App.css';
import RootLayout from './components/common/root-layout';

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      ...guestRoutes,    // Includes LandingPage, Login, Reviews with StudentLayout
      ...studentRoutes,  // Student specific routes with StudentLayout
      ...teacherRoutes,  // Teacher specific routes with TeacherLayout
      ...centerRoutes,   // Center management routes with CenterLayout
      ...chatRoutes,     // Chat routes with ChatLayout
    ],
  },
]);
function App() {
  return (
    <Provider store={store}>
      <Toaster position='top-right' richColors />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
