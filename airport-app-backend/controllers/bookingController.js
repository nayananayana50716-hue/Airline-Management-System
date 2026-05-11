import Booking from "../models/Booking.js";
import Flight from "../models/Flight.js";

export const createBooking = async (req, res) => {
  try {
    const { userId, flightId, seatNumber } = req.body;

    const flight = await Flight.findById(flightId);

    if (!flight) {
      return res.status(404).json({
        message: "Flight not found",
      });
    }

    // Find selected seat
    const seat = flight.seats.find(
      (s) => s.number === seatNumber
    );

    // Seat not found
    if (!seat) {
      return res.status(404).json({
        message: "Seat not found",
      });
    }

    // Already booked
    if (seat.isBooked) {
      return res.status(400).json({
        message: "Seat already booked",
      });
    }

    // Book seat
    seat.isBooked = true;

    await flight.save();

    // Create booking
    const booking = await Booking.create({
      userId,
      flightId,
      seatNumber,
    });

    res.json({
      message: "Booking successful",
      booking,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// GET all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    res.json(bookings);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};