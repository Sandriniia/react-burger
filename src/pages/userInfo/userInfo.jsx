import React from 'react';
import { Route } from 'react-router-dom';
import userInfoStyles from './userInfo.module.css';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import Profile from '../profile/profile';
import Orders from '../orders/orders';

const UserInfo = () => {
  return (
    <section className={`${userInfoStyles.user_info} pl-5`}>
      <ProfileNavBar />
      <Route path='/profile' exact={true}>
        <Profile />
      </Route>
      <Route path='/profile/orders'>
        <Orders />
      </Route>
    </section>
  );
};

export default UserInfo;
