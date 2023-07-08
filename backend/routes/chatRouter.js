import express from "express";
import { protecter } from "../middlewares/authUserMiddleware.js";
import { 
  accesChats 
} from "../controllers/chatController.js";
const ChatRouter = express();


ChatRouter.route('/').post(protecter, accesChats)
// .get(protecter)
ChatRouter.post('/group', protecter)
ChatRouter.put('/rename', protecter)
ChatRouter.put('/add/group', protecter)
ChatRouter.put('/leave/group', protecter)

export default ChatRouter