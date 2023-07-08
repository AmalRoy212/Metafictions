import asyncHandler from "express-async-handler";
import ChatModel from "../models/chatModel.js";
import UserModel from "../models/userModel.js";
import Chats from "../models/chatModel.js";

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

});

//fetching the cahts 
const fetchChats = asyncHandler( async function ( req, res ){
  const { _id } = req.headers;
  try {
    Chats.find({ users : {$elemMatch : {$eq : _id }}})
    .populate("users","-password")
    .populate("groupAdmin", "-password")
    .populate("latestMessage")
    .sort({updatedAt:-1}).then(async (result) => {
      result = await UserModel.populate(result, {
        path: "latestMessage",
        select: "name email"
      })
      res.status(200).json(result);
    })
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//creating new group chat
const createGroupChat = asyncHandler( async function ( req, res) {
  if(!req.body.users || !req.body.name){
    return res.status(400).json({message : "Please fill the required feilds"});
  }

  const users = JSON.parse(req.body.users);

  if(users.length < 2){
    return res.status(400).json({ message: "Need atleast 1 user to start a group chat" });
  }

  users.push(req.headers._id);

  try {
    const groupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin : req.headers._id
    })
    const fullGroupChat = await ChatModel.findOne({ _id : groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }

})

//rename the group name
const renameGroup = asyncHandler( async function (req, res) {
  const { chatId , chatName } = req.body;
  const updatedChat = await ChatModel.findByIdAndUpdate(
    { _id : chatId},
    {chatName},
    {new:true}
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if(!updatedChat){
    res.status(400);
    throw new Error("chat not found");
  }else{
    res.status(200).json(updatedChat);
  }
});

//add to group 
const addToGroup = asyncHandler( async function ( req, res ){
  const { chatId, userId } = req.body;
  const added = await ChatModel.findByIdAndUpdate(
    { _id: chatId },
    { $push : { users : userId} },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!added) {
    res.status(400);
    throw new Error("chat not found");
  } else {
    res.status(200).json(added);
  }
})

//add to group 
const removeFromGroup = asyncHandler( async function ( req, res ){
  const { chatId, userId } = req.body;
  const removed = await ChatModel.findByIdAndUpdate(
    { _id: chatId },
    { $pull : { users : userId} },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");
  if (!removed) {
    res.status(400);
    throw new Error("chat not found");
  } else {
    res.status(200).json(removed);
  }
})
export {
  accesChats,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  removeFromGroup
}