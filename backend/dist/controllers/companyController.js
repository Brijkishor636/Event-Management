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
exports.createJob = exports.createCompetition = exports.createinternship = exports.companySignin = exports.companySignup = void 0;
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const companySignupInput = zod_1.default.object({
    name: zod_1.default.string(),
    companyusername: zod_1.default.string().email(),
    password: zod_1.default.string().min(4),
    description: zod_1.default.string().optional(),
    website: zod_1.default.string().url().optional(),
    logoUrl: zod_1.default.string().url().optional(),
    createdAt: zod_1.default.date().default(() => new Date()),
    updatedAt: zod_1.default.date().default(() => new Date()),
});
const companySigninInput = zod_1.default.object({
    companyusername: zod_1.default.string().email(),
    password: zod_1.default.string().min(4)
});
const internshipInput = zod_1.default.object({
    title: zod_1.default.string(),
    subtitle: zod_1.default.string().optional(),
    description: zod_1.default.string(),
    endsOn: zod_1.default.string()
        .refine(s => !isNaN(Date.parse(s)), { message: "Invalid date string" })
        .transform(s => new Date(s))
        .optional()
});
const competitionInput = zod_1.default.object({
    title: zod_1.default.string(),
    subtitle: zod_1.default.string().optional(),
    description: zod_1.default.string(),
    endsOn: zod_1.default.string()
        .refine(s => !isNaN(Date.parse(s)), { message: "invalid date string" })
        .transform(s => new Date(s))
        .optional()
});
const jobInput = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    location: zod_1.default.string().optional(),
    type: zod_1.default.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "CONTRACT", "FREELANCE"]).optional(),
    salary: zod_1.default.string().optional(),
    endsOn: zod_1.default.string()
        .refine(s => !isNaN(Date.parse(s)), { message: "Invalid date string" })
        .transform(s => new Date(s))
        .optional()
});
const prisma = new client_1.PrismaClient();
const companySignup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = companySignupInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(411).json({
                msg: "Incorrect inputs, check again",
                errors: parsed.error.flatten()
            });
        }
        const body = parsed.data;
        const existCompany = yield prisma.company.findFirst({
            where: { name: body.name }
        });
        if (existCompany) {
            return res.status(400).json({ msg: "Company with this name already exists!" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(body.password, 10);
        const company = yield prisma.company.create({
            data: {
                name: body.name,
                companyusername: body.companyusername,
                password: hashedPassword,
                description: body === null || body === void 0 ? void 0 : body.description,
                website: body === null || body === void 0 ? void 0 : body.website,
                logoUrl: body === null || body === void 0 ? void 0 : body.logoUrl,
                createdAt: body.createdAt,
                updatedAt: body.updatedAt
            }
        });
        const secretKey = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ companyId: company.id, role: "COMPANY" }, secretKey, { expiresIn: "1h" });
        res.status(200).json({
            msg: "Company created...",
            token
        });
    }
    catch (e) {
        console.error(e);
        return res.status(500).json({ msg: "Internal server error" });
    }
});
exports.companySignup = companySignup;
const companySignin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = companySigninInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(411).json({
                msg: "Incorrect inputs, zod error"
            });
        }
        const body = parsed.data;
        const existCompany = yield prisma.company.findUnique({
            where: {
                companyusername: body.companyusername
            }
        });
        if (!existCompany) {
            return res.status(404).json({
                msg: "Company not found, with this credentials"
            });
        }
        const correctPassword = bcrypt_1.default.compare(existCompany.password, body.password);
        console.log(correctPassword);
        if (!correctPassword) {
            return res.status(403).json({
                msg: "Invalid username or password"
            });
        }
        const secretKey = process.env.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({ companyId: existCompany.id, role: "COMPANY" }, secretKey, { expiresIn: "1h" });
        return res.status(200).json({
            msg: "logged in...",
            token
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.companySignin = companySignin;
const createinternship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const parsed = internshipInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(411).json({
                msg: "Incorrect inputs, check again!!",
            });
        }
        const body = parsed.data;
        const intern = yield prisma.internship.create({
            data: {
                title: body.title,
                subtitle: body === null || body === void 0 ? void 0 : body.subtitle,
                description: body.description,
                endsOn: body.endsOn,
                companyId: req.user.companyId
            }
        });
        if (!intern) {
            return res.status(400).json({
                msg: "something up with db connection!!"
            });
        }
        return res.status(200).json({
            msg: "Internship created successfully.."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!!!"
        });
    }
});
exports.createinternship = createinternship;
const createCompetition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.companyId)) {
            return res.status(401).json({ msg: "Unauthorized: company account required" });
        }
        if (req.user.role !== "COMPANY") {
            return res.status(403).json({ msg: "Forbidden: only companies can create competitions" });
        }
        const parsed = competitionInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "Incorrect inputs, try again!!!"
            });
        }
        const body = parsed.data;
        const competition = yield prisma.competition.create({
            data: {
                title: body.title,
                subtitle: body === null || body === void 0 ? void 0 : body.subtitle,
                description: body.description,
                endsOn: body === null || body === void 0 ? void 0 : body.endsOn,
                companyId: req.user.companyId
            }
        });
        if (!competition) {
            return res.status(500).json({
                msg: "Something up with db"
            });
        }
        return res.status(201).json({
            msg: "competition created successfully..."
        });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Oops, something up with server!!"
        });
    }
});
exports.createCompetition = createCompetition;
const createJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.companyId)) {
            return res.status(401).json({ msg: "Unauthorized: company account required" });
        }
        if (req.user.role !== "COMPANY") {
            return res.status(403).json({ msg: "Forbidden: only companies can create competitions" });
        }
        const parsed = jobInput.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json({
                msg: "incorrect inputs, try again!"
            });
        }
        const body = parsed.data;
        const createdjob = yield prisma.job.create({
            data: {
                title: body.title,
                description: body.description,
                location: body.location,
                type: body.type,
                endsOn: body.endsOn,
                salary: body.salary,
                companyId: (_b = req.user) === null || _b === void 0 ? void 0 : _b.companyId
            }
        });
        if (!createdjob) {
            return res.status(500).json({
                msg: "something went wrong, db error"
            });
        }
        return res.status(201).json({
            msg: "Job created successfully..."
        });
    }
    catch (e) {
        return res.status(500).json({
            msg: "Internal server error!!!"
        });
    }
});
exports.createJob = createJob;
