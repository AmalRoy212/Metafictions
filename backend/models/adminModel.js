import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
  email : {
    type : String,
    require : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  isAdmin : {
    type : Boolean,
    required : true
  },
  accessToken : {
    type : String,
    default : ''
  }
})

//hashing the password
adminSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
})

//matching the password 
adminSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

const Admin = mongoose.model('admin',adminSchema);
export default Admin;