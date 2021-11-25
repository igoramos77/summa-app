import axios from 'axios';
import baseURL from './baseURL';

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'privatekey'
  },
});

export default api;