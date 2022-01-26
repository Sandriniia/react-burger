import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import IngredientSection from '../IngredientSection/IngredientSection';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('one');

  return (
    <section>
      <h1>Соберите бургер</h1>
      <nav>
        <Tab value='one' active={current === 'one'} onClick={setCurrent}>
          One
        </Tab>
        <Tab value='two' active={current === 'two'} onClick={setCurrent}>
          Two
        </Tab>
        <Tab value='three' active={current === 'three'} onClick={setCurrent}>
          Three
        </Tab>
      </nav>
      <IngredientSection type='bun' />
      <IngredientSection type='sauce' />
      <IngredientSection type='main' />
    </section>
  );
};

export default BurgerIngredients;
