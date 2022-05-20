import React, { useState, useRef, FC } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import burgerIngredientsStyles from './burgerIngredients.module.css';
import IngredientSection from '../IngredientSection/IngredientSection';

const BurgerIngredients: FC = () => {
  const [current, setCurrent] = useState('buns');

  const bunsRef = useRef<HTMLElement | null>(null);
  const saucesRef = useRef<HTMLElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);

  type typeOfProduct = typeof bunsRef | typeof saucesRef | typeof mainRef;

  const getTotalSectionHeight = (ref: typeOfProduct): number | undefined => {
    const section = ref.current;
    if (ref && section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const totalHeight = sectionTop + sectionHeight;
      return totalHeight;
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLElement, UIEvent>): void => {
    const target = event.target as HTMLElement;
    const scrollY = target.scrollTop;
    const bunsTotalHeight = getTotalSectionHeight(bunsRef);
    const saucesTotalHeight = getTotalSectionHeight(saucesRef);
    const mainTotalHeight = getTotalSectionHeight(mainRef);

    if (bunsTotalHeight && saucesTotalHeight && mainTotalHeight) {
      if (scrollY <= bunsTotalHeight) {
        setCurrent('buns');
      } else if (scrollY > bunsTotalHeight && scrollY <= saucesTotalHeight) {
        setCurrent('sauces');
      } else if (scrollY > saucesTotalHeight && scrollY <= mainTotalHeight) {
        setCurrent('main');
      }
    }
  };

  const handleTabClick = (value: string, ref: typeOfProduct): void => {
    setCurrent(value);
    ref && ref.current && ref.current.scrollIntoView({ behavior: 'smooth' });
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
        <IngredientSection type='bun' title='Булки' tabRef={bunsRef} />
        <IngredientSection type='sauce' title='Соусы' tabRef={saucesRef} />
        <IngredientSection type='main' title='Начинки' tabRef={mainRef} />
      </section>
    </section>
  );
};

export default BurgerIngredients;
