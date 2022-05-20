import React, { FC } from 'react';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/ClipLoader';
import ingredientDetailsStyles from './ingredientDetails.module.css';
import { loaderStyles } from '../../utils/constants';
import { useAppSelector } from '../../services/types/hooks';

const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();

  const products = useAppSelector((state) => state.products.products);
  const currentProduct = products.find((product) => product._id === id);

  if (products.length === 0) {
    return <MoonLoader color={'#fff'} size={100} css={loaderStyles} />;
  }

  return (
    <>
      {currentProduct && (
        <div className={ingredientDetailsStyles.container}>
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
        </div>
      )}
    </>
  );
};

export default IngredientDetails;
