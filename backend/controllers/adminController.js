import asyncHandler from "express-async-handler";
import moment from "moment";
import adminModel from "../models/adminModel.js";
import userModel from "../models/userModel.js";
import PostModel from "../models/postModel.js";
import { generateToken } from "../utils/generateToken.js";

/*
  * SignUp of Admin : singning up the admin and return the admin details
  * Method : Post
  * Route : /api/admin/signup
  * Access : Public
*/

const signUpAdmin = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  const exAdmin = await adminModel.findOne({ email: email });

  if (exAdmin) {
    res.status(400);
    throw new Error('The User is exist');
  }

  const admin = await adminModel.create({
    email,
    password,
    isAdmin: true
  })
  admin.save();

  if (admin) {
    res.status(200).json({
      admin: admin.email
    })
  }
})

/*
  * Login of Admin : Logging In the admin with auth and return the admin details
  * Method : Post
  * Route : /api/admin/login
  * Access : Public
*/

const authAdminLogin = asyncHandler(async function (req, res) {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({ email: email });

  if (admin && await admin.matchPassword(password)) {
    if (admin.isAdmin) {
      const token = await generateToken(admin);
      const updatedAdmin = await adminModel.findByIdAndUpdate({ _id: admin._id }, { $set: { accessToken: token } });
      if (updatedAdmin) {
        adminLoginHandler(admin._id, res);
      } else {
        res.status(403)
        throw new Error('There occuring some issues for login');
      }
    } else {
      res.send(403);
      throw new Error('Access denied forbidden');
    }
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
})
//admin login handler
async function adminLoginHandler(_id, res) {
  const admin = await adminModel.findById(_id);
  res.status(200).json({
    user: admin.email,
    token: admin.accessToken,
    isAdmin: admin.isAdmin
  })
}

/*
  * Blocking the User : Blocking the user with valid id and return the user details
  * Method : Put
  * Route : /api/admin/
  * Access : Private
*/

const blockUsers = asyncHandler(async function (req, res) {
  const { userId } = req.body;
  if (userId) {
    const user = await userModel.findByIdAndUpdate({ _id: userId }, { $set: { isBlocked: true } });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        completed: true,
        message: 'User blocked'
      })
    } else {
      res.status(404);
      throw new Error('Couldnt find the user');
    }
  } else {
    res.status(404);
    throw new Error('Id Couldnt find');
  }
})

/*
  * Blocking the User : Blocking the user with valid id and return the user details
  * Method : Put
  * Route : /api/admin/
  * Access : Private
*/

const unblockUsers = asyncHandler(async function (req, res) {
  const { userId } = req.body;

  if (userId) {
    const user = await userModel.findByIdAndUpdate({ _id: userId }, { $set: { isBlocked: false } });
    if (user) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        completed: true,
        message: 'User unblocked'
      })
    } else {
      res.status(404);
      throw new Error('Couldnt find the user');
    }
  } else {
    res.status(404);
    throw new Error('Id Couldnt find');
  }
})

/*
  * Search on users : Searchingthe users with input
  * Method : Get
  * Route : /api/admin/users
  * Access : Private
*/

const searchUsers = asyncHandler(async function (req, res) {
  const { searchData } = req.query;
  if (searchData) {
    const searchInput = searchData.replace(/\s/gi, 'i');
    const users = await userModel.find({ name: { $regex: searchInput } });
    if (users) {
      res.status(200).json(users);
    } else {
      res.json({ message: "No users found" })
    }
  } else {
    const users = await userModel.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.json({ message: "No users found" })
    }
  }
})

/*
  * Create users : Creating user by admin
  * Method : Post
  * Route : /api/admin/users/create
  * Access : Private
*/

const createUser = asyncHandler(async function (req, res) {
  const { name, email, password } = req.body;

  const userExist = await userModel.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error('email id is already in use');
  }

  const user = await userModel.create({
    name,
    email,
    password
  });

  if (user) {
    // const token = await generateToken(user);
    res.status(200).json({
      id: user._id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400);
    throw new Error('Bad request creadentials are not valid');
  }
});

/*
  * Delete users : Deleting user by admin
  * Method : Delete
  * Route : /api/admin/users/delete
  * Access : Private
*/

const deleteUser = asyncHandler(async function (req, res) {
  const { userId } = req.body;
  const user = await userModel.findById({ _id: userId });

  let status = user.isDeleted ? false : true

  const deleteUser = await userModel.findByIdAndUpdate(
    { _id: userId },
    { $set: { isDeleted: status } }
  );
  if (deleteUser) {
    res.status(200).json({
      status: true,
      message: 'user deleted'
    })
  } else {
    res.status(404);
    throw new Error('The User not found');
  }
})

/*
  * Update users : Updating user by admin
  * Method : Post
  * Route : /api/admin/users/update
  * Access : Private
*/

const updateUser = asyncHandler(async function (req, res) {
  const { id } = req.params;
  const user = await userModel.findById(id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isBlocked = user.isBlocked;
    user.imageSrc = req.body.imageSrc || user.imageSrc;
    user.accessToken = user.accessToken;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      status: updatedUser.isBlocked,
      imageSrc: updatedUser.imageSrc,
      message: "Updated Succesfully"
    })

  } else {
    res.status(404);
    throw new Error('user not fund')
  }
})

/*
  * Log Out admin : Logging out the adin and return the status
  * Method : Post
  * Route : /api/admin/logout
  * Access : Private
*/

const logoutAdmin = asyncHandler(async function (req, res) {
  const { adminId } = req.body;
  const admin = await adminModel.findByIdAndUpdate({ _id: adminId }, { $set: { accessToken: '' } });
  if (admin) {
    res.status(200).json({ completed: true, message: 'loged out succesfully' });
  }
});

const getUsers = asyncHandler(async function (req, res) {
  const users = await userModel.find();
  res.status(200).json(users);
})

const getSingleUser = asyncHandler(async function (req, res) {
  const { id } = req.params;
  const user = await userModel.findById(id);
  res.status(200).json(user);
});

const userEdit = asyncHandler(async function (req, res) {
  const { id } = req.body.data;
  const user = await userModel.findById(id);

  console.log(user);

  if (user) {
    user.name = req.body.data.name || user.name;
    user.email = req.body.data.email || user.email;
    user.isBlocked = user.isBlocked;
    user.imageSrc = user.imageSrc;
    user.accessToken = user.accessToken;

    if (req.body.password) {
      user.password = req.body.data.password || user.password;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      status: updatedUser.isBlocked,
      imageSrc: updatedUser.imageSrc,
      message: "Updated Succesfully"
    })

  } else {
    res.status(404);
    throw new Error('user not fund')
  }
})

//finding users on changing the users status

const findCurrentUsers = asyncHandler(async function (req, res) {
  const { searchData } = req.query;
  const searchInput = searchData.replace(/\s/gi, 'i');
  const users = await userModel.find({ name: { $regex: searchInput } });
  if (users) {
    res.status(200).json(users);
  } else {
    res.json({ message: "No users found" })
  }
})

//finding all post 
const findPosts = asyncHandler(async function (req, res) {
  const { searchInput } = req.query;

  if (searchInput) {
    const searchInputWithoutWhitespace = searchInput.replace(/\s/gi, "");
    const posts = await PostModel.find({ userId: { $eq: searchInputWithoutWhitespace } });
    const updatedPosts = await Promise.all(posts.map(async (post) => {
      const postTime = moment(post.dateOfPost);
      const timeAgo = postTime.format("MMM D, YYYY");

      const user = await userModel.findById(post.userId);

      const updatedPost = {
        ...post.toObject(),
        date: timeAgo,
        userName: user.name,
        userDp: user.imgSrc,
        userEmail: user.email,
      };

      return updatedPost;
    }));

    if (updatedPosts.length > 0) {
      res.status(200).json(updatedPosts);
    } else {
      res.json({ message: "No posts found" });
    }
  } else {
    const posts = await PostModel.find();
    const updatedPosts = await Promise.all(posts.map(async (post) => {
      const postTime = moment(post.dateOfPost);
      const timeAgo = postTime.format("MMM D, YYYY");

      const user = await userModel.findById(post.userId);

      const updatedPost = {
        ...post.toObject(),
        date: timeAgo,
        userName: user.name,
        userDp: user.imgSrc,
        userEmail: user.email,
      };

      return updatedPost;
    }));

    if (updatedPosts.length > 0) {
      res.status(200).json(updatedPosts);
    } else {
      res.json({ message: "No posts found" });
    }
  }
});

//for deleting post
const deletePost = asyncHandler(async function (req, res) {
  
  const { _id } = req.query;
  const existingPost = await PostModel.findById(_id);

  if (existingPost.isDeleted) {
    const updatedPost = await PostModel.findByIdAndUpdate(
      _id,
      { $set: { isDeleted: false } }
    );
    if (updatedPost) {
      res.status(200).json({ message: "Success" });
    }
  } else {
    const updatedPost = await PostModel.findByIdAndUpdate(
      _id,
      { $set: { isDeleted: true } }
      );
    if (updatedPost) {
      res.status(200).json({ message: "Success" });
    }
  }
});

//deleting comments 
const deleteComments = asyncHandler(async function (req, res) {
  const { postId, commentId } = req.query;

  const post = await PostModel.findOne({ _id: postId });
  const comments = post.comment;

  if (post && comments) {
    const spottedComment = comments.find((comment) => comment._id.toString() === commentId);

    if (spottedComment.isBlocked) {
      const updatedComment = await PostModel.findOneAndUpdate(
        {
          _id: postId,
          "comment._id": commentId
        },
        {
          $set: { "comment.$.isBlocked": false }
        },
      );
      if (updatedComment) {
        res.status(200).json({ message: "Comment deleted" });
      } else {
        res.status(500).json({ message: "Failed to delete comment" });
      }
    } else {
      const updatedComment = await PostModel.findOneAndUpdate(
        {
          _id: postId,
          "comment._id": commentId
        },
        {
          $set: { "comment.$.isBlocked": true }
        },
      );
      if (updatedComment) {
        res.status(200).json({ message: "Comment deleted" });
      } else {
        res.status(500).json({ message: "Failed to delete comment" });
      }
    }
  } else {
    res.status(404).json({ message: "Post or comments not found" });
  }
});


export {
  signUpAdmin,
  authAdminLogin,
  blockUsers,
  searchUsers,
  createUser,
  deleteUser,
  updateUser,
  logoutAdmin,
  getUsers,
  unblockUsers,
  getSingleUser,
  userEdit,
  findCurrentUsers,
  findPosts,
  deletePost,
  deleteComments
}