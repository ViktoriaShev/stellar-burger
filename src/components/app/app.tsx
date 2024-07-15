import '../../index.css';

import styles from './app.module.css';
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Location
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProtectedRoute from '../protected-route/protected-route';
import { useEffect } from 'react';

import {
  NotFound404,
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';

import { AppHeader, Modal, IngredientDetails, OrderInfo } from '@components';

import { getIngredientsFromServer } from '../../services/thunks/ingredients';
import { checkUserAuth, registerUser } from '../../services/thunks/user';

import { AppDispatch } from '../../services/store';

import { authCheck, getUser } from '../../services/slices/user';

import { TUser } from '@utils-types';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location: Location<{ background: Location }> = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.background;
  const user = useSelector(getUser);

  useEffect(() => {
    dispatch(getIngredientsFromServer());
    dispatch(checkUserAuth()).finally(() => dispatch(authCheck()));
  }, [dispatch, authCheck]);

  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader name={user?.name || ''} />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/feed/:number'
          element={
            <Modal onClose={onClose} title=''>
              <OrderInfo />
            </Modal>
          }
        />
        <Route
          path='/ingredients/:id'
          element={
            <Modal onClose={onClose} title='Детали ингредиента'>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <Modal onClose={onClose} title=''>
                <OrderInfo />
              </Modal>
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile userState={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={onClose} title='Детали ингредиента'>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal onClose={onClose} title=''>
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRoute>
                <Modal onClose={onClose} title=''>
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
