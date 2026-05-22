import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function FlightChart({ flights }) {

  const data = flights.map((flight) => ({
    name: flight.name,
    price: flight.price,
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
        background: "#fff",
      }}
    >

      <BarChart
        width={800}
        height={400}
        data={data}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="price" fill="#8884d8" />

      </BarChart>

    </div>
  );
}

export default FlightChart;