import axios from 'axios';
import { API_URL } from '../constants/endpoints';

const token = JSON.parse(localStorage.getItem('user') || '{}')?.access_token;
const axiosClient = axios.create({
  baseURL: API_URL,
  headers: token && {
    Authorization: `Bearer ${token}`,
  },
});

const handleResponse = (res) => {
  return res.data;
};

const handleError = (err) => {
  return Promise.reject(err);
};

axiosClient.interceptors.request.use(
  (req) => {
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

axiosClient.interceptors.response.use(handleResponse, handleError);

export default axiosClient;
