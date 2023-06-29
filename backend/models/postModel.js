import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  dateOfPost: {
    type: Date,
    default: Date.now
  },
  discription: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    required: true
  },
  likes: [{
    type: String
  }],
  comment: [
    {
      userId: {
        type:String,
        default:'',
      },
      userImage: {
        type:String,
        default:'',
      },
      userName: {
        type:String,
        default:'',
      },
      content: {
        type:String,
        default:'',
      },
      dateOfComment: {
        type: Date,
        default: Date.now
      },
    }
  ],
  isDeleted : {
    type : Boolean,
    default : false
  }
})

const Post = mongoose.model('post', postSchema);
export default Post;