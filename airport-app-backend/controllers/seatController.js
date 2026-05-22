import { sql } from "../config/db.js";

// LOCK SEAT (SQL VERSION - FIXED)
export const lockSeat = async (req, res) => {
  try {
    const { seatId, userId } = req.body;

    // 1. VALIDATION
    if (!seatId || !userId) {
      return res.status(400).json({
        message: "seatId and userId are required",
      });
    }

    // 2. CHECK SEAT EXISTS
    const result = await sql.query`
      SELECT * FROM Seats WHERE Id = ${seatId}
    `;

    const seat = result.recordset[0];

    if (!seat) {
      return res.status(404).json({ message: "Seat not found" });
    }

    // 3. CHECK IF ALREADY BOOKED
    if (seat.IsBooked === 1) {
      return res.status(400).json({
        message: "Seat already booked",
      });
    }

    // 4. CHECK IF LOCKED AND NOT EXPIRED
    if (
      seat.Status === "locked" &&
      seat.lockedBy &&
      seat.lockedBy !== userId &&
      seat.lockExpiry &&
      new Date(seat.lockExpiry) > new Date()
    ) {
      return res.status(400).json({
        message: "Seat is temporarily locked by another user",
      });
    }

    // 5. LOCK SEAT (FULL UPDATE)
    await sql.query`
      UPDATE Seats
      SET 
        Status = 'locked',
        lockedBy = ${userId},
        lockExpiry = DATEADD(MINUTE, 5, GETDATE())
      WHERE Id = ${seatId}
    `;

    res.json({
      success: true,
      message: "Seat locked successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};