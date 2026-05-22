import { Routes, Route, Navigate } from "react-router-dom";

import Register from "./components/Register";
import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Flights from "./pages/Flights";


import Booking from "./pages/Booking";
import Passengers from "./pages/Passengers";
import Admin from "./pages/Admin";

import FlightForm from "./FlightComponents/FlightForm";
import Flightlist from "./FlightComponents/Flightlist";

import BookingForm from "./BookingComponents/BookingForm";
import Bookinglist from "./BookingComponents/Bookinglist";
import SuccessPage from "./pages/SuccessPage";
import Layout from "./components/Layout";
import generateTicket from "./utils/generateTicket";
import SeatSelector from "./components/SeatSelector";
import PrivateRoute from "./components/PrivateRoute";
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
<Route path="/success" element={<SuccessPage />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
}

export default App;