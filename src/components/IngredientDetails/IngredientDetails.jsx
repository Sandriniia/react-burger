import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetailsStyles from './ingredientDetails.module.css';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const IngredientDetails = ({ handleClosePopup, currentProduct }) => {
  return (
    <ModalOverlay
      handleClosePopup={handleClosePopup}
      className={ingredientDetailsStyles.product_details_popup}
      title='Детали ингредиента'
    >
      <img
        src={currentProduct.image}
        alt={currentProduct.name}
        className={ingredientDetailsStyles.image}
      />
      <h3 className={ingredientDetailsStyles.name}>{currentProduct.name}</h3>
      <div className={ingredientDetailsStyles.info_box}>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className={ingredientDetailsStyles.info}>Калории, ккал</p>
          <p
            className={`${ingredientDetailsStyles.info} ${ingredientDetailsStyles.info_data} text text_type_digits-default`}
          >
            {currentProduct.calories}
          </p>
        </div>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className={ingredientDetailsStyles.info}>Белки, г</p>
          <p
            className={`${ingredientDetailsStyles.info} ${ingredientDetailsStyles.info_data} text text_type_digits-default`}
          >
            {currentProduct.proteins}
          </p>
        </div>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className={ingredientDetailsStyles.info}>Жиры, г</p>
          <p
            className={`${ingredientDetailsStyles.info} ${ingredientDetailsStyles.info_data} text text_type_digits-default`}
          >
            {currentProduct.fat}
          </p>
        </div>
        <div className={ingredientDetailsStyles.info_small_box}>
          <p className={ingredientDetailsStyles.info}>Углеводы, г</p>
          <p
            className={`${ingredientDetailsStyles.info} ${ingredientDetailsStyles.info_data} text text_type_digits-default`}
          >
            {currentProduct.carbohydrates}
          </p>
        </div>
      </div>
    </ModalOverlay>
  );
};

IngredientDetails.propTypes = {
  handleClosePopup: PropTypes.func.isRequired,
  currentProduct: PropTypes.object.isRequired,
};

export default IngredientDetails;
