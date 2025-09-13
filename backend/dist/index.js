"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const admin_1 = __importDefault(require("./routes/admin"));
const company_1 = __importDefault(require("./routes/company"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/admin", admin_1.default);
app.use("/api/v1/company", company_1.default);
app.listen(3001);
exports.default = app;
// {
//     "title": "Business Development Internship",
//     "subtitle": "Zeepty Technologies Private Limited is hiring for the role of Business Development Intern!",
//     "description": "Identify and onboard new suppliers and creators to our platform",
//     "endsOn": "07/12/2025"
// }
// {
//     "title": "Find the real Contributors",
//     "subtitle": "Showcase your creativity in interactive media",
//     "description": "Students will create their own interactive videos using Cliperact – any theme, any concept. Your imagination is the only limit!",
//     "endsOn": "09-10-2025"
// }
