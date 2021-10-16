import { store } from './../app/store';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { checkTokenExp } from '../configs/checkTokenExp';

const axiosClient = axios.create({
  // baseURL: process.env.PROXY_SERVER || 'https://vtt-nodejs.herokuapp.com',
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.defaults.withCredentials = true;
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let accesstoken = store.getState().user.access_token;
    // const accesstoken = useAppSelector((state) => state.user.access_token);
    if (accesstoken) {
      checkTokenExp(accesstoken);
      accesstoken = store.getState().user.access_token;
    }
    config['headers'] = {
      'Content-Type': 'application/json',
      Authorization: accesstoken,
    };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
