import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg border-b border-secondary-200 animate-slide-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors duration-200">My Bolgs</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/dashboard')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isActive('/profile')
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-secondary-600 hover:text-secondary-900 hover:bg-secondary-100'
              }`}
            >
              Profile
            </Link>

            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-secondary-700 text-sm">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-error hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

