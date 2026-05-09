import { useState } from "react";
import "./Flightlist.css";

function Flightlist() {
  const [flights] = useState([
    { id: 1, name: "AI101", from: "Delhi", to: "Mumbai" },
    { id: 2, name: "IND202", from: "Bangalore", to: "Chennai" },
    { id: 3, name: "SG303", from: "Hyderabad", to: "Delhi" },
    { id: 4, name: "UK404", from: "Mumbai", to: "Kolkata" },
    { id: 5, name: "AI505", from: "Chennai", to: "Bangalore" },
    { id: 6, name: "6E606", from: "Pune", to: "Goa" },
    { id: 7, name: "G8707", from: "Ahmedabad", to: "Jaipur" },
    { id: 8, name: "QP808", from: "Kolkata", to: "Delhi" },
    { id: 9, name: "IX909", from: "Kochi", to: "Mumbai" },
    { id: 10, name: "AI110", from: "Delhi", to: "Bangalore" }
  ]);

  return (
    <div className="flight-container">
      <h2 className="title">✈ Flight List</h2>

      <div className="table-wrapper">
        <table className="flight-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Flight No</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>

          <tbody>
            {flights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.id}</td>
                <td>{flight.name}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Flightlist;