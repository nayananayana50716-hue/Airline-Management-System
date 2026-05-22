import express from "express";
import { sql } from "../config/db.js";

const router = express.Router();

// GET seats for a flight (FIXED + SAFE)
router.get("/:flightId", async (req, res) => {
  try {
    const result = await sql.query`
      SELECT 
        Id,
        FlightID,
        SeatNumber,
        IsBooked,
        Status
      FROM Seats
      WHERE FlightID = ${req.params.flightId}
    `;

    // ✅ IMPORTANT: MAP FOR FRONTEND
    const seats = result.recordset.map((seat) => ({
      _id: seat.Id,
      flightId: seat.FlightID,
      seatNumber: seat.SeatNumber,
      isBooked: seat.IsBooked === 1 || seat.IsBooked === true,
      status: seat.Status || "available",
    }));

    res.json(seats);

  } catch (err) {
    console.log("Seat API error:", err);

    res.status(500).json({
      success: false,
      message: "Failed to fetch seats",
      error: err.message,
    });
  }
});

export default router;