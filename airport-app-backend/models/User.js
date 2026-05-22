import { pool, sql } from "../config/db.js";

// ================= GET USER =================
export const getUser = async (Email) => {

  const result = await pool.request()
    .input("Email", sql.VarChar, Email)
    .query(`
      SELECT * FROM Users
      WHERE LOWER(Email) = LOWER(@Email)
    `);

  return result.recordset[0];
};