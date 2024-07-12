import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from 'react-redux';
import { TUser } from '@utils-types';
import { AppDispatch } from 'src/services/store';
import { checkUserAuth, registerUser } from '../../services/thunks/user';
import { authCheck } from '../../services/slices/user';

export const Register: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleRegister({ name, email, password });
  };

  const handleRegister = (userData: TUser) => {
    dispatch(registerUser(userData)).then(() => {
      dispatch(checkUserAuth()).finally(() => dispatch(authCheck()));
    });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
