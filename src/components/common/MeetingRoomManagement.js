import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Users,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Trash2,
  Edit,
} from "lucide-react";

const MeetingRoomManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with API calls
  const [rooms] = useState([
    {
      id: 1,
      name: "Conference Room A",
      capacity: 20,
      amenities: ["Projector", "Video Conference", "Whiteboard"],
      status: "available",
    },
    {
      id: 2,
      name: "Meeting Room 1",
      capacity: 8,
      amenities: ["TV Screen", "Video Conference"],
      status: "occupied",
    },
    {
      id: 3,
      name: "Board Room",
      capacity: 15,
      amenities: ["Projector", "Video Conference", "Catering"],
      status: "maintenance",
    },
  ]);

  const [bookings] = useState([
    {
      id: 1,
      roomId: 1,
      title: "Team Meeting",
      start: "09:00",
      end: "10:30",
      organizer: "John Doe",
      attendees: 8,
    },
    {
      id: 2,
      roomId: 2,
      title: "Client Presentation",
      start: "11:00",
      end: "12:00",
      organizer: "Jane Smith",
      attendees: 5,
    },
  ]);

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const handleBookRoom = (room) => {
    setSelectedRoom(room);
    setShowBookingForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Meeting Room Management
          </h1>
          <button
            onClick={() => setShowBookingForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Book Room
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex items-center space-x-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-500 border border-gray-300 rounded-lg">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar View */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h2 className="text-lg font-semibold">
                {selectedDate.toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h2>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <ChevronRight className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Day
              </button>
              <button className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded-md">
                Week
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
                Month
              </button>
            </div>
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <div className="grid grid-cols-[100px_repeat(24,100px)] gap-1">
            {/* Time slots header */}
            <div className="sticky left-0 z-10 bg-white">
              <div className="h-10"></div>
            </div>
            {timeSlots.map((time) => (
              <div
                key={time}
                className="h-10 text-sm text-gray-500 text-center"
              >
                {time}
              </div>
            ))}

            {/* Room rows */}
            {rooms.map((room) => (
              <React.Fragment key={room.id}>
                <div className="sticky left-0 z-10 bg-white border-t border-gray-200">
                  <div className="p-2">
                    <div className="font-medium text-sm">{room.name}</div>
                    <div className="text-xs text-gray-500">
                      <Users className="h-3 w-3 inline mr-1" />
                      {room.capacity}
                    </div>
                  </div>
                </div>
                {timeSlots.map((time) => (
                  <div
                    key={`${room.id}-${time}`}
                    className="h-20 border border-gray-100 relative group"
                  >
                    {/* Render bookings here */}
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Room List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div key={room.id} className="bg-white rounded-lg shadow">
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {room.name}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center mt-1">
                    <Users className="h-4 w-4 mr-1" />
                    Capacity: {room.capacity}
                  </p>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
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

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-900">
                  Amenities:
                </h4>
                <div className="flex flex-wrap gap-2">
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

              <div className="mt-4 flex justify-end space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-500">
                  <Edit className="h-5 w-5" />
                </button>
                <button className="p-2 text-red-400 hover:text-red-500">
                  <Trash2 className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleBookRoom(room)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Form Modal */}
      {showBookingForm && (
        <BookingForm
          room={selectedRoom}
          onClose={() => {
            setShowBookingForm(false);
            setSelectedRoom(null);
          }}
        />
      )}
    </div>
  );
};

const BookingForm = ({ room, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "",
    endTime: "",
    attendees: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Book a Room
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meeting Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={formData.startTime}
                      onChange={(e) =>
                        setFormData({ ...formData, startTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={formData.endTime}
                      onChange={(e) =>
                        setFormData({ ...formData, endTime: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Attendees
                  </label>
                  <input
                    type="number"
                    value={formData.attendees}
                    onChange={(e) =>
                      setFormData({ ...formData, attendees: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    min="1"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows="3"
                  />
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Book Room
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Calendar Integration Component
const CalendarIntegration = () => {
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  const connectGoogleCalendar = async () => {
    try {
      // Implement Google Calendar OAuth flow
      // This would typically involve:
      // 1. Redirecting to Google OAuth consent screen
      // 2. Getting authorization code
      // 3. Exchanging code for access token
      // 4. Storing tokens securely
      setIsConnected(true);
    } catch (error) {
      console.error("Failed to connect to Google Calendar:", error);
    }
  };

  const syncCalendarEvents = async () => {
    try {
      // Fetch events from Google Calendar API
      // Update local calendar events state
      const events = await fetchGoogleCalendarEvents();
      setCalendarEvents(events);
    } catch (error) {
      console.error("Failed to sync calendar events:", error);
    }
  };

  // Mock function - replace with actual API call
  const fetchGoogleCalendarEvents = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: "Team Sync",
            start: "2024-03-20T10:00:00",
            end: "2024-03-20T11:00:00",
            room: "Conference Room A",
          },
          // Add more mock events
        ]);
      }, 1000);
    });
  };

  return (
    <div className="mt-6 bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-900">
            Calendar Integration
          </h2>
          {!isConnected ? (
            <button
              onClick={connectGoogleCalendar}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Connect Google Calendar
            </button>
          ) : (
            <button
              onClick={syncCalendarEvents}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sync Calendar
            </button>
          )}
        </div>
      </div>
      {isConnected && (
        <div className="p-4">
          <div className="space-y-4">
            {calendarEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(event.start).toLocaleString()} -{" "}
                    {new Date(event.end).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">{event.room}</p>
                </div>
                <button className="text-blue-600 hover:text-blue-700">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MeetingRoomManagement;
