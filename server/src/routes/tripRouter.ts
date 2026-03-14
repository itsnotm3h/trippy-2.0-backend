import { Router } from "express";
import { checkJWT } from "../middleware/auth";
import { identifyUser } from "../middleware/userAuth";
import { getTripById, getUserTrips } from "../controllers/TripController";

const tripRouter = Router();
//Trip endpoints
tripRouter.get("", checkJWT, identifyUser, getUserTrips);
tripRouter.get("/:tripId", getTripById);

export default tripRouter;
