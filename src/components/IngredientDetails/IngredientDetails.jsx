import React from 'react';
import { useSelector } from 'react-redux';
import ingredientDetailsStyles from './ingredientDetails.module.css';
import { ingredientPropType } from '../../utils/types';

const IngredientDetails = () => {
  const currentProduct = useSelector((state) => state.products.currentProduct);
  return (
    <>
      <img
        src={currentProduct.image}
        alt={currentProduct.name}
        className={ingredientDetailsStyles.image}
      />
      <h3 className='text text_type_main-medium mt-4 mb-8'>{currentProduct.name}</h3>
      <div className={ingredientDetailsStyles.info_box}>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className='text text_type_main-default mb-2'>Калории, ккал</p>
          <p className='text text_type_digits-default'>{currentProduct.calories}</p>
        </div>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className='text text_type_main-default mb-2'>Белки, г</p>
          <p className='text text_type_digits-default'>{currentProduct.proteins}</p>
        </div>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className='text text_type_main-default mb-2'>Жиры, г</p>
          <p className='text text_type_digits-default'>{currentProduct.fat}</p>
        </div>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className='text text_type_main-default mb-2'>Углеводы, г</p>
          <p className='text text_type_digits-default'>{currentProduct.carbohydrates}</p>
        </div>
      </div>
    </>
  );
};

IngredientDetails.propTypes = {
  currentProduct: ingredientPropType.isRequired,
};

export default IngredientDetails;
