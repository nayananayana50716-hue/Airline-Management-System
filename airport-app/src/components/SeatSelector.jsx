import React, { useEffect, useState } from "react";
import API from "../api/api";
import "./SeatSelector.css";

function SeatSelector({ seats = [], selectedSeat, setSelectedSeat }) {
  const [seatData, setSeatData] = useState([]);

  useEffect(() => {
    setSeatData(Array.isArray(seats) ? seats : []);
  }, [seats]);

  const handleSeatClick = async (seat) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/seats/lock", {
        seatId: seat._id,
        userId: user.UserID,
      });

      setSelectedSeat(seat.seatNumber);

      setSeatData((prev) =>
        prev.map((s) =>
          s._id === seat._id
            ? { ...s, status: "locked" }
            : s
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Seat unavailable");
    }
  };

  return (
    <div className="seat-container">
      {seatData.map((seat) => (
        <button
          key={seat._id}
          disabled={seat.isBooked || seat.status === "locked"}
          onClick={() => handleSeatClick(seat)}
          className={`seat ${
            seat.isBooked
              ? "booked"
              : seat.status === "locked"
              ? "locked"
              : selectedSeat === seat.seatNumber
              ? "selected"
              : ""
          }`}
        >
          {seat.seatNumber}
        </button>
      ))}
    </div>
  );
}

export default SeatSelector;