import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';

export default function Navbar() {
  const { firebaseUser, logout } = useAuth();
  const role = useRole();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-dark sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
              <path d="M16 4C16 4 6 14 6 20a10 10 0 0020 0C26 14 16 4 16 4z" fill="#dc2626" />
              <path d="M16 10c0 0-5 5-5 8a5 5 0 0010 0c0-3-5-8-5-8z" fill="#fef2f2" fillOpacity="0.3" />
            </svg>
            <span className="text-white font-bold text-xl tracking-tight">Donors</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/donors" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
              Find Donors
            </Link>
            {firebaseUser && (
              <>
                <Link to="/create-request" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  Request Blood
                </Link>
                <Link to="/dashboard" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                  Dashboard
                </Link>
                {role === 'admin' && (
                  <Link to="/admin" className="text-gray-300 hover:text-white text-sm font-medium transition-colors">
                    Admin
                  </Link>
                )}
              </>
            )}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {firebaseUser ? (
              <button
                onClick={handleLogout}
                className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded transition-colors cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded transition-colors"
                >
                  Register Now
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-gray-300 hover:text-white cursor-pointer"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-dark-light border-t border-gray-800 px-4 pb-4 space-y-2">
          <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-300 hover:text-white text-sm font-medium">
            Home
          </Link>
          <Link to="/donors" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-300 hover:text-white text-sm font-medium">
            Find Donors
          </Link>
          {firebaseUser && (
            <>
              <Link to="/create-request" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-300 hover:text-white text-sm font-medium">
                Request Blood
              </Link>
              <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-300 hover:text-white text-sm font-medium">
                Dashboard
              </Link>
              {role === 'admin' && (
                <Link to="/admin" onClick={() => setMobileOpen(false)} className="block py-2 text-gray-300 hover:text-white text-sm font-medium">
                  Admin
                </Link>
              )}
            </>
          )}
          <div className="pt-2 border-t border-gray-800">
            {firebaseUser ? (
              <button
                onClick={() => { handleLogout(); setMobileOpen(false); }}
                className="w-full bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded transition-colors cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)} className="text-center text-gray-300 hover:text-white text-sm font-medium py-2">
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)} className="text-center bg-red-700 hover:bg-red-800 text-white text-sm font-semibold px-6 py-2.5 rounded transition-colors">
                  Register Now
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
