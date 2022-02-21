import React, { useContext, useEffect, useState } from 'react';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ProductsContext from '../../context/ProductsContext';

const ConstructorList = ({ dispatchProducts }) => {
  const ingredientsContext = useContext(ProductsContext);
  const products = ingredientsContext.products;

  const [mainIngredients, setMainInIngredients] = useState([]);
  const [bunIngredient, setBunIngredient] = useState(null);

  useEffect(() => {
    const main = products.filter((item) => {
      return item.type !== 'bun';
    });

    const bun = products.find((item) => {
      return item.type === 'bun';
    });

    setMainInIngredients(main);
    setBunIngredient(bun);
  }, [products]);

  useEffect(() => {
    let total = 0;
    let id = [];
    mainIngredients.forEach((item) => {
      total += item.price;
      id.push(item._id);
    });
    dispatchProducts({ type: 'sumMainPrice', val: total });
    dispatchProducts({ type: 'addMainId', val: id });
  }, [mainIngredients, dispatchProducts]);

  useEffect(() => {
    bunIngredient && dispatchProducts({ type: 'addBunId', val: [bunIngredient._id] });
    bunIngredient && dispatchProducts({ type: 'sumBunsPrice', val: bunIngredient.price * 2 });
  }, [bunIngredient, dispatchProducts]);

  return (
    <>
      {bunIngredient && (
        <div className={`${constructorListStyle.element_container} mb-4`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bunIngredient.name} (верх)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
          />
        </div>
      )}
      <div className={constructorListStyle.middle_container}>
        {products &&
          mainIngredients.map((item, index) => {
            return (
              <div
                className={`${constructorListStyle.element_container} mb-4`}
                key={`${item._id}_${index}`}
              >
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
              </div>
            );
          })}
      </div>
      {bunIngredient && (
        <div className={`${constructorListStyle.element_container} mb-4`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bunIngredient.name} (низ)`}
            price={bunIngredient.price}
            thumbnail={bunIngredient.image}
          />
        </div>
      )}
    </>
  );
};

export default ConstructorList;
