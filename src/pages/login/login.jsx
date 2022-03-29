import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import loginStyles from './login.module.css';
import { loginUser } from '../../services/slices/userInfoSlice';

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={submitHandler}>
        <input
          id='email'
          name='email'
          value={email || ''}
          type='email'
          required
          onChange={handleChangeEmail}
        />
        <input
          id='password'
          name='password'
          value={password || ''}
          type='password'
          required
          onChange={handleChangePassword}
        />
        <button type='submit'>Войти</button>
      </form>
      <Link to='/register'>Зарегистрироваться</Link>
      <Link to='/forgot-password'>Восстановить пароль</Link>
    </section>
  );
};

export default Login;
