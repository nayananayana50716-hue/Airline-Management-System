import React, { useState } from "react";
import "./Dashboard.css";

import {
  FaMoon,
  FaSun,
  FaPlane,
  FaSearch,
  FaBell,
  FaUserCircle,
  FaClock,
  FaTicketAlt,
  FaGlobe,
  FaSuitcaseRolling,
  FaUsers,
  FaPlaneDeparture,
  FaPlaneArrival,
  FaCloudSun,
  FaHeadset,
  FaShieldAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import FlightMap from "../components/FlightMap";
import FlightChart from "../components/FlightChart";

function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");

  const navigate = useNavigate();

  // ======================================
  // FLIGHTS DATA
  // ======================================

  const flights = [
    {
      id: 1,
      name: "IndiGo",
      from: "Hyderabad",
      to: "Bengaluru",
      price: 5000,
      departure: "1:30 PM",
      boarding: "1:00 PM",
      arrival: "2:45 PM",
      status: "On Time",
      gate: "A12",
      terminal: "T1",
      seatsLeft: 8,
      type: "Domestic",
      baggage: "15kg Check-in",
      weather: "24°C ☁",
      duration: "1h 15m",
    },

    {
      id: 2,
      name: "Air India",
      from: "Bengaluru",
      to: "Delhi",
      price: 6000,
      departure: "2:00 PM",
      boarding: "1:20 PM",
      arrival: "4:40 PM",
      status: "Delayed",
      gate: "B05",
      terminal: "T2",
      seatsLeft: 3,
      type: "Domestic",
      baggage: "20kg Check-in",
      weather: "35°C ☀",
      duration: "2h 40m",
    },

    {
      id: 3,
      name: "SpiceJet",
      from: "Mumbai",
      to: "Goa",
      price: 4500,
      departure: "4:00 PM",
      boarding: "3:20 PM",
      arrival: "5:00 PM",
      status: "Boarding",
      gate: "C08",
      terminal: "T1",
      seatsLeft: 0,
      type: "Domestic",
      baggage: "15kg Check-in",
      weather: "30°C 🌤",
      duration: "1h",
    },
{ id: 4, name: "Akasa Air", from: "Bengaluru", to: "Chennai", price: 5500, departure: "3:00 PM", boarding: "2:20 PM", arrival: "4:05 PM", status: "On Time", gate: "D11", terminal: "T2", seatsLeft: 12, type: "Domestic", baggage: "20kg Check-in", weather: "28°C 🌦", duration: "1h 05m", }, { id: 5, name: "Vistara", from: "Bengaluru", to: "Mumbai", price: 7000, departure: "6:30 PM", boarding: "5:45 PM", arrival: "8:10 PM", status: "On Time", gate: "D01", terminal: "T1", seatsLeft: 10, type: "Domestic", baggage: "25kg Check-in", weather: "27°C 🌤", duration: "1h 40m", }, { id: 6, name: "Emirates", from: "Bengaluru", to: "Dubai", price: 55000, departure: "9:00 PM", boarding: "8:00 PM", arrival: "12:15 AM", status: "On Time", gate: "C11", terminal: "T1", seatsLeft: 5, type: "International", baggage: "30kg Check-in", weather: "40°C ☀", duration: "4h 15m", }, { id: 7, name: "SriLankan Airlines", from: "Bengaluru", to: "Colombo", price: 18000, departure: "11:00 AM", boarding: "10:20 AM", arrival: "1:00 PM", status: "Boarding", gate: "E02", terminal: "T2", seatsLeft: 2, type: "International", baggage: "25kg Check-in", weather: "31°C 🌦", duration: "2h", }, { id: 8, name: "Qatar Airways", from: "Bengaluru", to: "Doha", price: 72000, departure: "5:00 AM", boarding: "4:15 AM", arrival: "8:20 AM", status: "On Time", gate: "F11", terminal: "T3", seatsLeft: 6, type: "International", baggage: "35kg Check-in", weather: "37°C ☀", duration: "5h 20m", }, { id: 9, name: "Air India", from: "Bengaluru", to: "Delhi", price: 6000, departure: "2:00 PM", boarding: "1:20 PM", status: "Delayed", gate: "B05", terminal: "T2", seatsLeft: 3, type: "Domestic", baggage: "20kg Check-in", weather: "35°C ☀", }, { id: 10, name: "SpiceJet", from: "Mumbai", to: "Goa", price: 4500, departure: "4:00 PM", boarding: "3:20 PM", status: "Boarding", gate: "C08", terminal: "T1", seatsLeft: 0, type: "Domestic", baggage: "15kg Check-in", weather: "30°C 🌤", }, { id: 11, name: "Akasa Air", from: "Bengaluru", to: "Chennai", price: 5500, departure: "3:00 PM", boarding: "2:20 PM", status: "On Time", gate: "D11", terminal: "T2", seatsLeft: 12, type: "Domestic", baggage: "20kg Check-in", weather: "28°C 🌦", }, { id: 12, name: "Air India", from: "Bengaluru", to: "Chennai", price: 5500, departure: "4:00 PM", boarding: "7:20 PM", status: "On Time", gate: "S03", terminal: "T2", seatsLeft: 12, type: "Domestic", baggage: "18kg Check-in", weather: "28°C 🌦", },


  ];

  // ======================================
  // STATS
  // ======================================

  const totalDomestic = flights.filter(
    (f) => f.type === "Domestic"
  ).length;

  const totalInternational = flights.filter(
    (f) => f.type === "International"
  ).length;

  const soldOutFlights = flights.filter(
    (f) => f.seatsLeft === 0
  ).length;

  // ======================================
  // FILTER
  // ======================================

  const filteredFlights = flights.filter((flight) => {
    const matchSearch =
      flight.name.toLowerCase().includes(search.toLowerCase()) ||
      flight.from.toLowerCase().includes(search.toLowerCase()) ||
      flight.to.toLowerCase().includes(search.toLowerCase());

    const matchType =
      filterType === "All" || flight.type === filterType;

    return matchSearch && matchType;
  });

  // ======================================
  // BOOKING
  // ======================================

  const handleBookingClick = (flight) => {
    const user = localStorage.getItem("user");

    if (!user) {
      alert("Please Login First!");
      navigate("/login");
      return;
    }

    if (flight.seatsLeft === 0) {
      alert("No Seats Available");
      return;
    }

    navigate("/bookingform", {
      state: { flight },
    });
  };

  return (
    <div className={darkMode ? "dashboard dark" : "dashboard"}>
      <Sidebar />

      <div className="main-content">

        {/* TOP BAR */}
        <div className="top-bar">

          <div className="logo-section">
            <FaPlane className="plane-icon" />
            <h1>SkyLine Airways</h1>
          </div>

          <div className="top-actions">

            <FaBell className="top-icon" />
            <FaUserCircle className="top-icon" />

            <button
              className="dark-toggle"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

          </div>
        </div>

        {/* HERO */}
        <section className="hero">

          <h2>Welcome To SkyLine Airways ✈</h2>

          <p>
            Book flights, manage passengers, track flights
            and explore destinations.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/flights")}
          >
            Explore Flights
          </button>

        </section>

        {/* SEARCH */}
        <section className="search-section">

          <div className="search-box">

            <FaSearch />

            <input
              type="text"
              placeholder="Search Airline, Destination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">All Flights</option>
            <option value="Domestic">Domestic</option>
            <option value="International">International</option>
          </select>

        </section>

        {/* QUICK CARDS */}
        <div className="dashboard-cards">

          <div className="card">
            <FaPlane className="card-icon" />
            <h3>Flights</h3>
            <p>Book flights easily</p>
          </div>

          <div className="card">
            <FaTicketAlt className="card-icon" />
            <h3>Bookings</h3>
            <p>Manage bookings</p>
          </div>

          <div className="card">
            <FaCloudSun className="card-icon" />
            <h3>Weather</h3>
            <p>Airport weather updates</p>
          </div>

          <div className="card">
            <FaSuitcaseRolling className="card-icon" />
            <h3>Baggage</h3>
            <p>Track luggage</p>
          </div>

        </div>

        {/* STATS */}
        <section className="stats-section">

          <div className="stats-card">
            <FaPlaneDeparture className="stats-icon" />
            <h2>{flights.length}</h2>
            <p>Total Flights</p>
          </div>

          <div className="stats-card">
            <FaPlaneArrival className="stats-icon" />
            <h2>
              {
                flights.filter(
                  (flight) => flight.status === "Delayed"
                ).length
              }
            </h2>
            <p>Delayed Flights</p>
          </div>

          <div className="stats-card">
            <FaUsers className="stats-icon" />
            <h2>1200+</h2>
            <p>Passengers Today</p>
          </div>

          <div className="stats-card">
            <FaMoneyBillWave className="stats-icon" />
            <h2>₹35L+</h2>
            <p>Revenue Generated</p>
          </div>

          <div className="stats-card">
            <h2>{totalDomestic}</h2>
            <p>Domestic Flights</p>
          </div>

          <div className="stats-card">
            <h2>{totalInternational}</h2>
            <p>International Flights</p>
          </div>

          <div className="stats-card">
            <h2>{soldOutFlights}</h2>
            <p>Sold Out Flights</p>
          </div>

        </section>

        {/* LIVE TRACKING */}
        <section className="live-tracking">

          <h2>🛰 Live Flight Tracking</h2>

          <FlightMap flights={filteredFlights} />

        </section>

        {/* ANALYTICS */}
        <section className="chart-section">

          <h2>📊 Flight Analytics</h2>

          <FlightChart flights={flights} />
        </section>

        {/* FLIGHTS */}
        <section className="flights-section">

          <h2>Available Flights</h2>

          <div className="flights-grid">

            {filteredFlights.map((flight) => (

              <div className="flight-card" key={flight.id}>

                <div className="flight-header">

                  <div className="airline-info">

                    <div className="airline-logo">
                      ✈
                    </div>

                    <h3>{flight.name}</h3>

                  </div>

                  <span
                    className={`status ${
                      flight.status === "Delayed"
                        ? "delayed"
                        : flight.status === "Boarding"
                        ? "boarding"
                        : "ontime"
                    }`}
                  >
                    {flight.status}
                  </span>

                </div>

                <div className="route">

                  <span>{flight.from}</span>

                  <div className="route-line">
                    ✈ــــــــــــــــ✈
                  </div>

                  <span>{flight.to}</span>

                </div>

                <p>
                  <FaPlaneDeparture />
                  Departure: {flight.departure}
                </p>

                <p>
                  <FaPlaneArrival />
                  Arrival: {flight.arrival}
                </p>

                <p>
                  <FaClock />
                  Boarding: {flight.boarding}
                </p>

                <p>⏱ Duration: {flight.duration}</p>
                <p>🚪 Gate: {flight.gate}</p>
                <p>🏢 Terminal: {flight.terminal}</p>
                <p>💺 Seats Left: {flight.seatsLeft}</p>

                <p>🌦 Weather: {flight.weather}</p>
                <p>🧳 Baggage: {flight.baggage}</p>
                <p>🌍 Type: {flight.type}</p>

                <h4>₹{flight.price}</h4>

                <button
                  className={
                    flight.seatsLeft === 0
                      ? "book-btn disabled-btn"
                      : "book-btn"
                  }
                  disabled={flight.seatsLeft === 0}
                  onClick={() => handleBookingClick(flight)}
                >
                  {
                    flight.seatsLeft === 0
                      ? "Sold Out"
                      : "Book Now"
                  }
                </button>

              </div>

            ))}

          </div>

        </section>

      </div>
    </div>
  );
}

export default Dashboard;