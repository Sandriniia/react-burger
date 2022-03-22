import React from 'react';
import { Link } from 'react-router-dom';
import loginStyles from './login.module.css';

const Login = () => {
  return (
    <section>
      <h1>Login</h1>
      <button>Войти</button>
      <Link to='/register'>Зарегистрироваться</Link>
      <Link to='/forgot-password'>Восстановить пароль</Link>
    </section>
  );
};

export default Login;
