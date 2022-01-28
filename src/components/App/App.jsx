import React, { useState } from 'react';
import appStyles from './app.module.css';
import Header from '../Header/Header';
import Main from '../Main/Main';

const App = () => {
  const [savedIngredients, setSavedIngredients] = useState([]);

  const handleAddIngredient = (product) => {
    setSavedIngredients([product, ...savedIngredients]);
  };

  return (
    <div className={`${appStyles.app} text text_type_main-default`}>
      <Header />
      <Main handleAddIngredient={handleAddIngredient} savedIngredients={savedIngredients} />
    </div>
  );
};

export default App;
