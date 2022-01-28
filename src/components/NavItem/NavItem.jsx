import React from 'react';
import PropTypes from 'prop-types';
import navItemStyles from './navItem.module.css';

const NavItem = ({ text, children, className }) => {
  return (
    <li className={navItemStyles.list_item}>
      {children}
      <p className={`${className} ${navItemStyles.text}`}>{text}</p>
    </li>
  );
};

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  children: PropTypes.object,
  className: PropTypes.string,
};

export default NavItem;
