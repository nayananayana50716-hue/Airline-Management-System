import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./BookingForm.css";
import { jsPDF } from "jspdf";

function BookingForm() {
  const { state: flight } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    seatType: "",
    seatNumber: "",
    payment: "",
  });



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSeatSelect = (seat) => {
    setFormData({ ...formData, seatNumber: seat });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const booking = {
      ...formData,
      flight,
      pnr: "PNR" + Math.floor(Math.random() * 1000000),
    };

    const existing = JSON.parse(localStorage.getItem("bookings")) || [];
    localStorage.setItem("bookings", JSON.stringify([...existing, booking]));

    navigate("/success", { state: { booking } });
  };

  return (
    <div className="form-container">
      <h2>Booking form {flight?.name}</h2>

      <div className="flight-info">
        <p>{flight?.from} → {flight?.to}</p>
        <p>🕒 {flight?.departure}</p>
        <p>💰 ₹{flight?.price}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="age" placeholder="Age" onChange={handleChange} required />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input name="phone" placeholder="Phone" onChange={handleChange} required />

        <select name="seatType" onChange={handleChange} required>
          <option value="">Seat Type</option>
          <option>Window</option>
          <option>Aisle</option>
          <option>Middle</option>
        </select>

        {/* Seat Selection */}
        <div className="seat-container">
          <p>Select Seat:</p>
          <div className="seats">
            {["A1","A2","A3","B1","B2","B3","C1","C2","C3"].map(seat => (
              <div
                key={seat}
                className={`seat ${formData.seatNumber === seat ? "selected" : ""}`}
                onClick={() => handleSeatSelect(seat)}
              >
                {seat}
              </div>
            ))}
          </div>
        </div>

        <select name="payment" onChange={handleChange} required>
          <option value="">Payment</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Cash</option>
        </select>

        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}

export default BookingForm;