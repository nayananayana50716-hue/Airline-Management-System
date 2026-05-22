import React, {
  useEffect,
  useState,
} from "react";

import API from "../api/api";

function AdminFlights() {
  const [flights, setFlights] =
    useState([]);

  // FETCH FLIGHTS
  const fetchFlights = async () => {
    try {
      const res = await API.get(
        "/flights"
      );

      setFlights(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // DELETE FLIGHT
  const deleteFlight = async (id) => {
    try {
      await API.delete(
        `/flights/${id}`
      );

      alert("Flight deleted");

      fetchFlights();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        🛫 Admin Flight Management
      </h2>

      {flights.map((flight) => (
        <div
          key={flight._id}
          style={{
            border: "1px solid gray",
            margin: "15px 0",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>
            {flight.flightNumber}
          </h3>

          <p>
            {flight.from} → {flight.to}
          </p>

          <p>
            ₹{flight.price}
          </p>

          <button
            onClick={() =>
              deleteFlight(
                flight._id
              )
            }
            style={{
              background: "red",
              color: "white",
              border: "none",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            Delete Flight
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminFlights;