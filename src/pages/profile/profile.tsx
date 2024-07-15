import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { TUser } from '@utils-types';
import { updateUser } from '../../services/thunks/user';
import { AppDispatch } from 'src/services/store';
import { useDispatch } from 'react-redux';

interface UserData {
  userState: TUser | null;
}

const initialData: TUser = {
  name: '',
  email: '',
  password: ''
};
export const Profile: FC<UserData> = ({ userState }) => {
  const dispatch: AppDispatch = useDispatch();
  const user = userState ? userState : initialData;

  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: user.password
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: user.password
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
