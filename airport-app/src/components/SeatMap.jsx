import React from "react";
import "./SeatMap.css";

const rows = ["A", "B", "C", "D", "E", "F"];
const cols = [1, 2, 3, 4, 5, 6];

function SeatMap({ bookedSeats = [], selectedSeat, onSelect }) {
  return (
    <div className="seat-wrapper">
      <h3>Select Your Seat</h3>

      <div className="plane-layout">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            {cols.map((col) => {
              const seatId = `${row}${col}`;
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeat === seatId;

              return (
                <div
                  key={seatId}
                  className={`seat 
                    ${isBooked ? "booked" : ""} 
                    ${isSelected ? "selected" : ""}`}
                  onClick={() => !isBooked && onSelect(seatId)}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatMap;