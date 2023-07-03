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
      toast.error('Error fetching user data: 124', error.message);
      console.log(error)
    });
}

//login user
export const adminLogin = ({ email, password, dispatch }) => {
  axios.post('/admin/login', {
    email,
    password
  }).then((res) => {
    console.log(res.data.token);
    dispatch(login(res.data.token));
  })
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
  }).catch((err) => console.log(err.message))
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
  }).catch((err) => console.log(err.message))
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
      console.error('Error deleting user:', error);
    });
};

export const editUser = (userId) => {
  localStorage.setItem('userId', userId);
  navigate('/admin/update/user');
}

//logging out admin
export const logOutAdmin = () =>{
  localStorage.removeItem('adminToken');
}

//finding post 
export const fetchAllPost = ({adminToken,searchInput,setPosts}) => {
  axios.get('/admin/users/posts',{
    params : {
      searchInput
    },
    headers:{
      Authorization : `Beared ${adminToken}`
    }
  }).then((res) => {
    setPosts(res.data);
  })
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
    console.log(res.data);
  }).catch((error) => {
    console.log(error);
  });
};
