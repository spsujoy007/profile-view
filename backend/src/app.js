import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(cookieParser())



export default app;