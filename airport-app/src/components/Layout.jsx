import React from "react";

import {
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";

import Sidebar from "./Sidebar";

import "./Layout.css";

function Layout() {

  const navigate = useNavigate();

  const location = useLocation();

  // ======================================
  // LOGOUT
  // ======================================

  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");
  };

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

  return (

    <div className="layout">

      {/* SIDEBAR */}
      <Sidebar onLogout={handleLogout} />

      {/* MAIN CONTENT */}
      <div className="main-content">

        {/* HEADER */}
        <div className="top-bar">

          <h1>✈ {getTitle()}</h1>

          <div className="header-right">

            <span className="admin">
              👤 Admin
            </span>

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

        </div>

        {/* PAGE CONTENT */}
        <Outlet />

      </div>

    </div>
  );
}

export default Layout;