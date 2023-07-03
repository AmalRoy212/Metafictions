import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import adminModel from "../models/adminModel.js";

export const protecter = asyncHandler(async function (req, res, next) {
  // console.log("from auth middleware 7");
  const token = req.headers.authorization.split(' ')[1];
  // console.log(token,"from auth middleware 7");
  if (token) {
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      const { _id } = decode
      const admin = await adminModel.findById(_id);
      if(admin){
        if (token === admin.accessToken){
          req.headers._id = admin._id;
          // console.log("reached here *************",admin.email);
          next();
        }else {
          res.status(401);
          throw new Error('The token is not longer valid');
        }
      }else {
        res.status(404);
        throw new Error('User is Invalid');
      }
    } catch (error) {
      res.status(401);
      throw new Error('Not Autherized invalid token');
    }
  } else {
    res.status(401);
    throw new Error('User is not Autherized or not having a Token');
  }
})
