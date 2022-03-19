import React, { useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import orderDetailsStyles from '../OrderDetails/orderDetails.module.css';
import ingredientDetailsStyle from '../IngredientDetails/ingredientDetails.module.css';
import { getProducts } from '../../services/slices/productsSlice';
import { productsActions } from '../../services/slices/productsSlice';
import { popupActions } from '../../services/slices/popupSlice';

const App = () => {
  const dispatch = useDispatch();

  const isPopupOrderDetailsOpen = useSelector((state) => state.popup.isPopupOrderDetailsOpen);
  const isPopupIngredientDetailsOpen = useSelector(
    (state) => state.popup.isPopupIngredientDetailsOpen,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleClosePopup = useCallback(() => {
    dispatch(popupActions.closePopups());
    dispatch(productsActions.getCurrentProduct());
  }, [dispatch]);

  useEffect(() => {
    const escClosePopup = (e) => {
      if (e.key === 'Escape') {
        handleClosePopup();
      }
    };

    window.addEventListener('keydown', escClosePopup);

    return () => window.removeEventListener('keydown', escClosePopup);
  }, [handleClosePopup]);

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <AppHeader />
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
      {isPopupOrderDetailsOpen && (
        <Modal className={orderDetailsStyles.order_popup} onClose={handleClosePopup}>
          <OrderDetails />
        </Modal>
      )}
      {isPopupIngredientDetailsOpen && (
        <Modal title='Детали ингредиента' className={ingredientDetailsStyle.details_popup} onClose={handleClosePopup}>
          <IngredientDetails />
        </Modal>
      )}
    </div>
  );
};

export default App;
