import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom'
import { Provider } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './store/store.js';
import './styles/styles.css';
import { router } from "./routes/index";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
