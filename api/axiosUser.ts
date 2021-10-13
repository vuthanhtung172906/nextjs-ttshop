import { User } from '../types';
import axiosClient from './axiosClient';

const userApi = {
  login(data: Partial<User>): Promise<any> {
    const url = '/api/login';
    return axiosClient.post(url, data);
  },
  register(data: Partial<User>): Promise<any> {
    const url = '/api/register';
    return axiosClient.post(url, data);
  },
  active(activetoken: string): Promise<any> {
    const url = '/api/active';
    return axiosClient.post(url, {
      activetoken,
    });
  },
  getAccessToken(): Promise<any> {
    const url = '/api/refreshtoken';
    return axiosClient.post(url);
  },
  logout(): Promise<any> {
    const url = '/api/logout';
    return axiosClient.get(url);
  },
  editprofile(formdata: any): Promise<any> {
    console.log(formdata);
    const url = '/api/editprofile';
    return axiosClient.patch(url, formdata);
  },
  googleLogin(tokenId: string): Promise<any> {
    const url = '/api/googlelogin';
    return axiosClient.post(url, { tokenId });
  },
};
export default userApi;
