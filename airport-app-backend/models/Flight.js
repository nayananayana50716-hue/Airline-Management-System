import mongoose from "mongoose";

const seatSchema =
  new mongoose.Schema({
    seatNumber: String,

    isBooked: {
      type: Boolean,
      default: false,
    },
  });

const flightSchema =
  new mongoose.Schema({

    flightNumber: String,

    from: String,

    to: String,

    departureTime: String,

    arrivalTime: String,

    price: Number,

    seats: [seatSchema],
  });

export default mongoose.model(
  "Flight",
  flightSchema
);