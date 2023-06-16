import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  Route, RouterProvider} 
from 'react-router-dom'
import { Provider } from "react-redux";
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Index from './pages/Index.jsx';
import UserLogin from './pages/users/UserLogin.jsx';
import './index.css';
import UserSignUp from './pages/users/UserSignUp.jsx';
import store from './store/store.js';
import PrivateRoutes from './components/privateRoutes/PrivateRoutes.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Index />} />
      <Route  path='/login' element={<UserLogin />} />
      <Route  path='/signup' element={<UserSignUp />} />

      <Route path='' element={<PrivateRoutes/>} >
          {/* <Route path='/home' element={<UserHome/>} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='/edit/profile' element={<EditUser/>} /> */}
        </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
