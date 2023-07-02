import mongoose from 'mongoose';

const notificationsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  postId : {
    type : String,
    required : true,
  },
  LikedUserId: {
    type: String,
    required: true
  },
  LikedUserDp : {
    type : String,
    required : true
  },
  dateOfNot: {
    type: Date,
    default: Date.now
  },
  noteMessage: {
    type: String,
    required: true
  },
  isDeleted : {
    type : Boolean,
    default : false
  }
})

const Notification = mongoose.model('notification', notificationsSchema);
export default Notification;