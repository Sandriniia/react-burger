import React, { useState } from 'react';
import appStyles from './app.module.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import useGetIngredientsData from '../../hooks/useGetIngredientsData';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';

const App = () => {
  const [isPopupOrderDetailsOpen, setIsPopupOrderDetailsOpen] = useState(false);
  const [isPopupIngredientDetailsOpen, setIsPopupIngredientDetailsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const products = useGetIngredientsData();

  const handleClosePopup = () => {
    setIsPopupOrderDetailsOpen(false);
    setIsPopupIngredientDetailsOpen(false);
  };

  const handleOpenOrderDetailsPopup = () => {
    setIsPopupOrderDetailsOpen(true);
  };

  const handleOpenIngredientDetailsPopup = (product) => {
    setCurrentProduct(product);
    setIsPopupIngredientDetailsOpen(true);
  };

  const identifier = '034536';

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <Header />
      <Main
        products={products}
        handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup}
        handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
      />
      {isPopupOrderDetailsOpen && (
        <OrderDetails identifier={identifier} handleClosePopup={handleClosePopup} />
      )}
      {isPopupIngredientDetailsOpen && (
        <IngredientDetails handleClosePopup={handleClosePopup} currentProduct={currentProduct} />
      )}
    </div>
  );
};

export default App;
