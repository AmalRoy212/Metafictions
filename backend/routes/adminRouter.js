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
  getSingleUser
} from "../controllers/adminController.js";
// import {  } from "../middlewares/authUserMiddleware.js";
// const protect = require('../middlewares/adminAuthMiddleware');

router.post('/singup',signUpAdmin);
router.post('/login',authAdminLogin);
// router.put('/block/user',protect,blockUsers);
// router.put('/unblock/user',protect,unblockUsers);
// router.put('/users/update/',userEdit);
// router.get('/users/:searchIpd',protect,searchUsers);
// router.post('/users/create',protect,createUser);
// router.delete('/users/delete',protect,deleteUser);
// router.put('/logout',protect,logoutAdmin);
// router.get('/get/users',protect,getUsers);
// router.get('/get/single/user/:id', protect, getSingleUser);

export default router