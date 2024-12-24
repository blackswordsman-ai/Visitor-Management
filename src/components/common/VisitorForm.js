import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  Building,
  Camera,
  Clock,
  Star,
  MessageSquare,
  Send,
} from "lucide-react";
import LoadingSpinner from "./LoadingSpinner";

const VisitorForm = ({ onSubmit, initialData = {} }) => {
  const [formType, setFormType] = useState("registration"); // registration or feedback
  const [loading, setLoading] = useState(false);
  const [photoData, setPhotoData] = useState(null);
  const [formData, setFormData] = useState({
    // Visitor Registration Fields
    name: initialData.name || "",
    email: initialData.email || "",
    phone: initialData.phone || "",
    purpose: initialData.purpose || "",
    companyName: initialData.companyName || "",
    hostName: initialData.hostName || "",
    expectedDuration: initialData.expectedDuration || "1",

    // Feedback Fields
    rating: 5,
    experience: "",
    suggestions: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (formType === "registration") {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone is required";
      } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
        newErrors.phone = "Invalid phone format";
      }
      if (!formData.purpose.trim()) newErrors.purpose = "Purpose is required";
      if (!formData.hostName.trim())
        newErrors.hostName = "Host name is required";
    } else {
      if (!formData.experience.trim())
        newErrors.experience = "Feedback is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        await onSubmit({ ...formData, photo: photoData });
        if (formType === "registration") {
          setFormType("feedback");
        } else {
          // Reset form after feedback submission
          setFormData({
            name: "",
            email: "",
            phone: "",
            purpose: "",
            companyName: "",
            hostName: "",
            expectedDuration: "1",
            rating: 5,
            experience: "",
            suggestions: "",
          });
          setFormType("registration");
        }
      } catch (error) {
        setErrors({ submit: "Failed to submit form. Please try again." });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoCapture = () => {
    // Implement photo capture logic here
    // This could open a webcam modal or trigger file upload
    console.log("Photo capture triggered");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {formType === "registration"
          ? "Visitor Registration"
          : "Visitor Feedback"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formType === "registration" ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  label="Phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  icon={Phone}
                  required
                />

                <InputField
                  label="Company"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  icon={Building}
                />
              </div>

              {/* Visit Details */}
              <div className="space-y-4">
                <InputField
                  label="Purpose of Visit"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  error={errors.purpose}
                  required
                />

                <InputField
                  label="Host Name"
                  name="hostName"
                  value={formData.hostName}
                  onChange={handleChange}
                  error={errors.hostName}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Expected Duration (hours)
                  </label>
                  <select
                    name="expectedDuration"
                    value={formData.expectedDuration}
                    onChange={handleChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  >
                    <option value="0.5">30 minutes</option>
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="3">3 hours</option>
                    <option value="4">4 hours</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handlePhotoCapture}
                  className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Camera className="h-5 w-5 mr-2" />
                  Capture Photo
                </button>
              </div>
            </div>
          </>
        ) : (
          // Feedback Form
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rate your visit (1-5 stars)
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() =>
                      handleChange({
                        target: { name: "rating", value: rating },
                      })
                    }
                    className={`p-2 rounded-full ${
                      formData.rating >= rating
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <Star className="h-8 w-8 fill-current" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How was your experience?
              </label>
              <textarea
                name="experience"
                rows={4}
                value={formData.experience}
                onChange={handleChange}
                className={`block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.experience ? "border-red-300" : ""
                }`}
                placeholder="Please share your experience..."
              />
              {errors.experience && (
                <p className="mt-2 text-sm text-red-600">{errors.experience}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Any suggestions for improvement?
              </label>
              <textarea
                name="suggestions"
                rows={3}
                value={formData.suggestions}
                onChange={handleChange}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Optional suggestions..."
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {loading ? (
              <LoadingSpinner size="sm" light />
            ) : (
              <>
                {formType === "registration" ? (
                  <>
                    Register <User className="ml-2 h-5 w-5" />
                  </>
                ) : (
                  <>
                    Submit Feedback <Send className="ml-2 h-5 w-5" />
                  </>
                )}
              </>
            )}
          </button>
        </div>

        {errors.submit && (
          <p className="mt-2 text-sm text-red-600 text-center">
            {errors.submit}
          </p>
        )}
      </form>
    </div>
  );
};

// Helper Components
const InputField = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  icon: Icon,
  required,
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
          } pr-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
            error ? "border-red-300" : "border-gray-300"
          }`}
          required={required}
        />
      </div>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default VisitorForm;
