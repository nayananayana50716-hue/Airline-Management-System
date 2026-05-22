import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaPlane,
  FaTicketAlt,
  FaUsers,
  FaBars,
  FaHome,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";
import { useState } from "react";
import "./Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Flights", path: "/flights", icon: <FaPlane /> },
    { name: "Flight List", path: "/flightlist", icon: <FaTicketAlt /> },
    { name: "Flight Form", path: "/flightform", icon: <FaPlane /> },
    { name: "Booking", path: "/booking", icon: <FaTicketAlt /> },
    { name: "Booking List", path: "/bookinglist", icon: <FaTicketAlt /> },
    { name: "Booking Form", path: "/bookingform", icon: <FaTicketAlt /> },
    { name: "Passengers", path: "/passengers", icon: <FaUsers /> },
    { name: "Admin Panel", path: "/admin", icon: <FaCog /> }
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // ✅ FIXED
    navigate("/login");
  };

  

  return (
    <div className={`sidebar ${open ? "open" : "closed"}`}>

      {/* TOP */}
      <div className="top-section">
        <h2 className="logo">
          {open ? "✈ AirlinePro" : "✈"}
        </h2>

        <FaBars
          className="toggle"
          onClick={() => setOpen(!open)}
        />
      </div>

      {/* MENU */}
      <div className="menu">
        {menu.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={item.path}
              className={`link ${isActive ? "active" : ""}`}
            >
              {isActive && <div className="active-bar"></div>}

              <div className="icon">{item.icon}</div>

              {!open && <span className="tooltip">{item.name}</span>}

              {open && <div className="text">{item.name}</div>}
            </Link>
          );
        })}
      </div>

      {/* BOTTOM */}
      <div className="bottom">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          {open && <span> Logout</span>}
        </button>
      </div>

    </div>
  );
}

export default Sidebar;