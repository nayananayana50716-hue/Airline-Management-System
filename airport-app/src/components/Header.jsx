import React from "react";

import "./Header.css";

import {
  FaPlane,
  FaBell,
  FaUserCircle,
} from "react-icons/fa";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

function Header() {

  const navigate = useNavigate();

  const location = useLocation();

  // ======================================
  // DYNAMIC TITLE
  // ======================================

  const getTitle = () => {

    if (location.pathname.startsWith("/admin")) {
      return "Admin Panel";
    }

    if (location.pathname.startsWith("/flight")) {
      return "Flights";
    }

    if (location.pathname.startsWith("/booking")) {
      return "Bookings";
    }

    if (location.pathname.startsWith("/passengers")) {
      return "Passengers";
    }

    if (location.pathname === "/dashboard") {
      return "Dashboard";
    }

    return "Airline System";
  };

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <header className="header">

      {/* LEFT */}

      <div className="header-left">

        <FaPlane className="header-logo" />

        <div>

          <h2>{getTitle()}</h2>

          <p>SkyLine Airways Management System</p>

        </div>

      </div>

      {/* RIGHT */}

      <div className="header-right">

        <FaBell className="header-icon" />

        <FaUserCircle className="header-icon" />

        <button
          className="admin-btn"
          onClick={() => navigate("/admin")}
        >
          Admin
        </button>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default Header;