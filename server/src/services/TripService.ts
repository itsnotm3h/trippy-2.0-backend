import { TripRepository } from "../repositories/TripRepository";
import { TripEditType } from "../validators/trip.validator";

export const TripService = {
  getAllTrips: async (userId: number) => {
    return await TripRepository.findAll(userId);
  },
  getTripById: async (tripId: number) => {
    return await TripRepository.findByTripId(tripId);
  },
  updateTripSetting: async (
    tripId: number,
    tripRole: string,
    edits: TripEditType,
  ) => {
    //Before the update can be done, need to ensure that the user has the role of leader
    if (tripRole !== "leader")
      throw new Error("User is not authorised to make changes ");

    const trip = await TripRepository.findByTripId(tripId);

    if(!trip) throw new Error ("Trip does not exist.");

    //type: it will need to ensure that there is no expenses and trip members, otherwise throw Error.
    // if(edits.type) trip.e
    //country: It will need to ensure that the currency rate from the front end is changed.
    //startDate: cannot be later than newEndDate and Old endDate.
    //endDate: Cannot be earlier than newStartDate and old startDate.
    //isDelete: old isDelete cannot be equals to new.
    //isActive: old isActive cannot be equals to new.

    const [affectedRows] = await TripRepository.updateTripSetting(
      tripId,
      edits,
    );

    if (affectedRows === 0) throw new Error("Trips not found.");

    return { message: "Successfully updated" };
  },
};
