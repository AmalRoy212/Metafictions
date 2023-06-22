import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId : {
    type : String,
    required : true
  },
  postId: {
    type: String,
    required: true
  },
  dateOfPost: {
    type: Date,
    default: Date.now
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
})

const Post = mongoose.model('post',postSchema);
export default Post;