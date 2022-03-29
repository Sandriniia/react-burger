import React from 'react';
import { NavLink } from 'react-router-dom';
import profileNavBarStyles from './profileNavBar.module.css';

const ProfileNavBar = () => {
  return (
    <nav>
      <NavLink activeClassName={profileNavBarStyles.active} to='/profile'>
        Профиль
      </NavLink>
      <NavLink activeClassName={profileNavBarStyles.active} to='/profile/orders'>
        История заказов
      </NavLink>
      <NavLink activeClassName={profileNavBarStyles.active} to='/'>
        Выход
      </NavLink>
    </nav>
  );
};

export default ProfileNavBar;
