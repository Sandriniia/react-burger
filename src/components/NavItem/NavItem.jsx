import React from 'react';
import PropTypes from 'prop-types';
import navItemStyles from './navItem.module.css';

const NavItem = ({ text, children, className }) => {
  return (
    <li className={navItemStyles.list_item}>
      {children}
      <p className={`${navItemStyles.text} ${className}`}>{text}</p>
    </li>
  );
};

NavItem.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default NavItem;
