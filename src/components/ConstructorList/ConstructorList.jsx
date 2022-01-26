import React from 'react';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorList = ({ savedIngredients }) => {
  
  return (
    <>
      <div className={constructorListStyle.element_container}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
        </div>
      {savedIngredients &&
        savedIngredients.map((item) => {
          return <div className={constructorListStyle.element_container}><ConstructorElement key={item._id} text={item.name} price={item.price} thumbnail={item.image} /></div>;
        })}
      <div className={constructorListStyle.element_container}>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
      />
      </div>
    </>
  );
};

export default ConstructorList;
