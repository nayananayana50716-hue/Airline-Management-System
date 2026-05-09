import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./Components/Register";
import Login from "./Pages/Login";

import Dashboard from "./Pages/Dashboard";
import Flights from "./Pages/Flights";
import SuccessPage from "./pages/SuccessPage";

import Booking from "./Pages/Booking";
import Passengers from "./Pages/Passengers";
import Admin from "./Pages/Admin";

import FlightForm from "./FlightComponents/FlightForm";
import Flightlist from "./FlightComponents/Flightlist";

import BookingForm from "./BookingComponents/BookingForm";
import Bookinglist from "./BookingComponents/Bookinglist";

import Layout from "./Components/Layout";
import PrivateRoute from "./Components/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Routes>

      {/* PUBLIC */}
      <Route path="/" element={<Register />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* PROTECTED */}
      <Route element={<PrivateRoute><Layout /></PrivateRoute>}>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flights" element={<Flights />} />
         <Route path="/success" element={<SuccessPage />} />

        {/* BOOKING */}
        <Route path="/booking" element={<Booking />} />
        <Route path="/bookingform" element={<BookingForm />} />   {/* ✅ FIXED */}
        <Route path="/bookinglist" element={<Bookinglist />} />

        <Route path="/passengers" element={<Passengers />} />

        {/* ADMIN */}
        <Route path="/admin" element={<Admin />} />

        {/* FLIGHTS */}
        <Route path="/flightform" element={<FlightForm />} />
        <Route path="/flightlist" element={<Flightlist />} />

      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;