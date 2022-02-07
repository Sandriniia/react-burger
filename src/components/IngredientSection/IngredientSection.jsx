import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ingredientSectionStyles from './ingredientSection.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';

const IngredientSection = ({ type, title, products, handleOpenIngredientDetailsPopup }) => {
  const [bunIngredientSection, setBunIngredientSection] = useState([]);
  const [sauceIngredientSection, setSauceIngredientSection] = useState([]);
  const [mainIngredientSection, setMainIngredientSection] = useState([]);

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
      <section className={ingredientSectionStyles.section_container}>
        <h2 className={ingredientSectionStyles.title}>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {bunIngredientSection.map((item) => {
            return (
              <IngredientCard
                key={item._id}
                image={item.image}
                alt={`${item.type} ${item.name}`}
                price={item.price}
                name={item.name}
                product={item}
                handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
              />
            );
          })}
        </div>
      </section>
    );
  }

  if (type === 'sauce') {
    return (
      <section className={ingredientSectionStyles.section_container}>
        <h2>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {sauceIngredientSection.map((item) => {
            return (
              <IngredientCard
                key={item._id}
                image={item.image}
                alt={`${item.type} ${item.name}`}
                price={item.price}
                name={item.name}
                product={item}
                handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
              />
            );
          })}
        </div>
      </section>
    );
  }

  if (type === 'main') {
    return (
      <section className={ingredientSectionStyles.section_container}>
        <h2>{title}</h2>
        <div className={ingredientSectionStyles.ingredients_container}>
          {mainIngredientSection.map((item) => {
            return (
              <IngredientCard
                key={item._id}
                image={item.image}
                alt={`${item.type} ${item.name}`}
                price={item.price}
                name={item.name}
                product={item}
                handleOpenIngredientDetailsPopup={handleOpenIngredientDetailsPopup}
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
  handleOpenIngredientDetailsPopup: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default IngredientSection;
