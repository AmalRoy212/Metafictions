import axios from "../configs/axios";
import { toast } from "react-toastify";
import { login } from "../redux-toolkit/authSlice";
import { setLoading, clearLoading } from "../redux-toolkit/loadingSlice";
import { setPostCount } from "../redux-toolkit/postSlice";

//login 
export const userLogin = async function (email, password, dispatch, navigate) {
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
    axios.post('/users/verify',{
      otp
    }).then((res)=>{
      navigate('/login');
    })
  } catch (error) {
    toast.error("Cannection issuse",error);
  }
}

// home screen
export const loadHome = async function( {token, setPosts, setUser, dispatch} ){
  dispatch(setLoading());
  axios.get('/users/post',{
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setPosts(res.data);
    dispatch(setPostCount(res.data.length));
  })
  axios.get('/users/find', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then((res) => {
    setUser(res.data);
    dispatch(clearLoading());
  });
}