import React from 'react';
import { Link } from 'react-router-dom';
import resetStyles from './resetPassword.module.css';

const ResetPassword = () => {

  const saveNewPasswordHandler = () => {
    //происходит POST-запрос к эндпоинту https://norma.nomoreparties.space/api/password-reset/reset.
    //тело запроса: {"password": "", "token": ""}
    //Тело успешного ответа: {"success": true, "message": "Password successfully reset"}
  }

  return (
    <section>
      <h1>Восстановление пароля</h1>
      <button onClick={saveNewPasswordHandler}>Сохранить</button>
      <Link to="/login">Войти</Link>
    </section>
  )
}

export default ResetPassword;