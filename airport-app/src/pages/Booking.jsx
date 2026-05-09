import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Booking.css";

function Booking() {
  const location = useLocation();

  const editData = location.state?.editData;
  const editIndex = location.state?.index;

  const [booking, setBooking] = useState({
    name: "",
    flightName: "",
    from: "",
    to: "",
    time: "",
  });

  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  // Load bookings
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(stored);
  }, []);

  // Pre-fill form if editing
  useEffect(() => {
    if (editData) {
      setBooking(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !booking.name ||
      !booking.flightName ||
      !booking.from ||
      !booking.to ||
      !booking.time
    ) {
      alert("Please fill all fields");
      return;
    }

    let updatedBookings = [...bookings];

    if (editData !== undefined) {
      // UPDATE existing booking
      updatedBookings[editIndex] = booking;
      setMessage("✏ Booking updated successfully!");
    } else {
      // ADD new booking
      updatedBookings.push(booking);
      setMessage("✅ Booking successful!");
    }

    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));

    // Reset form
    setBooking({
      name: "",
      flightName: "",
      from: "",
      to: "",
      time: "",
    });

    setTimeout(() => setMessage(""), 2500);
  };

  return (
    <div className="booking-container">
      <h2 className="title">
        {editData ? "✏ Edit Booking" : "✈ Book Flight"}
      </h2>

      {message && <div className="success-msg">{message}</div>}

      <div className="form-card">
        <input
          name="name"
          placeholder="Passenger Name"
          value={booking.name}
          onChange={handleChange}
        />

        <input
          name="flightName"
          placeholder="Flight Name"
          value={booking.flightName}
          onChange={handleChange}
        />

        <input
          name="from"
          placeholder="From"
          value={booking.from}
          onChange={handleChange}
        />

        <input
          name="to"
          placeholder="To"
          value={booking.to}
          onChange={handleChange}
        />

        <input
          name="time"
          placeholder="Time"
          value={booking.time}
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          {editData ? "Update Booking" : "Book Now"}
        </button>
      </div>
    </div>
  );
}

export default Booking;