import React from 'react';
import headerStyles from './header.module.css';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Navigation from '../Navigation/Navigation';
import logo from '../../images/logo.png';
import NavItem from '../NavItem/NavItem';

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <Navigation className={headerStyles.nav_item} />
      <img src={logo} alt='Stellar Burgers' className={headerStyles.logo} />
      <NavItem text='Личный кабинет' className={headerStyles.nav_item}>
        <ProfileIcon type='secondary' />
      </NavItem>
    </header>
  );
};

export default Header;
<div></div>;
