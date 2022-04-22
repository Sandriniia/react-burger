import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import profileStyles from './profile.module.css';
import { getUserInfo, changeUserInfo, refreshUserToken } from '../../services/slices/userInfoSlice';
import { getRefreshToken, getToken } from '../../utils/functions';

const Profile = () => {
  const dispatch = useDispatch();

  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const tokenError = useSelector((state) => state.user.tokenError);
  const accessToken = useSelector((state) => state.user.token);

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');
  const [visibleButtons, setVisibleButtons] = useState(false);

  useEffect(() => {
    setName(userName);
    setEmail(userEmail);
  }, [userName, userEmail]);

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

  useEffect(() => {
    tokenError &&
      dispatch(refreshUserToken());
  }, [tokenError, dispatch]);

  useEffect(() => {
    const token = getToken();

    dispatch(changeUserInfo({ token, name, email, password })).then(
      (res) => res.payload.success && dispatch(getUserInfo(token)),
    );
  },[accessToken, dispatch])

  const submitHandler = async (event) => {
    event.preventDefault();

    const token = getToken();

    token &&
      dispatch(changeUserInfo({ token, name, email, password })).then(
        (res) => res.payload.success && dispatch(getUserInfo(token)),
      );
    setVisibleButtons(false);
  };

  const cancelEditHandler = (event) => {
    event.preventDefault();

    setName(userName);
    setEmail(userEmail);
  };

  const onInputFocusHandler = () => {
    setVisibleButtons(true);
  };

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
          onFocus={onInputFocusHandler}
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
          onFocus={onInputFocusHandler}
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
          onFocus={onInputFocusHandler}
        />
        {visibleButtons && (
          <div className={profileStyles.buttons_box}>
            <Button type='secondary' size='medium' onClick={submitHandler}>
              Сохранить
            </Button>
            <Button type='secondary' size='medium' onClick={cancelEditHandler}>
              Отмена
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};

export default Profile;
