import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import CenterManagerSidebar from "../components/sidebar/center-manager-sidebar";

export const CenterLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="bg-primary-800 text-white p-2 rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <CenterManagerSidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <main className="flex-1 bg-[#F6F6F8] overflow-auto lg:ml-0">
        <div className="w-full h-full pt-16 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
