import React, { useState, useEffect } from 'react';
import appStyles from './app.module.css';
import AppHeader from '../AppHeader/AppHeader';
import Main from '../Main/Main';
import useGetIngredientsData from '../../hooks/useGetIngredientsData';
import OrderDetails from '../OrderDetails/OrderDetails';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import ProductsContext from '../../context/ProductsContext';
import { getIngredientsData, getOrderNumber } from '../../utils/IngredientsAPI';

const App = () => {
  const [isPopupOrderDetailsOpen, setIsPopupOrderDetailsOpen] = useState(false);
  const [isPopupIngredientDetailsOpen, setIsPopupIngredientDetailsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [products, setProducts] = useState([]);
  // const products = useGetIngredientsData();

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

  const handleOpenOrderDetailsPopup = () => {
    //здесь отправка запроса и получение order.number
    setIsPopupOrderDetailsOpen(true);
  };

  const handleOpenIngredientDetailsPopup = (product) => {
    setCurrentProduct(product);
    setIsPopupIngredientDetailsOpen(true);
  };

  const identifier = '034536';

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <AppHeader />
      <ProductsContext.Provider value={{ products }}>
        <Main
          handleOpenOrderDetailsPopup={handleOpenOrderDetailsPopup}
          handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
        />
      </ProductsContext.Provider>
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
