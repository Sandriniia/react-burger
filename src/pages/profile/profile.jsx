import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import profileStyles from './profile.module.css';
import { getUserInfo } from '../../services/slices/userInfoSlice';

const Profile = () => {
  const dispatch = useDispatch();

  const isLogged = useSelector((state) => state.user.isLogged);
  const userName = useSelector((state) => state.user.name);
  const userEmail = useSelector((state) => state.user.email);
  const userPassword = useSelector((state) => state.user.password);
  console.log(isLogged);
  console.log(userPassword);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      return;
    }
    dispatch(getUserInfo(token));
  }, [dispatch]);

  return (
    <section>
      <h1>Профиль</h1>
      <form>
        <input id='name' name='name' type='text' value={userName || ''} />
        <button></button>
        <input id='email' name='email' type='email' value={userEmail || ''} />
        <button></button>
        <input id='password' name='password' type='password' value={userPassword || ''}/>
        <button></button>
      </form>
    </section>
  );
};

export default Profile;
