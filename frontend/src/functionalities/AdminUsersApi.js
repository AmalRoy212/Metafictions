import axios from "../configs/axios";
import { toast } from "react-toastify";
import { login, logout } from "../redux-toolkit/adminAuthSlice";

//finding user on search
export const findSearchData = ({ searchData, setUsers, adminToken }) => {
  axios.get(`/admin/users`, {
    params: {
      searchData
    },
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
  })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      toast.error('Error fetching user data: 124', error.message);
      console.log(error)
    });
}

// updating users on users change 
export const fetchCurrentUsers = ({ searchData, setUsers, adminToken }) => {
  console.log(adminToken);
  axios.get(`/admin/users/search`, {
    params: {
      searchData
    },
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
  })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      toast.error('Error fetching user data', error.message);
    });
}

//login user
export const adminLogin = ({ email, password, dispatch }) => {
  axios.post('/admin/login', {
    email,
    password
  }).then((res) => {
    dispatch(login(res.data.token));
    toast.success("Login success")
  }).catch((err) => toast.error("Something went wrong"))
}

// block user
export const blockUser = ({ _id, adminToken }) => {
  axios.put('/admin/block/user', {
    userId: _id
  }, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  }).then((res) => {
  }).catch((err) =>     toast.error("Somethign went wrong"))
}

// unblock user
export const unblockUser = ({ _id, adminToken }) => {
  axios.put('/admin/unblock/user', {
    userId: _id
  }, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  }).then((res) => {
  }).catch((err) =>     toast.error("Somethign went wrong"))
}

// delete user
export const deleteUser = ({ _id, adminToken }) => {
  axios.put('/admin/users/delete', {
    userId: _id
  }, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      toast.error("Somethign went wrong");
    });
};

export const editUser = (userId) => {
  localStorage.setItem('userId', userId);
  navigate('/admin/update/user');
}

//logging out admin
export const logOutAdmin = () => {
  localStorage.removeItem('adminToken');
}

//finding post 
export const fetchAllPost = ({ adminToken, searchInput, setPosts }) => {
  axios.get('/admin/users/posts', {
    params: {
      searchInput
    },
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  }).then((res) => {
    setPosts(res.data);
  }).catch((error) => {
    toast.error("Somethign went wrong");
  });
}



//delete a post
export const deletePost = ({ adminToken, _id }) => {
  axios.delete('/admin/users/delete/post', {
    params: {
      _id
    },
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  }).then((res) => {
    toast.success("Deleted Successfully")
  }).catch((error) => {
    toast.error("Somethign went wrong");
  });
};

//delete comment 
export const deleteCommentApi = ({ adminToken, postId, commentId }) => {
  axios.delete('/admin/users/delete/comment', {
    params: {
      postId,
      commentId
    },
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      toast.error("Something went wrong");
    });
};
