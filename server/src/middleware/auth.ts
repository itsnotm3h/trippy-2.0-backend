import { Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth";

export const checkJWT = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    //Check if header exist, and also to make sure that type of header is correct.
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return res.status(401).json({ message: "Unauthorized: Missing Token" });
    }

    req.auth = {
      payload: {
        sub: "auth0Lmock123",
        displayName: "testUser",
        firstName: "test",
        lastName: "user",
        email: "test@example.com",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
      },
    };

    next();
  } catch (err) {
    next(err);
  }
};
