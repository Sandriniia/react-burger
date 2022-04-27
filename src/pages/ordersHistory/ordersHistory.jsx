import React from 'react';
import ordersHistoryStyles from './ordersHistory.module.css';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

const OrdersHistory = ({ orders }) => {
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
