import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../api/api";
import "./BookingForm.css";

function BookingForm() {
  const location = useLocation();
  const navigate = useNavigate();

  const flight = location.state?.flight;

  const [loading, setLoading] = useState(false);

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSeatSelect = (seat) => {
    setFormData({
      ...formData,
      seatNumber: seat,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!flight) {
    alert("No flight selected");
    return;
  }

  if (!formData.seatNumber) {
    alert("Please select a seat");
    return;
  }

  // ✅ GET TOKEN
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    navigate("/login");
    return;
  }

  setLoading(true);

  const booking = {
    ...formData,
   flightId: String(flight._id || flight.id || ""),
    pnr: "PNR" + Math.floor(Math.random() * 1000000),
  };

  try {

    // ✅ API CALL
    await API.post("/bookings", booking, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setLoading(false);

    navigate("/success", {
      state: { booking },
    });

  } catch (error) {

    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response?.data);

    setLoading(false);

    alert("Booking failed");
  }
};

  if (!flight) {
    return (
      <div className="form-container">
        <h2>No flight selected</h2>
        <p>Please go back and select a flight first.</p>
        <button onClick={() => navigate("/")}>
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="form-container">

      <h2>Booking Form - {flight.name}</h2>

      <div className="flight-info">
        <p>{flight.from} → {flight.to}</p>
        <p>🕒 {flight.departure}</p>
        <p>💰 ₹{flight.price}</p>
      </div>

      <form onSubmit={handleSubmit}>

        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
        />

        <input
          name="age"
          placeholder="Age"
          onChange={handleChange}
          required
        />

        <select name="gender" onChange={handleChange} required>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />

        <select name="seatType" onChange={handleChange} required>
          <option value="">Seat Type</option>
          <option>Window</option>
          <option>Aisle</option>
          <option>Middle</option>
        </select>

        {/* SEAT MAP */}
        <div className="seat-container">
          <p>Select Seat:</p>

          <div className="seats">
            {["A1","A2","A3","B1","B2","B3","C1","C2","C3"].map((seat) => (
              <div
                key={seat}
                className={`seat ${
                  formData.seatNumber === seat ? "selected" : ""
                }`}
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

        <button type="submit" disabled={loading}>
          {loading ? "Booking..." : "Confirm Booking"}
        </button>

      </form>
    </div>
  );
}

export default BookingForm;