import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import RecoverPassword from '../../pages/recoverPassword/recoverPassword';
import ResetPassword from '../../pages/resetPassword/resetPassword';

const App = () => {
  const dispatch = useDispatch();

  const isPopupOrderDetailsOpen = useSelector((state) => state.popup.isPopupOrderDetailsOpen);
  const isPopupIngredientDetailsOpen = useSelector(
    (state) => state.popup.isPopupIngredientDetailsOpen,
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleCloseIngredientDetailsPopup = useCallback(() => {
    dispatch(popupActions.closePopups());
    dispatch(productsActions.getCurrentProduct());
  }, [dispatch]);

  const handleCloseOrderDetailsPopup = useCallback(() => {
    dispatch(productsActions.cleanupIngredientsList());
    dispatch(popupActions.closePopups());
  }, [dispatch]);

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <AppHeader />
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <DndProvider backend={HTML5Backend}>
              <Main />
            </DndProvider>
            {isPopupOrderDetailsOpen && (
              <Modal
                className={orderDetailsStyles.order_popup}
                onClose={handleCloseOrderDetailsPopup}
              >
                <OrderDetails />
              </Modal>
            )}
            {isPopupIngredientDetailsOpen && (
              <Modal
                title='Детали ингредиента'
                className={ingredientDetailsStyle.details_popup}
                onClose={handleCloseIngredientDetailsPopup}
              >
                <IngredientDetails />
              </Modal>
            )}
          </Route>
          <Route path='/login'>
            <Login />
          </Route>
          <Route path='/register'>
            <Register />
          </Route>
          <Route path='/forgot-password'>
            <RecoverPassword />
          </Route>
          <Route path='/reset-password'>
            <ResetPassword />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
