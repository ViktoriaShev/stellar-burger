import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { AppDispatch } from 'src/services/store';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../services/thunks/user';
import { deleteCookie } from '../../utils/cookie';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('refreshToken');
    deleteCookie('accessToken');
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
