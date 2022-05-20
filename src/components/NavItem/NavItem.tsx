import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import navItemStyles from './navItem.module.css';

type TNavItem = {
  text: string;
  className?: string;
  path: string;
};

const NavItem: FC<TNavItem> = ({ text, children, className, path }) => {
  return (
    <li className={`${navItemStyles.list_item} pl-5 pr-5`}>
      {children}
      <Link to={path} className={`${className} text text_type_main-default ml-2`}>
        {text}
      </Link>
    </li>
  );
};

export default NavItem;
