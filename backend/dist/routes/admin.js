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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const adminRouter = express_1.default.Router();
const url = process.env.INTERN_URL;
const apiKey = process.env.RAPIDAPIKEY;
const apiHost = process.env.RAPIDAPIHOST;
adminRouter.get("/internships", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Fetching from RapidAPI:", url);
        const response = yield fetch(url, {
            method: "GET",
            headers: {
                "X-RapidAPI-Key": apiKey,
                "X-RapidAPI-Host": apiHost,
            },
        });
        console.log("RapidAPI status:", response.status);
        if (!response.ok) {
            return res.status(response.status).json({ error: "Failed to fetch from RapidAPI" });
        }
        const data = yield response.json();
        console.log("Received data keys:", Object.keys(data));
        return res.json(data);
    }
    catch (error) {
        console.error("Error fetching internships:", error);
        return res.status(500).json({ error: "Failed to fetch internships" });
    }
}));
exports.default = adminRouter;
