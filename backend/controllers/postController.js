import asyncHandler from "express-async-handler";
import PostModel from '../models/postModel.js';
import UserModel from "../models/userModel.js";

//creating new post 
// POST Private 
const createPost = asyncHandler( async function(req,res) {
  const { userId, discription, content } = req.body;
  const user = await UserModel.findById({ _id : userId });
  const newPost = new PostModel({
    userId,
    discription,
    content,
    userName: user.name,
    userDp: user.imgSrc
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

const getAllPost = asyncHandler( async function(req,res) {
  
  const allPost = await PostModel.find();

  if(allPost) res.status(200).json(allPost)
})



export {
  createPost,
  getAllPost
}