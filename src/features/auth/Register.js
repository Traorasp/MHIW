/* eslint-disable react/no-array-index-key */
import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useRegisterMutation } from './authApiSlice';
import { setCredentials, selectCurrentUser } from './authSlice';

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState([]);
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);
  const [register, { isLoading }] = useRegisterMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await register({ username, password }).unwrap();
      dispatch(setCredentials(userData));
      setUser('');
      setPassword('');
      navigate('/profile');
    } catch (err) {
      if (!err?.status) {
        setErrMsg(['No server response']);
      } else if (err.status === 400) {
        const msg = [];
        if (err.data.errors) {
          err.data.errors.forEach((error) => msg.push(error.msg));
        } else {
          msg.push('Username is already taken');
        }
        setErrMsg(msg);
      } else if (err.status === 404 || err.status === 500) {
        setErrMsg(['Internal server error try again']);
      } else {
        setErrMsg(['Registration Failed']);
      }
      errRef.current.focus();
    }
  };

  const handleUserInput = (e) => setUser(e.target.value);

  const handlePasswordInput = (e) => setPassword(e.target.value);

  const content = isLoading ? <h1>Loading...</h1> : (
    <section className="bg-gray-100">

      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="flex flex-col border border-gray-800 space-y-2">
        <label htmlFor="username">
          Username:
          <input
            type="text"
            id="username"
            ref={userRef}
            value={username}
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
        <button onSubmit={handleSubmit} type="submit">Register</button>
      </form>
      <ul ref={errRef} className={errMsg ? 'errmsg' : 'hidden'}>
        {Array.from(errMsg).map((error, i) => (<li key={i}>{error}</li>))}
      </ul>
    </section>
  );

  return content;
};

export default Register;
