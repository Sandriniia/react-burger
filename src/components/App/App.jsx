import React, { useState } from 'react';
import appStyles from './app.module.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import useGetIngredientsData from '../../hooks/useGetIngredientsData';
import OrderDetails from '../OrderDetails/OrderDetails';

const App = () => {
  const [savedIngredients, setSavedIngredients] = useState([]);
  const products = useGetIngredientsData();

  const handleAddIngredient = (product) => {
    setSavedIngredients([product, ...savedIngredients]);
  };

  const identifier = '034536';
  
  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <Header />
      <Main
        handleAddIngredient={handleAddIngredient}
        savedIngredients={savedIngredients}
        products={products}
      />
      <OrderDetails identifier={identifier}/>
    </div>
  );
};

export default App;
