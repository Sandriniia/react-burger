import React, { useState, useRef, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientSection from '../IngredientSection/IngredientSection';

const BurgerIngredients = () => {
  const [current, setCurrent] = useState('buns');

  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainRef = useRef(null);

  const getTotalSectionHeight = (ref) => {
    const section = ref.current;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    const totalHeight = sectionTop + sectionHeight;
    return totalHeight;
  };

  const handleScroll = (event) => {
    const scrollY = event.target.scrollTop;
    const bunsTotalHeight = getTotalSectionHeight(bunsRef);
    const saucesTotalHeight = getTotalSectionHeight(saucesRef);
    const mainTotalHeight = getTotalSectionHeight(mainRef);

    if (scrollY <= bunsTotalHeight) {
      setCurrent('buns');
    } else if (scrollY > bunsTotalHeight && scrollY <= saucesTotalHeight) {
      setCurrent('sauces');
    } else if (scrollY > saucesTotalHeight && scrollY <= mainTotalHeight) {
      setCurrent('main');
    }
  };

  const handleTabClick = (value, ref) => {
    setCurrent(value);
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={burgerIngredientsStyles.main_container}>
      <h1 className='mb-5 text text_type_main-large'>Соберите бургер</h1>
      <nav className={burgerIngredientsStyles.nav}>
        <Tab
          value='buns'
          active={current === 'buns'}
          onClick={() => handleTabClick('buns', bunsRef)}
        >
          Булки
        </Tab>
        <Tab
          value='sauces'
          active={current === 'sauces'}
          onClick={() => handleTabClick('sauces', saucesRef)}
        >
          Соусы
        </Tab>
        <Tab
          value='main'
          active={current === 'main'}
          onClick={() => handleTabClick('main', mainRef)}
        >
          Начинки
        </Tab>
      </nav>
      <section className={burgerIngredientsStyles.menu} onScroll={handleScroll}>
        <IngredientSection type='bun' title='Булки' ref={bunsRef} />
        <IngredientSection type='sauce' title='Соусы' ref={saucesRef} />
        <IngredientSection type='main' title='Начинки' ref={mainRef} />
      </section>
    </section>
  );
};

export default BurgerIngredients;
