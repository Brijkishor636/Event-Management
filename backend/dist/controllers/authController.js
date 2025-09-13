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
exports.signin = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = __importDefault(require("zod"));
const signupInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
    name: zod_1.default.string().optional(),
    mobile: zod_1.default.string().optional(),
    role: zod_1.default.enum(["STUDENT", "COMPANY", "ADMIN"]).default("STUDENT")
});
const signinInput = zod_1.default.object({
    username: zod_1.default.string().email(),
    password: zod_1.default.string().min(4)
});
const prisma = new client_1.PrismaClient();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const body = req.body;
    try {
        if (!body) {
            return res.status(400).json({
                msg: "Request body is missing"
            });
        }
        const { success } = signupInput.safeParse(body);
        if (!success) {
            return res.status(411).json({
                msg: "Incorrect inputs!!"
            });
        }
        if (body.role == "ADMIN") {
            return res.status(403).json({
                msg: "Admin can not be created!!"
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
                mobile: body === null || body === void 0 ? void 0 : body.mobile,
                role: (_a = body.role) !== null && _a !== void 0 ? _a : "STUDENT"
            }
        });
        const secretKey = process.env.JWT_SECRET;
        console.log(secretKey);
        if (!secretKey) {
            return res.status(500).json({ msg: "JWT secret is not configured" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            path: '/'
        });
        return res.status(201).json({
            msg: "User created successfully",
            token
        });
    }
    catch (e) {
        console.error("Signup error:", e);
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ msg: "Token expired, please login again" });
        }
        return res.status(500).json({ msg: "Internal server error!!" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const token = jsonwebtoken_1.default.sign({ userId: userId, role: user.role }, secretKey, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            path: '/'
        });
        return res.status(200).json({
            msg: "Login successfully..",
            token
        });
    }
    catch (e) {
        if (e instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return res.status(401).json({ msg: "Token expired, please login again" });
        }
        return res.status(500).json({ msg: "Internal server error!!" });
    }
});
exports.signin = signin;
