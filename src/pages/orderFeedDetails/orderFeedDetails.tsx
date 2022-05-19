import React, { useEffect, useState, FC } from 'react';
import MoonLoader from 'react-spinners/ClipLoader';
import { nanoid } from '@reduxjs/toolkit';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams, useLocation } from 'react-router-dom';
import orderFeedDetailsStyles from './orderFeedDetails.module.css';
import { getDate } from '../../utils/functions';
import { start } from '../../services/slices/webSocketSlice';
import { wsUrl } from '../../utils/constants';
import { getCookie } from '../../utils/cookies';
import { loaderStyles } from '../../utils/constants';
import { useAppDispatch, useAppSelector } from '../../services/types/hooks';
import { TOrder, TIngredient } from '../../services/types/types';

const OrderFeedDetails: FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();
  const [orderIngredients, setOrderIngredients] = useState<Array<TIngredient>>([]);
  const [currentOrder, setCurrentOrder] = useState<TOrder>();

  const products = useAppSelector((state) => state.products.products);
  const data = useAppSelector((state) => state.socket.data);
  const loading = useAppSelector((state) => state.socket.loading);

  useEffect(() => {
    const tok = getCookie('token');
    location.pathname.includes('feed')
      ? dispatch(start({ url: `${wsUrl}/orders/all` }))
      : tok && dispatch(start({ url: `${wsUrl}/orders`, token: tok.slice(7) }));
  }, [dispatch, location]);

  useEffect(() => {
    if (data) {
      const curOrder = data.orders.find((order) => order._id === id);
      setCurrentOrder(curOrder);

      let ingredients: Array<TIngredient> = [];
      let uniqueIngredients: Array<TIngredient> = [];

      currentOrder &&
        currentOrder.ingredients.forEach((id) => {
          const product = products.find((product) => product._id === id);
          product && ingredients.push({ ...product, count: 1 });
        });
      ingredients.forEach((prod) => {
        const d = uniqueIngredients.find((el) => el._id === prod._id);
        if (d) {
          d.count += 1;
        } else {
          uniqueIngredients.push(prod);
        }
      });
      setOrderIngredients(uniqueIngredients);
    }
  }, [data]);

  const price =
    orderIngredients &&
    orderIngredients.reduce((total, item) => item.price * item.count + total, 0);

  if (loading) {
    return <MoonLoader color={'#fff'} size={100} css={loaderStyles} />;
  }

  return (
    <>
      {data && currentOrder && orderIngredients && (
        <section className={`${orderFeedDetailsStyles.feed} pl-4`}>
          <p
            className={`${orderFeedDetailsStyles.number} text text_type_digits-default mt-4 mb-10`}
          >
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
            {orderIngredients.map((item) => {
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
      )}
    </>
  );
};

export default OrderFeedDetails;
