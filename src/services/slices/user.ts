import { RequestStatus, TUser } from '../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import {
  checkUserAuth,
  logUser,
  registerUser,
  logoutUser,
  updateUser
} from '../thunks/user';

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
          [
            checkUserAuth.rejected,
            logUser.rejected,
            logoutUser.rejected,
            registerUser.rejected,
            updateUser.rejected
          ].includes(action.type),

        (state) => {
          state.requestStatus = RequestStatus.Failed;
        }
      )
      .addMatcher(
        (action) =>
          [
            checkUserAuth.pending,
            logUser.pending,
            logoutUser.pending,
            registerUser.pending,
            updateUser.pending
          ].includes(action.type),

        (state) => {
          state.requestStatus = RequestStatus.Loading;
        }
      );
  }
});

export const { authCheck, userLogout } = userSlice.actions;
export const { getUser, getIsAuthCheched } = userSlice.selectors;
export const userSelectors = userSlice.selectors;

export default userSlice.reducer;
