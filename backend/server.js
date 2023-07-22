import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from 'cors'
import { Server } from 'socket.io';
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";
import { notFount, errorHandler } from "./middlewares/errorMiddleware.js";
import ChatRouter from "./routes/chatRouter.js";
import messageRoute from "./routes/messageRoute.js";


const app = express();
connectDB();
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRouter);
app.use('/api/admin', adminRouter);
app.use('/api/chats', ChatRouter);
app.use('/api/message', messageRoute);
app.get('/', (req, res) => {
  res.send("hey am running");
});

app.use(notFount);
app.use(errorHandler);

const server = app.listen(port, () => console.log(`server running on port ${port}`));

const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    // https://metafiction.netlify.app
    // http://localhost:3000
    origin: "https://metafiction.netlify.app",
  }
});

io.on("connection", (socket) => {
  console.log("connected to socket.io");
  socket.on("setup", (user) => {
    socket.join(user.userId);
    socket.emit('connected');
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user joined in room " + room);
  })

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on('new message', (newMessageRecieved) => {
    let chat = newMessageRecieved.chat;
    if (!chat.users) return console.log("no users");

    chat.users.filter(user => {
      if (user._id === newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("User disconned");
    socket.leave(user._id);
  })
})
