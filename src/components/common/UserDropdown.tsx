import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Shield,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { logout } from '../../store/slices/authSlice';

interface UserDropdownProps {
  onClose: () => void;
}

const UserDropdown: React.FC<UserDropdownProps> = ({ onClose }) => {
  const { user, isAdmin } = useAuth();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  const menuItems = [
    { 
      icon: User, 
      label: 'Profile', 
      path: '/profile',
      description: 'Manage your account' 
    },
    { 
      icon: Settings, 
      label: 'Settings', 
      path: '/settings',
      description: 'Preferences & privacy' 
    },
    { 
      icon: HelpCircle, 
      label: 'Help & Support', 
      path: '/help',
      description: 'Get assistance' 
    },
  ];

  if (isAdmin) {
    menuItems.splice(2, 0, {
      icon: Shield,
      label: 'Admin Panel',
      path: '/admin',
      description: 'Manage platform'
    });
  }

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
      {/* User Info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-white" />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="py-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <item.icon className="h-4 w-4 mr-3 text-gray-400 dark:text-gray-500" />
            <div className="flex-1">
              <div className="font-medium">{item.label}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">{item.description}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Logout */}
      <div className="py-2 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-3" />
          <span>Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default UserDropdown;