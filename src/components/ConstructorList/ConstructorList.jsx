import React, { useContext, useEffect } from 'react';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ProductsContext from '../../context/ProductsContext';

const ConstructorList = () => {
  const ingredientsContext = useContext(ProductsContext);
  const products = ingredientsContext.products;

  const bun = products.find((item) => {
    return item.type === 'bun';
  });

  return (
    <>
      {bun && (
        <div className={`${constructorListStyle.element_container} mb-4`}>
          <ConstructorElement
            type='top'
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
      <div className={constructorListStyle.middle_container}>
        {products &&
          products.map((item, index) => {
            return (
              item.type !== 'bun' && (
                <div
                  className={`${constructorListStyle.element_container} mb-4`}
                  key={`${item._id}_${index}`}
                >
                  <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
                </div>
              )
            );
          })}
      </div>
      {bun && (
        <div className={`${constructorListStyle.element_container} mb-4`}>
          <ConstructorElement
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      )}
    </>
  );
};

export default ConstructorList;
