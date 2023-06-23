import axios from "../configs/axios";
import { toast } from "react-toastify";
import { login, logout } from "../redux-toolkit/authSlice";
import { setLoading, clearLoading } from "../redux-toolkit/loadingSlice";
import {
  setPostCount,
  incrementPostCount,
  setFollowCount,
  incrementFollowCount,
  clearLiked,
} from "../redux-toolkit/actionManagerSlice";

//login 
export const userLogin = async function (email, password, dispatch, navigate) {
  if (email && password) {
    dispatch(setLoading())
    try {
      axios.post('/users/auth', {
        email,
        password
      }).then((res) => {
        dispatch(login(res.data.token));
        dispatch(clearLoading());
        navigate('/home');
      }).catch((error) => toast.error("Credential issues", error))
    } catch (error) {
      toast.error("Cannection issuse", error);
      dispatch(clearLoading());
    }
  } else {
    toast.error("Please fill the feilds")
  }
}

//singup
export const userSingUp = async function ({
  name,
  email,
  password,
  confirmPassword,
  image,
  firebase,
  dispatch,
  navigate
}) {
  dispatch(setLoading())
  if (password !== confirmPassword) {
    toast.error('Password doesnt not match');
  } else {
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then(async (url) => {
          let imgSrc = url;
          try {
            axios
              .post("/users/register", {
                name,
                email,
                password,
                imgSrc
              })
              .then((res) => {
                dispatch(clearLoading());
                navigate('/verify');
              })
              .catch((error) =>
                toast.error(error?.data?.message || error.error)
              );
          } catch (error) {
            toast.error(error.message);
          }
        });
      })
      .catch((error) => {
        toast.error("Error uploading image. Please try again.");
        console.error(error);
      });
  }
}

//otp 
export const verifyOtp = async function ({ otp, navigate }) {
  try {
    axios.post('/users/verify', {
      otp
    }).then((res) => {
      navigate('/login');
    })
  } catch (error) {
    toast.error("Cannection issuse", error);
  }
}

// home screen
export const loadHome = function ({
  token,
  setPosts,
  setUser,
  setUserSugg,
  dispatch,
  liked
}) {
  if (!liked) {
    dispatch(setLoading());
  }
  axios.get('/users/post', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setPosts(res.data);
    dispatch(setPostCount(res.data.length));
  })
  if (!liked) {
    dispatch(setLoading());
  }
  axios.get('/users/find', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setUser(res.data);
  });
  if (!liked) {
    dispatch(setLoading());
  }
  axios.get('/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setUserSugg(res.data);
    dispatch(setFollowCount(res.data.length))
  })
  dispatch(clearLoading());
  dispatch(clearLiked());
}

//post 
export const userCreatePost = async function ({
  media,
  firebase,
  discription,
  userId,
  token,
  dispatch,
  setDiscription,
  setMedia
}) {

  if (discription !== '') {
    dispatch(setLoading());
    firebase
      .storage()
      .ref(`/postContents/${media.name}`)
      .put(media)
      .then(({ ref }) => {
        ref.getDownloadURL().then(async (url) => {
          let contentUrl = url;
          try {
            axios
              .post("/users/post", {
                userId,
                content: contentUrl,
                discription
              }, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              .then((res) => {
                setDiscription('');
                setMedia('');
                dispatch(clearLoading());
                dispatch(incrementPostCount());
              })
              .catch((error) =>
                toast.error(error?.data?.message || error.error)
              );
          } catch (error) {
            toast.error(error.message);
          }
        });
      })
      .catch((error) => {
        toast.error("Error uploading image. Please try again.");
        console.error(error);
      });
  }
}

//logout 
export const userLogOut = async function ({ token, dispatch, navigate }) {
  try {
    dispatch(setLoading());
    axios.get('/users/logout', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
      dispatch(logout());
      dispatch(clearLoading());
      navigate('/login');
    })
  } catch (error) {

  }
}

//follow friends

export const followUser = async function ({ token, _id, dispatch }) {
  console.log(_id);
  try {
    axios.put(`/users/follow?followId=${_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.success("Request sent " + res.data.message);
      dispatch(incrementFollowCount());
    }).catch((err) => toast.error("Error occurred " + err.message));
  } catch (error) {
    toast.error("Error occurred " + error.message);
  }
}

//yes button handling
export const choiceHandler = function ({ choice, id, token, dispatch }) {
  dispatch(setLoading());
  if (choice === "Delete post") {
    try {
      axios
        .delete(`/users/delete/post?id=${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          toast.success("Post deleted " + res.data.message);
          axios.get('/users/post', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((res) => {
            dispatch(setPostCount(res.data.length));
            dispatch(clearLoading());
          })
        })
        .catch((error) => {
          toast.error("Error occurred while deleting post", error);
        });
    } catch (error) {
      toast.error("Error occurred while deleting post:", error);
    }
  }
}

//creating comment
export const createComment = async function ({ postId, content, token }) {
  console.log(token);
  axios.put('/users/comment', {
    postId,
    content
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

//liking and unliking post
export const likePost = async function ({ id, token }) {
  try {
    const response = await axios.put(`/users/like?id=${id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response) {
      return response.data.amLiked
    }
  } catch (error) {
    toast.error("An error occured");
  }
};

