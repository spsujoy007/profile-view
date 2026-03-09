import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())


// Importing routes
import userRouter from "./routes/user.routes.js"; 

app.use("/api/v1/user", userRouter);

export default app;