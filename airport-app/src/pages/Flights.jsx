import React, { useEffect, useState } from "react";
import API from "../api";
import "./Flights.css";

function Flights() {
  const [flights, setFlights] = useState([]);

  // Fetch flights
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await API.get("/flights");
        setFlights(res.data);
      } catch (error) {
        console.log("Error fetching flights:", error);
      }
    };

    fetchFlights();
  }, []);

  // BOOK FLIGHT FUNCTION
  const handleBook = async (flight) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      const bookingData = {
        userId: user._id,
        flightId: flight._id,
        seatsBooked: 1,
      };

      const res = await API.post("/bookings", bookingData, {
        headers: {
          Authorization: token,
        },
      });

      alert("Booking Successful!");
      console.log(res.data);

    } catch (error) {
      console.log(error);
      alert("Booking failed");
    }
  };

  return (
    <div className="flights-container">
      <h2>✈ Available Flights</h2>

      {flights.length === 0 ? (
        <p>No flights available</p>
      ) : (
        flights.map((flight) => (
          <div
            key={flight._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>{flight.flightNumber}</h3>
            <p>{flight.from} → {flight.to}</p>
            <p>💰 Price: ₹{flight.price}</p>
            <p>🪑 Seats: {flight.seatsAvailable}</p>

            {/* BOOK BUTTON */}
            <button
              onClick={() => handleBook(flight)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Book Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Flights;