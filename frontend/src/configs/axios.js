import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const instance = axios.create({
  baseURL: BASE_URL
});

export default instance;