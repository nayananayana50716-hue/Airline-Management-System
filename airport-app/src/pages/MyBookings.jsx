import React, { useEffect, useState } from "react";
import API from "../api/api";

function MyBookings() {

  const [bookings, setBookings] = useState([]);

  const token = localStorage.getItem("token");

  // ================= FETCH BOOKINGS =================
  const fetchBookings = async () => {

    try {

      const res = await API.get("/bookings", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // FIX: SQL response structure
      setBookings(res.data.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // ================= CANCEL BOOKING =================
  const handleCancel = async (id) => {

    try {

      await API.delete(`/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Booking Cancelled");

      // refresh UI
      fetchBookings();

    } catch (error) {

      console.log(error);
      alert("Cancel failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>🎫 My Bookings</h2>

      {bookings.length === 0 ? (

        <p>No bookings found</p>

      ) : (

        bookings.map((booking) => (

          <div
            key={booking.id}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >

            <h3>✈ {booking.flightId}</h3>

            <p>🎫 Seat: {booking.seatNumber}</p>

            <p>💰 Payment: {booking.payment}</p>

            <p>
              📅 Date:{" "}
              {new Date().toLocaleString()}
            </p>

            <button
              onClick={() => handleCancel(booking.id)}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Cancel Booking
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default MyBookings;