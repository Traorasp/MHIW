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
    e.preventDeafult();

    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(setCredentials(...userData, user));
      setUser('');
      setPassword('');
      navigte('/home');
    } catch (err) {
      if (!err?.originalStatus) {
        setErrMsg('No server response');
      } else if (!err.originalStatus === 400) {
        setErrMsg('Missing username or password');
      } else if (!err.originalStatus === 401) {
        setErrMsg('unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <section>
      <p ref={errRef} className={errMsg ? 'errmsg' : 'hidden'}>{errMsg}</p>
      <h1>Login</h1>
      <form onSubmit={handleSubmit()}>
        <label htmlFor="username">Username:</label>
        <input
          type={text}
          id="username"
          ref={userRef}
          value={user}
          onChange={handleUserInput}
          autoComplete="off"
          required
        />
        <label htmlFor="password">Username:</label>
        <input
          type={text}
          id="password"
          ref={userRef}
          value={user}
          onChange={handlePasswordInput}
          autoComplete="off"
          required
        />
      </form>
    </section>
  );

  return (
    <div>Login</div>
  );
}

export default Login;
