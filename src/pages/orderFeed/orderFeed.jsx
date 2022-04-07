import React from 'react';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { orders } from '../../utils/data';
import feedStyles from './orderFeed.module.css';

const OrderFeed = () => {
  return (
    <section>
      <h1>Лента заказов</h1>
      <div>
        <section>
          {orders.map((order) => {
            return (
              <OrderDetails
                key={order._id}
                orderNumber={order.number}
                date={order.date}
                title={order.title}
                products={order.products}
                price={order.price}
              />
            );
          })}
        </section>
        <section>
          <div>
            <div>
              <h3>Готовы:</h3>
              {orders.map((order) => {
                return order.completed && <p key={order._id}>{order.number}</p>;
              })}
            </div>
            <div>
              <h3>В работе:</h3>
              {orders.map((order) => {
                return !order.completed && <p key={order._id}>{order.number}</p>;
              })}
            </div>
          </div>
          <div>
            <h3>Выполнено за все время:</h3>
            <p>28 752</p>
          </div>
          <div>
            <h3>Выполнено за сегодня:</h3>
            <p>138</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OrderFeed;
