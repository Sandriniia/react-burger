import React, { useState, useRef, useEffect, FC } from 'react';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import MoonLoader from 'react-spinners/ClipLoader';
import profileStyles from './profile.module.css';
import { getUserInfo, changeUserInfo, refreshUserToken } from '../../services/slices/userInfoSlice';
import { getCookie } from '../../utils/cookies';
import { loaderStyles } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../services/types/hooks';

const Profile: FC = () => {
  const dispatch = useAppDispatch();

  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  type TRef = typeof nameInputRef | typeof emailInputRef | typeof passwordInputRef;

  const userName = useAppSelector((state) => state.user.name);
  const userEmail = useAppSelector((state) => state.user.email);
  const tokenError = useAppSelector((state) => state.user.tokenError);
  const accessToken = useAppSelector((state) => state.user.token);
  const loading = useAppSelector((state) => state.user.loading);

  const [name, setName] = useState(userName);
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState('');
  const [visibleButtons, setVisibleButtons] = useState(false);

  useEffect(() => {
    setName(userName);
    setEmail(userEmail);
  }, [userName, userEmail]);

  const changeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const changeEmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const changePasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onIconClick = (ref: TRef) => {
    ref?.current?.focus();
  };

  useEffect(() => {
    tokenError && dispatch(refreshUserToken());
  }, [tokenError, dispatch]);

  useEffect(() => {
    const token = getCookie('token');

    dispatch(changeUserInfo({ token, name, email, password })).then(
      (res) => token && res.payload.success && dispatch(getUserInfo(token)),
    );
  }, [accessToken, dispatch]);

  const submitHandler = async (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();

    const token = getCookie('token');

    token &&
      dispatch(changeUserInfo({ token, name, email, password })).then(
        (res) => res.payload.success && dispatch(getUserInfo(token)),
      );
    setVisibleButtons(false);
  };

  const cancelEditHandler = (event: React.SyntheticEvent<Element, Event>) => {
    event.preventDefault();

    setName(userName);
    setEmail(userEmail);
  };

  const onInputFocusHandler = () => {
    setVisibleButtons(true);
  };

  if (loading) {
    return <MoonLoader color={'#fff'} size={100} css={loaderStyles} />;
  }

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
