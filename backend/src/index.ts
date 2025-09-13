import express from "express";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";
import companyRouter from "./routes/company"
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true,               
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/company", companyRouter);

app.listen(3001);

export default app;



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