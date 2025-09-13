"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    let token = req.cookies.token;
    // console.log(token);
    if (!token) {
        return res.status(401).json({
            msg: "no token, authorization denied"
        });
    }
    try {
        const secretKey = process.env.JWT_SECRET;
        const decode = jsonwebtoken_1.default.verify(token, secretKey);
        if (typeof decode === "object" && decode !== null) {
            req.user = {
                userId: decode.userId,
                role: decode.role,
                companyId: decode.companyId
            };
            // console.log(req.user);
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
};
exports.verifyToken = verifyToken;
