import React, { useState } from 'react';
import { Redirect, useLocation, useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import loginStyles from './login.module.css';
import { loginUser, getUserInfo } from '../../services/slices/userInfoSlice';

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();

  const error = useSelector((state) => state.user.error);
  const isLogged = useSelector((state) => state.user.isLogged);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsSubmitted(true);

    dispatch(loginUser({ email, password }))
      .then((res) => {
        return (
          res.payload.response.success && dispatch(getUserInfo(res.payload.response.accessToken))
        );
      })
      .then((res) => res.payload.success && history.replace(location?.state?.from || '/'));
  };

  if (isLogged) {
    return <Redirect to={location?.state?.from || '/'} />;
  }

  return (
    <section className={loginStyles.login}>
      <h1 className='text text_type_main-medium mb-6'>Вход</h1>
      <form className={`${loginStyles.form} mb-20`} onSubmit={submitHandler}>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChangeEmail}
          value={email || ''}
          name={'email'}
          error={false}
          errorText={'Ошибка'}
          size={'default'}
        />
        <PasswordInput onChange={handleChangePassword} value={password || ''} name={'password'} />
        <Button type='primary' size='medium'>
          Войти
        </Button>
      </form>
      {isSubmitted && error && (
        <p className={`${loginStyles.error} text text_type_main-default mb-3`}>{error}</p>
      )}
      <div className={`${loginStyles.text_box} mb-4`}>
        <p className='text text_type_main-default text_color_inactive mr-2'>
          Вы — новый пользователь?
        </p>
        <Link className={loginStyles.link} to='/register'>
          Зарегистрироваться
        </Link>
      </div>
      <div className={loginStyles.text_box}>
        <p className='text text_type_main-default text_color_inactive mr-2'>Забыли пароль?</p>
        <Link className={loginStyles.link} to='/forgot-password'>
          Восстановить пароль
        </Link>
      </div>
    </section>
  );
};

export default Login;
