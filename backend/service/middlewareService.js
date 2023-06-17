import userModel from "../models/userModel.js";

const findUser = async (_id) => {
  const user = await userModel.findById(_id);
  return user
} 

export  {
  findUser
}