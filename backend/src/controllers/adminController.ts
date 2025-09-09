import { PrismaClient } from "@prisma/client"
import { Request, Response } from "express"

const prisma = new PrismaClient();

export const getInternship = async (req: Request, res: Response) =>{
    try{
        const internships = await prisma.internship.findMany({});
        if(!internships){
            return res.status(500).json({
                msg: "Something up with db"
            })
        }
        return res.status(200).json({internships: internships})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!!"
        })
    }
}

export const getCompetition = async (req: Request, res: Response) =>{
    try{
        const competitions = await prisma.competition.findMany({});
        if(!competitions){
            return res.status(500).json({
                msg: "DB error!!!"
            })
        }
        return res.status(200).json({competitions: competitions})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}

export const getJobs = async (req: Request, res: Response) =>{
    try{
        const jobs = await prisma.job.findMany({});
        if(!jobs){
            return res.status(500).json({
                msg: "DB error!!!"
            })
        }
        return res.status(200).json({jobs: jobs})
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}