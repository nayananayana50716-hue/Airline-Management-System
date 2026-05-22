import React, { useEffect, useState } from "react";
import API from "../api/api";
import "./Flights.css";
import { useNavigate } from "react-router-dom";

function Flights() {

  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  // SEARCH STATES
  const [searchFrom, setSearchFrom] = useState("");
  const [searchTo, setSearchTo] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const navigate = useNavigate();

  // FETCH FLIGHTS
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await API.get("/flights");
        setFlights(res.data || []);
      } catch (error) {
        console.log("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  // LOADING UI
  if (loading) {
    return <p className="loading">Loading flights...</p>;
  }

  // FILTER + SORT
  const filteredFlights = (flights || [])
    .filter((flight) => {
      const from = flight?.from || "";
      const to = flight?.to || "";

      return (
        from.toLowerCase().includes(searchFrom.toLowerCase()) &&
        to.toLowerCase().includes(searchTo.toLowerCase()) &&
        (maxPrice === "" || (flight?.price || 0) <= Number(maxPrice))
      );
    })
    .sort((a, b) => {
      if (sortOrder === "low") return (a?.price || 0) - (b?.price || 0);
      if (sortOrder === "high") return (b?.price || 0) - (a?.price || 0);
      return 0;
    });

  return (
    <div className="flights-container">

      <h2>✈ Available Flights</h2>

      {/* SEARCH BOX */}
      <div className="search-box">

        <input
          type="text"
          placeholder="From"
          value={searchFrom}
          onChange={(e) => setSearchFrom(e.target.value)}
        />

        <input
          type="text"
          placeholder="To"
          value={searchTo}
          onChange={(e) => setSearchTo(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Sort By Price</option>
          <option value="low">Low to High</option>
          <option value="high">High to Low</option>
        </select>

      </div>

      {/* FLIGHTS LIST */}
      {filteredFlights.length === 0 ? (
        <p className="no-flights">No flights available</p>
      ) : (
        filteredFlights.map((flight) => (
          <div key={flight._id} className="flight-card">

            <h3>{flight.flightNumber}</h3>

            <p>
              {flight.from} → {flight.to}
            </p>

            <p>💰 Price: ₹{flight.price}</p>

            {/* SEATS */}
            <p>
              🪑 Available Seats: {
                flight.seats?.filter(seat => !seat.isBooked).length || 0
              }
            </p>

            {/* BOOK BUTTON */}
            <button
              className="book-btn"
              onClick={() =>
                navigate("/booking", { state: { flight } })
              }
            >
              Book Now
            </button>

          </div>
        ))
      )}

    </div>
  );
}

export default Flights;