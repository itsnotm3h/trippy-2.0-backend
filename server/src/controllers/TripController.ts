import { Response } from "express";
import { TripService } from "../services/TripService";
import { TripIdSchema } from "../validators/trip.validator";
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
