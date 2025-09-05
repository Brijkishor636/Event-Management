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
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const userRouter = express_1.default.Router();
const prisma = new client_1.PrismaClient();
const signupInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
    name: zod_1.default.string().optional(),
    mobile: zod_1.default.string().optional()
});
const signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(4)
});
userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const { success } = signupInput.safeParse(body);
        if (!success) {
            return res.status(411).json({
                msg: "Incorrect inputs!!"
            });
        }
        const existUser = yield prisma.user.findUnique({
            where: { username: body.username }
        });
        if (existUser) {
            return res.status(409).json({
                msg: "User already exists, please login!"
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
        const user = yield prisma.user.create({
            data: {
                username: body.username,
                password: hashedPassword,
                name: body === null || body === void 0 ? void 0 : body.name,
                mobile: body === null || body === void 0 ? void 0 : body.mobile
            }
        });
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(500).json({ msg: "JWT secret is not configured" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, secretKey, { expiresIn: "1h" });
        return res.status(201).json({
            msg: "User created successfully",
            token
        });
    }
    catch (e) {
        console.error("Signup error:", e);
        return res.status(500).json({
            msg: "Internal server error"
        });
    }
}));
userRouter.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    try {
        const { success } = signinInput.safeParse(body);
        if (!success) {
            return res.status(411).json({
                msg: "Incorrect inputs, try again!!"
            });
        }
        const user = yield prisma.user.findUnique({
            where: {
                username: body.username
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: "User not found!!"
            });
        }
        const originalPassword = yield bcrypt_1.default.compare(body.password, user.password);
        if (!originalPassword) {
            return res.status(411).json({
                msg: "Invalid email or password!!"
            });
        }
        const userId = user.id;
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            return res.status(500).json({ msg: "JWT secret is not configured" });
        }
        const token = jsonwebtoken_1.default.sign({ userId }, secretKey);
        return res.status(200).json({
            msg: "Login successfully..",
            token
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
}));
exports.default = userRouter;
