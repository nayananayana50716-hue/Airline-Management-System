import React from "react";

function SeatSelector({ seats, selectedSeat, setSelectedSeat }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 50px)",
        gap: "10px",
        marginTop: "20px",
      }}
    >
      {seats.map((seat) => (
        <div
          key={seat.number}
          onClick={() => {
            if (!seat.isBooked) {
              setSelectedSeat(seat.number);
            }
          }}
          style={{
            width: "45px",
            height: "45px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "6px",
            cursor: seat.isBooked ? "not-allowed" : "pointer",
            backgroundColor: seat.isBooked
              ? "red"
              : selectedSeat === seat.number
              ? "green"
              : "#eee",
            color: seat.isBooked ? "white" : "black",
            fontWeight: "bold",
          }}
        >
          {seat.number}
        </div>
      ))}
    </div>
  );
}

export default SeatSelector;