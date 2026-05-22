import express from "express";

import {
  getFlights,
  addFlight,
  deleteFlight
} from "../controllers/flightController.js";

import {
  protect,
  adminOnly
} from "../middleware/authMiddleware.js";

const router = express.Router();

// public
router.get("/", getFlights);

// admin only
router.post(
  "/",
  protect,
  adminOnly,
  addFlight
);

// admin only
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteFlight
);

export default router;