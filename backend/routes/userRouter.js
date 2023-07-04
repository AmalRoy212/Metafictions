import express from "express";
import passport from 'passport';
import '../configs/passportConfig.js';
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
  findRequests,
  findMyFriends,
  findOthersProfile,
  unfollowUser,
  followDatas,
  findFriendsList
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
import { findNotifications } from "../controllers/notificationsController.js";


const userRouter = express.Router();



userRouter.get('/', protecter, findAllUsers);
userRouter.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }));
userRouter.get('/login/fails',(req, res) => {
  console.log("Login error");
  res.json({message:"fails"});
})
userRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login/fails' }), (req, res) => {
  console.log("Am the google am reached here",req.user);
  res.json({message :"Success"})
})
userRouter.get('/find', protecter, findUser);
userRouter.get('/logout', protecter, logoutUser);
userRouter.get('/my/post', protecter, findMyPosts);
userRouter.get('/requests', protecter, findRequests);
userRouter.get('/get/friends', protecter, findMyFriends);
userRouter.get('/other/profile/:userId', protecter, findOthersProfile);
userRouter.get('/following/users', protecter, followDatas);
userRouter.get('/notifications', protecter, findNotifications);
userRouter.get('/friends/list', protecter, findFriendsList);
userRouter.post('/register', registerUser);
userRouter.post('/auth', authenticateUsers);
userRouter.post('/verify', verfyOtp);
userRouter.put('/follow', protecter, followUser);
userRouter.put('/unfollow/:followId', protecter, unfollowUser);
userRouter.put('/like', protecter, likingPost);
userRouter.put('/comment', protecter, createComment);
userRouter.patch('/delete/comment', protecter, deleteComment);
userRouter.delete('/delete/post', protecter, deletePost);
userRouter.
  route('/profile').
  get(protecter, getUserProfile).
  put(protecter, updateUserProfile);
userRouter.route('/post')
  .get(protecter, getAllPost)
  .post(protecter, createPost);

export default userRouter