import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import jwt, { Secret } from "jsonwebtoken"

const prisma = new PrismaClient();

export const currentUser = async (req: Request, res: Response) =>{
    try{
        const token = req.cookies?.token;
        if(!token){
            return res.status(401).json({
                msg: "No token, not authorized!!"
            })
        }
        const secretKey = process.env.JWT_SECRET as Secret;
        if(!secretKey){
            return res.status(400).json({
                msg: "jwt error!!!"
            })
        }
        const decoded = jwt.verify(token, secretKey) as {userId: number};
        // console.log(decoded);
        if(!decoded){
            return res.status(404).json({
                msg: "jwt error!!"
            })
        }
        const user = await prisma.user.findUnique({
            where: {
                id: decoded?.userId
            },
            select: {
                id: true,
                username: true,
                name: true,
                role: true
            }
        })
        // console.log(user);
        return res.status(200).json({
            user,
        })
    }
    catch(e){
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}