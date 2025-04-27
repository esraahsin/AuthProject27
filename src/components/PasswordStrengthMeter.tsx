
import React from 'react';

interface PasswordStrengthMeterProps {
  strength: number; // 0-5 scale
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
  const getColor = () => {
    switch (strength) {
      case 0:
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-orange-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-blue-500";
      case 5:
        return "bg-green-500";
      default:
        return "bg-gray-300";
    }
  };

  const getLabel = () => {
    switch (strength) {
      case 0:
      case 1:
        return { text: "Very Weak", color: "text-red-600" };
      case 2:
        return { text: "Weak", color: "text-orange-600" };
      case 3:
        return { text: "Fair", color: "text-yellow-600" };
      case 4:
        return { text: "Good", color: "text-blue-600" };
      case 5:
        return { text: "Strong", color: "text-green-600" };
      default:
        return { text: "Enter a password", color: "text-gray-600" };
    }
  };

  const label = getLabel();

  return (
    <div className="mt-2">
      <div className="flex h-2 overflow-hidden rounded-full bg-gray-200">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-full w-1/5 ${i < strength ? getColor() : "bg-gray-200"} ${
              i > 0 ? "ml-1" : ""
            }`}
          />
        ))}
      </div>
      <p className={`text-xs mt-1 ${label.color} font-medium`}>{label.text}</p>
    </div>
  );
};

export default PasswordStrengthMeter;
