import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';

const Ingredient = () => {
  const { id } = useParams();

  const products = useSelector((state) => state.products.products);
  const currentIngredient = products.find((product) => product._id === id);

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
