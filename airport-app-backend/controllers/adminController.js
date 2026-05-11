import User from "../models/User.js";
import Flight from "../models/Flight.js";
import Booking from "../models/Booking.js";

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const flights = await Flight.countDocuments();
    const bookings = await Booking.countDocuments();

    const revenueData = await Booking.find().populate("flightId");

    const revenue = revenueData.reduce((total, b) => {
      return total + (b.flightId?.price || 0) * b.seatsBooked;
    }, 0);

    res.json({
      users,
      flights,
      bookings,
      revenue,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};