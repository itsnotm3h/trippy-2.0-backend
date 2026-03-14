import { z } from "zod";
import { Request } from "express";
import * as jwt from "jsonwebtoken";

// 1. The Zod Schema (The logic)
export const AuthUserSchema = z.object({
  sub: z.string().optional(),
  displayName: z.string(),
  iat: z.number().optional(),
  exp: z.number().optional(),
});

export const loginCredentials = z.object({
  email: z.string().email(),
  password: z.string(),
});
// 2. The Inferred Type (The shape of the data)
export type AuthUser = z.infer<typeof AuthUserSchema>;
export type Login = z.infer<typeof loginCredentials>;

// 4. The Express Request Type (For your routes)
export interface AuthRequest extends Request {
  auth?: {
    payload: AuthUser;
  };
  dbUser?: any;
  tripRole?: string;
}
