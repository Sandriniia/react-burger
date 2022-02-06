import React, { useState } from 'react';
import appStyles from './app.module.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import useGetIngredientsData from '../../hooks/useGetIngredientsData';
import OrderDetails from '../OrderDetails/OrderDetails';

const App = () => {
  const [savedIngredients, setSavedIngredients] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const products = useGetIngredientsData();

  const handleAddIngredient = (product) => {
    setSavedIngredients([product, ...savedIngredients]);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const identifier = '034536';

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <Header />
      <Main
        handleAddIngredient={handleAddIngredient}
        savedIngredients={savedIngredients}
        products={products}
        handleOpenPopup={handleOpenPopup}
      />
      {isPopupOpen && (<OrderDetails identifier={identifier} handleClosePopup={handleClosePopup} />)}
    </div>
  );
};

export default App;
