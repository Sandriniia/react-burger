import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import profileNavBarStyles from './profileNavBar.module.css';
import { logoutUser } from '../../services/slices/userInfoSlice';

const ProfileNavBar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const refToken = localStorage.getItem('refreshToken');
    if (!refToken || refToken === '') {
      return;
    }
    dispatch(logoutUser(refToken));
  }

  return (
    <nav>
      <NavLink activeClassName={profileNavBarStyles.active} to='/profile'>
        Профиль
      </NavLink>
      <NavLink activeClassName={profileNavBarStyles.active} to='/profile/orders'>
        История заказов
      </NavLink>
      <NavLink onClick={logoutHandler} activeClassName={profileNavBarStyles.active} to='/'>
        Выход
      </NavLink>
    </nav>
  );
};

export default ProfileNavBar;
