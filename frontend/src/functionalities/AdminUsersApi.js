import axios from "../configs/axios";
import { toast } from "react-toastify";
import { login, logout } from "../redux-toolkit/adminAuthSlice";

//finding user at timing
export const findSearchData = ({searchData,setUsers,adminToken}) => {
  if (searchData === '') {
    axios.get('/admin/get/users', {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      }
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        toast.error('Error fetching user data:', error);
      });
  } else {
    axios.get(`/admin/users/${searchData}`, {
      headers: {
        'Authorization': `Bearer ${adminToken}`
      },
    })
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        toast.error('Error fetching user data:', error);
      });
  }
}

//login user
export const adminLogin = ({email,password,dispatch}) => {
  axios.post('/admin/login',{
    email,
    password
  }).then((res)=>{
    console.log(res.data.token);
    dispatch(login(res.data.token));
  })
}

export const findUserOnSubmit = ({searchData,adminToken}) => {
  axios.get(`/admin/users/${searchData}`, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    },
  })
    .then((res) => {
      setUsers(res.data);
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}

export const blockUser = ({_id, adminToken}) => {
  axios.put('/admin/block/user', {
    userId: _id
  }, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  }).then((res) => {
    // console.log(res.data);
  }).catch((err) => console.log(err.message))
}

export const unblockUser = ({_id,adminToken}) => {
  axios.put('/admin/unblock/user', {
    userId : _id
  }, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  }).then((res) => {
    // console.log(res.data);
  }).catch((err) => console.log(err.message))
}

export const deleteUser = ({_id,adminToken}) => {
  axios.put('/admin/users/delete',{
    userId : _id
  },{
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  })
    .then((res) => {
      setLoaing(false);
    })
    .catch((error) => {
      console.error('Error deleting user:', error);
    });
};

export const editUser = (userId) => {
  setLoaing(true);
  localStorage.setItem('userId', userId);
  navigate('/admin/update/user');
  setLoaing(false);
}