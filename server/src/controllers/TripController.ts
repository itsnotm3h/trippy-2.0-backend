import { Response } from "express";
import { TripService } from "../services/TripService";
import { TripEditsSchema, TripIdSchema } from "../validators/trip.validator";
import { AuthRequest } from "../schema/authSchema";

export const getUserTrips = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.dbUser;
    const trips = await TripService.getAllTrips(userId);
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
};

export const getTripById = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = TripIdSchema.parse({ ...req.params });
    const tripRole = req.tripRole;

    if (tripRole == "")
      res
        .status(401)
        .json({ message: "You are not authorised to view this trip" });

    const trips = await TripService.getTripById(tripId);
    res.status(200).json({ trips, tripRole });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching trips", error });
  }
};

/**
 * Update Trip setting only leader of the trip can edit trips settings.
 * @param req the request
 * @param res the response
 */
export const updateTripSetting = async (req: AuthRequest, res: Response) => {
  try {
    const { tripId } = TripIdSchema.parse({ ...req.params });
    const edits = TripEditsSchema.parse({ ...req.body });
    const tripRole = req.tripRole??"";

    const result = await TripService.updateTripSetting(tripId, tripRole, edits);

    res.status(200).json({
      message: `${result.message} Trip(id:${tripId}) with the following changes: ${edits}`,
    });
  } catch (error) {
    console.log(error);
  }
};
