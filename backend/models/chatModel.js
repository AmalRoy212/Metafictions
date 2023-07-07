import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  chatName: {
    type : String,
    trim:true
  },
  isGroupChat : {
    type : Boolean,
    default : false
  },
  users : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "User"
  }],
  latestMessage : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Message"
  },
  groupAdmin : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, {
  timestamps : true
})

const Chats = mongoose.model('chat', chatSchema);
export default Chats;