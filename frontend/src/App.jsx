import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FirebaseContext } from './contexts/firebaseContexts';
import firebase from './configs/firebase.config';
import { useSelector } from "react-redux";
import Loader from "./components/loader/Loader";

function App() {
  const { loading } = useSelector((state) => state.loading);
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
