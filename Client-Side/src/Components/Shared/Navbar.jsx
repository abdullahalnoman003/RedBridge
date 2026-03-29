import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authentication/Context/AuthContext';
import useUserRole from '../../Hooks/useUserRole';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext) || {};
  const [role, loadingRole] = useUserRole(user?.email);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: 'Logout?',
      text: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    });
    if (!result.isConfirmed) return;
    try {
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error(`Logout failed: ${error.message}`);
    }
  };

  const renderDashboardLink = () => {
    if (loadingRole) return null;
    if (!role) return null;
    if (role === "admin")
      return <NavLink to="/dashboard/admin">Admin Dashboard</NavLink>;
  };

  return (
    <div className="fixed top-0 left-0 w-full z-20 bg-white shadow-md">
      <div className="navbar max-w-7xl mx-auto px-6 max-md:pl-1 ">
        <div className="navbar-start">
          <div className="dropdown">
            <button tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50"
            >
              <li className="font-bold">
                <NavLink to="/">Home</NavLink>
              </li>
              <li className="font-bold">
                <NavLink to="/find-donors">Find Donors</NavLink>
              </li>
              <li className="font-bold">
                <NavLink to="/donate">Donate Blood</NavLink>
              </li>
              <li className="font-bold">
                <NavLink to="/about">About Us</NavLink>
              </li>
              {user && <li className="font-bold">{renderDashboardLink()}</li>}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-1 text-2xl max-md:text-sm font-extrabold"
          >
            <img className="max-md:w-12 w-30 " src="/logo.png" alt="RedBridge Logo" />
            
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-3 px-1">
            <li>
              <NavLink to="/" className="font-bold">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/find-donors" className="font-bold">
                Find Donors
              </NavLink>
            </li>
            <li>
              <NavLink to="/donate" className="font-bold">
                Donate Blood
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className="font-bold">
                About Us
              </NavLink>
            </li>
            {user && <li className="font-bold">{renderDashboardLink()}</li>}
          </ul>
        </div>

        {/* Auth */}
        <div className="navbar-end flex items-center gap-2">
          {!user ? (
            <>
              <NavLink to="/login" className="font-bold">
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="font-bold "
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-left"
                data-tip={user.displayName || "User"}
              >
                <div className="w-20 rounded-full border hover:shadow-md border-red-500 shadow-red-500">
                  <img
                    src={user.photoURL || "/default-user.png"}
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
              >
                <li>
                  <Link to="/profile" className="font-semibold text-sm">
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-800 font-semibold text-sm"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;