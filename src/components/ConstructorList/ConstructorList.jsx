import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ProductsContext from '../../context/ProductsContext';

const ConstructorList = ({ dispatchPrice }) => {
  const ingredientsContext = useContext(ProductsContext);
  const products = ingredientsContext.products;
  const setProductsId = ingredientsContext.setProductsId;

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
    dispatchPrice({ type: 'sumMainPrice', val: total });
    bunIngredient && dispatchPrice({ type: 'sumBunsPrice', val: bunIngredient.price * 2 });
    bunIngredient && setProductsId([...id, bunIngredient._id]);
  }, [mainIngredients, dispatchPrice, setProductsId, bunIngredient]);

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

ConstructorList.propTypes = {
  dispatchPrice: PropTypes.func.isRequired,
};

export default ConstructorList;
