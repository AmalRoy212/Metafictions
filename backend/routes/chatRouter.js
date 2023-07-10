import express from "express";
import { protecter } from "../middlewares/authUserMiddleware.js";
import { 
  accesChats, 
  addToGroup, 
  createGroupChat, 
  fetchChats,
  removeFromGroup,
  renameGroup,
  searchUsers
} from "../controllers/chatController.js";
const ChatRouter = express();


ChatRouter.route('/').post(protecter, accesChats).get(protecter, fetchChats);
ChatRouter.get('/users', protecter, searchUsers);
ChatRouter.post('/group', protecter, createGroupChat);
ChatRouter.put('/rename', protecter, renameGroup);
ChatRouter.put('/add/group', protecter, addToGroup);
ChatRouter.put('/remove/group', protecter, removeFromGroup);

export default ChatRouter