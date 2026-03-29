import { Router } from "express";
import { checkJWT } from "../middleware/auth";
import { identifyTripRole, identifyUser } from "../middleware/userAuth";
import {
  getTripById,
  getUserTrips,
  updateTripSetting,
} from "../controllers/TripController";

const tripRouter = Router();

tripRouter.use(checkJWT, identifyUser);
//Trip endpoints
tripRouter.get("", getUserTrips);
tripRouter.get("/:tripId", identifyTripRole, getTripById);

//Only the leader can edit the trip setting.
tripRouter.post("/update/:tripId", identifyTripRole, updateTripSetting);

export default tripRouter;
