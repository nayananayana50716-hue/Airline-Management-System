import { sql, pool } from "../config/db.js";
import sendEmail from "../utils/sendEmail.js";
import { jsPDF } from "jspdf";


// ================= CREATE BOOKING =================
export const createBooking = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      phone,
      seatType,
      seatNumber,
      payment,
      flightId,
      pnr,
    } = req.body;

    // SAVE TO DB
    await pool.request()
      .input("name", sql.VarChar, name)
      .input("age", sql.Int, Number(age))
      .input("gender", sql.VarChar, gender)
      .input("phone", sql.VarChar, phone)
      .input("seatType", sql.VarChar, seatType)
      .input("seatNumber", sql.VarChar, seatNumber)
      .input("payment", sql.VarChar, payment)
      .input("flightId", sql.VarChar, String(flightId))
      .input("pnr", sql.VarChar, pnr)
      .query(`
        INSERT INTO bookings1
        (name, age, gender, phone, seatType, seatNumber, payment, flightId, pnr)
        VALUES
        (@name, @age, @gender, @phone, @seatType, @seatNumber, @payment, @flightId, @pnr)
      `);

    // CREATE PDF
    const doc = new jsPDF();
    doc.text("AIRLINE TICKET", 20, 20);
    doc.text(`Name: ${name}`, 20, 40);
    doc.text(`Seat: ${seatNumber}`, 20, 50);
    doc.text(`Flight: ${flightId}`, 20, 60);
    doc.text(`PNR: ${pnr}`, 20, 70);

    const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

    // EMAIL (safe fallback)
    await sendEmail({
      to: "test@gmail.com",
      subject: "Your Flight Ticket ✈",
      text: "Booking confirmed. Ticket attached.",
      attachment: pdfBuffer,
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
    });

  } catch (err) {
    console.log("CREATE BOOKING ERROR:", err);

    res.status(500).json({
      success: false,
      message: "Booking failed",
    });
  }
};


// ================= GET BOOKINGS =================
export const getBookings = async (req, res) => {
  try {
    const result = await pool.request()
      .query("SELECT * FROM bookings1");

    res.json({
      success: true,
      data: result.recordset,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Error fetching bookings",
    });
  }
};


// ================= CANCEL BOOKING =================
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.request()
      .input("id", sql.Int, Number(id))
      .query("DELETE FROM bookings1 WHERE id = @id");

    res.json({
      success: true,
      message: "Booking cancelled",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Cancel failed",
    });
  }
};