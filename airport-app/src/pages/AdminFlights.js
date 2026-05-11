import React, { useEffect, useState } from "react";
import API from "../api";

function AdminFlights() {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({
    flightNumber: "",
    from: "",
    to: "",
    price: "",
    seatsAvailable: "",
  });

  // GET FLIGHTS
  const fetchFlights = async () => {
    const res = await API.get("/flights");
    setFlights(res.data);
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  // HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ADD FLIGHT
  const addFlight = async () => {
    await API.post("/flights", form);
    alert("Flight added");
    fetchFlights();
  };

  // DELETE FLIGHT
  const deleteFlight = async (id) => {
    await API.delete(`/flights/${id}`);
    fetchFlights();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🧑‍💼 Admin Panel - Flights</h2>

      {/* FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input name="flightNumber" placeholder="Flight No" onChange={handleChange} />
        <input name="from" placeholder="From" onChange={handleChange} />
        <input name="to" placeholder="To" onChange={handleChange} />
        <input name="price" placeholder="Price" onChange={handleChange} />
        <input name="seatsAvailable" placeholder="Seats" onChange={handleChange} />

        <button onClick={addFlight}>Add Flight</button>
      </div>

      {/* LIST */}
      {flights.map((f) => (
        <div
          key={f._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{f.flightNumber}</h3>
          <p>{f.from} → {f.to}</p>
          <p>₹{f.price}</p>
          <p>Seats: {f.seatsAvailable}</p>

          <button onClick={() => deleteFlight(f._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminFlights;