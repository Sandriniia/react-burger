import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import orderDetailsStyle from './orderDetails.module.css';

const OrderDetails = ({ orderNumber, date, title, products, price, completed, id }) => {
  const productsLength = products.length;
  const difference = productsLength - 6;

  const location = useLocation();

  return (
    <Link
      to={{ pathname: `${location.pathname}/${id}`, state: { background: location } }}
      className={orderDetailsStyle.link}
    >
      <div className={`${orderDetailsStyle.container} p-6 mr-2`}>
        <div className={`${orderDetailsStyle.time_number_box} pb-6`}>
          <p className='text text_type_digits-default'>#{orderNumber}</p>
          <p className='text text_type_main-default text_color_inactive'>{date}</p>
        </div>
        <h1 className='text text_type_main-medium pb-6'>{title}</h1>
        {location.pathname === '/profile/orders' &&
          (completed ? (
            <p className='text text_type_main-default pt-2 pb-6'>Создан</p>
          ) : (
            <p className='text text_type_main-default pt-2 pb-6'>Готовится</p>
          ))}
        <div className={orderDetailsStyle.img_price_box}>
          <div className={orderDetailsStyle.images}>
            {products.map((product, index) => {
              let z = 10;
              const id = nanoid();
              return (
                index <= 5 && (
                  <img
                    key={id}
                    style={{ zIndex: (z -= index) }}
                    src={product}
                    alt={title}
                    className={`${orderDetailsStyle.image} ${
                      productsLength > 6 && index === 5 && orderDetailsStyle.opacity
                    }`}
                  />
                )
              );
            })}
            {difference > 0 && (
              <p className={`${orderDetailsStyle.num} text text_type_digits-default`}>
                +{difference}
              </p>
            )}
          </div>
          <div className={orderDetailsStyle.price_box}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OrderDetails;
