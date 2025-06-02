import React, { useState } from 'react';

const SidebarAvatarMenu: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer" onClick={toggleMenu}>
        <img
          src="/path/to/avatar.jpg" // Replace with actual avatar path
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
          <ul className="py-1">
            <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
              Logout
            </li>
            {/* Add more options here if needed */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SidebarAvatarMenu;