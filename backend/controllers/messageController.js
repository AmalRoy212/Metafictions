import asyncHandler from "express-async-handler";
import MessageModel from "../models/messageModel.js";
import UserModel from "../models/userModel.js";
import ChatsModel from "../models/chatModel.js";

const sendMessage  = asyncHandler( async function ( req, res ){
  const { content, chatId } = req.body;
  const { _id } = req.headers;

  if(!content || !chatId){
    res.status(400).json({message : "invalid details"});
    return
  }

  const newMessage = {
    sender : _id,
    content,
    chat : chatId
  }
  let message = await MessageModel.create(newMessage);

  message = await message.populate("sender", "name imgSrc")
  message = await message.populate("chat")
  message = await UserModel.populate(message, {
    path : "chat.users",
    select : "name imgSrc email"
  })

  await ChatsModel.findByIdAndUpdate(chatId,{
    latestMessage : message,
  })

  if(message){
    res.status(200).json(message);
  }else{
    res.status(400)
    throw new Error("Something went wrong",error.message);
  }
})

//fetching all messages 
const fetchAllMessages = asyncHandler( async function ( req, res ){
  const { chatId } = req.body;
  const messages = await MessageModel.find({ chat : chatId })
  .populate("sender", "name imgSrc email")
  .populate("chat");

  if(messages){
    res.status(200).json(messages);
  }else{
    res.status(400)
    throw new Error(error.message);
  }

})

export {
  sendMessage,
  fetchAllMessages
}