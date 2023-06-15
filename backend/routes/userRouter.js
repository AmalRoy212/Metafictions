import express from "express";
import {  
  authenticateUsers,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile 
} from "../controllers/userController.js";
import { protecter } from '../middlewares/authUserMiddleware.js'


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUsers);
userRouter.patch('/logout', protecter, logoutUser);
userRouter.
  route('/profile').
    get(protecter,getUserProfile).
    put(protecter,updateUserProfile)

export default userRouter