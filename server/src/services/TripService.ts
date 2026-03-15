import { Sequelize } from "sequelize";
import { Trip, Users } from "../models";
import { TripRepository } from "../repositories/TripRepository";

export const TripService = {
  getAllTrips: async (userId: number) => {
    return await TripRepository.findAll(userId);
  },
  getTripById: async (tripId: number) => {
    return await TripRepository.findByTripId(tripId);
  },
};
