import { Op, Sequelize, where } from "sequelize";
import { PersonalBudget, Trip, Users } from "../models";

export const TripRepository = {
    findAll: async (userId: number) => {
        return await Trip.findAll({
            include: [{
                model: Users,
                as: 'members',
                attributes: [],//So that no attributes will be shown
                through: { attributes: [] } // Set this to empty so the nested object disappears
            }],
            where: {
                [Op.or]: [
                    { leaderId: userId },
                    {
                        [Op.and]: [
                            { '$members.user_id$': userId },
                            { '$members.TripMembers.status$': "Accepted" }
                        ]
                    }

                ],
            }

        });
    },
    findByTripId: async (tripId: number) => {
        return await Trip.findOne({
            where: { tripId },
            include: [{
                model: Users,
                as: 'members',
                attributes: [
                    'userId',
                    'name',
                    [Sequelize.literal('`members->TripMembers`.`status`'), 'status']
                ],
                through: { attributes: [] }
            }]
        })
    }
}
