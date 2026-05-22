import { pool } from "../config/db.js";

export const getHomeData = async (req, res) => {
  try {

    const flightResult = await pool.request()
      .query("SELECT COUNT(*) AS totalFlights FROM Flights2");

    const userResult = await pool.request()
      .query("SELECT COUNT(*) AS totalUsers FROM Users");

    const bookingResult = await pool.request()
      .query("SELECT COUNT(*) AS totalBookings FROM Bookings");

    res.json({
      stats: {
        totalFlights: flightResult.recordset[0].totalFlights,
        totalUsers: userResult.recordset[0].totalUsers,
        totalBookings: bookingResult.recordset[0].totalBookings,
      }
    });

  } catch (err) {

    console.log("HOME API ERROR:", err);

    res.status(500).json({
      message: err.message
    });
  }
};