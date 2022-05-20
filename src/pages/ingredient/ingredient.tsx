import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails';
import { useAppSelector } from '../../services/types/hooks';

const Ingredient: FC = () => {
  const { id } = useParams<{ id: string }>();

  const products = useAppSelector((state) => state.products.products);
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
