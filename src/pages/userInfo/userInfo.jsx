import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import userInfoStyles from './userInfo.module.css';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import Profile from '../profile/profile';
import OrdersHistory from '../ordersHistory/ordersHistory';
import OrderFeedDetails from '../orderFeedDetails/orderFeedDetails';

const UserInfo = () => {
  const location = useLocation();

  const background = location.state && location.state.background;

  return (
    <section className={`${userInfoStyles.user_info} pl-5`}>
      <ProfileNavBar />
      <Switch location={background || location}>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='/profile/orders' exact>
          <OrdersHistory />
        </Route>
        <Route path='/profile/orders/:id' exact>
          <OrderFeedDetails />
        </Route>
      </Switch>
    </section>
  );
};

export default UserInfo;
