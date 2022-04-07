import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import registerStyles from './register.module.css';
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
    const info = { email, password, name };
    dispatch(registerUser(info));
  };

  return (
    <section className={registerStyles.register}>
      <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
      <form className={`${registerStyles.form} mb-20`} onSubmit={submitHandler}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChangeName}
          value={name || ''}
          name={'name'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleEmailChange}
          value={email || ''}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput onChange={handlePasswordChange} value={password || ''} name={'password'} />
        <Button type='primary' size='medium'>
          Зарегистрироваться
        </Button>
      </form>
      <div className={registerStyles.text_box}>
        <p className='text text_type_main-default text_color_inactive mr-2'>
          Уже зарегистрированы?
        </p>
        <Link className={registerStyles.link} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  );
};

export default Register;
