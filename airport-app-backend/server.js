import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import flightRoutes from "./routes/flightRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use("/api/flights", flightRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
// connect DB
connectDB();

app.get("/", (req, res) => {
  res.send("Airline backend running 🚀");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});