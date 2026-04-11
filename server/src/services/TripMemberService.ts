import { Trip } from "@/models";
import { TripMemberListType } from "../validators/tripMembers.validator";
export const TripMemberService = {
  inviteMember: async (inviteList: TripMemberListType) => {
    for (let member of inviteList) {
      const trip = await Trip.findByPk(member.tripId);
    }
  },
};
