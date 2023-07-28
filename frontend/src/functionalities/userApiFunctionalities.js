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
  clearChatUpdate,
  setChatUpdate,
} from "../redux-toolkit/actionManagerSlice";
import { setNotLength } from "../redux-toolkit/notificationSlice";

//google login
export const googleSignUp = () => {
  axios.get('/users/google', {
    // withCredentials: true 
  })
    .then(response => {
      console.log(response.data);
      // Handle the response data
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle the error
    });

}

//login 
export const userLogin = async function (email, password, dispatch, navigate) {
  if (email && password) {
    dispatch(setLoading())
    try {
      axios.post('/users/auth', {
        email,
        password
      }).then((res) => {
        if (res.data.isBlocked || res.data.isDeleted) {
          toast.error(res.data.message);
        } else {
          toast.success("Login success");
        }
        dispatch(login(res.data.token));
        dispatch(clearLoading());
        navigate('/home');
      }).catch((error) => {
        toast.error("Credential issues", error);
        dispatch(clearLoading());
      })
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
  if( !name || !email || !password || !confirmPassword ) {
    toast.warning("Please fill the feilds");
    return
  }
  dispatch(setLoading())
  if (password !== confirmPassword) {
    toast.error('Password doesnt not match');
    dispatch(clearLoading());
  } else {
    if (!image) image = "https://cdn3.vectorstock.com/i/1000x1000/30/97/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg"
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
              .catch((error) =>{
                if (error.message == "Request failed with status code 400"){
                  toast.warning("I think you are using the an existing email");
                }else{
                  toast.error("Something went wrong try again later");
                }
                  dispatch(clearLoading());
                }
              );
          } catch (error) {
            toast.error(error.message);
          }
        });
      })
      .catch((error) => {
        toast.error("Error uploading image. Please try again.");
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
    }).catch((err) => {
      toast.error("There is an issue with your OTP")
    })
  } catch (error) {
    toast.error("Cannection issuse");
  }
}

// home screen
export const loadHome = function ({
  token,
  setPosts,
  setUser,
  setUserSugg,
  dispatch,
  liked,
  navigate
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
  }).catch((err) => {
    if (err.message == "Request failed with status code 401"){
      localStorage.removeItem('token');
      navigate('/login')
    }
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
    dispatch(setNotLength(res.data.notifications.length))
  }).catch((err) => {
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
  }).catch((err) => {
  });
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

  if (discription !== '' || image !== '') {
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
              .catch((error) => {
                toast.error(error?.data?.message || error.error);
                dispatch(clearLoading());
              }
              );
          } catch (error) {
            toast.error(error.message);
            dispatch(clearLoading());
          }
        });
      })
      .catch((error) => {
        toast.error("Error uploading image. Please try again.");
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
      dispatch(logout());
      dispatch(clearLoading());
      navigate('/login');
    })
  } catch (error) {

  }
}

//follow friends

export const followUser = async function ({ token, _id, dispatch }) {
  dispatch(setLoading());
  try {
    axios.put(`/users/follow?followId=${_id}`, null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((res) => {
      toast.success("Request sent " + res.data.message);
      dispatch(incrementFollowCount());
      dispatch(clearLoading())
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
      return response.data.amLiked ? response.data.amLiked : null;
    }
  } catch (error) {
    toast.error("An error occured");
  }
};

//find current user
export const findMe = ({ token, setUser }) => {
  axios.get('/users/find', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setUser(res.data);
  });
}

//finding my post 
export const findMyPost = ({ token, setPosts, dispatch }) => {
  axios.get('/users/my/post', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setPosts(res.data);
    dispatch(incrementPostCount());
  });
}

//update user profile
export const updateUser = ({
  firebase,
  token,
  email,
  password,
  name,
  image,
  dispatch,
  setName,
  setPassword,
  setEmail,
  setImage,
  setConfirmPassword
}) => {
  dispatch(setLoading());
  if (image) {
    firebase
      .storage()
      .ref(`/image/${image.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then(async (url) => {
          const imgSrc = url;
          axios
            .put(
              '/users/profile',
              {
                name,
                email,
                password,
                imgSrc,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setName('');
              setEmail('');
              setPassword('');
              setConfirmPassword('');
              setImage('')
              dispatch(clearLoading())
            })
            .catch((error) => toast.error(error?.data?.message || error.error));
        });
      });
  } else {
    axios
      .put(
        '/users/profile',
        {
          name,
          email,
          password,
          imgSrc: '',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setImage('')
        dispatch(clearLoading())
      })
      .catch((error) => toast.error(error?.data?.message || error.error));
  }
};

//finding my request
export const findMyRequests = ({ setRequest, token, dispatch }) => {
  if (token) {
    axios.get("/users/requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      setRequest(res.data);
      dispatch(incrementPostCount());
    }).catch((err) => {
      // toast.error("Somethign went wrong");
    })
  }
}

//finding my friends
export const findMyFriends = ({ token, setFriends }) => {
  axios.get('/users/get/friends', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setFriends(res.data)
  }).catch((err) => {
    toast.error("Something went wrong");
  })
}

//finding friends profile
export const findingFriendsData = ({ token, dispatch, userId, setPosts, setUser, setEvent }) => {
  axios.get(`/users/other/profile/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      setUser(res.data.user);
      setPosts(res.data.updatedPosts);
      setEvent(false);
    })
    .catch((error) => {
      toast.error("Error occured");
    });
};

//unfollowing user 
export const unfollowUsers = ({ followId, token, dispatch }) => {
  dispatch(setLoading());
  axios
    .put(`/users/unfollow/${followId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      dispatch(clearLoading());
      toast.success("Unfollowed " + res.data.message)
    })
    .catch((err) => {
      toast.error("Something went wrong");
      dispatch(clearLoading());
    });
};

//find following users
export const findMyFolloData = ({ token, setFollowers, setFollowings, dispatch }) => {
  dispatch(setLoading());
  axios.get('/users/following/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setFollowers(res.data.followerUsers);
    setFollowings(res.data.followingUsers);
    dispatch(clearLoading());
  }).catch((err) => {
    toast.error("Something went wrong");
    dispatch(clearLoading());
  })
}

//finding notifications
export const findMyNots = ({ token, setNotifications, dispatch }) => {
  dispatch(setLoading());
  axios.get('/users/notifications', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setNotifications(res.data);
    dispatch(clearLoading());
  }).catch((err) => {
    toast.error("Somthing went wrong");
    dispatch(clearLoading());
  })
};

//findig the users list
export const findMyFriendsList = ({ token, searchInput, setUsers }) => {
  axios.get('/users/friends/list', {
    params: {
      searchInput: searchInput
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setUsers(res.data)
  }).catch((err) => {
    toast.error("Something went wrong");
  });
};

//getting all chats of the user
export const getChats = ({ token, setChats, dispatch }) => {
  axios.get('/chats', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setChats(res.data);
    dispatch(clearChatUpdate());
  }).catch((err) => {
  })
}

//searching users
export const searchChatUsers = ({ token, searchQuery, setUsers }) => {
  axios.get('/chats/users', {
    params: {
      searchQuery
    },
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setUsers(res.data)
  }).catch((err) => {
    toast.error("Something went wrong");
  })
}

// create new group chat
export const createGroupChat = ({
  token,
  groupChatName,
  selectedUsers,
  onClose,
  setChats,
  chats,
  setSelectedUsers,
  setUsers,
  dispatch
}) => {
  dispatch(setLoading())
  if (!groupChatName || !selectedUsers) {
    toast.error("Please fill the require feilds");
    dispatch(clearLoading());
    return
  }
  onClose();
  axios.post('/chats/group', {
    name: groupChatName,
    users: selectedUsers.map((user) => user._id)
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setChats([res.data, ...chats]);
    setSelectedUsers([]);
    setUsers([]);
    dispatch(clearLoading());
  }).catch((err) => {
    dispatch(clearLoading());
    toast.error("Something went wrong");
  });
}

// find my current frinends and seach user on chat box
export const findMyChatFriends = ({token, searchQuery, setUsers}) => {
  axios.get('/chats/users/find',{
    params : {
      searchQuery
    },
    headers : {
      Authorization : `Bearer ${token}`
    }
  }).then((res) => {
    setUsers(res.data);
  }).catch((err) => {
    toast.error("Oops.! Something went wrong");
  })
}

//create a new chat
export const createNewChat = ({ token, userId, onClose, setChats, chats, setUsers, dispatch }) => {
  dispatch(setLoading());
  axios.post('/chats',{userId},{
    headers : {
      Authorization : `Bearer ${token}`
    }
  }).then((res) => {
    setChats([res.data, ...chats]);
    onClose();
    setUsers([]);
    dispatch(clearLoading());
  }).catch((err) => {
    toast.error("Oops.! Something went wrong");
    dispatch(clearLoading());
  })
}

//changing the group chat name 
export const changeGroupName = ({ 
  token, 
  groupChatName, 
  chatId, 
  dispatch, 
  onClose,
  setCurrentChat 
}) => {
  dispatch(setLoading());
  axios.put('/chats/rename',{
    chatId,
    chatName : groupChatName
  },{
    headers : {
      Authorization : `Bearer ${token}`
    }
  }).then((res) => {
    setCurrentChat(res.data)
    dispatch(clearLoading());
    dispatch(setChatUpdate());
    onClose();
  }).catch((err) => {
    toast.error("Oops.! Somethign went wrong")
    dispatch(clearLoading());
  })
}

//adding new uses
export const addNewUserToGruop = ({ 
  token, 
  chatId, 
  userId, 
  setCurrentChat, 
  setSearch,
  setUsers
}) => {
  axios.put('/chats/add/group', {
    chatId,
    userId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setCurrentChat(res.data)
    setSearch('')
    setUsers([])
  }).catch((err) => {
    toast.error("Oops.! Somethign went wrong")
  })
}

//remove some one from group
export const removeUserFromGroup = ({ token, chatId, userId, setCurrentChat}) => {
  axios.put('/chats/remove/group', {
    chatId,
    userId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setCurrentChat('');
  }).catch((err) => {
    toast.error("Oops.! Somethign went wrong")
  })
}

//messegings
export const createNewMessage = ({
  token,
  chatId,
  content,
  setNewMessage,
  messages,
  setMessages,
  socket
}) => {
  setNewMessage('');
  axios.post('/message', {
    content,
    chatId
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      const newMessage = res.data;
      setMessages([...messages, newMessage]);
      socket.emit("new message", newMessage);
    })
    .catch((err) => {
      toast.error("Oops! Something went wrong");
    });
};


//fetching al chats 
export const fetchMessages = ({ token, currentChat, setLoading, setMessages, socket }) => {
  if (!currentChat) {
    return;
  }
  setLoading(true);
  axios
    .get('/message', {
      params: {
        chatId: currentChat._id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setMessages(res.data);
      setLoading(false);
      socket.emit("join chat", currentChat._id)
    })
    .catch((err) => {
      toast.error("Oops! Something went wrong");
    });
};

export const fetchMessageAgain = ({ token, currentChat, setMessages }) => {
  axios
    .get('/message', {
      params: {
        chatId: currentChat._id,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => {
      setMessages(res.data);
      socket.emit("join chat", currentChat._id)
    })
    .catch((err) => {
      toast.error("Oops! Something went wrong");
    });
}