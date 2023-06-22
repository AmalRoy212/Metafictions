import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  dateOfPost: {
    type: Date,
    default: Date.now
  },
  discription : {
    type : String,
    default : ''
  },
  content : {
    type : String,
    required : true
  },
  likes : [{
    type : String
  }],
  Comments : [
    {
      type : String,
      default : ''          
    }
  ],
})

const Post = mongoose.model('post',postSchema);
export default Post;