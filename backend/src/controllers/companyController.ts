import { Prisma, PrismaClient } from "@prisma/client";
import { Request, Response } from "express"
import z from "zod"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const companySignupInput = z.object({
  name: z.string(),
  companyusername: z.string().email(),
  password: z.string().min(4),
  description: z.string().optional(),
  website: z.string().url().optional(),
  logoUrl: z.string().url().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
})

const companySigninInput = z.object({
    companyusername: z.string().email(),
    password: z.string().min(4)
})


const internshipInput = z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    endsOn:  z.string()
    .refine(s => !isNaN(Date.parse(s)), { message: "Invalid date string" })
    .transform(s => new Date(s))
    .optional()
})

const competitionInput = z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    endsOn: z.string()
      .refine(s => !isNaN(Date.parse(s)), { message: "invalid date string"})
      .transform(s => new Date(s))
      .optional()
})

const jobInput = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string().optional(),
  type: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT", "FREELANCE"]).optional(),
  salary: z.string().optional(),
  endsOn: z.string()
    .refine(s => !isNaN(Date.parse(s)), { message: "Invalid date string" })
    .transform(s => new Date(s))
    .optional()
})

const prisma = new PrismaClient();

export const companySignup = async (req: Request, res: Response) => {
  try {
    const parsed = companySignupInput.safeParse(req.body);
    if (!parsed.success) {
      return res.status(411).json({
        msg: "Incorrect inputs, check again",
        errors: parsed.error.flatten()
      });
    }

    const body = parsed.data;

    const existCompany = await prisma.company.findFirst({
      where: { name: body.name }
    });

    if (existCompany) {
      return res.status(400).json({ msg: "Company with this name already exists!" });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const company = await prisma.company.create({
      data: {
        name: body.name,
        companyusername: body.companyusername,
        password: hashedPassword,
        description: body?.description,
        website: body?.website,
        logoUrl: body?.logoUrl,
        createdAt: body.createdAt,
        updatedAt: body.updatedAt
      }
    });

    const secretKey = process.env.JWT_SECRET!;
    const token = jwt.sign(
      { companyId: company.id, role: "COMPANY" },
      secretKey,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "Company created...",
      token
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ msg: "Internal server error" });
  }
};


export const companySignin = async (req: Request, res: Response) =>{
    try{
        const parsed = companySigninInput.safeParse(req.body);
        if(!parsed.success){
            return res.status(411).json({
                msg: "Incorrect inputs, zod error"
            })
        }
        const body = parsed.data;
        const existCompany = await prisma.company.findUnique({
            where: {
                companyusername: body.companyusername
            }
        })

        if(!existCompany){
            return res.status(404).json({
                msg: "Company not found, with this credentials"
            })
        }
        const correctPassword = bcrypt.compare(existCompany.password, body.password);
        console.log(correctPassword);
        if(!correctPassword){
            return res.status(403).json({
                msg: "Invalid username or password"
            })
        }
        const secretKey = process.env.JWT_SECRET!;
        const token = jwt.sign({companyId: existCompany.id, role: "COMPANY"}, secretKey, {expiresIn: "1h"})
        return res.status(200).json({
            msg: "logged in...",
            token
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        })
    }
}


export const createinternship = async (req: Request, res: Response) =>{
    try{
        const parsed = internshipInput.safeParse(req.body);
        if (!parsed.success) {
          return res.status(411).json({
            msg: "Incorrect inputs, check again!!",
          });
        }
        const body = parsed.data;

        const intern = await prisma.internship.create({
            data: {
                title: body.title,
                subtitle: body?.subtitle,
                description: body.description,
                endsOn: body.endsOn,
                companyId: req.user.companyId
            }
        })
        if(!intern){
            return res.status(400).json({
                msg: "something up with db connection!!"
            })
        }
        return res.status(200).json({
            msg: "Internship created successfully.."
        })
    }
    catch(e){
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!!!"
        })
    }
}


export const createCompetition = async (req: Request, res: Response) =>{
  try{
    if (!req.user?.companyId) {
      return res.status(401).json({ msg: "Unauthorized: company account required" });
    }

    if (req.user.role !== "COMPANY") {
      return res.status(403).json({ msg: "Forbidden: only companies can create competitions" });
    }

    const parsed = competitionInput.safeParse(req.body);
    if(!parsed.success){
      return res.status(400).json({
        msg: "Incorrect inputs, try again!!!"
      })
    }
    const body = parsed.data;
    const competition = await prisma.competition.create({
      data: {
        title: body.title,
        subtitle: body?.subtitle,
        description: body.description,
        endsOn: body?.endsOn,
        companyId: req.user.companyId
      }
    })
    if(!competition){
      return res.status(500).json({
        msg: "Something up with db"
      })
    }
    return res.status(201).json({
      msg: "competition created successfully..."
    })
  }
  catch(e){
    console.log(e);
    return res.status(500).json({
      msg: "Oops, something up with server!!"
    })
  }
}


export const createJob = async (req: Request, res: Response) =>{
  try{
    if (!req.user?.companyId) {
      return res.status(401).json({ msg: "Unauthorized: company account required" });
    }

    if (req.user.role !== "COMPANY") {
      return res.status(403).json({ msg: "Forbidden: only companies can create competitions" });
    }
    const parsed = jobInput.safeParse(req.body);
    if(!parsed.success){
      return res.status(400).json({
        msg: "incorrect inputs, try again!"
      })
    }
    const body = parsed.data;
    const createdjob = await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        location: body.location,
        type: body.type,
        endsOn: body.endsOn,
        salary: body.salary,
        companyId: req.user?.companyId
      }
    })

    if(!createdjob){
      return res.status(500).json({
        msg: "something went wrong, db error"
      })
    }
    
    return res.status(201).json({
      msg: "Job created successfully..."
    })
  }
  catch(e){
    return res.status(500).json({
      msg: "Internal server error!!!"
    })
  }
}