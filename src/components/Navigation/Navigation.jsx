import React from 'react';
import navigationStyles from './navigation.module.css';
import NavItem from '../NavItem/NavItem';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const Navigation = () => {
  return (
    <nav>
      <ul className={navigationStyles.list}>
        <NavItem text='Конструктор'>
          <BurgerIcon type='primary' />
        </NavItem>
        <NavItem text='Лента заказов'>
          <ListIcon type='secondary' />
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navigation;
