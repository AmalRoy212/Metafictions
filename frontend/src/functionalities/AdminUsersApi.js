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

//finding users on search
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

// block user
export const blockUser = ({_id, adminToken}) => {
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
export const unblockUser = ({_id,adminToken}) => {
  axios.put('/admin/unblock/user', {
    userId : _id
  }, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  }).then((res) => {
  }).catch((err) => console.log(err.message))
}

// delete user
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
//find all users for table
export const findAllUsers = ({ adminToken }) => {
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
}

// from edit page
// useEffect(() => {
//   axios.get(`/admin/get/single/user/${userId}`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     }
//   })
//     .then((res) => {
//       setUser(res.data);
//       setLoading(false)
//     })
//     .catch((err) => console.log(err.message));
// }, [token, userId]);

// const submitHandler = async function (e) {
//   e.preventDefault();
//   setLoading(true);
//   axios.put(`/admin/users/update/`, {
//     headers: {
//       'Authorization': `Bearer ${token}`
//     },
//     data :{
//       name,
//       email,
//       password,
//       id : userId
//     }
//   })
//     .then((res) => {
//       localStorage.removeItem('userId');
//       navigate('/admin/home');
//       setLoading(false);
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
// };