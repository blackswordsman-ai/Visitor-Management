import React, { useState } from "react";
import {
  UserPlus,
  Users,
  Calendar,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Bell,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

// Mock data - replace with actual API data
const visitorStats = [
  { name: "Mon", visitors: 15 },
  { name: "Tue", visitors: 20 },
  { name: "Wed", visitors: 25 },
  { name: "Thu", visitors: 18 },
  { name: "Fri", visitors: 22 },
  { name: "Sat", visitors: 10 },
  { name: "Sun", visitors: 5 },
];

const Dashboard = () => {
  const [activeVisitors, setActiveVisitors] = useState([
    {
      id: 1,
      name: "John Smith",
      checkIn: "09:30 AM",
      meeting: "Interview",
      host: "Sarah Parker",
    },
    {
      id: 2,
      name: "Emma Wilson",
      checkIn: "10:15 AM",
      meeting: "Client Meeting",
      host: "Mike Johnson",
    },
    {
      id: 3,
      name: "David Brown",
      checkIn: "11:00 AM",
      meeting: "Vendor Meeting",
      host: "Lisa Thompson",
    },
  ]);

  const [upcomingMeetings, setUpcomingMeetings] = useState([
    {
      id: 1,
      title: "Board Meeting",
      time: "02:00 PM",
      room: "Conference Room A",
    },
    {
      id: 2,
      title: "Client Presentation",
      time: "03:30 PM",
      room: "Meeting Room 2",
    },
    { id: 3, title: "Team Sync", time: "04:15 PM", room: "Conference Room B" },
  ]);

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Visitors Today"
          value="45"
          trend="+12.5%"
          icon={Users}
          positive
        />
        <StatCard
          title="Active Visitors"
          value="12"
          trend="-3"
          icon={UserPlus}
          positive={false}
        />
        <StatCard
          title="Upcoming Meetings"
          value="8"
          trend="+2"
          icon={Calendar}
          positive
        />
        <StatCard
          title="Average Visit Duration"
          value="45m"
          trend="+5m"
          icon={Clock}
          positive
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Visitor Trends</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visitorStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="#2563eb"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Visit Duration by Day</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={visitorStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="visitors" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Active Visitors and Upcoming Meetings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Active Visitors</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {activeVisitors.map((visitor) => (
              <div key={visitor.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{visitor.name}</h4>
                    <p className="text-sm text-gray-500">
                      Meeting with {visitor.host} • {visitor.meeting}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Check-in</p>
                    <p className="text-sm text-gray-500">{visitor.checkIn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold">Upcoming Meetings</h3>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingMeetings.map((meeting) => (
              <div key={meeting.id} className="p-4 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{meeting.title}</h4>
                    <p className="text-sm text-gray-500">{meeting.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{meeting.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="fixed bottom-16 right-6">
        <button className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
          <UserPlus className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, trend, icon: Icon, positive }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
        <span
          className={`text-sm flex items-center ${
            positive ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend}
          {positive ? (
            <ArrowUpRight className="h-4 w-4 ml-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 ml-1" />
          )}
        </span>
      </div>
      <h3 className="text-2xl font-semibold mt-4">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  );
};

export default Dashboard;
