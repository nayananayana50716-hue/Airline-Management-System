import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  flightId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Flight",
  },
  seatsBooked: Number,
  bookingDate: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Booking", bookingSchema);