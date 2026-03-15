import { Router } from "express";
import { checkJWT } from "../middleware/auth";
import { identifyTripRole, identifyUser } from "../middleware/userAuth";
import { getTripById, getUserTrips } from "../controllers/TripController";

const tripRouter = Router();

tripRouter.use(checkJWT, identifyUser);
//Trip endpoints
tripRouter.get("", getUserTrips);
tripRouter.get("/:tripId", identifyTripRole, getTripById);

export default tripRouter;
