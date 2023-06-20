import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FirebaseContext } from './contexts/firebaseContexts';
import firebase from './configs/firebase.config';
import { useSelector } from "react-redux";
import Loader from "./components/loader/Loader";
import axios from 'axios';

function App() {
  const { loading } = useSelector((state) => state.loading);
  const { token } = useSelector((state) => state.auth);

  axios.interceptors.request.use((request) => {
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });
  

  return (
    <>
      {loading && <Loader/>}
      <FirebaseContext.Provider value={firebase}>
        <ToastContainer style={{zIndex:10}}/>
        <Outlet />
      </FirebaseContext.Provider>
    </>
  )
}

export default App
