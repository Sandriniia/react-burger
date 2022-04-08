import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
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
    <section className={resetStyles.reset}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <form className={`${resetStyles.form} mb-20`} onSubmit={submitHandler}>
        <PasswordInput
          onChange={changePasswordHandler}
          placeholder={'Введите новый пароль'}
          value={password || ''}
          name={'password'}
        />
        <Input
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={changeKeyHandler}
          value={key || ''}
          name={'key'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type='primary' size='medium'>
          Сохранить
        </Button>
      </form>
      <div className={resetStyles.text_box}>
        <p className='text text_type_main-default text_color_inactive mr-2'>Вспомнили пароль?</p>
        <Link className={resetStyles.link} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  );
};

export default ResetPassword;
