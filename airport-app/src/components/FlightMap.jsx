import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-rotatedmarker";

// AIRPORT COORDINATES
const airportCoords = {
  Hyderabad: [17.385, 78.4867],
  Bengaluru: [12.9716, 77.5946],
  Delhi: [28.6139, 77.209],
  Mumbai: [19.076, 72.8777],
  Goa: [15.2993, 74.124],
  Chennai: [13.0827, 80.2707],
  Dubai: [25.2048, 55.2708],
  Colombo: [6.9271, 79.8612],
  Doha: [25.2854, 51.531],
  Nepal: [27.7172, 85.324],
  UAE: [24.4539, 54.3773],
  Srilanka: [7.8731, 80.7718],
};

// PLANE ICON
const planeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [35, 35],
  iconAnchor: [17, 17],
});

function FlightMap({ flights }) {
  const [positions, setPositions] = useState([]);

  // INIT POSITIONS
  useEffect(() => {
    const initial = flights
      .map((flight) => {
        const from = airportCoords[flight.from];
        const to = airportCoords[flight.to];

        if (!from || !to) return null;

        return {
          id: flight.id,
          flight,
          from,
          to,
          lat: from[0],
          lng: from[1],
          progress: 0,
        };
      })
      .filter(Boolean);

    setPositions(initial);
  }, [flights]);

  // ANIMATION
  useEffect(() => {
    const interval = setInterval(() => {
      setPositions((prev) =>
        prev.map((plane) => {
          let progress = plane.progress + 0.01;
          if (progress > 1) progress = 0;

          const lat =
            plane.from[0] + (plane.to[0] - plane.from[0]) * progress;

          const lng =
            plane.from[1] + (plane.to[1] - plane.from[1]) * progress;

          return { ...plane, lat, lng, progress };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getRotation = (from, to) => {
    const dy = to[0] - from[0];
    const dx = to[1] - from[1];
    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  return (
    <div className="flight-map-container">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />

        {/* AIRPORTS */}
        {Object.entries(airportCoords).map(([city, coords]) => (
          <Marker key={city} position={coords}>
            <Popup>✈ Airport: {city}</Popup>
          </Marker>
        ))}

        {/* FLIGHTS */}
        {positions.map((plane) => (
          <React.Fragment key={plane.id}>
            <Polyline
              positions={[plane.from, plane.to]}
              color={
                plane.flight.status === "Delayed"
                  ? "red"
                  : plane.flight.status === "Boarding"
                  ? "orange"
                  : "lime"
              }
            />

            <Marker
              position={[plane.lat, plane.lng]}
              icon={planeIcon}
              rotationAngle={getRotation(plane.from, plane.to)}
              rotationOrigin="center"
            >
              <Popup>
                <h3>{plane.flight.name}</h3>
                <p>
                  {plane.flight.from} ➝ {plane.flight.to}
                </p>
                <p>Status: {plane.flight.status}</p>
                <p>Price: ₹{plane.flight.price}</p>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
}

export default FlightMap;