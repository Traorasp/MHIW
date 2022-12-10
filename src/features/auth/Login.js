import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from './authSlice';
import { useLoginMutation } from './authApiSlice';

function Login() {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigte = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(setCredentials(...userData, user));
      setUser('');
      setPassword('');
      navigte('/profile');
    } catch (err) {
      if (!err?.status) {
        setErrMsg('No server response');
      } else if (err.status === 400) {
        setErrMsg('Incorrect username or password');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="bg-gray-100">
      <p ref={errRef} className={errMsg ? 'errmsg' : 'hidden'}>{errMsg}</p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col border border-gray-800 space-y-2">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            ref={userRef}
            value={user}
            onChange={handleUserInput}
            autoComplete="off"
            required
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordInput}
            autoComplete="off"
            required
          />
        </label>
        <button onSubmit={handleSubmit} type="submit">Sign In</button>
      </form>
    </section>
  );

  return content;
}

export default Login;
