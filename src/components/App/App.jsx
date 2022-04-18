import React, { useEffect, useCallback, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import { getUserInfo, refreshUserToken } from '../../services/slices/userInfoSlice';
import { ProtectedNotAuthRoute, ProtectedAuthRoute } from '../ProtectedRoute';

const App = () => {
  const dispatch = useDispatch();

  const [isLog, setIsLog] = useState(false);

  const isPopupOrderDetailsOpen = useSelector((state) => state.popup.isPopupOrderDetailsOpen);
  const isPopupIngredientDetailsOpen = useSelector(
    (state) => state.popup.isPopupIngredientDetailsOpen,
  );
  const accessToken = useSelector((state) => state.user.accessToken);
  const isLogged = useSelector((state) => state.user.isLogged);
  console.log(isLog);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    isLogged && localStorage.setItem('isLogged', true);
  }, [isLogged])
  
  useEffect(() => {
    const log = localStorage.getItem('isLogged');
    setIsLog(log);
  },[isLogged])

  // useEffect(() => {
  //   localStorage.setItem('token', token);
  //   localStorage.setItem('refreshToken', refreshToken);
  // }, [token, refreshToken]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token || !token === '') {
  //     setIsLogged(true);
  //   }
  // }, [token]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('1');

    const refToken = localStorage.getItem('refreshToken');
    if (!refToken || refToken === '') {
      return;
    }
    console.log('2');

    if (!token || token === '') {
      dispatch(refreshUserToken(refToken));
    }
    console.log(refToken);
    dispatch(getUserInfo(token)).then(
      (res) => res.payload === 'Ошибка 403' && dispatch(refreshUserToken(refToken)),
    );
  }, [dispatch, isLogged, accessToken]);

  
//   const refToken = localStorage.getItem('refreshToken');
//  setTimeout(dispatch(refreshUserToken(refToken)), 5000);

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
      <Router>
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
          <ProtectedAuthRoute path='/login' component={Login} isLogged={isLog} />
          <ProtectedAuthRoute path='/register' component={Register} isLogged={isLog} />
          <ProtectedAuthRoute
            path='/forgot-password'
            component={RecoverPassword}
            isLogged={isLog}
          />
          <ProtectedAuthRoute
            path='/reset-password'
            component={ResetPassword}
            isLogged={isLog}
          />
          <ProtectedNotAuthRoute path='/profile' component={UserInfo} isLogged={isLog} />
          <ProtectedNotAuthRoute path='/feed' component={OrderFeed} isLogged={isLog} />
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
