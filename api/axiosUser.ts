import { User } from "../types";
import axiosClient from "./axiosClient";

const userApi = {
  login(data: Partial<User>): Promise<any> {
    const url = "/login";
    return axiosClient.post(url, data);
  },
  register(data: Partial<User>): Promise<any> {
    const url = "/register";
    return axiosClient.post(url, data);
  },
  getRefreshToken(): Promise<any> {
    const url = "/refreshtoken";
    return axiosClient.get(url);
  },
  logout(): Promise<any> {
    const url = "/logout";
    return axiosClient.get(url);
  },
};
export default userApi;
