import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import profileStyles from './profile.module.css';
import { getUserInfo, changeUserInfo } from '../../services/slices/userInfoSlice';

const Profile = () => {
  const dispatch = useDispatch();

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

  const submitHandler = (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    if (!token || token === '') {
      return;
    }
    console.log(name);
    dispatch(changeUserInfo({ token, name, email, password })).then((res) => {
      res.payload.success && dispatch(getUserInfo(token));
    });
  };

  return (
    <section>
      <h1>Профиль</h1>
      <form onSubmit={submitHandler}>
        <input id='name' name='name' type='text' value={name || ''} onChange={changeNameHandler} />
        <button type='submit'></button>
        <input
          id='email'
          name='email'
          type='email'
          value={email || ''}
          onChange={changeEmailHandler}
        />
        <button type='submit'></button>
        <input
          id='password'
          name='password'
          type='password'
          value={password || ''}
          onChange={changePasswordHandler}
        />
        <button type='submit'></button>
      </form>
    </section>
  );
};

export default Profile;
