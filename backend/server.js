import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import userRouter from "./routes/userRouter.js";
import { notFount, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./configs/db.js";

dotenv.config();

const app = express();
connectDB();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/users',userRouter);

app.use(notFount);
app.use(errorHandler);

app.listen(port,()=>console.log(`server running on port ${port}`));