import express from "express";
import {  
  authenticateUsers,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile, 
  findUser
} from "../controllers/userController.js";
import { protecter } from '../middlewares/authUserMiddleware.js'
import { createPost } from "../controllers/postController.js";


const userRouter = express.Router();

userRouter.get('/find', protecter, findUser);
userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUsers);
userRouter.patch('/logout', protecter, logoutUser);
userRouter.
  route('/profile').
    get(protecter,getUserProfile).
    put(protecter,updateUserProfile)
userRouter.post('/post',protecter,createPost)
export default userRouter