import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  email : {
    type : String,
    require : true,
    unique : true
  },
  password : {
    type : String,
    required : true
  },
  isBlocked : {
    type : Boolean,
    default : false,
  },
  imgSrc : {
    type : String,
    default : ''
  },
  accessToken : {
    type : String,
    default : ''
  }
})

//hashing the password
userSchema.pre('save',async function(next){
  if(!this.isModified('password')){
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt);
})

//matching the password 
userSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model('user',userSchema);
export default User;