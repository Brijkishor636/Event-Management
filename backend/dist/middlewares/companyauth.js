"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyauth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const companyauth = (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    // console.log(authHeader);
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({
                msg: "no token, authorization denied"
            });
        }
        try {
            const secretKey = process.env.JWT_SECRET;
            const decode = jsonwebtoken_1.default.verify(token, secretKey);
            if (typeof decode === "object" && decode !== null) {
                req.company = {
                    companyId: decode.companyId,
                    role: decode.role
                };
                console.log(req.company);
                next();
            }
            else {
                return res.status(401).json({
                    msg: "Invalid token payload"
                });
            }
        }
        catch (e) {
            console.log(e);
            return res.status(500).json({
                msg: "Internal server error!!"
            });
        }
    }
    else {
        return res.status(401).json({
            msg: "no token, access denied"
        });
    }
};
exports.companyauth = companyauth;
