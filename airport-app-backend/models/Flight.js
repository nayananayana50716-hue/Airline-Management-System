import mongoose from "mongoose";
import Flight from "../models/Flight.js";

const seatSchema = new mongoose.Schema({
  number: String,
  isBooked: {
    type: Boolean,
    default: false,
  },
  
});

const flightSchema = new mongoose.Schema({
  flightNumber: String,
  from: String,
  to: String,
  departureTime: String,
  arrivalTime: String,
  price: Number,

  // ✅ NEW SEAT SYSTEM
  seats: [seatSchema],
});

export default mongoose.model("Flight", flightSchema);