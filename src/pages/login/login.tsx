import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';

interface LoginInterface {
  onLogin: (TUser: { email: string; password: string }) => void;
}
export const Login: FC<LoginInterface> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onLogin({ email, password });
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
