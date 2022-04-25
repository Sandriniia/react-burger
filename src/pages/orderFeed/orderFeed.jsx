import React from 'react';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { orders } from '../../utils/data';
import feedStyles from './orderFeed.module.css';
const OrderFeed = () => {
 
  return (
    <section className={feedStyles.feed}>
      <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
      <div className={feedStyles.orders}>
        <section className={feedStyles.orders_info}>
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
              />
            );
          })}
        </section>
        <section className={`${feedStyles.numbers_info} ml-15`}>
          <div className={`${feedStyles.orders_num} pb-15`}>
            <div className={`${feedStyles.order_num_box} mr-9`}>
              <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
              {orders.map((order) => {
                return (
                  order.completed && (
                    <p
                      className={`${feedStyles.completed_order} text text_type_digits-default mb-2`}
                      key={order._id}
                    >
                      {order.number}
                    </p>
                  )
                );
              })}
            </div>
            <div className={feedStyles.order_num_box}>
              <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
              {orders.map((order) => {
                return (
                  !order.completed && (
                    <p className='text text_type_digits-default mb-2' key={order._id}>
                      {order.number}
                    </p>
                  )
                );
              })}
            </div>
          </div>
          <div className={`${feedStyles.text_info_box} pb-15`}>
            <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
            <p className='text text_type_digits-large'>28 752</p>
          </div>
          <div className={feedStyles.text_info_box}>
            <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
            <p className='text text_type_digits-large'>138</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default OrderFeed;
