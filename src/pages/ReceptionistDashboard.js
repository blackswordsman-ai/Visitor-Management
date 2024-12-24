import React, { useState, useEffect } from "react";
import {
  UserPlus,
  Users,
  Calendar,
  Clock,
  Search,
  CheckCircle,
  XCircle,
  Bell,
  Filter,
  Plus,
  X,
} from "lucide-react";
import VisitorForm from "../components/common/VisitorForm";
import visitorService from "../services/visitorService";
import LoadingSpinner from "./../components/common/LoadingSpinner";

const ReceptionistDashboard = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [showVisitorForm, setShowVisitorForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVisitors, setActiveVisitors] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, message: "New visitor check-in request", time: "2 mins ago" },
    { id: 2, message: "Meeting room A203 is ready", time: "5 mins ago" },
  ]);

  // Fetch active visitors on component mount
  useEffect(() => {
    fetchActiveVisitors();
  }, []);

  const fetchActiveVisitors = async () => {
    try {
      setIsLoading(true);
      const response = await visitorService.getActiveVisitors();
      if (response.success) {
        setActiveVisitors(response.data);
      }
    } catch (error) {
      console.error("Error fetching active visitors:", error);
      // You might want to add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const handleVisitorSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const response = await visitorService.createVisitor({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        purpose: formData.purpose,
        companyName: formData.companyName,
        hostName: formData.hostName,
        visitorType: formData.visitorType || "walkin",
        expectedDuration: parseFloat(formData.expectedDuration),
        status: "Waiting",
      });

      if (response.success) {
        setActiveVisitors((prev) => [response.data, ...prev]);
        setShowVisitorForm(false);
        // Show success notification
        alert("Visitor registered successfully!");
      }
    } catch (error) {
      console.error("Error registering visitor:", error);
      alert("Failed to register visitor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async (visitorId) => {
    try {
      const response = await visitorService.checkoutVisitor(visitorId);
      if (response.success) {
        setActiveVisitors((prev) => prev.filter((v) => v._id !== visitorId));
        // Show success notification
        alert("Visitor checked out successfully!");
      }
    } catch (error) {
      console.error("Error checking out visitor:", error);
      alert("Failed to check out visitor. Please try again.");
    }
  };

  // Filter visitors based on search query
  const filteredVisitors = activeVisitors.filter(
    (visitor) =>
      visitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
      visitor.hostName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Quick Actions Bar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <button
                onClick={() => setActiveTab("active")}
                className={`inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                  activeTab === "active"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Active Visitors
              </button>
              <button
                onClick={() => setActiveTab("scheduled")}
                className={`ml-8 inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium ${
                  activeTab === "scheduled"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Scheduled Meetings
              </button>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowVisitorForm(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                <UserPlus className="h-5 w-5 mr-2" />
                New Visitor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-lg">
            <input
              type="text"
              placeholder="Search visitors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Filter className="h-5 w-5" />
            </button>
            <div className="relative">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Visitor List */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            {isLoading ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner />
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {filteredVisitors.length === 0 ? (
                  <div className="py-8 text-center text-gray-500">
                    No active visitors found
                  </div>
                ) : (
                  filteredVisitors.map((visitor) => (
                    <div key={visitor._id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-600 font-medium">
                                {visitor.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">
                              {visitor.name}
                            </h3>
                            <div className="text-sm text-gray-500">
                              {visitor.companyName} • {visitor.purpose}
                            </div>
                            <div className="text-sm text-gray-500">
                              Host: {visitor.hostName}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-sm text-gray-900">
                              Check-in:{" "}
                              {new Date(visitor.checkIn).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </div>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${
                                visitor.status === "Waiting"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {visitor.status}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleCheckOut(visitor._id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <XCircle className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Visitor Form Modal */}
      {showVisitorForm && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  onClick={() => setShowVisitorForm(false)}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <VisitorForm onSubmit={handleVisitorSubmit} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionistDashboard;
