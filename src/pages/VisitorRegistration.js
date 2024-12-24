import React, { useState } from "react";
import { User, Mail, Phone, Clock, Users, Building2 } from "lucide-react";

const VisitorRegistration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    visitorType: "",
    name: "",
    email: "",
    phone: "",
    purpose: "",
    host: "",
    meetingRoom: "",
    expectedDuration: "30",
    numAttendees: "1",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - replace with API calls
  const hosts = [
    { id: 1, name: "Sarah Parker", department: "HR" },
    { id: 2, name: "Mike Johnson", department: "Sales" },
    { id: 3, name: "Lisa Thompson", department: "Engineering" },
  ];

  const meetingRooms = [
    { id: 1, name: "Conference Room A", capacity: 20 },
    { id: 2, name: "Meeting Room 1", capacity: 8 },
    { id: 3, name: "Meeting Room 2", capacity: 12 },
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (formData.visitorType === "meeting" && !formData.host) {
      newErrors.host = "Please select a host";
    }

    if (formData.visitorType === "attendee" && !formData.meetingRoom) {
      newErrors.meetingRoom = "Please select a meeting room";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // API call would go here
        console.log("Submitting visitor data:", formData);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
        // Handle success (redirect or show success message)
      } catch (error) {
        console.error("Error submitting form:", error);
        setErrors({ submit: "Failed to register visitor. Please try again." });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Visitor Registration
          </h2>

          {/* Step 1: Visitor Type Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Select Visitor Type
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <VisitorTypeCard
                  title="Walk-in Visitor"
                  description="No appointment needed"
                  icon={User}
                  selected={formData.visitorType === "walkin"}
                  onClick={() => {
                    setFormData((prev) => ({ ...prev, visitorType: "walkin" }));
                    setStep(2);
                  }}
                />
                <VisitorTypeCard
                  title="Meeting Visitor"
                  description="Meeting with employee"
                  icon={Users}
                  selected={formData.visitorType === "meeting"}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      visitorType: "meeting",
                    }));
                    setStep(2);
                  }}
                />
                <VisitorTypeCard
                  title="Meeting Attendee"
                  description="Group meeting"
                  icon={Building2}
                  selected={formData.visitorType === "attendee"}
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      visitorType: "attendee",
                    }));
                    setStep(2);
                  }}
                />
              </div>
            </div>
          )}

          {/* Step 2: Visitor Details Form */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  icon={User}
                  required
                />

                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={Mail}
                  required
                />

                <InputField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  icon={Phone}
                  required
                />

                <InputField
                  label="Purpose of Visit"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  error={errors.purpose}
                  required
                />

                {/* Meeting-specific fields */}
                {formData.visitorType === "meeting" && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Select Host
                    </label>
                    <select
                      name="host"
                      value={formData.host}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md
                        ${errors.host ? "border-red-300" : "border-gray-300"}`}
                    >
                      <option value="">Select a host</option>
                      {hosts.map((host) => (
                        <option key={host.id} value={host.id}>
                          {host.name} - {host.department}
                        </option>
                      ))}
                    </select>
                    {errors.host && (
                      <p className="mt-2 text-sm text-red-600">{errors.host}</p>
                    )}
                  </div>
                )}

                {/* Meeting Attendee specific fields */}
                {formData.visitorType === "attendee" && (
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Meeting Room
                    </label>
                    <select
                      name="meetingRoom"
                      value={formData.meetingRoom}
                      onChange={handleChange}
                      className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                        focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md
                        ${
                          errors.meetingRoom
                            ? "border-red-300"
                            : "border-gray-300"
                        }`}
                    >
                      <option value="">Select a meeting room</option>
                      {meetingRooms.map((room) => (
                        <option key={room.id} value={room.id}>
                          {room.name} (Capacity: {room.capacity})
                        </option>
                      ))}
                    </select>
                    {errors.meetingRoom && (
                      <p className="mt-2 text-sm text-red-600">
                        {errors.meetingRoom}
                      </p>
                    )}

                    <InputField
                      label="Number of Attendees"
                      name="numAttendees"
                      type="number"
                      value={formData.numAttendees}
                      onChange={handleChange}
                      error={errors.numAttendees}
                      min="1"
                      icon={Users}
                    />
                  </div>
                )}

                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Duration
                  </label>
                  <select
                    name="expectedDuration"
                    value={formData.expectedDuration}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 
                      focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="30">30 minutes</option>
                    <option value="60">1 hour</option>
                    <option value="90">1.5 hours</option>
                    <option value="120">2 hours</option>
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm 
                    font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 
                    focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm 
                    font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin mr-2" />
                      Registering...
                    </div>
                  ) : (
                    "Register Visitor"
                  )}
                </button>
              </div>

              {errors.submit && (
                <p className="mt-2 text-sm text-red-600">{errors.submit}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const VisitorTypeCard = ({
  title,
  description,
  icon: Icon,
  selected,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-6 border rounded-lg text-left space-y-3 transition-all
        ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 hover:border-blue-500 hover:bg-gray-50"
        }`}
    >
      <Icon
        className={`h-8 w-8 ${selected ? "text-blue-500" : "text-gray-400"}`}
      />
      <div>
        <h3 className="text-lg font-medium text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </button>
  );
};

const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  icon: Icon,
  required,
  ...props
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`block w-full ${
            Icon ? "pl-10" : "pl-3"
          } pr-3 py-2 border rounded-md 
            shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 
            focus:border-blue-500 sm:text-sm ${
              error ? "border-red-300" : "border-gray-300"
            }`}
          {...props}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default VisitorRegistration;
