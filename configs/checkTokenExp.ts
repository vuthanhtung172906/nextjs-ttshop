import { userAction } from './../features/auth/userSlice';
import jwt_decode from 'jwt-decode';
import { store } from '../app/store';

interface IToken {
  exp: number;
  iat: number;
  id: string;
}

export const checkTokenExp = async (token: string, dispatch?: any) => {
  const decoded: IToken = jwt_decode(token);
  if (decoded.exp >= Date.now() / 1000) {
    return;
  } else {
    await store.dispatch(userAction.getAccessTokenFromRefreshToken());
    console.log('Get check token expire');
    return;
  }
};
