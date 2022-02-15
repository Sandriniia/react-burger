import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientSection from '../IngredientSection/IngredientSection';

const BurgerIngredients = ({ handleOpenIngredientDetailsPopup }) => {
  const [current, setCurrent] = useState('one');

  return (
    <section className={burgerIngredientsStyles.main_container}>
      <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
      <nav className={burgerIngredientsStyles.nav}>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </nav>
      <section className={burgerIngredientsStyles.menu}>
        <IngredientSection
          handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
          type='bun'
          title='Булки'
        />
        <IngredientSection
          handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
          type='sauce'
          title='Соусы'
        />
        <IngredientSection
          handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
          type='main'
          title='Начинки'
        />
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
  handleOpenIngredientDetailsPopup: PropTypes.func.isRequired,
};

export default BurgerIngredients;
