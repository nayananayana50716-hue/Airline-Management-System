import { sql, pool } from "../config/db.js";

// ================= DASHBOARD STATS =================
export const getDashboardStats = async (req, res) => {
  try {
    res.json({
      success: true,
      message: "Admin stats working"
    });
  } catch (err) {
    res.status(500).json({ message: "Error" });
  }
};