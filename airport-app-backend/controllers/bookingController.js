import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

export const createBooking = async (req, res) => {
  try {
    const { userId, flightId, seatsBooked } = req.body;

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.json({ message: "Flight not found" });
    }

    // ❌ check seats
    if (flight.seatsAvailable < seatsBooked) {
      return res.json({ message: "Not enough seats available" });
    }

    // ✅ reduce seats
    flight.seatsAvailable -= seatsBooked;
    await flight.save();

    // create booking
    const booking = await Booking.create({
      userId,
      flightId,
      seatsBooked,
    });

    res.json(booking);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};