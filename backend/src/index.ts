import express from "express";
import userRouter from "./routes/user";
import adminRouter from "./routes/admin";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

app.listen(3001);

export default app;