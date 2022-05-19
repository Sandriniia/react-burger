import React, { useEffect, useState, FC, LegacyRef } from 'react';
import ingredientSectionStyles from './ingredientSection.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import { filterProductsByType } from '../../utils/functions';
import { TIngredient } from '../../services/types/types';
import { useAppSelector } from '../../services/types/hooks';

type TSectionProps = {
  readonly type: string;
  readonly title: string;
  readonly tabRef: LegacyRef<HTMLElement>;
};

const IngredientSection: FC<TSectionProps> = ({ type, title, tabRef }) => {
  const [bunIngredientSection, setBunIngredientSection] = useState<TIngredient[]>([]);
  const [sauceIngredientSection, setSauceIngredientSection] = useState<TIngredient[]>([]);
  const [mainIngredientSection, setMainIngredientSection] = useState<TIngredient[]>([]);

  const products = useAppSelector((state) => state.products.products);

  useEffect(() => {
    const bunData: Array<TIngredient> = filterProductsByType(products, 'bun');
    const sauceData: Array<TIngredient> = filterProductsByType(products, 'sauce');
    const mainData: Array<TIngredient> = filterProductsByType(products, 'main');

    setBunIngredientSection(bunData);
    setSauceIngredientSection(sauceData);
    setMainIngredientSection(mainData);
  }, [products]);

  if (type === 'bun') {
    return (
      <section className={`${ingredientSectionStyles.section_container} pt-10 mr-6`} ref={tabRef}>
        <h2 className='text text_type_main-medium'>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {bunIngredientSection.map((item: TIngredient) => {
            return (
              <IngredientCard
                key={item._id}
                id={item._id}
                count={item.count}
                image={item.image}
                alt={`${item.type} ${item.name}`}
                price={item.price}
                name={item.name}
                product={item}
              />
            );
          })}
        </div>
      </section>
    );
  }

  if (type === 'sauce') {
    return (
      <section className={`${ingredientSectionStyles.section_container} mt-10 mr-6`} ref={tabRef}>
        <h2 className='text text_type_main-medium'>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {sauceIngredientSection.map((item: TIngredient) => {
            return (
              <IngredientCard
                key={item._id}
                id={item._id}
                count={item.count}
                image={item.image}
                alt={`${item.type} ${item.name}`}
                price={item.price}
                name={item.name}
                product={item}
              />
            );
          })}
        </div>
      </section>
    );
  }

  if (type === 'main') {
    return (
      <section className={`${ingredientSectionStyles.section_container} mt-10 mr-6`} ref={tabRef}>
        <h2 className='text text_type_main-medium'>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {mainIngredientSection.map((item: TIngredient) => {
            return (
              <IngredientCard
                key={item._id}
                id={item._id}
                count={item.count}
                image={item.image}
                alt={`${item.type} ${item.name}`}
                price={item.price}
                name={item.name}
                product={item}
              />
            );
          })}
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <p>
          Произошла ошибка. Отсутсвуют ингредиенты. Пожалуйста, попробуйте перезагрузить страницу.
        </p>
      </section>
    );
  }
};

export default IngredientSection;
