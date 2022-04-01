import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import resetStyles from './resetPassword.module.css';
import { resetUserPassword } from '../../services/slices/userInfoSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();

  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const changeKeyHandler = (event) => {
    setKey(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(resetUserPassword({ password, key }));
  };

  return (
    <section>
      <h1>Восстановление пароля</h1>
      <form onSubmit={submitHandler}>
        <input
          id='password'
          name='password'
          type='password'
          required
          value={password || ''}
          onChange={changePasswordHandler}
        />
        <input
          id='key'
          name='key'
          type='text'
          required
          value={key || ''}
          onChange={changeKeyHandler}
        />
        <button type='submit'>Сохранить</button>
      </form>
      <Link to='/login'>Войти</Link>
    </section>
  );
};

export default ResetPassword;
