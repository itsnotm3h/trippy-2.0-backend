import { Request, Response } from "express";
import { TripService } from "../services/TripService";
import { TripIdSchema, UserIdSchema } from "../validators/trip.validator";
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
    const trips = await TripService.getTripById(tripId);
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Error fetching trips", error });
  }
};
