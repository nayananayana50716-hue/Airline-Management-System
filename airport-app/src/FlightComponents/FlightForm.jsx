import { useState } from "react";
import "./Flightlist.css";

function Flightlist() {
  const [flights] = useState([
    { id: 1, name: "AI101", from: "Delhi", to: "Mumbai" },
    { id: 2, name: "IND202", from: "Bangalore", to: "Chennai" },
    { id: 3, name: "SG303", from: "Hyderabad", to: "Delhi" },
    { id: 4, name: "UK404", from: "Mumbai", to: "Kolkata" },
    { id: 5, name: "AI505", from: "Chennai", to: "Bangalore" },
    { id: 6, name: "6E606", from: "Pune", to: "Goa" },
    { id: 7, name: "G8707", from: "Ahmedabad", to: "Jaipur" },
    { id: 8, name: "QP808", from: "Kolkata", to: "Delhi" },
    { id: 9, name: "IX909", from: "Kochi", to: "Mumbai" },
    { id: 10, name: "AI110", from: "Delhi", to: "Bangalore" }
  ]);

  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [passenger, setPassenger] = useState({
    name: "",
    age: "",
    gender: ""
  });

  const handleBookNow = () => {
    if (!selectedFlight) {
      alert("⚠ Please select a flight first!");
      return;
    }
    setShowForm(true);
  };

  const handleChange = (e) => {
    setPassenger({ ...passenger, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `🎉 Booking Confirmed!\nPassenger: ${passenger.name}\nGender: ${passenger.gender}\nFlight: ${selectedFlight.name}`
    );

    setShowForm(false);
    setPassenger({ name: "", age: "", gender: "" });
  };

  return (
    <div className="flight-container">
      <h2 className="title">✈ Flight Form</h2>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="flight-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Flight No</th>
              <th>From</th>
              <th>To</th>
            </tr>
          </thead>

          <tbody>
            {flights.map((flight) => (
              <tr
                key={flight.id}
                className={selectedFlight?.id === flight.id ? "active-row" : ""}
              >
                <td>
                  <input
                    type="radio"
                    name="flight"
                    checked={selectedFlight?.id === flight.id}
                    onChange={() => setSelectedFlight(flight)}
                  />
                </td>
                <td>{flight.id}</td>
                <td>{flight.name}</td>
                <td>{flight.from}</td>
                <td>{flight.to}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* BOOK BUTTON */}
      <button className="book-btn" onClick={handleBookNow}>
        Book Now ✈
      </button>

      {/* PASSENGER FORM MODAL */}
      {showForm && (
        <div className="modal-overlay">
          <form className="form-card" onSubmit={handleSubmit}>
            <h3 className="form-title">Passenger Details</h3>

            <input
              type="text"
              name="name"
              placeholder="Passenger Name"
              value={passenger.name}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={passenger.age}
              onChange={handleChange}
              required
            />

            {/* GENDER DROPDOWN */}
            <select
              name="gender"
              value={passenger.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>

            <button type="submit" className="submit-btn">
              Confirm Booking
            </button>

            <button
              type="button"
              className="close-btn"
              onClick={() => setShowForm(false)}
            >
              Close
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Flightlist;