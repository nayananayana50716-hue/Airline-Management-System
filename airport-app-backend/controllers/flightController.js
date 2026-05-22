import { pool, sql } from "../config/db.js";
import { generateSeats } from "../utils/generateSeats.js";

// ================= GET FLIGHTS =================
export const getFlights = async (req, res) => {
  try {
    const result = await pool.request().query(`
      SELECT 
        f.FlightID AS id,
        a.AirlineName AS airline,
        src.City AS source,
        dest.City AS destination,
        f.DepartureTime,
        f.ArrivalTime,
        f.Status
      FROM Flights2 f
      JOIN Airlines a ON f.AirlineID = a.AirlineID
      JOIN Airports src ON f.SourceAirportID = src.AirportID
      JOIN Airports dest ON f.DestinationAirportID = dest.AirportID
    `);

    res.json(result.recordset);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch flights" });
  }
};

// ================= ADD FLIGHT =================
export const addFlight = async (req, res) => {
  try {
    const {
      AirlineID,
      AircraftID,
      SourceAirportID,
      DestinationAirportID,
      DepartureTime,
      ArrivalTime,
      Status
    } = req.body;

    if (!AirlineID || !AircraftID || !SourceAirportID || !DestinationAirportID) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const result = await pool.request()
      .input("AirlineID", sql.Int, AirlineID)
      .input("AircraftID", sql.Int, AircraftID)
      .input("SourceAirportID", sql.Int, SourceAirportID)
      .input("DestinationAirportID", sql.Int, DestinationAirportID)
      .input("DepartureTime", sql.DateTime, DepartureTime)
      .input("ArrivalTime", sql.DateTime, ArrivalTime)
      .input("Status", sql.VarChar, Status || "Scheduled")
      .query(`
        INSERT INTO Flights2
        (AirlineID, AircraftID, SourceAirportID, DestinationAirportID, DepartureTime, ArrivalTime, Status)
        OUTPUT INSERTED.FlightID
        VALUES
        (@AirlineID, @AircraftID, @SourceAirportID, @DestinationAirportID, @DepartureTime, @ArrivalTime, @Status)
      `);

    const flightId = result.recordset[0].FlightID;

    // generate seats automatically
    await generateSeats(flightId);

    res.json({
      success: true,
      message: "Flight added successfully",
      flightId
    });

  } catch (err) {
    console.log("ADD FLIGHT ERROR:", err);
    res.status(500).json({ message: "Error adding flight" });
  }
};

// ================= DELETE FLIGHT =================
export const deleteFlight = async (req, res) => {
  try {
    const id = req.params.id;

    const check = await pool.request()
      .input("id", sql.Int, id)
      .query(`SELECT FlightID FROM Flights2 WHERE FlightID = @id`);

    if (check.recordset.length === 0) {
      return res.status(404).json({
        message: "Flight not found"
      });
    }

    await pool.request()
      .input("id", sql.Int, id)
      .query(`
        DELETE FROM Flights2
        WHERE FlightID = @id
      `);

    res.json({
      success: true,
      message: "Flight deleted successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Error deleting flight"
    });
  }
};