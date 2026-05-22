import React, { useState } from "react";
import API from "../api/api";
import "./FlightForm.css";

function FlightForm() {
  const [flight, setFlight] = useState({
    AirlineID: "",
    AircraftID: "",
    SourceAirportID: "",
    DestinationAirportID: "",
    DepartureTime: "",
    ArrivalTime: "",
    Status: "Scheduled",
  });

  const handleChange = (e) => {
    setFlight({
      ...flight,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/flights", flight);

      alert("✈ Flight Added Successfully!");

      setFlight({
        AirlineID: "",
        AircraftID: "",
        SourceAirportID: "",
        DestinationAirportID: "",
        DepartureTime: "",
        ArrivalTime: "",
        Status: "Scheduled",
      });

    } catch (error) {
      console.log(error);
      alert("Failed to add flight");
    }
  };

  return (
    <div className="flight-container">
      <h2 className="title">✈ Add Flight</h2>

      <form className="form-card" onSubmit={handleSubmit}>

        <input
          type="number"
          name="AirlineID"
          placeholder="Airline ID"
          value={flight.AirlineID}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="AircraftID"
          placeholder="Aircraft ID"
          value={flight.AircraftID}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="SourceAirportID"
          placeholder="Source Airport ID"
          value={flight.SourceAirportID}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="DestinationAirportID"
          placeholder="Destination Airport ID"
          value={flight.DestinationAirportID}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="DepartureTime"
          value={flight.DepartureTime}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="ArrivalTime"
          value={flight.ArrivalTime}
          onChange={handleChange}
          required
        />

        <select
          name="Status"
          value={flight.Status}
          onChange={handleChange}
        >
          <option value="Scheduled">Scheduled</option>
          <option value="Delayed">Delayed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">
          Add Flight ✈
        </button>

      </form>
    </div>
  );
}

export default FlightForm;