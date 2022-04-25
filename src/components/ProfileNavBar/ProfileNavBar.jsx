import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import profileNavBarStyles from './profileNavBar.module.css';
import { logoutUser } from '../../services/slices/userInfoSlice';
import { getRefreshToken } from '../../utils/functions';

const ProfileNavBar = () => {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    const refToken = getRefreshToken();
    refToken && dispatch(logoutUser(refToken));
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
