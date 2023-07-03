import express from "express";
const router = express();
// const adminController = require('../controllers/adminController');
import {
  signUpAdmin,
  authAdminLogin,
  blockUsers,
  unblockUsers,
  userEdit,
  searchUsers,
  createUser,
  deleteUser,
  logoutAdmin,
  getUsers,
  getSingleUser,
  findCurrentUsers
} from "../controllers/adminController.js";
import { protecter } from "../middlewares/adminAuthMiddleware.js";

router.post('/singup', signUpAdmin);
router.post('/login', authAdminLogin);
router.put('/block/user', protecter, blockUsers);
router.put('/unblock/user', protecter, unblockUsers);
router.put('/users/update/', userEdit);
router.get('/users', protecter, searchUsers);
router.get('/users/search', protecter, findCurrentUsers);
router.post('/users/create', protecter, createUser);
router.put('/users/delete', protecter, deleteUser);
router.put('/logout', protecter, logoutAdmin);
router.get('/get/users', protecter, getUsers);
router.get('/get/single/user/:id', protecter, getSingleUser);

export default router