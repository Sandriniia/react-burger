import React, { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ProductsContext from '../../context/ProductsContext';
import { getIngredientsData, getOrderNumber } from '../../utils/IngredientsAPI';

const App = () => {
  const [isPopupOrderDetailsOpen, setIsPopupOrderDetailsOpen] = useState(false);
  const [isPopupIngredientDetailsOpen, setIsPopupIngredientDetailsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsId, setProductsId] = useState([]);
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    getIngredientsData()
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    getOrderNumber(productsId)
      .then((data) => {
        setOrderNumber(data.order.number);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsPopupOrderDetailsOpen(true);
  };

  const handleOpenIngredientDetailsPopup = (product) => {
    setCurrentProduct(product);
    setIsPopupIngredientDetailsOpen(true);
  };

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <AppHeader />
      <ProductsContext.Provider value={{ products, setProductsId }}>
        <Main
          handleOpenOrderDetailsPopupAndGetOrderNumber={
            handleOpenOrderDetailsPopupAndGetOrderNumber
          }
          handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
        />
      </ProductsContext.Provider>
      {isPopupOrderDetailsOpen && (
        <OrderDetails handleClosePopup={handleClosePopup} orderNumber={orderNumber} />
      )}
      {isPopupIngredientDetailsOpen && (
        <IngredientDetails handleClosePopup={handleClosePopup} currentProduct={currentProduct} />
      )}
    </div>
  );
};

export default App;
