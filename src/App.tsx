import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { guestRoutes, studentRoutes, teacherRoutes, centerRoutes } from './routes/routes-config';
import './App.css';
import AuthenticateGate from './pages/authentication-gate/authenticate-page';
import StudentProfilePage from './pages/user-profile/StudentProfilePage';

const router = createBrowserRouter([
  ...guestRoutes,
  ...studentRoutes,
  ...teacherRoutes,
  ...centerRoutes
]);

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<AuthenticateGate />} />
        <Route path='/student/profile' element={<StudentProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
