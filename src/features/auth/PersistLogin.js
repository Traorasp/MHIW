import { Outlet, Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRefreshMutation } from './authApiSlice';
import usePersist from '../../hooks/usePersist';
import { selectCurrentToken } from './authSlice';

function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, {
    isUninitialized,
    isLoading,
    isSuccess,
    isError,
    error,
  }] = useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };
      if (!token && persist) verifyRefreshToken();
    }
    return () => { effectRan.current = true; };
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  }
  if (isLoading) {
    content = <p>Loading...</p>;
  }
  if (isError) {
    content = (
      <p>
        {error.data?.message}
        <Link to="/login">Please login again</Link>
      </p>
    );
  }
  if ((isSuccess && trueSuccess) || (token && isUninitialized)) {
    content = <Outlet />;
  }

  return content;
}

export default PersistLogin;
