import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  dateOfPost : {
    type : String,
    default:null
  },
  discription : {
    type : String,
    default : ''
  },
  content : {
    type : String,
    required : true
  },
  likes : {
    type : Number,
    default : 0
  },
  Comments : [
    {
      type : String,
      default : ''          
    }
  ],
  userName:{
    type : String,
    require : true
  },
  userDp:{
    type : String,
    require : true
  }
})

const Post = mongoose.model('post',postSchema);
export default Post;