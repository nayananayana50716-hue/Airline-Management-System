import React, { useEffect, useState } from "react";
import API from "../api";

function AdminDashboard() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/admin/stats");
        setStats(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📊 Admin Dashboard</h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        
        <div style={cardStyle}>
          <h3>👤 Users</h3>
          <p>{stats.users}</p>
        </div>

        <div style={cardStyle}>
          <h3>✈ Flights</h3>
          <p>{stats.flights}</p>
        </div>

        <div style={cardStyle}>
          <h3>🎟 Bookings</h3>
          <p>{stats.bookings}</p>
        </div>

        <div style={cardStyle}>
          <h3>💰 Revenue</h3>
          <p>₹{stats.revenue}</p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  border: "1px solid #ddd",
  padding: "20px",
  borderRadius: "10px",
  minWidth: "150px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
};

export default AdminDashboard;