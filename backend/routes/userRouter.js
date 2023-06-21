import express from "express";
import {  
  authenticateUsers,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile, 
  findUser,
  verfyOtp,
  findAllUsers,
  followUser
} from "../controllers/userController.js";
import { protecter } from '../middlewares/authUserMiddleware.js'
import { createPost, deletePost, getAllPost } from "../controllers/postController.js";


const userRouter = express.Router();

userRouter.get('/', protecter, findAllUsers);
userRouter.get('/find', protecter, findUser);
userRouter.get('/logout', protecter, logoutUser);
userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUsers);
userRouter.post('/verify', verfyOtp);
userRouter.put('/follow',protecter, followUser);
userRouter.delete('/delete/post', protecter, deletePost);
userRouter.
  route('/profile').
    get(protecter,getUserProfile).
    put(protecter,updateUserProfile);
userRouter.route('/post')
  .get(protecter,getAllPost)
  .post(protecter,createPost);

export default userRouter