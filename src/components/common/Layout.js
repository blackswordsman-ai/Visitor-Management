// src/components/Layout.js
import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Menu,
  LogOut,
  Users,
  Calendar,
  Settings,
  Home,
  UserPlus,
  Clock,
  Bell,
} from "lucide-react";

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    if (user?.role === "admin") {
      return [
        { path: "/admin", label: "Dashboard", icon: Home },
        { path: "/admin/users", label: "User Management", icon: Users },
        { path: "/admin/rooms", label: "Room Management", icon: Settings },
        { path: "/admin/logs", label: "System Logs", icon: Clock },
      ];
    }
    return [
      { path: "/receptionist", label: "Dashboard", icon: Home },
      {
        path: "/receptionist/visitor-registration",
        label: "New Visitor",
        icon: UserPlus,
      },
      { path: "/receptionist/meetings", label: "Meetings", icon: Calendar },
      { path: "/receptionist/logs", label: "Visitor Logs", icon: Clock },
    ];
  };

  const navLinks = getNavLinks();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 h-16 z-50">
        <div className="flex items-center justify-between px-4 h-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              Visitor Management System
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="h-6 w-6 text-gray-600" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0) || "U"}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {user?.name}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
        transition-all duration-300 z-40 ${isSidebarOpen ? "w-64" : "w-20"}`}
      >
        <nav className="p-4">
          <ul className="space-y-2">
            {navLinks.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={index}>
                  <a
                    href={item.path}
                    className={`flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100
                      ${
                        isActive ? "bg-blue-50 text-blue-600" : "text-gray-700"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span
                      className={`transition-opacity ${
                        isSidebarOpen ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}

            {/* Logout Button */}
            <li className="pt-4 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 p-2 rounded-lg text-red-600 hover:bg-red-50 w-full"
              >
                <LogOut className="h-5 w-5" />
                <span
                  className={`transition-opacity ${
                    isSidebarOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  Logout
                </span>
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`pt-16 pb-12 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
