import React, { useEffect, useCallback } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import OrderDetailsPopup from '../OrderDetailsPopup/OrderDetailsPopup';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import orderDetailsPopupStyles from '../OrderDetailsPopup/orderDetailsPopup.module.css';
import ingredientDetailsStyle from '../IngredientDetails/ingredientDetails.module.css';
import { getProducts } from '../../services/slices/productsSlice';
import { productsActions } from '../../services/slices/productsSlice';
import { popupActions } from '../../services/slices/popupSlice';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import RecoverPassword from '../../pages/recoverPassword/recoverPassword';
import ResetPassword from '../../pages/resetPassword/resetPassword';
import UserInfo from '../../pages/userInfo/userInfo';
import NotFound from '../../pages/notFound/notFound';
import OrderFeed from '../../pages/orderFeed/orderFeed';
import Ingredient from '../../pages/ingredient/ingredient';
import { getUserInfo, refreshUserToken } from '../../services/slices/userInfoSlice';
import { ProtectedRoute } from '../ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const modal = !!location.state?.modal;

  const isPopupOrderDetailsOpen = useSelector((state) => state.popup.isPopupOrderDetailsOpen);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    const refToken = localStorage.getItem('refreshToken');

    if (!refToken || refToken === '') {
      return;
    }

    if (!token || token === '') {
      dispatch(refreshUserToken(refToken));
    }

    dispatch(getUserInfo(token)).then((res) => {
      res.payload === 'Ошибка 403' && dispatch(refreshUserToken(refToken));
    });
  }, [dispatch]);

  const handleCloseOrderDetailsPopup = useCallback(() => {
    dispatch(productsActions.cleanupIngredientsList());
    dispatch(popupActions.closePopups());
  }, [dispatch]);

  const handleCloseIngredientModal = () => {
    history.goBack();
  };

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <AppHeader />
      <Switch>
        <Route path='/' exact={true}>
          <DndProvider backend={HTML5Backend}>
            <Main />
          </DndProvider>
          {isPopupOrderDetailsOpen && (
            <Modal
              className={orderDetailsPopupStyles.order_popup}
              onClose={handleCloseOrderDetailsPopup}
            >
              <OrderDetailsPopup />
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
        <Route path='/ingredients/:id'>
          <Ingredient />
        </Route>
        <ProtectedRoute path='/profile'>
          <UserInfo />
        </ProtectedRoute>
        <ProtectedRoute path='/feed'>
          <OrderFeed />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {modal && (
        <Route path='/ingredients/:id'>
          <Modal
            title='Детали ингредиента'
            className={ingredientDetailsStyle.details_popup}
            onClose={handleCloseIngredientModal}
          >
            <IngredientDetails />
          </Modal>
        </Route>
      )}
    </div>
  );
};

export default App;
