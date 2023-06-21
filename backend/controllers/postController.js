import asyncHandler from "express-async-handler";
import PostModel from '../models/postModel.js';
import UserModel from "../models/userModel.js";
import moment from 'moment'


//creating new post 
// POST Private 
const createPost = asyncHandler(async function (req, res) {
  const { userId, discription, content } = req.body;
  const user = await UserModel.findById({ _id: userId });
  const newPost = new PostModel({
    userId,
    discription,
    content,
    userName: user.name,
    userDp: user.imgSrc
  });

  const post = await newPost.save();

  if (post) {

    const postedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { post: post._id } },
      { new: true }
    );
    if (postedUser) res.status(200).json({ message: "Completed " });
  }
})

const getAllPost = asyncHandler(async function (req, res) {

  let user;
  const allPosts = await PostModel.find().sort({ dateOfPost: -1 }).lean();

  await Promise.all(
    allPosts.map(async (post) => {
      const user = await UserModel.findById(post.userId);
      const postTime = moment(post.dateOfPost);
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(postTime));
      const hoursAgo = Math.floor(duration.asHours());
      const minutesAgo = Math.floor(duration.asMinutes());

      let timeAgo;
      if (hoursAgo > 12) {
        timeAgo = postTime.format('MMM D, YYYY');
      } else if (hoursAgo > 0 && hoursAgo < 12) {
        timeAgo = `${hoursAgo} hours ago`;
      } else if (hoursAgo < 12) {
        timeAgo = `${minutesAgo} minutes ago`;
      }

      post.date = timeAgo;
      post.userName = user.name;
      post.userDp = user.imgSrc;
      post.userEmail = user.email;
    })
  );

  if (allPosts) {
    res.status(200).json(allPosts);
  }
});

const deletePost = asyncHandler(async function (req, res) {
  const { _id } = req.headers;
  const { id } = req.query;

  const updatedPost = await PostModel.findByIdAndDelete(id);

  const updatedUser = await UserModel.findByIdAndUpdate(
    _id,
    { $pull: { post: id } }
  );

  if(updatedPost && updatedUser) res.status(200).json({message : "Successfully"});
})



export {
  createPost,
  getAllPost,
  deletePost
}