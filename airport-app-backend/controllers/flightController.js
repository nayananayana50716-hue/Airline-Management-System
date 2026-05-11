import Flight from "../models/Flight.js";

// GET all flights
export const getFlights = async (req, res) => {
  const flights = await Flight.find();
  res.json(flights);
};

// ADD flight
export const addFlight = async (req, res) => {
  const flight = await Flight.create(req.body);
  res.json(flight);
};

// DELETE flight
export const deleteFlight = async (req, res) => {
  await Flight.findByIdAndDelete(req.params.id);
  res.json({ message: "Flight deleted" });
};