import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config();

// ✅ JUST IMPORT DB FILE
import "./config/db.js";

import flightRoutes from "./routes/flightRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import seatRoutes from "./routes/seatRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

// ================= SOCKET.IO =================
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

io.on("connection", (socket) => {

  console.log("🟢 User connected:", socket.id);

  socket.on("joinFlight", (flightId) => {
    socket.join(String(flightId));
    console.log("234")
  });

  socket.on("seatBooked", ({ flightId, seat }) => {
    io.to(String(flightId)).emit("seatUpdated", seat);
    console.log("32424")
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    console.log("90789789")
  });
});

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// ================= ROUTES =================
app.use("/api/flights", flightRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/seats", seatRoutes);
app.use("/api/auth", authRoutes);
// ================= HOME =================
app.get("/", (req, res) => {
  res.send("Airline backend running 🚀");
});

// ================= START SERVER =================
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});