import React, { useState } from "react";
import {
  Menu,
  LogOut,
  Users,
  Calendar,
  Settings,
  ChevronLeft,
  ChevronRight,
  Bell,
} from "lucide-react";

const Sidebar = ({ isOpen }) => {
  const menuItems = [
    { icon: Users, label: "Visitors", path: "/visitors" },
    { icon: Calendar, label: "Meetings", path: "/meetings" },
    { icon: Settings, label: "Settings", path: "/settings" },
    { icon: LogOut, label: "Logout", path: "/logout" },
  ];

  return (
    <aside
      className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-40 
        ${isOpen ? "w-64" : "w-20"}`}
    >
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.path}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 text-gray-700 group"
              >
                <item.icon className="h-5 w-5" />
                <span
                  className={`transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
export default Sidebar;
