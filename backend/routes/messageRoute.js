import express from "express";
import { protecter } from '../middlewares/authUserMiddleware.js';
import { fetchAllMessages, sendMessage } from "../controllers/messageController.js";

const router = express.Router();

router.route('/').post(protecter, sendMessage ).get(protecter, fetchAllMessages );

export default router;