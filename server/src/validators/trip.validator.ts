import {z} from "zod";

export const TripIdSchema = z.object({
    tripId:z.coerce.number()
})

export const UserIdSchema = z.object({
    userId:z.coerce.number()
})