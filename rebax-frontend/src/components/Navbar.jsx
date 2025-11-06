import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaHome,
  FaHeart,
  FaPlusCircle,
  FaList,
  FaInbox,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";

const navLink = ({ isActive }) =>
  `px-4 py-2 rounded-lg font-medium transition ${
    isActive
      ? "bg-indigo-600 text-white"
      : "hover:bg-indigo-100 dark:hover:bg-white/10 text-gray-700 dark:text-white"
  }`;

export default function Navbar() {
  const { auth, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link
          className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-wide"
          to="/"
        >
          RebaX
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-3 items-center">

          <NavLink to="/" className={navLink}>
            <FaHome className="inline mr-1" /> Home
          </NavLink>

          <NavLink to="/about" className={navLink}>About</NavLink>
          <NavLink to="/contact" className={navLink}>Contact</NavLink>

          {!auth && (
            <>
              <NavLink to="/login" className={navLink}>Login</NavLink>
              <NavLink to="/register" className={navLink}>Register</NavLink>
            </>
          )}

          {auth?.role === "BROKER" && (
            <>
              <NavLink to="/broker/add" className={navLink}>
                <FaPlusCircle className="inline mr-1" /> Add Property
              </NavLink>
              <NavLink to="/broker/listings" className={navLink}>
                <FaList className="inline mr-1" /> My Listings
              </NavLink>
              <NavLink to="/inquiries" className={navLink}>
                <FaInbox className="inline mr-1" /> Inquiries
              </NavLink>
              <NavLink to="/broker/dashboard" className={navLink}>
                Dashboard
              </NavLink>
            </>
          )}

          {auth?.role === "BUYER" && (
            <>
              <NavLink to="/favorites" className={navLink}>
                <FaHeart className="inline mr-1" /> Favorites
              </NavLink>
              <NavLink to="/inquiries" className={navLink}>
                <FaInbox className="inline mr-1" /> Inquiries
              </NavLink>
            </>
          )}

          {auth && (
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={handleLogout}
            >
              <FaSignOutAlt className="inline mr-1" /> Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-2xl" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t p-4 space-y-3">

          <NavLink className={navLink} to="/" onClick={() => setOpen(false)}>Home</NavLink>
          <NavLink className={navLink} to="/about" onClick={() => setOpen(false)}>About</NavLink>
          <NavLink className={navLink} to="/contact" onClick={() => setOpen(false)}>Contact</NavLink>

          {!auth && (
            <>
              <NavLink className={navLink} to="/login" onClick={() => setOpen(false)}>Login</NavLink>
              <NavLink className={navLink} to="/register" onClick={() => setOpen(false)}>Register</NavLink>
            </>
          )}

          {auth?.role === "BROKER" && (
            <>
              <NavLink to="/broker/add" className={navLink} onClick={() => setOpen(false)}>Add Property</NavLink>
              <NavLink to="/broker/listings" className={navLink} onClick={() => setOpen(false)}>My Listings</NavLink>
              <NavLink to="/inquiries" className={navLink} onClick={() => setOpen(false)}>Inquiries</NavLink>
              <NavLink to="/broker/dashboard" className={navLink} onClick={() => setOpen(false)}>Dashboard</NavLink>
            </>
          )}

          {auth?.role === "BUYER" && (
            <>
              <NavLink to="/favorites" className={navLink} onClick={() => setOpen(false)}>Favorites</NavLink>
              <NavLink to="/inquiries" className={navLink} onClick={() => setOpen(false)}>Inquiries</NavLink>
            </>
          )}

          {auth && (
            <button
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
