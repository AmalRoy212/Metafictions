import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FirebaseContext } from './contexts/firebaseContexts';
import firebase from './configs/firebase.config';
import { useSelector } from "react-redux";
import Loader from "./components/loader/Loader";
import { SocketProvider } from './contexts/SocketProvider';
import axios from 'axios';

function App() {
  const { loading } = useSelector((state) => state.loading);
  const { token } = useSelector((state) => state.auth);
  const liked = useSelector((state) => state.post.liked)

  // axios.interceptors.request.use((request) => {
  //   if (token) {
  //     request.headers.Authorization = `Bearer ${token}`;
  //   }
  //   return request;
  // });

  return (
    <>
      {loading && <Loader />}
      <SocketProvider>
        <FirebaseContext.Provider value={firebase}>
          <ToastContainer style={{ zIndex: 13 }} />
          <Outlet />
        </FirebaseContext.Provider>
      </SocketProvider>
    </>
  )
}

export default App
