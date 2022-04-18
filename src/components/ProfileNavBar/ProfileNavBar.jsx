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
    localStorage.clear();
  };

  return (
    <nav className={profileNavBarStyles.nav}>
      <NavLink
        className={`${profileNavBarStyles.nav_item} text text_type_main-medium text_color_inactive pt-2 pb-2`}
        activeClassName={profileNavBarStyles.active}
        exact
        to='/profile'
      >
        Профиль
      </NavLink>
      <NavLink
        className={`${profileNavBarStyles.nav_item} text text_type_main-medium text_color_inactive pt-2 pb-2`}
        activeClassName={profileNavBarStyles.active}
        exact
        to='/profile/orders'
      >
        История заказов
      </NavLink>
      <NavLink
        className={`${profileNavBarStyles.nav_item} text text_type_main-medium text_color_inactive pt-2 pb-2`}
        onClick={logoutHandler}
        activeClassName={profileNavBarStyles.active}
        exact
        to='/'
      >
        Выход
      </NavLink>
    </nav>
  );
};

export default ProfileNavBar;
