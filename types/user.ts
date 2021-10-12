export interface User {
  email?: string;
  password?: string;
  passwordcomfirm?: string;
  newpassword?: string;
  username?: string;
  role?: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  [key: string]: any;
}
export interface UserState {
  msg: string;
  access_token: string;
  user: User;
  isLogin: boolean;
  refresh_token?: string;
}
