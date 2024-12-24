// src/pages/AdminDashboard.js
import React, { useState, useEffect } from "react";
import {
  Users,
  Settings,
  UserPlus,
  DoorOpen,
  AlertTriangle,
  Trash2,
  Edit,
  Plus,
  Search,
  Download,
  Filter,
  Calendar,
  Bell,
  XCircle,
  CheckCircle,
  MoreVertical,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminDashboard = () => {
  // Main state for the dashboard
  const [activeTab, setActiveTab] = useState("overview");
  const [showAddModal, setShowAddModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Mock data - replace with API calls
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Conference Room A",
      capacity: 20,
      amenities: ["Projector", "Video Conference", "Whiteboard"],
      status: "available",
      bookings: 145,
      utilization: 78,
    },
    {
      id: 2,
      name: "Meeting Room 1",
      capacity: 8,
      amenities: ["TV Screen", "Video Conference"],
      status: "occupied",
      bookings: 89,
      utilization: 65,
    },
    {
      id: 3,
      name: "Board Room",
      capacity: 15,
      amenities: ["Projector", "Video Conference", "Catering"],
      status: "maintenance",
      bookings: 120,
      utilization: 82,
    },
  ]);

  const [roomBookings, setRoomBookings] = useState([
    {
      id: 1,
      roomId: 1,
      title: "Team Meeting",
      organizer: "John Doe",
      date: "2024-03-20",
      startTime: "09:00",
      endTime: "10:30",
      attendees: 8,
      status: "confirmed",
    },
    {
      id: 2,
      roomId: 2,
      title: "Client Presentation",
      organizer: "Jane Smith",
      date: "2024-03-20",
      startTime: "11:00",
      endTime: "12:00",
      attendees: 5,
      status: "pending",
    },
  ]);

  // Event Handlers
  const handleDeleteRoom = (roomId) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((room) => room.id !== roomId));
    }
  };

  const handleAddRoom = (roomData) => {
    const newRoom = {
      id: rooms.length + 1,
      ...roomData,
      bookings: 0,
      utilization: 0,
    };
    setRooms([...rooms, newRoom]);
    setShowAddModal(false);
  };

  const handleUpdateRoom = (roomId, roomData) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, ...roomData } : room
      )
    );
    setShowAddModal(false);
    setSelectedRoom(null);
  };

  // Components
  const Overview = ({ rooms }) => {
    // Mock data for charts
    const visitorStats = [
      { date: "2024-03-14", visitors: 45, meetings: 12 },
      { date: "2024-03-15", visitors: 52, meetings: 15 },
      { date: "2024-03-16", visitors: 48, meetings: 10 },
      { date: "2024-03-17", visitors: 70, meetings: 22 },
      { date: "2024-03-18", visitors: 61, meetings: 18 },
      { date: "2024-03-19", visitors: 65, meetings: 20 },
      { date: "2024-03-20", visitors: 75, meetings: 25 },
    ];

    return (
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            title="Total Users"
            value="124"
            trend="+12% vs last month"
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Active Rooms"
            value={rooms.length}
            trend="+2 this month"
            icon={DoorOpen}
            color="green"
          />
          <StatCard
            title="Today's Meetings"
            value="28"
            trend="+15% vs yesterday"
            icon={Calendar}
            color="yellow"
          />
          <StatCard
            title="System Health"
            value="98%"
            trend="All systems operational"
            icon={Settings}
            color="blue"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Visitor Trends */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Visitor Trends</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#2563eb"
                    name="Visitors"
                  />
                  <Line
                    type="monotone"
                    dataKey="meetings"
                    stroke="#16a34a"
                    name="Meetings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <ActivityItem
                title="New user registered"
                description="Sarah Johnson created a new account"
                time="5 minutes ago"
                icon={UserPlus}
              />
              <ActivityItem
                title="Room booking"
                description="Conference Room A booked for team meeting"
                time="15 minutes ago"
                icon={Calendar}
              />
              <ActivityItem
                title="System update"
                description="Security patches applied successfully"
                time="1 hour ago"
                icon={Settings}
              />
            </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">System Logs</h3>
          </div>
          <div className="p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <LogEntry
                  time="10:45 AM"
                  event="User Login"
                  user="john.doe@example.com"
                  status="success"
                />
                <LogEntry
                  time="10:30 AM"
                  event="Room Booking"
                  user="sarah.smith@example.com"
                  status="success"
                />
                <LogEntry
                  time="10:15 AM"
                  event="Failed Login Attempt"
                  user="unknown@example.com"
                  status="error"
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const UserManagement = ({ setModalType, setShowAddModal }) => {
    const [users] = useState([
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
        role: "Admin",
        status: "active",
        lastLogin: "2024-03-19 09:30",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@example.com",
        role: "Receptionist",
        status: "active",
        lastLogin: "2024-03-19 10:15",
      },
      {
        id: 3,
        name: "Mike Johnson",
        email: "mike.johnson@example.com",
        role: "Receptionist",
        status: "inactive",
        lastLogin: "2024-03-18 15:45",
      },
    ]);

    return (
      <div className="space-y-6">
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Users"
            value={users.length}
            trend="+2 this month"
            icon={Users}
            color="blue"
          />
          <StatCard
            title="Active Users"
            value={users.filter((u) => u.status === "active").length}
            trend="2 inactive"
            icon={Users}
            color="green"
          />
          <StatCard
            title="Receptionists"
            value={users.filter((u) => u.role === "Receptionist").length}
            trend="+1 this month"
            icon={Users}
            color="yellow"
          />
        </div>

        {/* User List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">User Management</h3>
            <button
              onClick={() => {
                setModalType("user");
                setShowAddModal(true);
              }}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Add User
            </button>
          </div>

          <div className="p-4">
            {/* Search and Filter */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </button>
              <button className="px-4 py-2 border rounded-lg flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>

            {/* Users Table */}
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 font-medium">
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.role}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            user.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.lastLogin}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const RoomManagement = () => {
    return (
      <div className="space-y-6">
        {/* Room Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Rooms"
            value={rooms.length}
            trend="+2 this month"
            icon={DoorOpen}
            color="blue"
          />
          <StatCard
            title="Active Bookings"
            value={roomBookings.filter((b) => b.status === "confirmed").length}
            trend="5 pending"
            icon={Calendar}
            color="green"
          />
          <StatCard
            title="Average Utilization"
            value="75%"
            trend="+12% vs last month"
            icon={AlertTriangle}
            color="yellow"
          />
        </div>

        {/* Room List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Meeting Rooms</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search rooms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg w-64"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button
                onClick={() => {
                  setModalType("room");
                  setShowAddModal(true);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Room
              </button>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onEdit={() => {
                    setSelectedRoom(room);
                    setModalType("room");
                    setShowAddModal(true);
                  }}
                  onDelete={() => handleDeleteRoom(room.id)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Room Bookings */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Recent Bookings</h3>
          </div>
          <div className="p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Meeting
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {roomBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {rooms.find((r) => r.id === booking.roomId)?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        By {booking.organizer}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {booking.date}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.startTime} - {booking.endTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        {booking.status === "pending" && (
                          <>
                            <button className="text-green-600 hover:text-green-900">
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        <button className="text-gray-400 hover:text-gray-500">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Helper Components
  const StatCard = ({ title, value, trend, icon: Icon, color }) => {
    const colorClasses = {
      blue: "text-blue-600 bg-blue-100",
      green: "text-green-600 bg-green-100",
      yellow: "text-yellow-600 bg-yellow-100",
    };

    return (
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-sm text-gray-500">{trend}</span>
        </div>
        <h3 className="text-2xl font-semibold mt-4">{value}</h3>
        <p className="text-gray-500 text-sm mt-1">{title}</p>
      </div>
    );
  };

  const RoomCard = ({ room, onEdit, onDelete }) => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{room.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                Capacity: {room.capacity} people
              </p>
            </div>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full
              ${
                room.status === "available"
                  ? "bg-green-100 text-green-800"
                  : room.status === "occupied"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {room.status}
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-medium text-gray-900">Amenities:</h4>
              <div className="flex flex-wrap gap-2 mt-1">
                {room.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div>
                <span className="text-gray-500">Total Bookings:</span>
                <span className="ml-1 font-medium">{room.bookings}</span>
              </div>
              <div>
                <span className="text-gray-500">Utilization:</span>
                <span className="ml-1 font-medium">{room.utilization}%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={onEdit}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button
              onClick={onDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const ActivityItem = ({ title, description, time, icon: Icon }) => (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Icon className="h-5 w-5 text-blue-600" />
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex-shrink-0">
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  );

  const LogEntry = ({ time, event, user, status }) => (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {time}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        {event}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
          ${
            status === "success"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </td>
    </tr>
  );

  return (
    <div className="p-6">
      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm
            ${
              activeTab === "overview"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm
            ${
              activeTab === "users"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            User Management
          </button>
          <button
            onClick={() => setActiveTab("rooms")}
            className={`pb-4 px-1 border-b-2 font-medium text-sm
            ${
              activeTab === "rooms"
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Room Management
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && <Overview rooms={rooms} />}
      {activeTab === "users" && (
        <UserManagement
          setModalType={setModalType}
          setShowAddModal={setShowAddModal}
        />
      )}
      {activeTab === "rooms" && <RoomManagement />}
    </div>
  );
};

export default AdminDashboard;
