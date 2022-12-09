import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from './authSlice';

function RequireAuth() {
  const token = useSelector(selectCurrentUser);
  const location = useLocation();

  return (
    token ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
