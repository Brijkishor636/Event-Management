import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import z from "zod"
import { Request, Response } from "express";


const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(4),
  name: z.string().optional(),
  mobile: z.string().optional(),
  role: z.enum(["STUDENT", "COMPANY", "ADMIN"]).default("STUDENT")
})

const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(4)
})

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) =>{
    const body = req.body;
      try {
        if (!body) {
          return res.status(400).json({
            msg: "Request body is missing"
          });
        }
        const {success} = signupInput.safeParse(body);
        if(!success){
          return res.status(411).json({
            msg: "Incorrect inputs!!"
          })
        }
        if(body.role == "ADMIN"){
            return res.status(403).json({
                msg: "Admin can not be created!!"
            })
        }

        const existUser = await prisma.user.findUnique({
          where: { username: body.username }
        });
    
        if (existUser) {
          return res.status(409).json({
            msg: "User already exists, please login!"
          });
        }
    
        const hashedPassword = await bcrypt.hash(body.password, 10);
    
        const user = await prisma.user.create({
          data: {
            username: body.username,
            password: hashedPassword,
            name: body?.name,
            mobile: body?.mobile,
            role: body.role ?? "STUDENT" 
          }
        });
    
        const secretKey = process.env.JWT_SECRET as Secret;
        console.log(secretKey);
        if (!secretKey) {
          return res.status(500).json({ msg: "JWT secret is not configured" });
        }
    
        const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: "1h" });
        res.cookie("token", token, {
        httpOnly: true,
        path: '/'
        })

        return res.status(201).json({
          msg: "User created successfully"
        });
      } catch (e) {
        console.error("Signup error:", e);
        if (e instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ msg: "Token expired, please login again" });
        }
        return res.status(500).json({ msg: "Internal server error!!" });
      }
}


export const signin = async (req: Request, res:Response) =>{
    const body = req.body;
  try{
      const { success } = signinInput.safeParse(body);
      if(!success){
        return res.status(411).json({
          msg: "Incorrect inputs, try again!!"
        })
      }
      const user = await prisma.user.findUnique({
        where: {
          username: body.username
        }
      })
      if(!user){
        return res.status(404).json({
          msg: "User not found!!"
        })}
      
      const originalPassword = await bcrypt.compare(body.password, user.password);
      if(!originalPassword){
        return res.status(411).json({
          msg: "Invalid email or password!!"
        })
      }

      const userId = user.id;
      const secretKey = process.env.JWT_SECRET as Secret;
      if (!secretKey) {
        return res.status(500).json({ msg: "JWT secret is not configured" });
      }

      const token = jwt.sign({ userId: userId, role: user.role }, secretKey, {expiresIn: "1h"});
      res.cookie("token", token, {
        httpOnly: true,
        path: '/'
      })
      return res.status(200).json({
        msg: "Login successfully.."
      })
  }
  catch(e){
    if (e instanceof jwt.TokenExpiredError) {
    return res.status(401).json({ msg: "Token expired, please login again" });
    }
    return res.status(500).json({ msg: "Internal server error!!" });
  }
}