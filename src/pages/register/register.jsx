import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import registerStyles from './register.module.css';
import { userActions } from '../../services/slices/userInfoSlice';
import { registerUser } from '../../services/slices/userInfoSlice';

const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const info = {email, password, name}
    dispatch(registerUser(info));
  };

  return (
    <section>
      <h1>Регистрация</h1>
      <form onSubmit={submitHandler}>
        <input
          id='name'
          name='name'
          type='text'
          required
          value={name || ''}
          onChange={handleChangeName}
        />
        <input
          id='email'
          name='email'
          type='email'
          required
          value={email || ''}
          onChange={handleEmailChange}
        />
        <input
          id='password'
          name='password'
          type='password'
          required
          value={password || ''}
          onChange={handlePasswordChange}
        />
        <button type='submit'>Зарегистрироваться</button>
      </form>
      <Link to='/login'>Войти</Link>
    </section>
  );
};

export default Register;
