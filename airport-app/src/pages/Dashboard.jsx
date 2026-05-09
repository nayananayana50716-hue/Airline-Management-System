import "./Dashboard.css";
import { FaMoon, FaSun } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const flights = [
    { id: 1, name: "Indigo", from: "Hyderabad", to: "Bengaluru", price: 5000, departure: "1:30 PM" },
    { id: 2, name: "Air India", from: "Bengaluru", to: "Delhi", price: 6000, departure: "2:00 PM" },
    { id: 3, name: "SpiceJet", from: "Mumbai", to: "Chennai", price: 4500, departure: "4:00 PM" },
    { id: 4, name: "Akasa Air", from: "Bengaluru", to: "Chennai", price: 5500, departure: "3:00 PM" },
    { id: 5, name: "Vistara", from: "Delhi", to: "Kolkata", price: 7000, departure: "6:00 PM" },
    { id: 6, name: "Indigo", from: "Chennai", to: "Mumbai", price: 4800, departure: "7:30 PM" },
    { id: 7, name: "Air India", from: "Kolkata", to: "Hyderabad", price: 6200, departure: "5:00 AM" },
        { id: 8, name: "Indian Express", from: "Hyderabad", to: "Tamilnadu", price: 6200, departure: "2:00 AM" },
 { id: 9, name: "Vistara", from: "Bengalur", to: "Goa", price: 6200, departure: "18:00 AM" },    
 { id: 10, name: "Akasa Air ", from: "Tripura", to: "Bengaluru", price: 6200, departure: "12:00 AM" },
     { id: 11, name: "SpaceJet", from: "Kerala", to: "Hyderabad", price: 6200, departure: "10:00 AM" },
         { id: 12, name: "Indian Express", from: "Gujrat", to: "Mumbai", price: 6200, departure: "21:00 AM" }
];
const handleBookingClick = (flight) => {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("Please login first!");
    navigate("/login");
    return;
  }

  navigate("/bookingform", { state: flight });
};
  return (
    <div className={darkMode ? "dashboard dark" : "dashboard"}>
      <div className="toggle">
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <section className="hero">
        <h1>✈ Airline Dashboard</h1>
        <p>Welcome to Kempegowda International Airport</p>
      </section>

      <section className="flights-section">
        <h2>Available Flights</h2>

        <div className="flights-grid">
          {flights.map((flight) => (
            <div className="flight-card" key={flight.id}>
              <h3>{flight.name}</h3>
              <p>📍 {flight.from} ➝ {flight.to}</p>
              <p>🕒 Departure: {flight.departure}</p>
              <p>💰 Price: ₹{flight.price}</p>

<button
  className="book-btn"
  onClick={() => handleBookingClick(flight)}
>
  Book Now
</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;