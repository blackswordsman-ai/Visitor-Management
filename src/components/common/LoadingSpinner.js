import React from "react";

const LoadingSpinner = ({ size = "md", light = false }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${
          sizeClasses[size]
        } border-4 border-t-transparent rounded-full animate-spin ${
          light ? "border-white" : "border-blue-600"
        }`}
      />
    </div>
  );
};

export default LoadingSpinner;
