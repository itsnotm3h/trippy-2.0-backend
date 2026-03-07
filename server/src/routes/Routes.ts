import { Router } from "express";
import { checkJWT } from "../middleware/auth";
import { identifyUser } from "../middleware/userAuth";
import { getTripById, getAllUserTrips } from "../controllers/TripController";

const router = Router();

//Get user trips.
router.get("", checkJWT, identifyUser, getAllUserTrips);
router.get("/:tripId", getTripById);

export default router;
