"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const adminController_1 = require("../controllers/adminController");
const userRouter = express_1.default.Router();
userRouter.post("/signup", (req, res) => (0, authController_1.signup)(req, res));
userRouter.post("/signin", (req, res) => (0, authController_1.signin)(req, res));
userRouter.get("/current", userController_1.currentUser);
userRouter.get("/internships", authMiddleware_1.verifyToken, (0, roleMiddleware_1.authorizeRole)("STUDENT"), adminController_1.getInternship);
userRouter.get("/competitions", authMiddleware_1.verifyToken, (0, roleMiddleware_1.authorizeRole)("STUDENT"), adminController_1.getCompetition);
userRouter.get("/jobs", authMiddleware_1.verifyToken, (0, roleMiddleware_1.authorizeRole)("STUDENT"), adminController_1.getJobs);
exports.default = userRouter;
