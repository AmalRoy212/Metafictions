import asyncHandler from "express-async-handler";
import PostModel from '../models/postModel.js';
import UserModel from "../models/userModel.js";
import NotificationModel from "../models/notificationsModel.js";
import moment from 'moment';


//creating new post 
// POST Private 
const createPost = asyncHandler(async function (req, res) {
  const { userId, discription, content } = req.body;
  const user = await UserModel.findById({ _id: userId });
  const newPost = new PostModel({
    userId,
    discription,
    content,
    userName: user.name,
    userDp: user.imgSrc
  });

  const post = await newPost.save();

  if (post) {

    const postedUser = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { post: post._id } },
      { new: true }
    );
    if (postedUser) res.status(200).json({ message: "Completed " });
  }
})

// get all post
const getAllPost = asyncHandler(async function (req, res) {

  const { _id } = req.headers;

  const allPosts = await PostModel.find({isDeleted:false}).sort({ dateOfPost: -1 }).lean();

  await Promise.all(
    allPosts.map(async (post) => {

      post.comment.map(comment => {
        const postTime = moment(comment.dateOfComment);
        const currentTime = moment();
        const duration = moment.duration(currentTime.diff(postTime));
        const hoursAgo = Math.floor(duration.asHours());
        const minutesAgo = Math.floor(duration.asMinutes());

        let timeAgo;
        if (hoursAgo > 12) {
          timeAgo = postTime.format('MMM D, YYYY');
        } else if (hoursAgo > 0 && hoursAgo < 12) {
          timeAgo = `${hoursAgo} hours ago`;
        } else if (hoursAgo < 12) {
          timeAgo = `${minutesAgo} minutes ago`;
        }

        comment.time = timeAgo;
        comment.canDelete = comment.userId == _id ? true : false;
      })

      post.comment.reverse();

      const user = await UserModel.findById(post.userId);
      const postTime = moment(post.dateOfPost);
      const currentTime = moment();
      const duration = moment.duration(currentTime.diff(postTime));
      const hoursAgo = Math.floor(duration.asHours());
      const minutesAgo = Math.floor(duration.asMinutes());

      let timeAgo;
      if (hoursAgo > 12) {
        timeAgo = postTime.format('MMM D, YYYY');
      } else if (hoursAgo > 0 && hoursAgo < 12) {
        timeAgo = `${hoursAgo} hours ago`;
      } else if (hoursAgo < 12) {
        timeAgo = `${minutesAgo} minutes ago`;
      }

      post.date = timeAgo;
      post.userName = user.name;
      post.userDp = user.imgSrc;
      post.userEmail = user.email;
    })
  );

  if (allPosts) {
    res.status(200).json(allPosts);
  }
});

//delete post
const deletePost = asyncHandler(async function (req, res) {
  const { _id } = req.headers;
  const { id } = req.query;

  const updatedPost = await PostModel.findByIdAndDelete(id);

  const updatedUser = await UserModel.findByIdAndUpdate(
    _id,
    { $pull: { post: id } }
  );

  if (updatedPost && updatedUser) res.status(200).json({ message: "Successfully" });
})

//user like and unlike
const likingPost = asyncHandler(async function (req, res) {
  const { _id } = req.headers;
  const { id } = req.query;
  let updatedPost;
  let status = false;
  let amLiked = false;

  const post = await PostModel.findById({ _id: id });

  if (post.likes.includes(_id)) {
    updatedPost = await PostModel.findByIdAndUpdate(
      { _id: id },
      { $pull: { likes: _id } }
    );

    if(updatedPost){
      const user = await UserModel.findById(_id);
      const message = `${user.name} Likes your recent post`;
      const userEx = await NotificationModel.findOneAndUpdate(
        { userId: updatedPost.userId, noteMessage : message, LikedUserId : _id },
        {$set:{isDeleted : true }}
      );
      if(userEx) status = true;
    }

    amLiked = true;
  } else {
    updatedPost = await PostModel.findByIdAndUpdate(
      { _id: id },
      { $addToSet: { likes: _id } }
    );
    if (updatedPost && updatedPost.userId != _id) {
      const user = await UserModel.findById(_id);
      const message = `${user.name} Likes your recent post`;
      const userEx = await NotificationModel.findOne(
        { userId: updatedPost.userId, noteMessage : message, LikedUserId : _id, postId : updatedPost._id }
      );
      if (!userEx) {
        const newNotification = new NotificationModel({
          userId: updatedPost.userId,
          postId: updatedPost._id,
          postImg : updatedPost.content,
          LikedUserId: user._id,
          LikedUserDp: user.imgSrc,
          noteMessage: message,
        });

        await newNotification.save();

        if (newNotification) {
          const newUser = await UserModel.findByIdAndUpdate(
            { _id: updatedPost.userId },
            { $addToSet: { notifications: newNotification._id } }
          );

          if (newUser) {
            status = true;
          }
        }
      }else{
        const userEx = await NotificationModel.findOneAndUpdate(
          { userId: updatedPost.userId, noteMessage : message, LikedUserId : _id },
          {$set:{isDeleted : false }}
        );
        if(userEx) status = true;
      }
    }
    amLiked = false;
  }

  if (updatedPost) {
    res.status(200).json({ message: "Success", amLiked });
  }
});


// create new comment
const createComment = asyncHandler(async function (req, res) {
  const { postId, content } = req.body;
  const { _id } = req.headers;
  let status = false

  const user = await UserModel.findById(_id);

  const newComment = {
    userId: user._id,
    userImage: user.imgSrc,
    userName: user.name,
    content
  }

  const updatedPost = await PostModel.findByIdAndUpdate(
    { _id: postId },
    { $addToSet: { comment: newComment } }
  )

  if (updatedPost && updatedPost.userId != _id) {
    const message = `${user.name} is commented on your post`;
    const exNotification = await NotificationModel.findOne(
      { noteMessage: message, userId: updatedPost.userId, postId: updatedPost._id, LikedUserId: _id }
    );

    if (!exNotification) {
      const newNotification = new NotificationModel({
        userId: updatedPost.userId,
        postId: updatedPost._id,
        postImg: updatedPost.content,
        LikedUserId: user._id,
        LikedUserDp: user.imgSrc,
        noteMessage: message,
      });

      await newNotification.save();

      if (newNotification) {
        const newUser = await UserModel.findByIdAndUpdate(
          { _id: updatedPost.userId },
          { $addToSet: { notifications: newNotification._id } }
        );

        if (newUser) {
          status = true;
        }
      }
    }
  }

  if (updatedPost && status) {
    res.status(200).json({ message: "Success" });
  }

})

//delete a comment
const deleteComment = asyncHandler(async function (req, res) {

  const { postId, commentId } = req.body;

  const updatedPost = await PostModel.findByIdAndUpdate(
    postId,
    { $pull: { comment: { _id: commentId } } },
    { new: true }
  );

  if (updatedPost) {
    res.status(200).json({ message: "Success" });
  }

});

const findMyPosts = asyncHandler(async function (req, res) {
  const { _id } = req.headers;

  const myPosts = await PostModel.find({ userId: _id });

  const user = await UserModel.findById(_id);

  const updatedPosts = myPosts.map((post) => {
    const postTime = moment(post.dateOfPost);
    const currentTime = moment();
    const duration = moment.duration(currentTime.diff(postTime));
    const hoursAgo = Math.floor(duration.asHours());
    const minutesAgo = Math.floor(duration.asMinutes());

    let timeAgo;
    if (hoursAgo > 12) {
      timeAgo = postTime.format('MMM D, YYYY');
    } else if (hoursAgo > 0 && hoursAgo < 12) {
      timeAgo = `${hoursAgo} hours ago`;
    } else if (hoursAgo < 12) {
      timeAgo = `${minutesAgo} minutes ago`;
    }

    const updatedPost = {
      ...post.toObject(),
      date: timeAgo,
      userName: user.name,
      userDp: user.imgSrc,
      userEmail: user.email
    };

    return updatedPost;
  });

  updatedPosts.reverse();

  if (updatedPosts) {
    res.status(200).json(updatedPosts);
  }
});




export {
  createPost,
  getAllPost,
  deletePost,
  likingPost,
  createComment,
  deleteComment,
  findMyPosts
}