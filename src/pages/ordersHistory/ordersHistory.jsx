import React from 'react';
import { useSelector } from 'react-redux';
import MoonLoader from 'react-spinners/ClipLoader';
import ordersHistoryStyles from './ordersHistory.module.css';
import OrderDetails from '../../components/OrderDetails/OrderDetails';
import { loaderStyles } from '../../utils/constants';

const OrdersHistory = () => {

  const loading = useSelector((state) => state.socket.loading);
  const data = useSelector((state) => state.socket.data);

  if (loading) {
    return <MoonLoader color={'#fff'} size={100} css={loaderStyles} />;
  }
  
  return (
    <>
      {data && (
        <section className={ordersHistoryStyles.orders}>
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
      )}
    </>
  );
};

export default OrdersHistory;
