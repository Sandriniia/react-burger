import React from 'react';
import appHeaderStyles from './appHeader.module.css';
import { ProfileIcon, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Navigation from '../Navigation/Navigation';
import NavItem from '../NavItem/NavItem';

const AppHeader = () => {
  return (
    <header className={`${appHeaderStyles.header} pb-4 pt-4 mb-10`}>
      <Navigation className={appHeaderStyles.nav_item} />
      <Logo />
      <NavItem className={appHeaderStyles.nav_item_profile} text='Личный кабинет' path='/profile'>
        <ProfileIcon type='secondary' />
      </NavItem>
    </header>
  );
};

export default AppHeader;
