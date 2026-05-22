import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool, sql } from "../config/db.js";

// REGISTER
export const registerUser = async (req, res) => {
  try {

    const {
      Firstname,
      Lastname,
      Age,
      PhoneNumber,
      Email,
      Password
    } = req.body;

    // check existing user
    const existing = await pool.request()
      .input("Email", sql.VarChar, Email)
      .query(`
        SELECT * FROM Users
        WHERE Email = @Email
      `);

    if (existing.recordset.length > 0) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // insert user
    await pool.request()
      .input("Firstname", sql.VarChar, Firstname)
      .input("Lastname", sql.VarChar, Lastname)
      .input("Age", sql.Int, Age)
      .input("PhoneNumber", sql.VarChar, PhoneNumber)
      .input("Email", sql.VarChar, Email)
      .input("Password", sql.VarChar, hashedPassword)
      .query(`
        INSERT INTO Users
        (
          Firstname,
          Lastname,
          Age,
          PhoneNumber,
          Email,
          Password
        )
        VALUES
        (
          @Firstname,
          @Lastname,
          @Age,
          @PhoneNumber,
          @Email,
          @Password
        )
      `);

    res.json({
      success: true,
      message: "User registered successfully"
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Registration failed"
    });
  }
};
export const loginUser = async (req, res) => {
  try {

    const { Email, Password } = req.body;

    const result = await pool.request()
      .input("Email", sql.VarChar, Email)
      .query(`
        SELECT * FROM Users
        WHERE Email = @Email
      `);

    if (result.recordset.length === 0) {
      return res.status(400).json({
        message: "Invalid email"
      });
    }

    const user = result.recordset[0];

    const isMatch = await bcrypt.compare(
      Password,
      user.Password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.UserID,
        role: user.Role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      token,
      user
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Login failed"
    });
  }
};