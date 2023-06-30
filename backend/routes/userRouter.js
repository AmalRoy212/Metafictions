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
  followUser,
  findRequests
} from "../controllers/userController.js";
import { 
  createComment,
  createPost, 
  deleteComment, 
  deletePost, 
  findMyPosts, 
  getAllPost, 
  likingPost 
} from "../controllers/postController.js";


const userRouter = express.Router();

userRouter.get('/', protecter, findAllUsers);
userRouter.get('/find', protecter, findUser);
userRouter.get('/logout', protecter, logoutUser);
userRouter.get('/my/post', protecter, findMyPosts);
userRouter.get('/requests', protecter, findRequests);
userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUsers);
userRouter.post('/verify', verfyOtp);
userRouter.put('/follow',protecter, followUser);
userRouter.put('/like',protecter, likingPost);
userRouter.put('/comment', protecter, createComment);
userRouter.patch('/delete/comment', protecter, deleteComment);
userRouter.delete('/delete/post', protecter, deletePost);
userRouter.
  route('/profile').
    get(protecter,getUserProfile).
    put(protecter,updateUserProfile);
userRouter.route('/post')
  .get(protecter,getAllPost)
  .post(protecter,createPost);

export default userRouter