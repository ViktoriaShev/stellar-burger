import { RequestStatus, TUser } from '../../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  checkUserAuth,
  logUser,
  registerUser,
  logoutUser,
  updateUser
} from '../../thunks/user';

export interface TUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  requestStatus: RequestStatus;
}

const initialState: TUserState = {
  isAuthChecked: false,
  data: null,
  requestStatus: RequestStatus.Idle
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    getUser: (state: TUserState) => state.data,
    getIsAuthCheched: (state: TUserState) => state.isAuthChecked
  },

  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload.user;
      })
      .addCase(logUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.requestStatus = RequestStatus.Success;
        state.data = action.payload.user;
      })
      .addMatcher(
        (action) =>
          action.type.endsWith('/checkUserAuth/pending') ||
          action.type.endsWith('/logUser/pending') ||
          action.type.endsWith('/logoutUser/pending') ||
          action.type.endsWith('/registerUser/pending') ||
          action.type.endsWith('/updateUser/pending'),
        (state) => {
          state.requestStatus = RequestStatus.Loading;
        }
      )
      .addMatcher(
        (action) =>
          action.type.endsWith('/checkUserAuth/rejected') ||
          action.type.endsWith('/logUser/rejected') ||
          action.type.endsWith('/logoutUser/rejected') ||
          action.type.endsWith('/registerUser/rejected') ||
          action.type.endsWith('/updateUser/rejected'),

        (state) => {
          state.requestStatus = RequestStatus.Failed;
        }
      );
  }
});

export const { authCheck, userLogout } = userSlice.actions;
export const { getUser, getIsAuthCheched } = userSlice.selectors;
export const userSelectors = userSlice.selectors;

export default userSlice;
