import express from "express";
import {  
  authenticateUsers,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile, 
  findUser,
  verfyOtp
} from "../controllers/userController.js";
import { protecter } from '../middlewares/authUserMiddleware.js'
import { createPost, getAllPost } from "../controllers/postController.js";


const userRouter = express.Router();

userRouter.get('/find', protecter, findUser);
userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUsers);
userRouter.get('/logout', protecter, logoutUser);
userRouter.post('/verify', verfyOtp);
userRouter.
  route('/profile').
    get(protecter,getUserProfile).
    put(protecter,updateUserProfile);
userRouter.route('/post')
  .get(protecter,getAllPost)
  .post(protecter,createPost);

export default userRouter