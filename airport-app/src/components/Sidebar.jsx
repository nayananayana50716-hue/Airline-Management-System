import { Link, useLocation } from "react-router-dom";
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

  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <FaHome /> },
    { name: "Flights", path: "/flights", icon: <FaPlane /> },
    { name: "FlightList", path: "/flightlist", icon: <FaTicketAlt /> },
    { name: "FlightForm", path: "/flightform", icon: <FaPlane /> },
    { name: "Booking", path: "/booking", icon: <FaTicketAlt /> },
    { name: "BookingList", path: "/bookinglist", icon: <FaTicketAlt /> },
    { name: "BookingForm", path: "/bookingform", icon: <FaTicketAlt /> },
    { name: "Passengers", path: "/passengers", icon: <FaUsers /> },
    { name: "Admin", path: "/admin", icon: <FaCog /> }
  ];

  return (
    <div className={open ? "sidebar open" : "sidebar"}>

      <div className="top-section">
        <h2 className="logo">{open ? "✈ AirlinePro" : "✈"}</h2>
        <FaBars className="toggle" onClick={() => setOpen(!open)} />
      </div>

      <div className="menu">
        {menu.map((item, index) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              to={item.path}
              key={index}
              className={isActive ? "link active" : "link"}
            >
              {isActive && <div className="active-bar"></div>}
              <div className="icon">{item.icon}</div>
              {!open && <span className="tooltip">{item.name}</span>}
              <div className="text">{open && item.name}</div>
            </Link>
          );
        })}
      </div>

      <div className="bottom">
        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("user");
            window.location.href = "/login";
          }}
        >
          <FaSignOutAlt />
          {open && <span> Logout</span>}
        </button>
      </div>

    </div>
  );
}

export default Sidebar;