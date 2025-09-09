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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobs = exports.getCompetition = exports.getInternship = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getInternship = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const internships = yield prisma.internship.findMany({});
        if (!internships) {
            return res.status(500).json({
                msg: "Something up with db"
            });
        }
        return res.status(200).json({ internships: internships });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!!"
        });
    }
});
exports.getInternship = getInternship;
const getCompetition = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const competitions = yield prisma.competition.findMany({});
        if (!competitions) {
            return res.status(500).json({
                msg: "DB error!!!"
            });
        }
        return res.status(200).json({ competitions: competitions });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getCompetition = getCompetition;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobs = yield prisma.job.findMany({});
        if (!jobs) {
            return res.status(500).json({
                msg: "DB error!!!"
            });
        }
        return res.status(200).json({ jobs: jobs });
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "Internal server error!!"
        });
    }
});
exports.getJobs = getJobs;
