import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import IngredientSection from '../IngredientSection/IngredientSection';

const BurgerIngredients = () => {
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
      <IngredientSection type='bun' title='Булки' />
      <IngredientSection type='sauce' title='Соусы' />
      <IngredientSection type='main' title='Начинки' />
    </section>
  );
};

export default BurgerIngredients;
