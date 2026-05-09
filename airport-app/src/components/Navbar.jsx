import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);
  const [dark, setDark] = useState(false);

  const user = JSON.parse(localStorage.getItem("currentUser"));

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    setDark(!dark);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <motion.div
      className="navbar"
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Left */}
      <div className="navbar-left">
        <h2>✈ Airline Dashboard</h2>
      </div>

      {/* Right */}
      <div className="navbar-right">

        {/* Dark Mode */}
        <button className="icon-btn" onClick={toggleDarkMode}>
          {dark ? "🌙" : "☀️"}
        </button>

        {/* Notification */}
        <div className="icon-btn">🔔</div>

        {/* Profile */}
        <div className="profile" onClick={() => setDropdown(!dropdown)}>
          👤 {user?.name || "Admin"}

          {dropdown && (
            <div className="dropdown">
              <p onClick={() => navigate("/profile")}>Profile</p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default Navbar;