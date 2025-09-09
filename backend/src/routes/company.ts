
import express from "express"
import { authorizeRole } from "../middlewares/roleMiddleware";
import { PrismaClient } from "@prisma/client";
import { verifyToken } from "../middlewares/authMiddleware";
import { companySignin, companySignup, createCompetition, createinternship, createJob } from "../controllers/companyController";


const companyRouter = express.Router();


const prisma = new PrismaClient();

companyRouter.post("/signup", companySignup);

companyRouter.post("/signin", companySignin);


companyRouter.post("/createinternship", verifyToken, authorizeRole("COMPANY"), createinternship);

companyRouter.post("/createcompetition", verifyToken, authorizeRole("COMPANY"), createCompetition);

companyRouter.post("/createjobs", verifyToken, authorizeRole("COMPANY"), createJob);

export default companyRouter;