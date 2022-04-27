import React from 'react';
import { nanoid } from '@reduxjs/toolkit';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import orderFeedDetailsStyles from './orderFeedDetails.module.css';
import { getDate } from '../../utils/functions';

const OrderFeedDetails = ({ orders }) => {
  const { id } = useParams();

  const products = useSelector((state) => state.products.products);

  let ingredients = [];

  const currentOrder = orders.find((order) => order._id === id);
  const currentOrderIngredients = currentOrder.ingredients;
  currentOrderIngredients.forEach((id) => {
    const product = products.find((product) => product._id === id);

    ingredients.length === 0
      ? ingredients.push({ ...product, count: 1 })
      : ingredients.forEach((item) => {
          item._id === product._id ? item.count++ : ingredients.push({ ...product, count: 1 });
        });
  });

  const price = ingredients.reduce((total, item) => (item.price * item.count) + total, 0)

  return (
    <section className={`${orderFeedDetailsStyles.feed} pl-4`}>
      <p className={`${orderFeedDetailsStyles.number} text text_type_digits-default mt-4 mb-10`}>
        #{currentOrder.number}
      </p>
      <h2 className='text text_type_main-medium mb-3'>{currentOrder.name}</h2>
      {currentOrder.status === 'pending' && (
        <p className={`${orderFeedDetailsStyles.status} text text_type_main-default mb-15`}>
          Готовится
        </p>
      )}
      {currentOrder.status === 'done' && (
        <p className={`${orderFeedDetailsStyles.status} text text_type_main-default mb-15`}>
          Выполнен
        </p>
      )}
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <div className={orderFeedDetailsStyles.ingredients}>
        {ingredients.map((item) => {
          return (
            <div className={orderFeedDetailsStyles.ingredient} key={nanoid()}>
              <img className={orderFeedDetailsStyles.image} src={item.image} alt={item.name} />
              <h3 className='text text_type_main-default'>{item.name}</h3>
              <div className={orderFeedDetailsStyles.price_count_box}>
                <p className='text text_type_digits-default mr-2'>{`${item.count} x ${item.price}`}</p>
                <CurrencyIcon type='primary' />
              </div>
            </div>
          );
        })}
      </div>
      <div className={orderFeedDetailsStyles.time_price_box}>
        <p className='text text_type_digits-default text_color_inactive'>
          {getDate(currentOrder.createdAt)}
        </p>
        <div className={orderFeedDetailsStyles.total_price_box}>
          <p className='text text_type_digits-default mr-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </section>
  );
};

export default OrderFeedDetails;
