
import express, { Request, Response } from "express";

import { signin, signup } from "../controllers/authController";
import { currentUser } from "../controllers/userController";
import { verifyToken } from "../middlewares/authMiddleware";
import { authorizeRole } from "../middlewares/roleMiddleware";
import { getCompetition, getInternship, getJobs } from "../controllers/adminController";


const userRouter = express.Router();



userRouter.post("/signup", (req: Request, res: Response) => signup(req, res));

userRouter.post("/signin", (req: Request, res: Response)=>signin(req, res));

userRouter.get("/current", currentUser);

userRouter.get("/internships", verifyToken, authorizeRole("STUDENT"), getInternship)
userRouter.get("/competitions", verifyToken, authorizeRole("STUDENT"), getCompetition)
userRouter.get("/jobs", verifyToken, authorizeRole("STUDENT"), getJobs)

export default userRouter;
