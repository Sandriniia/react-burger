import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ordersHistoryStyles from './ordersHistory.module.css';
import { start, closed } from '../../services/slices/webSocketSlice';
import { wsUrl } from '../../utils/constants';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { getCookie } from '../../utils/cookies';

const OrdersHistory = () => {
  const dispatch = useDispatch();

  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(start({ url: `${wsUrl}/orders`, token: getCookie('token').slice(7) }));
    return () => dispatch(closed());
  }, [dispatch]);

  return (
    <section className={ordersHistoryStyles.orders}>
      {orders.map((order) => {
        return (
          <OrderDetails
            key={order._id}
            id={order._id}
            orderNumber={order.number}
            date={order.createdAt}
            title={order.name}
            idsIngredients={order.ingredients}
            status={order.status}
          />
        );
      })}
    </section>
  );
};

export default OrdersHistory;
