import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const instance = axios.create({
  baseURL: BASE_URL
});

// const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;

// axios.interceptors.request.use((request) => {
//   if (token) {
//     request.headers.Authorization = `Bearer ${token}`;
//   }
//   return request;
// });


export default instance;