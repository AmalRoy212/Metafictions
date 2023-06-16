import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { FirebaseContext } from './contexts/firebaseContexts';
import firebase from './configs/firebase.config';

function App() {
  return (
    <>
      <FirebaseContext.Provider value={firebase}>
        <ToastContainer style={{zIndex:10}}/>
        <Outlet />
      </FirebaseContext.Provider>
    </>
  )
}

export default App
