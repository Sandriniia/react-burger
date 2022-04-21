import React from 'react';
import ingredientStyles from './ingredient.module.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

const Ingredient = () => {
  const { id } = useParams();

  const products = useSelector((state) => state.products.products);

  const currentIngredient = products.find((product) => product._id === id);
  console.log(products);

  return (
    <>
      {currentIngredient && (
        <section className='mt-25'>
          <h1 className='text text_type_main-large'>Детали ингредиента</h1>
          <IngredientDetails />
        </section>
      )}
    </>
  );
};

export default Ingredient;
