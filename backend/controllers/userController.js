import asyncHandler from 'express-async-handler';
import UserModel from '../models/userSchema.js';
import { generateToken } from "../utils/generateToken.js";
import jwt from 'jsonwebtoken';



//  @dis      Auth user/set token
//  route     POST api/users/auth
//  @access   public

const authenticateUsers = asyncHandler(async function (req, res){
  const { email, password } = req.body;

  const user = await UserModel.findOne({email});

  if(user && (await user.matchPassword(password))){
    const accessToken = await generateToken(user);
    const updatedUser = await UserModel.findByIdAndUpdate({ _id : user._id},
      {$set : {accessToken}})
      if(updatedUser){
        res.status(200).json({
          _id : updatedUser._id,
          name : updatedUser.name,
          email : updatedUser.email,
          token : accessToken
       })
      }
  }else{
     res.status(401);
     throw new Error("Invalid username or password");
   }
})

//  @dis      registering new user
//  route     POST api/users/register
//  @access   public

const registerUser = asyncHandler(async function (req, res){
  const { name, email, password } = req.body;

  const userExist = await UserModel.findOne({email});
  
  if(userExist){
    res.status(400);
    throw new Error("User already exist");
  }

  const user = await UserModel.create({
    name,
    email,
    password
  })

  if(user){
   res.status(200).json({
      _id : user._id,
      name : user.name,
      email : user.email
   })
  }else{
    res.status(400);
    throw new Error("Invalid User data");
  }
})

//  @dis      logging out user
//  route     PATCH api/users/logout
//  @access   Private

const logoutUser = asyncHandler(async function (req, res){
  const { _id } = req.headers;

  const user = await UserModel.findByIdAndUpdate({ _id },{$set : {accessToken : ""}});

  if(user){
    res.status(200).json({
      message : "logout user"
    });
  }
  
})

//  @dis      logging out user
//  route     GET api/users/profile
//  @access   Private

const getUserProfile = asyncHandler(async function (req, res){
  const { _id } = req.headers;
  const user = await UserModel.findById(_id);
  if(user){
    res.status(200).json({
      name : user.name,
      email : user.email,
      img : user.imgSrc,
    });
  }
})

//  @dis      logging out user
//  route     PUT api/users/profile
//  @access   Private

const updateUserProfile = asyncHandler(async function (req, res){
  const { _id } = req.headers;

  const user = await UserModel.findById(_id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isBlocked = user.isBlocked;
    user.imgSrc = req.body.imgSrc || user.imgSrc;
    user.accessToken = user.accessToken;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      status: updatedUser.isBlocked,
      imageSrc: updatedUser.imageSrc,
      message: "Updated Succesfully"
    })

  } else {
    res.status(404);
    throw new Error('user not fund')
  }
})

export {
  authenticateUsers,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile
}