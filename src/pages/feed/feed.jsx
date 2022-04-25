import React from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import OrderFeed from '../orderFeed/orderFeed';
import OrderFeedDetails from '../orderFeedDetails/orderFeedDetails';
import Modal from '../../components/Modal/Modal';
import feedStyles from './feed.module.css';

const Feed = () => {
  const location = useLocation();
  const history = useHistory();

  const back = location.state && location.state.back;

  const handleCloseModal = () => {
    history.goBack();
  };

  return (
    <section>
      <Switch location={back || location}>
        <Route path='/feed' exact>
          <OrderFeed />
        </Route>
        <Route path='/feed/:id' exact>
          <OrderFeedDetails />
        </Route>
      </Switch>
      {back && (
        <Route path='/feed/:id' exact>
          <Modal onClose={handleCloseModal}>
            <OrderFeedDetails />
          </Modal>
        </Route>
      )}
    </section>
  )
}

export default Feed;