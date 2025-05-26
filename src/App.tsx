import { createBrowserRouter } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { guestRoutes, studentRoutes, teacherRoutes, centerRoutes, chatRoutes } from './routes/routes-config';
import './App.css';
import AuthenticateGate from './pages/authentication-gate/authenticate-page';
import Chat from './pages/Chat';

const router = createBrowserRouter([
  ...guestRoutes,
  ...studentRoutes,
  ...teacherRoutes,
  ...centerRoutes,
  ...chatRoutes
]);

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<AuthenticateGate/>}/> 
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </Router>
  );
}

export default App;
