export interface User {
  email?: string;
  password?: string;
  passwordcomfirm?: string;
  username?: string;
  role?: boolean;
  avatar?: string;
  [key: string]: any;
}
export interface UserState {
  msg: string;
  access_token: string;
  user: User;
  isLogin: boolean;
}
