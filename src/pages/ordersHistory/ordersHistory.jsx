import React from 'react';
import ordersHistoryStyles from './ordersHistory.module.css';
import { orders } from '../../utils/data';
import OrderDetails from '../../components/OrderDetails/OrderDetails';

const OrdersHistory = () => {
 
  return (
    <section className={ordersHistoryStyles.orders}>
      {orders.map((order) => {
            return (
              <OrderDetails
                key={order._id}
                id={order._id}
                orderNumber={order.number}
                date={order.date}
                title={order.title}
                products={order.products}
                price={order.price}
                completed={order.completed}
              />
            );
          })}
    </section>
  )
}

export default OrdersHistory;