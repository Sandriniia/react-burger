import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ingredientSectionStyles from './ingredientSection.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';

const IngredientSection = ({ type, title }) => {
  const [bunIngredientSection, setBunIngredientSection] = useState([]);
  const [sauceIngredientSection, setSauceIngredientSection] = useState([]);
  const [mainIngredientSection, setMainIngredientSection] = useState([]);

  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    const bunData = products.filter((item) => {
      return item.type === 'bun';
    });

    const sauceData = products.filter((item) => {
      return item.type === 'sauce';
    });

    const mainData = products.filter((item) => {
      return item.type === 'main';
    });

    setBunIngredientSection(bunData);

    setSauceIngredientSection(sauceData);

    setMainIngredientSection(mainData);
  }, [products]);

  if (type === 'bun') {
    return (
      <section className={`${ingredientSectionStyles.section_container} mt-10 mr-6`}>
        <h2 className='text text_type_main-medium'>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {bunIngredientSection.map((item) => {
            return (
              <IngredientCard
                key={item._id}
                id={item._id}
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
      <section className={`${ingredientSectionStyles.section_container} mt-10 mr-6`}>
        <h2 className='text text_type_main-medium'>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {sauceIngredientSection.map((item) => {
            return (
              <IngredientCard
                key={item._id}
                id={item._id}
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
      <section className={`${ingredientSectionStyles.section_container} mt-10 mr-6`}>
        <h2 className='text text_type_main-medium'>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {mainIngredientSection.map((item) => {
            return (
              <IngredientCard
                key={item._id}
                id={item._id}
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
};

IngredientSection.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default IngredientSection;
