import React from "react";

import "./FlightAnalytics.css";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
} from "recharts";

// ======================================
// DATA
// ======================================

const revenueData = [
  { month: "Jan", revenue: 120000 },
  { month: "Feb", revenue: 180000 },
  { month: "Mar", revenue: 250000 },
  { month: "Apr", revenue: 320000 },
  { month: "May", revenue: 450000 },
  { month: "Jun", revenue: 520000 },
];

const passengerData = [
  { day: "Mon", passengers: 120 },
  { day: "Tue", passengers: 200 },
  { day: "Wed", passengers: 170 },
  { day: "Thu", passengers: 250 },
  { day: "Fri", passengers: 320 },
  { day: "Sat", passengers: 450 },
  { day: "Sun", passengers: 390 },
];

const flightTypeData = [
  { name: "Domestic", value: 70 },
  { name: "International", value: 30 },
];

const COLORS = ["#00C49F", "#0088FE"];

// ======================================
// COMPONENT
// ======================================

function FlightAnalytics() {
  return (
    <section className="analytics-section">

      <h2>📊 Flight Analytics Dashboard</h2>

     

        {/* BAR CHART */}
        <div className="chart-card">
          <h3>Revenue Analytics</h3>

          <div style={{ width: "100%", height: "300px" }}>
  <ResponsiveContainer width="99%" height="100%">
    <BarChart data={revenueData}>
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <CartesianGrid strokeDasharray="3 3" />

      <Bar
        dataKey="revenue"
        fill="#00C49F"
        radius={[10, 10, 0, 0]}
      />
    </BarChart>
  </ResponsiveContainer>
</div>

        {/* LINE CHART */}
        <div className="chart-card">
          <h3>Passengers Growth</h3>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={passengerData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />

              <Line
                type="monotone"
                dataKey="passengers"
                stroke="#0088FE"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* PIE CHART */}
        <div className="chart-card full-width">
          <h3>Flight Types</h3>

          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={flightTypeData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {flightTypeData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>

    </section>
  );
}

export default FlightAnalytics;