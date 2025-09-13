"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const adminController_1 = require("../controllers/adminController");
dotenv_1.default.config();
const adminRouter = express_1.default.Router();
adminRouter.get("/internships", authMiddleware_1.verifyToken, (0, roleMiddleware_1.authorizeRole)("ADMIN", "COMPANY"), adminController_1.getInternship);
adminRouter.get("/competitions", authMiddleware_1.verifyToken, (0, roleMiddleware_1.authorizeRole)("ADMIN", "COMPANY"), adminController_1.getCompetition);
adminRouter.get("/jobs", authMiddleware_1.verifyToken, (0, roleMiddleware_1.authorizeRole)("ADMIN", "COMPANY"), adminController_1.getJobs);
// const url = process.env.INTERN_URL!;
// const apiKey = process.env.RAPIDAPIKEY!;
// const apiHost = process.env.RAPIDAPIHOST!;
// adminRouter.get("/internships", async (req, res) => {
//   try {
//     console.log("Fetching from RapidAPI:", url);
//     const response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "X-RapidAPI-Key": apiKey,
//         "X-RapidAPI-Host": apiHost,
//       },
//     });
//     console.log("RapidAPI status:", response.status);
//     if (!response.ok) {
//       return res.status(response.status).json({ error: "Failed to fetch from RapidAPI" });
//     }
//     const data = await response.json();
//     console.log("Received data keys:", Object.keys(data));
//     return res.json(data);
//   } catch (error) {
//     console.error("Error fetching internships:", error);
//     return res.status(500).json({ error: "Failed to fetch internships" });
//   }
// });
exports.default = adminRouter;
