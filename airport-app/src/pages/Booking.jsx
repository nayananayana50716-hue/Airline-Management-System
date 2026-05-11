import React, { useEffect, useState } from "react";
import API from "../api";
import SeatSelector from "../Components/SeatSelector";
import "./Booking.css";
import generateTicket from "../utils/generateTicket";

function Booking() {
  const [flight, setFlight] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState("");

  // Fetch flight data
  useEffect(() => {
    const fetchFlight = async () => {
      try {
        const res = await API.get("/flights");

        // Example: first flight
        setFlight(res.data[0]);

      } catch (error) {
        console.log("Error fetching flight:", error);
      }
    };

    fetchFlight();
  }, []);

  // Handle booking
  const handleBook = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      const bookingData = {
        userId: user._id,
        flightId: flight._id,
        seatNumber: selectedSeat,
      };

      await API.post("/bookings", bookingData, {
        headers: {
          Authorization: token,
        },
      });

      alert("✅ Seat Booked Successfully!");

    } catch (error) {
      console.log(error);
      alert("❌ Booking failed");
    }
  };

  if (!flight) {
    return <p>Loading flights...</p>;
  }

  return (
    <div className="booking-container">
      <h2>✈ Select Your Seat</h2>

      {/* Flight Info */}
      <div className="flight-info">
        <h3>{flight.flightNumber}</h3>
        <p>
          {flight.from} → {flight.to}
        </p>
        <p>💰 ₹{flight.price}</p>
      </div>

      {/* Seat Selector */}
      <SeatSelector
        seats={flight.seats}
        selectedSeat={selectedSeat}
        setSelectedSeat={setSelectedSeat}
      />

      {/* Selected Seat */}
      {selectedSeat && (
        <p style={{ marginTop: "15px" }}>
          Selected Seat: <strong>{selectedSeat}</strong>
        </p>
      )}

      {/* Book Button */}
      <button
        onClick={handleBook}
        disabled={!selectedSeat}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "blue",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Book Seat
      </button>
    </div>
  );
}

export default Booking;