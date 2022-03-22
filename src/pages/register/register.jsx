import React from 'react';
import { Link } from 'react-router-dom';
import registerStyles from './register.module.css';

const Register = () => {
  const registerHandler = () => {
    //Создание нового пользователя. POST-запрос к эндпоинту: https://norma.nomoreparties.space/api/auth/register.
    //Пример тела запроса: {"email": "test-data@yandex.ru", "password": "password","name": "Username"}
  }

  return (
    <section>
      <h1>Регистрация</h1>
      <button onClick={registerHandler}>Зарегистрироваться</button>
      <Link to="/login">Войти</Link>
    </section>
  )
}

export default Register;