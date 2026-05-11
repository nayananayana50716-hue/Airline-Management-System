import React, { useEffect, useState } from "react";
import API from "../api";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user"));

        const res = await API.get("/bookings", {
          headers: {
            Authorization: token,
          },
        });

        // show only logged-in user's bookings
        const userBookings = res.data.filter(
          (b) => b.userId._id === user._id
        );

        setBookings(userBookings);

      } catch (error) {
        console.log(error);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎟 My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        bookings.map((b) => (
          <div
            key={b._id}
            style={{
              border: "1px solid #ccc",
              margin: "10px",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>
              {b.flightId.from} → {b.flightId.to}
            </h3>
            <p>Seats: {b.seatsBooked}</p>
            <p>Date: {new Date(b.bookingDate).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyBookings;