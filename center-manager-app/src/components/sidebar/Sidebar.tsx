import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SidebarAvatarMenu from './SidebarAvatarMenu';

const Sidebar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col h-full bg-gray-800 text-white w-64">
      <div className="flex-grow">
        <nav className="mt-10">
          <ul>
            <li>
              <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/courses" className="block py-2 px-4 hover:bg-gray-700">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/students" className="block py-2 px-4 hover:bg-gray-700">
                Students
              </Link>
            </li>
            <li>
              <Link to="/settings" className="block py-2 px-4 hover:bg-gray-700">
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="p-4">
        <SidebarAvatarMenu toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};

export default Sidebar;