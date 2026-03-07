import { Request, Response } from 'express';
import { TripService } from '../services/TripService';
import { TripIdSchema,UserIdSchema } from '../validators/trip.validator';
import { AuthRequest } from '../types/auth';

export const getAllUserTrips = async (req: Request, res: Response) => {
    try {
        console.log(req.query);
        const {userId} = UserIdSchema.parse({...req.query});
        const trips = await TripService.getAllTrips(userId);
        res.status(200).json(trips);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trips", error });
    }
};


export const getTripById = async (req: AuthRequest, res: Response) => {
    try {
        const {tripId} = TripIdSchema.parse({...req.params});
        const tripRole = req.tripRole;

        const trips = await TripService.getTripById(tripId);

        res.status(200).json({trips,tripRole});

    } catch (error) {
        res.status(500).json({ message: "Error fetching trips", error });
    }
};