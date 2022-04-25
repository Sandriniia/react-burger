import React from 'react';
import { useParams } from 'react-router-dom';
import orderFeedDetailsStyles from './orderFeedDetails.module.css';
import { orders } from '../../utils/data';

const OrderFeedDetails = () => {
  const { id } = useParams();

  const currentOrder = orders.find((order) => order._id === id);

  return (
    <section>
      <p>{currentOrder.number}</p>
      <h2>{currentOrder.title}</h2>
      {currentOrder.completed ? <p>Выполнен</p> : <p>Готовится</p>}
      <p>Состав:</p>
      <div></div>
    </section>
  );
};

export default OrderFeedDetails;
