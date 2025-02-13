import React from 'react';

// Define the props interface
interface AlertProps {
  message: string; // The alert message (required)
  type?: 'success' | 'error' | 'warning' | 'info'; // Type of alert
  icon?: boolean; // Whether to display an icon
  dismissible?: boolean; // Whether the alert is dismissible
  onClose?: () => void; // Callback function when dismissing the alert
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  icon = true,
  dismissible = false,
  onClose,
}) => {
  // Map for alert types to styles and icons
  const alertTypes = {
    success: {
      color: 'bg-green-100 text-green-700 border-green-500',
      icon: '✔️',
    },
    error: {
      color: 'bg-red-100 text-red-700 border-red-500',
      icon: '❌',
    },
    warning: {
      color: 'bg-yellow-100 text-yellow-700 border-yellow-500',
      icon: '⚠️',
    },
    info: {
      color: 'bg-blue-100 text-blue-700 border-blue-500',
      icon: 'ℹ️',
    },
  };

  // Get styles and icon for the current type
  const currentType = alertTypes[type] || alertTypes.info;

  return (
    <div
      className={`border-l-4 p-4 rounded-md mb-4 ${currentType.color}`}
      role="alert"
    >
      <div className="flex items-center">
        {icon && (
          <span className="mr-2">
            {currentType.icon}
          </span>
        )}
        <span>{message}</span>
        {dismissible && (
          <button
            className="ml-auto text-gray-600 hover:text-gray-900"
            onClick={onClose}
            aria-label="Close"
          >
            ✖️
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
