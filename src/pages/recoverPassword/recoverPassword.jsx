import React from 'react';
import { Link } from 'react-router-dom';
import recoverStyles from './recoverPassword.module.css';

const RecoverPassword = () => {
  const recoverPasswordHandler = () => {
    //запрос на поиск пользователя с введенным email
    //POST запрос к эндпоинту https://norma.nomoreparties.space/api/password-reset.
    //тело: {"email": ""}
    //Тело успешного ответа:{"success": true, "message": "Reset email sent"}
    //В случае успеха пользователь направляется на маршрут /reset-password,
    //а на введённую почту приходит инструкция с кодом для восстановления пароля.
  };
  return (
    <section>
      <h1>Восстановление пароля</h1>
      <button onClick={recoverPasswordHandler}>Восстановить</button>
      <Link to='/login'>Войти</Link>
    </section>
  );
};

export default RecoverPassword;
