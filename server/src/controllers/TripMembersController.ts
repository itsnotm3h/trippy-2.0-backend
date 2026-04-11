import { Response } from "express";
import { AuthRequest } from "../schema/authSchema";
import { TripMemberService } from "../services/TripMemberService";
import { TripMemberList } from "../validators/tripMembers.validator";

export const createTripMember = async (req: AuthRequest, res: Response) => {
  try {
    const inviteList = TripMemberList.parse({...req.body.memberList});


    if(req.tripRole!=="LEADER") throw new Error ("Unauthorised action.");

    const inviteMember = await TripMemberService.inviteMember(inviteList);


  } catch (error) {
    console.log(error);
  }
};
