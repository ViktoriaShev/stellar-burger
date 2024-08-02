import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { TLogin } from '@utils-types';
import { AppDispatch } from 'src/services/store';
import { useDispatch } from 'react-redux';
import { checkUserAuth, logUser } from '../../services/thunks/user';
import { authCheck } from '../../services/slices/user/user';

export const Login: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  const handleLogin = (userData: TLogin) => {
    dispatch(logUser(userData)).then(() => {
      dispatch(checkUserAuth()).finally(() => dispatch(authCheck()));
    });
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
