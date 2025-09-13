"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const client_1 = require("@prisma/client");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const currentUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
        if (!token) {
            return res.status(401).json({
                msg: "No token, not authorized!!"
            });
        }
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(400).json({
                msg: "jwt error!!!"
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secretKey);
        // console.log(decoded);
        if (!decoded) {
            return res.status(404).json({
                msg: "jwt error!!"
            });
        }
        const user = yield prisma.user.findUnique({
            where: {
                id: decoded === null || decoded === void 0 ? void 0 : decoded.userId
            },
            select: {
                id: true,
                username: true,
                name: true,
                role: true
            }
        });
        // console.log(user);
        return res.status(200).json({
            user,
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.currentUser = currentUser;
