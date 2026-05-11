import React from "react";

function FlightCard({ flight, onBook }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "15px",
        margin: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        background: "#fff",
      }}
    >
      <h3>✈ {flight.flightNumber}</h3>

      <p>
        {flight.from} → {flight.to}
      </p>

      <p>💰 ₹{flight.price}</p>
      <p>🪑 Seats: {flight.seatsAvailable}</p>

      {onBook && (
        <button
          onClick={() => onBook(flight)}
          style={{
            marginTop: "10px",
            padding: "8px 12px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Book Now
        </button>
      )}
    </div>
  );
}

export default FlightCard;