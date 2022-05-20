import React, { useEffect, FC } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import userInfoStyles from './userInfo.module.css';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import Profile from '../profile/profile';
import OrdersHistory from '../ordersHistory/ordersHistory';
import OrderFeedDetails from '../orderFeedDetails/orderFeedDetails';
import { start, closed } from '../../services/slices/webSocketSlice';
import { getCookie } from '../../utils/cookies';
import { wsUrl } from '../../utils/constants';
import { TLocation } from '../../services/types/types';
import { useAppDispatch } from '../../services/types/hooks';

const UserInfo: FC = () => {
  const location = useLocation<TLocation>();
  const dispatch = useAppDispatch();

  const background = location.state && location.state.background;

  useEffect(() => {
    const tok = getCookie('token')
    tok && dispatch(start({ url: `${wsUrl}/orders`, token: tok.slice(7) }));
    return () => { dispatch(closed()) };
  }, [dispatch]);

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
