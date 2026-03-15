import { Request, Response } from "express";
import { loginCredentials } from "../schema/authSchema";
import { UserService } from "../services/UserService";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserToken } from "../schema/tokenSchema";
import { JWT_SECRET_KEY } from "../config/env";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const login = loginCredentials.parse(req.query);

    const user = await UserService.getUser(login);

    if (!user || !(await bcrypt.compare(login.password, user.password))) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload: UserToken = {
      sub: user.authId,
      displayName: user.displayName,
    };

    if (!JWT_SECRET_KEY) {
      throw new Error("JWT_SECRET not configured");
    }

    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true, // Prevents JS access
      secure: true, // Only sends over HTTPS
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 3600000, // 1 hour
      signed: true,
    });

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error(error); // log internally
    res.status(500).json({ message: "Something went wrong" });
  }
};
