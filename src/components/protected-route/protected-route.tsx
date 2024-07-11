import { useSelector } from 'react-redux';
import { userSelectors } from '../../services/slices/user';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactNode;
};

function ProtectedRoute({ children, onlyUnAuth = false }: ProtectedRouteProps) {
  const location = useLocation();
  const { getIsAuthCheched, getUser } = userSelectors;
  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthCheched);

  if (!isAuthChecked) {
    console.log('Wait user checkout');
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    console.log('Navigate to page', location);
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.background || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }
  if (!onlyUnAuth && !user) {
    console.log('Navigate from page to login', location);
    return (
      <Navigate
        replace
        to={'/login'}
        state={{
          from: {
            ...location,
            backgroundLocation: location.state?.backgroundLocation
          }
        }}
      />
    );
  }
  return children;
}
export default ProtectedRoute;
