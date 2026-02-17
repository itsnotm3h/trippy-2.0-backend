import { Router } from "express";
import { getTripById, getAllUserTrips } from "../controllers/TripController";

const router = Router();

router.get("",getAllUserTrips);
router.get("/:tripId",getTripById);

export default router;

