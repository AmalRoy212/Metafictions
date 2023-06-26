import { createBrowserRouter, 
  createRoutesFromElements, 
  Route, } 
from "react-router-dom"
import App from '../App.jsx';
import Index from '../pages/Index.jsx';
import UserLogin from '../pages/users/UserLogin.jsx';
import UserSignUp from '../pages/users/UserSignUp.jsx';
import PrivateRoutes from '../components/privateRoutes/PrivateRoutes.jsx';
import HomeScreen from '../pages/users/HomeScreen.jsx';
import OtpVerify from '../pages/users/OtpVerify.jsx';
import AdminHomeScreen from "../pages/admin/AdminHome.jsx";
import AminUsersScreen from "../pages/admin/AdminUsersScreen.jsx";
import AdminLoginScreen from "../pages/admin/AdminLoginScreen.jsx";
import AdminEditUser from "../pages/admin/AdminEditUser.jsx";


export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Index />} />
      <Route  path='/login' element={<UserLogin />} />
      <Route  path='/signup' element={<UserSignUp />} />
      <Route  path='/verify' element={<OtpVerify />} />

      <Route  path='/admin' element={<AdminLoginScreen />} />
      <Route  path='/admin/home' element={<AdminHomeScreen />} />
      <Route  path='/admin/users' element={<AminUsersScreen />} />
      <Route  path='/admin/edit/user' element={<AdminEditUser />} />

      <Route path='' element={<PrivateRoutes/>} >
        <Route path='/home' element={<HomeScreen className="gradient01"/>} />
      </Route>
    </Route>
  )
)