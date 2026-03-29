import { z } from "zod";

export const TripSchema = z.object({
  tripId: z.coerce.number(),
  title: z.string(),
  type: z.string(),
  country: z.string(),
  currencyRate: z.number(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  leaderId: z.coerce.number(),
  isActive: z.boolean(),
  isDeleted: z.boolean(),
});

export const TripIdSchema = z.object({
  tripId: z.coerce.number(),
});

export const UserIdSchema = z.object({
  userId: z.coerce.number(),
});

export const TripEditsSchema = z.object({
  title: z.string().optional(),
  type: z.string().optional(),
  country: z.string().optional(),
  currencyRate: z.number().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  isActive: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export type TripEditType = z.infer<typeof TripEditsSchema>;