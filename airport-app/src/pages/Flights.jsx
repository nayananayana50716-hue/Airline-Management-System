import { useState, useEffect } from "react";
import "./Flights.css";

function Flights() {
  const [flight, setFlight] = useState({
    name: "",
    from: "",
    to: "",
    price: "",
    time: "",
  });

  const [flights, setFlights] = useState([]);

  // Load flights
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("flights")) || [];
    setFlights(saved);
  }, []);

  // Save flights
  useEffect(() => {
    localStorage.setItem("flights", JSON.stringify(flights));
  }, [flights]);

  const handleChange = (e) => {
    setFlight({ ...flight, [e.target.name]: e.target.value });
  };

  const addFlight = () => {
    const { name, from, to, price, time } = flight;

    if (!name || !from || !to || !price || !time) {
      alert("Please fill all fields");
      return;
    }

    setFlights([...flights, flight]);

    setFlight({
      name: "",
      from: "",
      to: "",
      price: "",
      time: "",
    });
  };

  const deleteFlight = (index) => {
    const updated = flights.filter((_, i) => i !== index);
    setFlights(updated);
  };

  return (
    <div className="flights-container">
      <h2 className="title">✈ Flight Management</h2>

      {/* FORM */}
      <div className="form-card">
        <h3>Add Flight</h3>

        <div className="form-group">
          <input
            name="name"
            placeholder="Flight Name"
            value={flight.name}
            onChange={handleChange}
          />

          <input
            name="from"
            placeholder="From"
            value={flight.from}
            onChange={handleChange}
          />

          <input
            name="to"
            placeholder="To"
            value={flight.to}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={flight.price}
            onChange={handleChange}
          />

          <input
            type="time"
            name="time"
            value={flight.time}
            onChange={handleChange}
          />
        </div>

        <button className="add-btn" onClick={addFlight}>
          + Add Flight
        </button>
      </div>

      {/* LIST */}
      <div className="list-card">
        <h3>Flight List</h3>

        {flights.length === 0 ? (
          <p className="empty">No flights available</p>
        ) : (
          flights.map((f, index) => (
            <div key={index} className="flight-item">
              <div className="flight-info">
                <h4>{f.name}</h4>
                <p>{f.from} → {f.to}</p>
                <span>🕒 {f.time} | 💰 ₹{f.price}</span>
              </div>

              <button
                className="delete-btn"
                onClick={() => deleteFlight(index)}
              >
                ✖
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Flights;