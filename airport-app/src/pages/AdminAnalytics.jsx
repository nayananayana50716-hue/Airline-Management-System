import { useEffect, useState } from "react";
import API from "../api/api";

const AdminAnalytics = () => {
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const res = await API.get("/admin/stats", {
      headers: { Authorization: token },
    });

    setStats(res.data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📊 Analytics Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>

        <div style={card}>
          <h2>🎫 Bookings</h2>
          <h3>{stats.totalBookings}</h3>
        </div>

        <div style={card}>
          <h2>✈ Flights</h2>
          <h3>{stats.totalFlights}</h3>
        </div>

        <div style={card}>
          <h2>👤 Users</h2>
          <h3>{stats.totalUsers}</h3>
        </div>

        <div style={card}>
          <h2>💰 Revenue</h2>
          <h3>₹ {stats.totalRevenue}</h3>
        </div>

      </div>
    </div>
  );
};

const card = {
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  width: "200px",
  textAlign: "center",
};

export default AdminAnalytics;