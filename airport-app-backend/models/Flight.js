import mongoose from "mongoose";

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  price: Number,
  seatsAvailable: Number
});

export default mongoose.model("Flight", flightSchema);