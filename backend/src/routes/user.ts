import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import z from "zod"

const userRouter = express.Router();
const prisma = new PrismaClient();

const signupInput = z.object({
  username: z.string().email(),
  password: z.string().min(4),
  name: z.string().optional(),
  mobile: z.string().optional()
})

const signinInput = z.object({
  username: z.string().email(),
  password: z.string().min(4)
})

userRouter.post("/signup", async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const {success} = signupInput.safeParse(body);
    if(!success){
      return res.status(411).json({
        msg: "Incorrect inputs!!"
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
        mobile: body?.mobile
      }
    });

    const secretKey = process.env.JWT_SECRET as Secret;
    if (!secretKey) {
      return res.status(500).json({ msg: "JWT secret is not configured" });
    }

    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });

    return res.status(201).json({
      msg: "User created successfully",
      token
    });
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json({
      msg: "Internal server error"
    });
  }
});

userRouter.post("/signin", async(req: Request, res: Response)=>{
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
      const token = jwt.sign({userId}, secretKey);
      return res.status(200).json({
        msg: "Login successfully..",
        token
      })
  }
  catch(e){
    return res.status(500).json({
      msg: "Internal server error!!"
    })
  }
})

export default userRouter;
