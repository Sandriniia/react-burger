import React from 'react';
import appHeaderStyles from './appHeader.module.css';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png';
import NavItem from '../NavItem/NavItem';

const AppHeader = () => {
  return (
    <header className={appHeaderStyles.header}>
      <Navigation className={appHeaderStyles.nav_item} />
      <img src={logo} alt='Stellar Burgers' className={appHeaderStyles.logo} />
      <NavItem text='Личный кабинет'>
        <ProfileIcon type='secondary' />
      </NavItem>
    </header>
  );
};

export default AppHeader;
