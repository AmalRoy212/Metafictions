import axios from "../configs/axios";
import { toast } from "react-toastify";
import { login, logout } from "../redux-toolkit/adminAuthSlice";

export const findSearchData = ({searchData,setUsers}) => {
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

export const adminLogin = ({email,password,dispatch}) => {
  axios.post('/admin/login',{
    email,
    password
  }).then((res)=>{
    console.log(res.data.token);
    dispatch(login(res.data.token));
  })
}