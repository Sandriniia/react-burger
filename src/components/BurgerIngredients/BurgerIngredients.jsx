import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientSection from '../IngredientSection/IngredientSection';

const BurgerIngredients = ({ handleAddIngredient, products }) => {
  const [current, setCurrent] = useState('one');

  return (
    <section className={burgerIngredientsStyles.main_container}>
      <h1 className={`${burgerIngredientsStyles.title} text text_type_main-large`}>
        Соберите бургер
      </h1>
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
        <IngredientSection products={products} handleAddIngredient={handleAddIngredient} type='bun' title='Булки' />
        <IngredientSection products={products} handleAddIngredient={handleAddIngredient} type='sauce' title='Соусы' />
        <IngredientSection products={products} handleAddIngredient={handleAddIngredient} type='main' title='Начинки' />
      </section>
    </section>
  );
};

BurgerIngredients.propTypes = {
  handleAddIngredient: PropTypes.func,
  products: PropTypes.array,
};

export default BurgerIngredients;
