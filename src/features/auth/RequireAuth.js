import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setectCurrentToken } from './authSlice';

function RequireAuth() {
  const token = useSelector(setectCurrentToken);
  const location = useLocation();

  return (
    token ? <Outlet />
      : <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default RequireAuth;
