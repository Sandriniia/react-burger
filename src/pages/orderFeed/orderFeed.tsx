import React, { useEffect, FC } from 'react';
import MoonLoader from 'react-spinners/ClipLoader';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { start, closed } from '../../services/slices/webSocketSlice';
import { wsUrl } from '../../utils/constants';
import feedStyles from './orderFeed.module.css';
import { loaderStyles } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../services/types/hooks';

const OrderFeed: FC = () => {
  const dispatch = useAppDispatch();

  const data = useAppSelector((state) => state.socket.data);
  const loading = useAppSelector((state) => state.socket.loading);

  useEffect(() => {
    dispatch(start({ url: `${wsUrl}/orders/all` }));
    return () => { dispatch(closed()) };
  }, [dispatch]);

  if (loading) {
    <MoonLoader color={'#fff'} size={100} css={loaderStyles} />;
  }

  return (
    <>
      {data && (
        <section className={feedStyles.feed}>
          <h1 className='text text_type_main-large mb-5'>Лента заказов</h1>
          <div className={feedStyles.orders}>
            <section className={feedStyles.orders_info}>
              {data.orders.map((order) => {
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
            <section className={`${feedStyles.numbers_info} ml-15`}>
              <div className={`${feedStyles.orders_num} pb-15`}>
                <div className={`${feedStyles.order_num_box} mr-9`}>
                  <h3 className='text text_type_main-medium mb-6'>Готовы:</h3>
                  <div className={feedStyles.list}>
                    {data.orders.map((order) => {
                      return (
                        order.status === 'done' && (
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
                </div>
                <div className={feedStyles.order_num_box}>
                  <h3 className='text text_type_main-medium mb-6'>В работе:</h3>
                  <div className={feedStyles.list}>
                    {data.orders.map((order) => {
                      return (
                        order.status === 'pending' && (
                          <p className='text text_type_digits-default mb-2' key={order._id}>
                            {order.number}
                          </p>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className={`${feedStyles.text_info_box} pb-15`}>
                <h3 className='text text_type_main-medium'>Выполнено за все время:</h3>
                <p className='text text_type_digits-large'>{data.total}</p>
              </div>
              <div className={feedStyles.text_info_box}>
                <h3 className='text text_type_main-medium'>Выполнено за сегодня:</h3>
                <p className='text text_type_digits-large'>{data.totalToday}</p>
              </div>
            </section>
          </div>
        </section>
      )}
    </>
  );
};

export default OrderFeed;
