import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TLoginData,
  getUserApi,
  loginUserApi,
  registerUserApi,
  logoutApi,
  updateUserApi,
  TRegisterData,
  TUserResponse,
  TAuthResponse
} from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';
import { TUser } from '../../utils/types';
import { userLogout } from '../slices/user/user';
import { AppDispatch } from '../store';
import { useDispatch } from 'react-redux';

export const checkUserAuth = createAsyncThunk<TUserResponse, void>(
  'user/checkUserAuth',
  async () => await getUserApi()
);

export const logUser = createAsyncThunk<TUser, TLoginData>(
  'user/logUser',
  async (data: TLoginData) => {
    const response = await loginUserApi(data);
    setCookie('accessToken', response.accessToken);
    response.user.name = '';
    return response.user;
  }
);

export const registerUser = createAsyncThunk<TAuthResponse, TRegisterData>(
  'user/registerUser',
  async (data: TRegisterData) => {
    const response = await registerUserApi(data);
    setCookie('accessToken', response.accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response;
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (data: Partial<TRegisterData>) => {
    const response = await updateUserApi(data);
    return response;
  }
);

export const logoutUser = createAsyncThunk('user/logoutUser', () => {
  async () =>
    await logoutApi()
      .then(() => {
        const dispatch: AppDispatch = useDispatch();
        dispatch(userLogout());
      })
      .catch(() => {
        console.log('Ошибка выполнения выхода');
      });
});
