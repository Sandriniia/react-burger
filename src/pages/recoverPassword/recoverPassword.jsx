import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import recoverStyles from './recoverPassword.module.css';
import { recoverUserPassword } from '../../services/slices/userInfoSlice';

const RecoverPassword = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState();

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(recoverUserPassword(email)).then((res) => {
      res.payload.success && history.push('/reset-password');
    });
  };
  return (
    <section>
      <h1>Восстановление пароля</h1>
      <form onSubmit={submitHandler}>
        <input
          id='email'
          name='email'
          type='email'
          required
          value={email || ''}
          onChange={handleChange}
        />
        <button type='submit'>Восстановить</button>
      </form>
      <Link to='/login'>Войти</Link>
    </section>
  );
};

export default RecoverPassword;
