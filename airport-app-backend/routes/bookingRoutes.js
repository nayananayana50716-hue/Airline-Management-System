import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/", protect, getBookings);

export default router;