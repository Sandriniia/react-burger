import React, { FC } from 'react';
import navigationStyles from './navigation.module.css';
import NavItem from '../NavItem/NavItem';
import { BurgerIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type TNavigation = {
  className?: string;
};

const Navigation: FC<TNavigation> = ({ className }) => {
  return (
    <nav className={navigationStyles.nav}>
      <ul className={navigationStyles.list}>
        <NavItem text='Конструктор' className={className} path='/'>
          <BurgerIcon type='primary' />
        </NavItem>
        <NavItem className={navigationStyles.nav_item} text='Лента заказов' path='/feed'>
          <ListIcon type='secondary' />
        </NavItem>
      </ul>
    </nav>
  );
};

export default Navigation;
