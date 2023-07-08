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
    ref : "user"
  }],
  latestMessage : {
    type: mongoose.Schema.Types.ObjectId,
    ref : "message"
  },
  groupAdmin : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }
}, {
  timestamps : true
})

const Chats = mongoose.model('chat', chatSchema);
export default Chats;