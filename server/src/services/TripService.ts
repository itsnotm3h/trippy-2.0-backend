import { Sequelize } from "sequelize";
import { Trip, Users } from "../models";
import { TripRepository } from "../repositories/TripRepository";

export const TripService = {
    getAllTrips: async (userId: number) => {
        return await TripRepository.findAll(userId);
    },
    getTripById: async (tripId: number) => {
        try {
            //Neeed to check if the user belongs to this trip.
            const result = await TripRepository.findByTripId(tripId);

            return result;
        }
        catch (error) {
            throw new Error("No Trip found.")
        }
    }
}
