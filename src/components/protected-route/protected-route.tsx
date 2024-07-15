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
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    const backgroundLocation = location.state?.from?.background || null;
    return <Navigate replace to={from} state={{ backgroundLocation }} />;
  }
  if (!onlyUnAuth && !user) {
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
