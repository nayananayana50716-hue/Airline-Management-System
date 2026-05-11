import express from "express";
import {
  getFlights,
  addFlight,
  deleteFlight
} from "../controllers/flightController.js";

const router = express.Router();

router.get("/", getFlights);
router.post("/", addFlight);
router.delete("/:id", deleteFlight);

export default router;