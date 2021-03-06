import React from 'react';
import PropTypes from 'prop-types';
import navigationStyles from './navigation.module.css';
import NavItem from '../NavItem/NavItem';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Navigation = ({ className }) => {
  return (
    <nav className={navigationStyles.nav}>
      <ul className={navigationStyles.list}>
        <NavItem text='Конструктор' className={className} path="/">
          <BurgerIcon type='primary' />
        </NavItem>
        <NavItem className={navigationStyles.nav_item} text='Лента заказов' path="/feed">
          <ListIcon type='secondary' />
        </NavItem>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
};

export default Navigation;

