import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Search, Bell, User, Film, Heart, LogOut } from 'lucide-react';
import OfflineAlert from '../components/feedback/OfflineAlert';
import AuthModal from '../components/auth/AuthModal';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const MainLayout = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <OfflineAlert />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <nav className="bg-gray-800/50 backdrop-blur-sm fixed w-full z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Film className="w-8 h-8 text-blue-500" />
                <span className="ml-2 text-white text-xl font-bold">MoviePWA</span>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search movies..."
                  className="w-full bg-gray-700 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <button className="p-2 text-gray-300 hover:text-white">
                    <Bell className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => navigate('/favorites')}
                    className="p-2 text-gray-300 hover:text-white"
                  >
                    <Heart className="w-6 h-6" />
                  </button>
                  <div className="relative group/menu">
                    <button className="p-2 text-gray-300 hover:text-white">
                      <User className="w-6 h-6" />
                    </button>

                    {/* Menu Profile */}
                    <div className="absolute right-0 mt-2 w-72 bg-gray-800 rounded-lg shadow-xl py-2 invisible group-hover/menu:visible opacity-0 group-hover/menu:opacity-100 transition-all duration-300">
                      {/* En-tête du profil */}
                      <div className="px-4 py-3 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-lg font-bold">
                              {user.username?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{user.username || 'User'}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="px-2 py-2 space-y-1">
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md flex items-center group">
                          <User className="w-4 h-4 mr-3 group-hover:text-blue-500" />
                          <span className="group-hover:text-blue-500">Profile</span>
                        </button>
                        <button
                          onClick={() => navigate('/favorites')}
                          className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md flex items-center group"
                        >
                          <Heart className="w-4 h-4 mr-3 group-hover:text-blue-500" />
                          <span className="group-hover:text-blue-500">My Favorites</span>
                        </button>
                        <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-gray-700 rounded-md flex items-center group">
                          <Bell className="w-4 h-4 mr-3 group-hover:text-blue-500" />
                          <span className="group-hover:text-blue-500">Notifications</span>
                        </button>
                      </div>

                      {/* Séparateur */}
                      <div className="border-t border-gray-700 my-2"></div>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-5 py-2 text-sm text-red-400 hover:bg-gray-700 flex items-center group"
                      >
                        <LogOut className="w-4 h-4 mr-3 group-hover:text-red-500" />
                        <span className="group-hover:text-red-500">Logout</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="p-2 text-gray-300 hover:text-white"
                >
                  <User className="w-6 h-6" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;