import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import { getUserInfo, changeUserInfo } from '../../services/slices/userInfoSlice';
import { refreshUserToken } from '../../services/slices/userInfoSlice';

const Profile = () => {
  const dispatch = useDispatch();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const userPassword = useSelector((state) => state.user.password);

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState(userPassword);

  const changeNameHandler = (event) => {
    setName(event.target.value);
  };
  const changeEmailHandler = (event) => {
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onIconClick = (ref) => {
    ref.current.focus();
  };

  const submitHandler = useCallback(() => {
   const refToken = localStorage.getItem('refreshToken');
    if (!refToken || refToken === '') {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token || token === '') {
      dispatch(refreshUserToken(refToken)).then((res) => {
        const token = res.payload.accessToken;
        res.payload.success && dispatch(changeUserInfo({ token, name, email, password }));
      });
    }
    token &&
      dispatch(changeUserInfo({ token, name, email, password })).then((res) => {
        res.payload.success && dispatch(getUserInfo(token));
      });
  }, [dispatch, email, name, password]);

  useEffect(() => {
    const onKeyDown = e => {
        if(e.keyCode === 13) {
          submitHandler();
        }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
        document.removeEventListener('keydown', onKeyDown);
    };
}, [submitHandler]);

  return (
    <section className={profileStyles.profile}>
      <form className={profileStyles.form} onSubmit={submitHandler}>
        <Input
          type={'text'}
          placeholder={'Имя'}
          onChange={changeNameHandler}
          icon={'EditIcon'}
          value={name || ''}
          name={'name'}
          error={false}
          onIconClick={() => onIconClick(nameInputRef)}
          errorText={'Ошибка'}
          size={'default'}
          ref={nameInputRef}
        />
        <Input
          type={'email'}
          placeholder={'Логин'}
          onChange={changeEmailHandler}
          icon={'EditIcon'}
          value={email || ''}
          name={'email'}
          error={false}
          onIconClick={() => onIconClick(emailInputRef)}
          errorText={'Ошибка'}
          size={'default'}
          ref={emailInputRef}
        />
        <Input
          type={'password'}
          placeholder={'Пароль'}
          onChange={changePasswordHandler}
          icon={'EditIcon'}
          value={password || ''}
          name={'password'}
          error={false}
          onIconClick={() => onIconClick(passwordInputRef)}
          errorText={'Ошибка'}
          size={'default'}
          ref={passwordInputRef}
        />
      </form>
    </section>
  );
};

export default Profile;
