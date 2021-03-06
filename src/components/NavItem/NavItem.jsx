import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import navItemStyles from './navItem.module.css';

const NavItem = ({ text, children, className, path }) => {
  return (
    <li className={`${navItemStyles.list_item} pl-5 pr-5`}>
      {children}
      <Link to={path} className={`${className} text text_type_main-default ml-2`}>
        {text}
      </Link>
    </li>
  );
};

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.object,
  className: PropTypes.string,
};

export default NavItem;
