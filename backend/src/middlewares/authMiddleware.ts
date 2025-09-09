import { Request, Response, NextFunction } from "express"
import jwt, { Secret } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) =>{
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        // console.log(token);
        if(!token){
            return res.status(401).json({
                msg: "no token, authorization denied"
            })
        }
    
        try{
            const secretKey = process.env.JWT_SECRET as Secret
            const decode = jwt.verify(token, secretKey);
            if (typeof decode === "object" && decode !== null) {
                req.user = {
                    userId: (decode as any).userId,
                    role: (decode as any).role,
                    companyId: (decode as any).companyId
                };
                // console.log(req.user);
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