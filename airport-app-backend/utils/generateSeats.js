import { sql, pool } from "../config/db.js";

export const generateSeats = async (flightId) => {

  const rows = ["A", "B", "C", "D", "E"];
  const cols = [1, 2, 3, 4, 5, 6];

  for (let r of rows) {
    for (let c of cols) {

      await pool.request()
        .input("flightId", sql.Int, flightId)
        .input("seat", sql.VarChar, `${r}${c}`)
        .query(`
          INSERT INTO Seats2
          (FlightID, SeatNumber)
          VALUES
          (@flightId, @seat)
        `);
    }
  }
};