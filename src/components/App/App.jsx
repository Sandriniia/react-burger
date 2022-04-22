import React, { useEffect, useCallback } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector, useDispatch } from 'react-redux';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import Login from '../../pages/login/login';
import Register from '../../pages/register/register';
import RecoverPassword from '../../pages/recoverPassword/recoverPassword';
import ResetPassword from '../../pages/resetPassword/resetPassword';
import Ingredient from '../../pages/ingredient/ingredient';
import UserInfo from '../../pages/userInfo/userInfo';
import OrderFeed from '../../pages/orderFeed/orderFeed';
import NotFound from '../../pages/notFound/notFound';
import Modal from '../Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetailsPopup from '../OrderDetailsPopup/OrderDetailsPopup';
import ProtectedRoute from '../ProtectedRoute';
import ingredientDetailsStyle from '../IngredientDetails/ingredientDetails.module.css';
import orderDetailsPopupStyles from '../OrderDetailsPopup/orderDetailsPopup.module.css';
import { getProducts, productsActions } from '../../services/slices/productsSlice';
import { popupActions } from '../../services/slices/popupSlice';
import { getUserInfo, refreshUserToken } from '../../services/slices/userInfoSlice';
import { getRefreshToken } from '../../utils/functions';
import { getCookie } from '../../utils/cookies';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const background = location.state && location.state.background;

  const isPopupOrderDetailsOpen = useSelector((state) => state.popup.isPopupOrderDetailsOpen);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    const refToken = getRefreshToken();
    const token = getCookie('token')

    !token && refToken && dispatch(refreshUserToken());

    token &&
      dispatch(getUserInfo(token)).then((res) => {
        res.payload === 'Ошибка 403' && refToken && dispatch(refreshUserToken());
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
      <Switch location={background || location}>
        <Route path='/' exact>
          <DndProvider backend={HTML5Backend}>
            <Main />
          </DndProvider>
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
      {background && (
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
      {isPopupOrderDetailsOpen && (
        <Modal
          className={orderDetailsPopupStyles.order_popup}
          onClose={handleCloseOrderDetailsPopup}
        >
          <OrderDetailsPopup />
        </Modal>
      )}
    </div>
  );
};

export default App;
