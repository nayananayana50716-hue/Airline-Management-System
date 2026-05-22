import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    flightId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Flight",
      required: true,
    },

    seatNumber: {
      type: String,
      required: true,
    },

    passengerName: String,
    passengerAge: Number,
    passengerGender: String,

    // ✅ NEW FIELDS (IMPORTANT)
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "confirmed",
    },

    paymentId: String,
    orderId: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Booking", bookingSchema);