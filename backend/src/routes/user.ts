
import express, { Request, Response } from "express";

import { signin, signup } from "../controllers/authController";


const userRouter = express.Router();



userRouter.post("/signup", (req: Request, res: Response) => signup(req, res));

userRouter.post("/signin", (req: Request, res: Response)=>signin(req, res));

export default userRouter;
