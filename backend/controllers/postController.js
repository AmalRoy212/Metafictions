import asyncHandler from "express-async-handler";
import PostModel from '../models/postModel.js';
import UserModel from "../models/userModel.js";

const createPost = asyncHandler( async function(req,res) {
  const { userId, dateOfPost, discription, content, likes, Comments } = req.body;

  const newPost = new PostModel({
    userId,
    dateOfPost,
    discription,
    content,
    likes,
    Comments
  });

  const post = await newPost.save();

  if(post){

    const postedUser = await UserModel.findByIdAndUpdate(
      { _id : userId },
      { $push: { post: post._id } },
      { new: true }
    );
    if(postedUser) res.status(200).json({ message : "Completed "});
  }
})

export {
  createPost
}