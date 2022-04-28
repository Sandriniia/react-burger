import React, { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import userInfoStyles from './userInfo.module.css';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import Profile from '../profile/profile';
import OrdersHistory from '../ordersHistory/ordersHistory';
import OrderFeedDetails from '../orderFeedDetails/orderFeedDetails';
import { start, closed } from '../../services/slices/webSocketSlice';
import { getCookie } from '../../utils/cookies';
import { wsUrl } from '../../utils/constants';

const UserInfo = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const background = location.state && location.state.background;

  const data = useSelector((state) => state.socket.data);

  useEffect(() => {
    dispatch(start({ url: `${wsUrl}/orders`, token: getCookie('token').slice(7) }));
    return () => dispatch(closed());
  }, [dispatch]);

  return (
    <section className={`${userInfoStyles.user_info} pl-5`}>
      <ProfileNavBar />
      <Switch location={background || location}>
        <Route path='/profile' exact>
          <Profile />
        </Route>
        <Route path='/profile/orders' exact>
          <OrdersHistory orders={data.orders} />
        </Route>
        <Route path='/profile/orders/:id' exact>
          <OrderFeedDetails orders={data.orders} />
        </Route>
      </Switch>
    </section>
  );
};

export default UserInfo;
