import { useEffect, useState } from "react";
import API from "../api/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const AdminDashboard = () => {

  const [data, setData] = useState(null);

  const token = localStorage.getItem("token");

  const fetchStats = async () => {

    try {

      const res = await API.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setData(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (!data) return <h2>Loading...</h2>;

  return (
    <div style={{ padding: "20px" }}>

      <h2>📊 Admin Dashboard</h2>

      {/* CARDS */}
      <div style={{ display: "flex", gap: "20px" }}>
        <div>🎫 Bookings: {data.totalBookings}</div>
        <div>👥 Users: {data.totalUsers}</div>
        <div>💰 Revenue: ₹{data.totalRevenue}</div>
      </div>

      {/* BAR CHART */}
      <h3 style={{ marginTop: "30px" }}>
        ✈ Popular Flights
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data.popularFlights}>
          <XAxis dataKey="flightId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#3399cc" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
};

export default AdminDashboard;