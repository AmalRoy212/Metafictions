import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const { _id } = user;
  const accessToken = jwt.sign({_id},process.env.JWT_SECRET);
  return accessToken
}

