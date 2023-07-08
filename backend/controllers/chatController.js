import asyncHandler from "express-async-handler";
import ChatModel from "../models/chatModel.js";
import UserModel from "../models/userModel.js";

const accesChats = asyncHandler(async function (req, res) {

  const { _id } = req.headers;
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({ message: "Could find the user" })
  }

  let isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: _id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ]
  }).populate("users", "-password").populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage",
    select: "name email"
  })

  if (isChat.length > 0) {
    res.status(200).json(isChat[0]);
  } else {
    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [_id, userId]
    }

    try {
      const createChat = await ChatModel.create(chatData);
      const fullChat = await ChatModel.findOne({ _id: createChat._id }).populate("users", "-password");
      
      if(fullChat) res.status(200).json(fullChat);
    } catch (error) {
      res.status(200)
      throw new Error(error.message);
    }
  }

})

export {
  accesChats
}