import userSlice, { authCheck, userLogout } from './user';
import {
  checkUserAuth,
  logUser,
  registerUser,
  logoutUser,
  updateUser
} from '../../thunks/user';
import { RequestStatus, TUser } from '../../../utils/types';

describe('userSlice reducer', () => {
  const initialState = {
    isAuthChecked: false,
    data: null,
    requestStatus: RequestStatus.Idle
  };
  const loginData = {
    email: '123',
    password: '123'
  };
  const userData = {
    email: '123',
    password: '123',
    name: 'Oleg'
  };
  const registerData = {
    email: '123',
    password: '123',
    name: 'Oleg'
  };
  const updateData = {
    email: '123',
    password: '123',
    name: 'Vika'
  };
  it('should handle authCheck', () => {
    const newState = userSlice.reducer(initialState, authCheck());
    expect(newState.isAuthChecked).toEqual(true);
  });

  it('should handle userLogout', () => {
    const stateWithUserData = {
      ...initialState,
      data: {
        email: '123',
        password: '123',
        name: 'Oleg'
      }
    };
    const newState = userSlice.reducer(stateWithUserData, userLogout());
    expect(newState.data).toBeNull();
  });

  it('should handle checkUserAuth.fulfilled', () => {
    const requestData = {
      user: {
        email: '123',
        password: '123',
        name: 'Oleg'
      },
      success: true
    };
    const newState = userSlice.reducer(
      initialState,
      checkUserAuth.fulfilled(requestData, 'requestId')
    );
    expect(newState.data).toEqual(requestData.user);
    expect(newState.requestStatus).toEqual(RequestStatus.Success);
  });

  it('should handle logoutUser.fulfilled', () => {
    const newState = userSlice.reducer(
      { ...initialState, data: userData },
      logoutUser.fulfilled(undefined, 'requestId', undefined)
    );
    expect(newState.data).toBeNull();
    expect(newState.requestStatus).toEqual(RequestStatus.Success);
  });

  it('should handle logUser.fulfilled', () => {
    const newState = userSlice.reducer(
      initialState,
      logUser.fulfilled(userData, 'requestId', loginData)
    );
    expect(newState.data).toEqual(userData);
    expect(newState.requestStatus).toEqual(RequestStatus.Success);
  });

  it('should handle registerUser.fulfilled', () => {
    const authResponseData = {
      refreshToken: '',
      accessToken: '',
      user: registerData,
      success: true
    };
    const newState = userSlice.reducer(
      initialState,
      registerUser.fulfilled(authResponseData, 'requestId', registerData)
    );
    expect(newState.data).toEqual(registerData);
    expect(newState.requestStatus).toEqual(RequestStatus.Success);
  });

  it('should handle updateUser.fulfilled', () => {
    const requestData = {
      user: {
        email: '123',
        password: '123',
        name: 'Vika'
      },
      success: true
    };
    const newState = userSlice.reducer(
      { ...initialState, data: userData },
      updateUser.fulfilled(requestData, '', userData)
    );
    expect(newState.data).toEqual(updateData);
    expect(newState.requestStatus).toEqual(RequestStatus.Success);
  });

  it('should handle pending actions', () => {
    const pendingActionTypes = [
      checkUserAuth.pending('requestId'),
      logUser.pending('requestId', loginData),
      registerUser.pending('requestId', registerData),
      logoutUser.pending('requestId'),
      updateUser.pending('requestId', updateData)
    ];
    pendingActionTypes.forEach((action) => {
      const newState = userSlice.reducer(initialState, action);
      expect(newState.requestStatus).toEqual(RequestStatus.Loading);
    });
  });

  it('should handle rejected actions', () => {
    const loginData = {
      email: '123',
      password: '123'
    };
    const rejectedActionTypes = [
      checkUserAuth.rejected(new Error('error'), 'requestId'),
      logUser.rejected(new Error('error'), 'requestId', loginData),
      registerUser.rejected(new Error('error'), 'requestId', registerData),
      logoutUser.rejected(new Error('error'), 'requestId'),
      updateUser.rejected(new Error('error'), 'requestId', updateData)
    ];
    rejectedActionTypes.forEach((action) => {
      const newState = userSlice.reducer(initialState, action);
      expect(newState.requestStatus).toEqual(RequestStatus.Failed);
    });
  });
});
