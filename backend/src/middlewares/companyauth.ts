import { Request, NextFunction, Response } from "express";
import jwt, {Secret} from "jsonwebtoken"

declare global {
  namespace Express {
    interface Request {
      company?: any;
    }
  }
}

export const companyauth = (req: Request, res: Response, next:NextFunction) =>{
    let token;
        let authHeader = req.headers.authorization || req.headers.Authorization
        // console.log(authHeader);
        if (typeof authHeader === "string" && authHeader.startsWith("Bearer")) {
            token = authHeader.split(" ")[1];
            console.log(token);
            if(!token){
                return res.status(401).json({
                    msg: "no token, authorization denied"
                })
            }
        
            try{
                const secretKey = process.env.JWT_SECRET as Secret
                const decode = jwt.verify(token, secretKey);
                if (typeof decode === "object" && decode !== null) {
                    req.company = {
                        companyId: (decode as any).companyId,
                        role: (decode as any).role
                    };
                    console.log(req.company);
                    next();
                } else {
                    return res.status(401).json({
                        msg: "Invalid token payload"
                    });
                }
            }
            catch(e){
                console.log(e);
                return res.status(500).json({
                    msg: "Internal server error!!"
                })
            }
        }
        else{
            return res.status(401).json({
                msg: "no token, access denied"
            })
        }
}