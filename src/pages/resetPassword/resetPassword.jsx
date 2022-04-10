import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import resetStyles from './resetPassword.module.css';
import { resetUserPassword } from '../../services/slices/userInfoSlice';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const message = useSelector((state) => state.user.message);
  const error = useSelector((state) => state.user.error);

  const [password, setPassword] = useState('');
  const [key, setKey] = useState('');

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const changeKeyHandler = (event) => {
    setKey(event.target.value);
  };

  const clearInputs = () => {
    setPassword('');
    setKey('');
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    dispatch(resetUserPassword({ password, key })).then(
      (res) => res.payload.success && clearInputs(),
    );
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
      {isSubmitted && error && (
        <p className={`${resetStyles.error} text text_type_main-default mb-3`}>{error}</p>
      )}
      {isSubmitted && message && (
        <p className={`${resetStyles.message} text text_type_main-default mb-3`}>{message}</p>
      )}
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
