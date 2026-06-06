import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { useContext } from "react";

import {
  FiHome,
  FiFolder,
  FiShield,
  FiLogOut,
} from "react-icons/fi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (!user) return null;

  const navClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-lg transition ${
      isActive
        ? "bg-indigo-100 text-indigo-700 font-medium"
        : "text-slate-600 hover:bg-slate-100"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold">
              T
            </div>

            <span className="text-xl font-bold text-slate-800">
              TaskTracker
            </span>
          </div>

          <NavLink to="/" className={navClass}>
            <FiHome />
            <span>My Tasks</span>
          </NavLink>

          <NavLink to="/projects" className={navClass}>
            <FiFolder />
            <span>Projects</span>
          </NavLink>

          {user?.role === "ADMIN" && (
            <NavLink to="/admin" className={navClass}>
              <FiShield />
              <span>Admin</span>
            </NavLink>
          )}
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="flex items-center gap-3 bg-slate-100 px-3 py-2 rounded-full">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>

            <span className="text-sm text-slate-700 hidden md:block">
              {user?.email}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;