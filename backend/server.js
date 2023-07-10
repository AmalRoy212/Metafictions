import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors'
import cookieSession from "cookie-session";
import passport from 'passport';
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import { notFount, errorHandler } from "./middlewares/errorMiddleware.js";
import ChatRouter from "./routes/chatRouter.js";
// import '../configs/passportConfig.js';


const app = express();
connectDB();
const port = process.env.PORT || 5000


userRouter.use(
  cookieSession({
    name: "session",
    keys: ["metafiction"],
    maxAge: 24 * 60 * 60 * 100
  })
  )
  
  userRouter.use(passport.initialize());
  userRouter.use(passport.session());
  
  app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chats', ChatRouter);

app.use(notFount);
app.use(errorHandler);

app.listen(port, () => console.log(`server running on port ${port}`));