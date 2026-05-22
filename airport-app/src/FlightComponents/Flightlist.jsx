import React, { useEffect, useState } from "react";
import API from "../api/api";
import "./FlightList.css";

function FlightList() {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    fetchFlights();
  }, []);

  const fetchFlights = async () => {
    try {
      const res = await API.get("/flights");
      setFlights(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE FLIGHT
  const deleteFlight = async (id) => {
    try {
      await API.delete(`/flights/${id}`);

      alert("Flight Deleted");

      setFlights((prev) =>
        prev.filter((f) => f._id !== id)
      );
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="flight-list-container">

      <h2>✈ Flight List</h2>

      {flights.length === 0 ? (
        <p>No flights available</p>
      ) : (
        flights.map((flight) => (
          <div key={flight._id} className="flight-card">

            <h3>{flight.flightNumber}</h3>

            <p>
              📍 {flight.from} → {flight.to}
            </p>

            <p>🕒 {flight.departureTime}</p>

            <p>🕒 {flight.arrivalTime}</p>

            <p>💰 ₹{flight.price}</p>

            <button
              onClick={() => deleteFlight(flight._id)}
              className="delete-btn"
            >
              Delete
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default FlightList;