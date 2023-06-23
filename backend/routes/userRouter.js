import express from "express";
import { protecter } from '../middlewares/authUserMiddleware.js';
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
import { 
  createComment,
  createPost, 
  deletePost, 
  getAllPost, 
  likingPost 
} from "../controllers/postController.js";


const userRouter = express.Router();

userRouter.get('/', protecter, findAllUsers);
userRouter.get('/find', protecter, findUser);
userRouter.get('/logout', protecter, logoutUser);
userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUsers);
userRouter.post('/verify', verfyOtp);
userRouter.put('/follow',protecter, followUser);
userRouter.put('/like',protecter, likingPost);
userRouter.put('/comment', protecter, createComment);
userRouter.delete('/delete/post', protecter, deletePost);
userRouter.
  route('/profile').
    get(protecter,getUserProfile).
    put(protecter,updateUserProfile);
userRouter.route('/post')
  .get(protecter,getAllPost)
  .post(protecter,createPost);

export default userRouter