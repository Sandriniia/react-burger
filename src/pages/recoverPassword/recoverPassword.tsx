import React, { useState, FC } from 'react';
import { useHistory, useLocation, Redirect, Link } from 'react-router-dom';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import recoverStyles from './recoverPassword.module.css';
import { recoverUserPassword } from '../../services/slices/userInfoSlice';
import { useAppDispatch, useAppSelector } from '../../services/types/hooks';
import { TLocation } from '../../services/types/types';

const RecoverPassword:FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const location = useLocation<TLocation>();

  const error = useAppSelector((state) => state.user.error);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    dispatch(recoverUserPassword(email)).then((res) => {
      res.payload.success && history.push('/reset-password');
    });
  };

  if (isLogged) {
    return <Redirect to={location?.state?.from || '/'} />;
  }

  return (
    <section className={recoverStyles.recover}>
      <h1 className='text text_type_main-medium mb-6'>Восстановление пароля</h1>
      <form className={`${recoverStyles.form} mb-20`} onSubmit={submitHandler}>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
          value={email || ''}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <Button type='primary' size='medium'>
          Восстановить
        </Button>
      </form>
      {isSubmitted && error && (
        <p className={`${recoverStyles.error} text text_type_main-default mb-3`}>{error}</p>
      )}
      <div className={recoverStyles.text_box}>
        <p className='text text_type_main-default text_color_inactive mr-2'>Вспомнили пароль?</p>
        <Link className={recoverStyles.link} to='/login'>
          Войти
        </Link>
      </div>
    </section>
  );
};

export default RecoverPassword;
