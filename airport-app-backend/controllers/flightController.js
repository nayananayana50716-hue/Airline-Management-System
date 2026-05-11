import Flight from "../models/Flight.js";

// Generate seats automatically
const generateSeats = () => {
  const seats = [];

  const rows = ["A", "B", "C", "D"];
  const numbers = [1, 2, 3, 4, 5];

  rows.forEach((row) => {
    numbers.forEach((num) => {
      seats.push({
        number: `${row}${num}`,
        isBooked: false,
      });
    });
  });

  return seats;
};

// GET all flights
export const getFlights = async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD flight
export const addFlight = async (req, res) => {
  try {
    const {
      flightNumber,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
    } = req.body;

    const flight = await Flight.create({
      flightNumber,
      from,
      to,
      departureTime,
      arrivalTime,
      price,

      // Auto generate seats
      seats: generateSeats(),
    });

    res.json(flight);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE flight
export const deleteFlight = async (req, res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);

    res.json({
      message: "Flight deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};