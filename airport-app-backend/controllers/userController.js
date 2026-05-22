import { pool, sql } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getUser } from "../models/user.js";

// ================= REGISTER =================
export const registerUser = async (req, res) => {

  try {

    let {
      Firstname,
      Lastname,
      Age,
      PhoneNumber,
      Email,
      Password,
      Role
    } = req.body;

    // VALIDATION
    if (!Firstname || !Email || !Password) {
      return res.status(400).json({
        message: "Required fields missing"
      });
    }

    Email = Email.trim().toLowerCase();

    // CHECK EXISTING USER
    const existingUser = await pool.request()
      .input("Email", sql.VarChar, Email)
      .query(`
        SELECT * FROM Users
        WHERE Email = @Email
      `);

    if (existingUser.recordset.length > 0) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(Password, 10);

    // INSERT USER
    await pool.request()
      .input("Firstname", sql.VarChar, Firstname)
      .input("Lastname", sql.VarChar, Lastname)
      .input("Age", sql.Int, Age)
      .input("PhoneNumber", sql.VarChar, PhoneNumber)
      .input("Email", sql.VarChar, Email)
      .input("Password", sql.VarChar, hashedPassword)
      .input("Role", sql.VarChar, Role || "user")
      .query(`
        INSERT INTO Users
        (
          Firstname,
          Lastname,
          Age,
          PhoneNumber,
          Email,
          Password,
          Role
        )
        VALUES
        (
          @Firstname,
          @Lastname,
          @Age,
          @PhoneNumber,
          @Email,
          @Password,
          @Role
        )
      `);

    res.status(201).json({
      success: true,
      message: "Registration successful"
    });

  } catch (err) {

    console.log("REGISTER ERROR:", err);

    res.status(500).json({
      message: "Server error"
    });
  }
};

// ================= LOGIN =================
// ================= LOGIN =================
export const loginUser = async (req, res) => {

  try {

    let { email, password } = req.body;

    // VALIDATION
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required"
      });
    }

    email = email.trim().toLowerCase();

    // GET USER
    const user = await getUser(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.Password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    // CREATE TOKEN
    const token = jwt.sign(
      {
        id: user.UserID,
        email: user.Email,
        role: user.Role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d"
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user
    });

  } catch (err) {

    console.log("LOGIN ERROR:", err);

    res.status(500).json({
      message: "Server error"
    });
  }
};