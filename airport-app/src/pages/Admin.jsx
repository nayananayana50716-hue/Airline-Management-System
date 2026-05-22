import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const [stats, setStats] = useState({
    totalFlights: 0,
    totalBookings: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/home");
        setStats(res.data.stats);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-wrapper">

      {/* HEADER */}
      <div className="admin-header">
        <h1>⚙ Admin Panel</h1>
        <p>Welcome back, {user?.name || "Admin"} 👋</p>
      </div>

      {/* STATS */}
      <div className="admin-cards">

        <div className="admin-card blue">
          <h3>✈ Flights</h3>
          <p>{stats.totalFlights}</p>
        </div>

        <div className="admin-card green">
          <h3>📄 Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>

        <div className="admin-card purple">
          <h3>👤 Users</h3>
          <p>{stats.totalUsers}</p>
        </div>

        <div className="admin-card orange">
          <h3>💰 Revenue</h3>
          <p>Coming Soon</p>
        </div>

      </div>

      {/* ACTION BUTTONS */}
      <div className="admin-actions">

        <button onClick={() => navigate("/flightform")}>
          ➕ Add Flight
        </button>

        <button onClick={() => navigate("/flightlist")}>
          📋 Manage Flights
        </button>

        <button onClick={() => navigate("/bookinglist")}>
          📑 View Bookings
        </button>

      </div>

    </div>
  );
}

export default Admin;