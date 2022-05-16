import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import orderBurgerStyles from './orderBurger.module.css';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getOrderNum } from '../../services/slices/productsSlice';
import { popupActions } from '../../services/slices/popupSlice';

const OrderBurger = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const totalPrice = useSelector((state) => state.products.totalPrice);
  const productsId = useSelector((state) => state.products.ids);
  const bunIngredient = useSelector((state) => state.products.currentBun);
  const isLogged = useSelector((state) => state.user.isLogged);

  const handleOpenOrderDetailsPopupAndGetOrderNumber = () => {
    if (!isLogged) {
      history.replace({ pathname: '/login', state: { from: location } })
    } else {
      dispatch(getOrderNum(productsId));
      dispatch(popupActions.openOrderDetailsPopup());
    }
  };

  return (
    <section className={orderBurgerStyles.order_container}>
      <div className={`${orderBurgerStyles.sum} mr-10`}>
        <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        type='primary'
        size='large'
        disabled={bunIngredient.length === 0}
        onClick={handleOpenOrderDetailsPopupAndGetOrderNumber}
      >
        Оформить заказ
      </Button>
    </section>
  );
};

export default OrderBurger;
