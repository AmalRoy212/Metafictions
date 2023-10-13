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
import UserProfile from "../pages/users/UserProfile.jsx";
import FriendsProfile from "../pages/users/FriendsProfile.jsx";
import NotificationScreen from "../pages/users/NotifiactionScreen.jsx";
import FriendsListScreen from "../pages/users/FriendsListScreen.jsx";
import AdminPostScreen from "../pages/admin/AdminPostScreen.jsx";
import AdminCommentScreen from "../pages/admin/AdminCommentScreen.jsx";
import MessengerScreen from "../pages/users/MessengerScreen.jsx";
import RoomPage from "../components/room/Room.jsx";
import VideoCallLobby from "../pages/users/VideoCallLobby.jsx";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Index />} />
      <Route  path='/login' element={<UserLogin />} />
      <Route  path='/signup' element={<UserSignUp />} />
      <Route  path='/verify' element={<OtpVerify />} />

      <Route path='' element={<PrivateRoutes/>} >
        <Route path='/home' element={<HomeScreen className="gradient01"/>} />
        <Route path='/profile' element={<UserProfile className="gradient01"/>} />
          <Route path='/friends/profile/:userId/' element={<FriendsProfile className="gradient01"/>} />
        <Route path='/notifications' element={<NotificationScreen className="gradient01"/>} />
        <Route path='/friends/list' element={<FriendsListScreen className="gradient01"/>} />
        <Route path='/inbox' element={<MessengerScreen className="gradient01"/>} />
        <Route path='/video/chat' element={<VideoCallLobby className="gradient01"/>} />
        <Route path="/room/:roomId" element={<RoomPage className="gradient01"/>} />
      </Route>

      <Route index={true}  path='/admin' element={<AdminLoginScreen />} />
      <Route  path='/admin/home' element={<AdminHomeScreen />} />
      <Route  path='/admin/users' element={<AminUsersScreen />} />
      <Route  path='/admin/posts' element={<AdminPostScreen />} />
      <Route  path='/admin/comments' element={<AdminCommentScreen />} />
      <Route  path='/admin/edit/user' element={<AdminEditUser />} />
    </Route>
    </>
  )
)