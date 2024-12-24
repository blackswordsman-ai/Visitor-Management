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

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 h-12 z-50">
      <div className="flex items-center justify-between px-4 h-full">
        <span className="text-sm text-gray-500">
          © 2024 Visitor Management System
        </span>
        <div className="flex items-center space-x-4">
          <a
            href="/privacy"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
