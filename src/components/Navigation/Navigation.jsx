import React from 'react';
import PropTypes from 'prop-types';
import navigationStyles from './navigation.module.css';
import NavItem from '../NavItem/NavItem';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Navigation = ({ className }) => {
  return (
    <nav className={navigationStyles.nav}>
      <ul className={navigationStyles.list}>
        <NavItem text='Конструктор' className={className}>
          <BurgerIcon type='primary' />
        </NavItem>
        <NavItem text='Лента заказов'>
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

