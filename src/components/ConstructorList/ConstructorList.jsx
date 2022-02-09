import React from 'react';
import PropTypes from 'prop-types';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const ConstructorList = ({products}) => {

  return (
    <>
      <div className={`${constructorListStyle.element_container} mb-4`}>
        <ConstructorElement
          type='top'
          isLocked={true}
          text='Краторная булка N-200i (верх)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
      <div className={constructorListStyle.middle_container}>
        {products &&
          products.map((item, index) => {
            return (
              <div className={`${constructorListStyle.element_container} mb-4`} key={`${item._id}_${index}`}>
                <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
              </div>
            );
          })}
      </div>
      <div className={`${constructorListStyle.element_container} mb-4`}>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          text='Краторная булка N-200i (низ)'
          price={200}
          thumbnail='https://code.s3.yandex.net/react/code/bun-02.png'
        />
      </div>
    </>
  );
};

ConstructorList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default ConstructorList;
