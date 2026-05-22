import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import API from "../api/api";
import SeatSelector from "../components/SeatSelector";
import "./Booking.css";
import generateTicket from "../utils/generateTicket";

function Booking() {
  const location = useLocation();
  const flight = location.state?.flight;

  const [selectedSeat, setSelectedSeat] = useState("");
  const [paying, setPaying] = useState(false);
  const [seats, setSeats] = useState([]);

  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: "",
  });

  // 🚨 SAFE GUARD (PREVENT BLANK SCREEN CRASH)
  if (!flight) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>No flight selected</h2>
        <p>Please go back and select a flight again.</p>
      </div>
    );
  }

  // ================= FETCH SEATS =================
  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const res = await API.get(`/seats/${flight._id}`);
        setSeats(res.data || []);
      } catch (err) {
        console.log("Seat fetch error:", err);
      }
    };

    if (flight?._id) {
      fetchSeats();
    }
  }, [flight]);

  const handlePassengerChange = (e) => {
    setPassenger({
      ...passenger,
      [e.target.name]: e.target.value,
    });
  };

  // ================= PAYMENT =================
  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!selectedSeat) {
        alert("Select a seat first");
        return;
      }

      if (!passenger.name || !passenger.age || !passenger.gender) {
        alert("Fill all passenger details");
        return;
      }

      setPaying(true);

      const res = await API.post(
        "/payment/create-order",
        { amount: flight.price },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const order = res.data;

      const options = {
        key: "rzp_test_xxxxxxxx", // replace with real key
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Airline Booking",

        handler: async function (response) {
          try {
            const bookingData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              flightId: flight._id,
              seatNumber: selectedSeat,
              name: passenger.name,
              age: passenger.age,
              gender: passenger.gender,
            };

            const verifyRes = await API.post(
              "/payment/verify",
              bookingData,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );

            if (verifyRes.data.success) {
              await generateTicket({
                name: passenger.name,
                age: passenger.age,
                gender: passenger.gender,
                flightNumber: flight.flightNumber,
                from: flight.from,
                to: flight.to,
                seatNumber: selectedSeat,
                price: flight.price,
              });

              alert("Booking Successful 🎉");
            }
          } catch (err) {
            console.log(err);
            alert("Payment verified but booking failed");
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="booking-container">
      <h2>✈ Book Flight</h2>

      <div className="flight-info">
        <h3>{flight.flightNumber}</h3>
        <p>{flight.from} → {flight.to}</p>
        <p>💰 ₹{flight.price}</p>
      </div>

      {/* PASSENGER FORM */}
      <div className="passenger-form">
        <input
          type="text"
          name="name"
          placeholder="Passenger Name"
          value={passenger.name}
          onChange={handlePassengerChange}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={passenger.age}
          onChange={handlePassengerChange}
        />

        <select
          name="gender"
          value={passenger.gender}
          onChange={handlePassengerChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* SEAT SELECTOR */}
      <SeatSelector
        seats={seats}
        selectedSeat={selectedSeat}
        setSelectedSeat={setSelectedSeat}
      />

      {selectedSeat && (
        <p className="selected-seat">
          Selected Seat: <strong>{selectedSeat}</strong>
        </p>
      )}

      <button
        className="book-seat-btn"
        onClick={handlePayment}
        disabled={!selectedSeat || paying}
      >
        {paying ? "Processing..." : "Pay & Book"}
      </button>
    </div>
  );
}

export default Booking;