import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import userInfoStyles from './userInfo.module.css';
import ProfileNavBar from '../../components/ProfileNavBar/ProfileNavBar';
import Profile from '../profile/profile';
import OrdersHistory from '../ordersHistory/ordersHistory';
import OrderFeedDetails from '../orderFeedDetails/orderFeedDetails';
import Modal from '../../components/Modal/Modal';

const UserInfo = () => {
  const history = useHistory();
  const location = useLocation();

  const back = location.state && location.state.back;

  const handleCloseModal = () => {
    history.goBack();
  };

  return (
    <section className={`${userInfoStyles.user_info} pl-5`}>
      <ProfileNavBar />
      <Switch location={back || location}>
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
      {back && (
        <Route path='/profile/orders/:id' exact>
          <Modal onClose={handleCloseModal}>
            <OrderFeedDetails />
          </Modal>
        </Route>
      )}
    </section>
  );
};

export default UserInfo;
