import React, { useState, FC } from 'react';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation, Redirect } from 'react-router-dom';
import registerStyles from './register.module.css';
import { registerUser } from '../../services/slices/userInfoSlice';
import { useAppDispatch, useAppSelector } from '../../services/types/hooks';
import { TLocation } from '../../services/types/types';

const Register: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation<TLocation>();

  const error = useAppSelector((state) => state.user.error);
  const message = useAppSelector((state) => state.user.message);
  const isLogged = useAppSelector((state) => state.user.isLogged);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const clearInputs = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);

    dispatch(registerUser({ email, password, name })).then(
      (res) => res.payload.success && clearInputs(),
    );
  };

  if (isLogged) {
    return <Redirect to={location?.state?.from || '/'} />;
  }

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
      {isSubmitted && error && (
        <p className={`${registerStyles.error} text text_type_main-default mb-3`}>{error}</p>
      )}
      {isSubmitted && message && (
        <p className={`${registerStyles.message} text text_type_main-default mb-3`}>{message}</p>
      )}
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
