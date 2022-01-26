import React, { useEffect, useState } from 'react';
import ingredientSectionStyles from './ingredientSection.module.css';
import IngredientCard from '../IngredientCard/IngredientCard';
import data from '../../utils/data';

const IngredientSection = ({ type, title }) => {
  const [bunIngredientSection, setBunIngredientSection] = useState([]);
  const [sauceIngredientSection, setSauceIngredientSection] = useState([]);
  const [mainIngredientSection, setMainIngredientSection] = useState([]);

  useEffect(() => {
    const bunData = data.filter((item) => {
      return item.type === 'bun';
    });

    const sauceData = data.filter((item) => {
      return item.type === 'sauce';
    });

    const mainData = data.filter((item) => {
      return item.type === 'main';
    });

    setBunIngredientSection(bunData);

    setSauceIngredientSection(sauceData);

    setMainIngredientSection(mainData);
  }, []);

  if (type === 'bun') {
    return (
      <section>
        <h2>{title}</h2>
        {bunIngredientSection.map((item) => {
          return (
            <IngredientCard
              key={item._id}
              image={item.image}
              alt={`${item.type} ${item.name}`}
              price={item.price}
              name={item.name}
            />
          );
        })}
      </section>
    );
  }

  if (type === 'sauce') {
    return (
      <section>
        <h2>{title}</h2>
        {sauceIngredientSection.map((item) => {
          return (
            <IngredientCard
              key={item._id}
              image={item.image}
              alt={`${item.type} ${item.name}`}
              price={item.price}
              name={item.name}
            />
          );
        })}
      </section>
    );
  }

  if (type === 'main') {
    return (
      <section>
        <h2>{title}</h2>
        {mainIngredientSection.map((item) => {
          return (
            <IngredientCard
              key={item._id}
              image={item.image}
              alt={`${item.type} ${item.name}`}
              price={item.price}
              name={item.name}
            />
          );
        })}
      </section>
    );
  }
};

export default IngredientSection;
