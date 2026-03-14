import { Router } from "express";
import { loginUser } from "../controllers/UserController";

const userRouter = Router();

//User endpoints
userRouter.post("/login", loginUser);

export default userRouter;
