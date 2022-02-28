import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import orderDetailsStyles from '../OrderDetails/orderDetails.module.css';
import ingredientDetailsStyle from '../IngredientDetails/ingredientDetails.module.css';
import { getProducts, getOrderNum } from '../../services/slices/productsSlice';

const App = () => {
  const [isPopupOrderDetailsOpen, setIsPopupOrderDetailsOpen] = useState(false);
  const [isPopupIngredientDetailsOpen, setIsPopupIngredientDetailsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  const productsId = useSelector(state => state.products.ids);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const escClosePopup = (e) => {
      if (e.key === 'Escape') {
        handleClosePopup();
      }
    };

    window.addEventListener('keydown', escClosePopup);

    return () => window.removeEventListener('keydown', escClosePopup);
  }, []);

  const handleClosePopup = () => {
    setIsPopupOrderDetailsOpen(false);
    setIsPopupIngredientDetailsOpen(false);
  };

  const handleOpenOrderDetailsPopupAndGetOrderNumber = () => {
    dispatch(getOrderNum(productsId));
    setIsPopupOrderDetailsOpen(true);
  };

  const handleOpenIngredientDetailsPopup = (product) => {
    setCurrentProduct(product);
    setIsPopupIngredientDetailsOpen(true);
  };

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <AppHeader />
        <Main
          handleOpenOrderDetailsPopupAndGetOrderNumber={
            handleOpenOrderDetailsPopupAndGetOrderNumber
          }
          handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
        />
      {isPopupOrderDetailsOpen && (
        <Modal handleClosePopup={handleClosePopup} className={orderDetailsStyles.order_popup}>
          <OrderDetails />
        </Modal>
      )}
      {isPopupIngredientDetailsOpen && (
        <Modal
          handleClosePopup={handleClosePopup}
          title='Детали ингредиента'
          className={ingredientDetailsStyle.details_popup}
        >
          <IngredientDetails currentProduct={currentProduct} />
        </Modal>
      )}
    </div>
  );
};

export default App;
