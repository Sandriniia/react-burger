import React, { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientSection from '../IngredientSection/IngredientSection';

const BurgerIngredients = ({ handleAddIngredient }) => {
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
        <IngredientSection handleAddIngredient={handleAddIngredient} type='bun' title='Булки' />
        <IngredientSection handleAddIngredient={handleAddIngredient} type='sauce' title='Соусы' />
        <IngredientSection handleAddIngredient={handleAddIngredient} type='main' title='Начинки' />
      </section>
    </section>
  );
};

export default BurgerIngredients;
