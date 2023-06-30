import asyncHandler from 'express-async-handler';
import UserModel from '../models/userModel.js';
import { generateToken } from "../utils/generateToken.js";
import { generateOTP } from "../utils/generateOtp.js";
import nodemailer from "nodemailer";


let otpChecking;



async function sendingVerificationMail(userName, email, userID) {
  try {
    const newOtp = await generateOTP();
    otpChecking = newOtp;
    const transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_MAIL_ID,
        pass: process.env.SMTP_MAIL_PASSWORD,
      },
    });
    const mailOption = {
      from: process.env.SMTP_SENDER,
      to: email,
      subject: "For Mail Verification",
      html:
        "<p>Hii <b>" +
        userName +
        '</b>, Please click  here to <a href="http://ke4.tech/verify?id=' +
        userID +
        '">verify</a> you mail Your One time Password <h5>' +
        newOtp +
        "</h5>",
    };
    transport.sendMail(mailOption, function (err, info) {
      if (err) {
        console.log(err);
      } else {
        console.log("mail has been send :-", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
}

//  @dis      Auth user/set token
//  route     POST api/users/auth
//  @access   public

const authenticateUsers = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (user.isBlocked || user.isDeleted) {
      res.json({
        message:"User temporarily blocked",
        isBlocked : user.isBlocked,
        isDeleted : user.isDeleted
      });
    }else{
      const accessToken = await generateToken(user);
      const updatedUser = await UserModel.findByIdAndUpdate({ _id: user._id },
        { $set: { accessToken } }
      )
      if (updatedUser) {
        res.status(200).json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: accessToken,
          isBlocked : updatedUser.isBlocked,
          isDeleted : updatedUser.isDeleted
        })
      }
    }
  }else {
    res.status(401);
    throw new Error("Invalid username or password");
  }
})

//  @dis      registering new user
//  route     POST api/users/register
//  @access   public

const registerUser = asyncHandler(async function (req, res) {
  const { name, email, password, imgSrc } = req.body;

  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const newUser = new UserModel({
    name,
    email,
    password,
    imgSrc
  });

  const user = await newUser.save();

  await sendingVerificationMail(user.name, user.email, user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    });
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
})

//  @dis      logging out user
//  route     PATCH api/users/logout
//  @access   Private

const logoutUser = asyncHandler(async function (req, res) {
  const { _id } = req.headers;
  const user = await UserModel.findByIdAndUpdate({ _id }, { $set: { accessToken: "" } });

  if (user) {
    res.status(200).json({
      message: "logout user"
    });
  }

})

//  @dis      logging out user
//  route     GET api/users/profile
//  @access   Private

const getUserProfile = asyncHandler(async function (req, res) {
  const { _id } = req.headers;
  const user = await UserModel.findById(_id);
  if (user) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      img: user.imgSrc,
    });
  }
})

//  @dis      logging out user
//  route     PUT api/users/profile
//  @access   Private

const updateUserProfile = asyncHandler(async function (req, res) {
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
      imgSrc: updatedUser.imgSrc,
      message: "Updated Succesfully"
    })

  } else {
    res.status(404);
    throw new Error('user not fund')
  }
})


//  @dis      logging out user
//  route     PUT api/users/profile
//  @access   Private

const findUser = asyncHandler(async function (req, res) {
  const { _id } = req.headers;

  const user = await UserModel.findById(_id);
  const following = user.following.length ? user.following.length : 0
  const followers = user.followers.length ? user.followers.length : 0
  const posts = user.post.length ? user.post.length : 0

  if (user) {
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      imgSrc: user.imgSrc,
      following,
      followers,
      posts
    })
  } else {
    res.status(401);
    throw new Error("Invalid user or not autherized")
  }

})

//verify otp
const verfyOtp = asyncHandler(async function (req, res) {
  const { otp } = req.body;

  if (otp == otpChecking) res.status(200).json({ message: "Successfull" })
  else {
    res.status(400)
    throw new Error('Invalid OTP');
  }
})

//find all users
const findAllUsers = asyncHandler(async function (req, res) {
  const { _id } = req.headers;

  const me = await UserModel.findById(_id);
  const followingIds = me.following.map(id => id.toString());
  const followerIds = me.followers.map(id => id.toString());

  const allUsers = await UserModel.find({
    _id: { $nin: [...followingIds, ...followerIds, _id] }
  }).limit(10);

  res.status(200).json(allUsers);
});


//follow user
const followUser = asyncHandler(async function (req, res) {
  const { _id } = req.headers;
  const { followId } = req.query;

  const updatedUser = await UserModel.findByIdAndUpdate(
    { _id: _id },
    { $push: { following: followId } },
    { new: true }
  );

  const followedUser = await UserModel.findByIdAndUpdate(
    { _id: followId },
    { $push: { followers: _id } },
    { new: true }
  )

  if (updatedUser && followedUser) {
    res.status(200).json({ message: "success" });
  }
});

//unfollow user
const unfollowUser = asyncHandler(async function (req, res) {
  const { _id } = req.headers;
  const { followId } = req.query;

  const updatedUser = await UserModel.findByIdAndUpdate(
    { _id: _id },
    { $pop: { following: followId } },
  );

  const followedUser = await UserModel.findByIdAndUpdate(
    { _id: followId },
    { $pop: { followers: _id } },
  )

  if (updatedUser && followedUser) {
    res.status(200).json({ message: "success" });
  }
})

//getting the friend requests
const findRequests = asyncHandler(async function (req, res) {
  const { _id } = req.headers;

  const user = await UserModel.findById(_id);
  const requests = user.followers;
  const currentFollowing = user.following;

  const users = await UserModel.find({ _id: { $in: requests, $nin: currentFollowing } });

  if (users) {
    res.status(200).json(users);
  }
});

//finding friends
const findMyFriends = asyncHandler(async function (req, res) {
  const { _id } = req.headers;

  const user = await UserModel.findById(_id);
  let friends = user.following;
  let friendsTwo = user.followers;

  const uniqueFriends = Array.from(new Set([...friends, ...friendsTwo]));

  const myFriends = await UserModel.find({ _id: { $in: uniqueFriends.slice(0, 4) } });

  if(myFriends){
    res.status(200).json(myFriends)
  }
});

//finding other users profile
const findOthersProfile = asyncHandler( async function( req, res) {
  console.log("***************************");
  // const { userId } = req.query;
  // console.log(userId);
})

export {
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
  findOthersProfile
}