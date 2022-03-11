import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { productsActions } from '../../services/slices/productsSlice';

const ConstructorList = () => {
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(productsActions.addCurrentProduct(item));
    },
  });

  const products = useSelector((state) => state.products.products);
  const mainIngredients = useSelector((state) => state.products.currentMainProducts);
  const bunIngredient = useSelector((state) => state.products.currentBun);

  useEffect(() => {
    // const main = products.filter((item) => {
    //   return item.type !== 'bun';
    // });

    const bun = products.find((item) => {
      return item.type === 'bun';
    });

    // dispatch(productsActions.getCurrentMainProducts(main));
    dispatch(productsActions.getCurrentBun(bun));
  }, [products, dispatch]);

  useEffect(() => {
    mainIngredients.forEach((item) => {
      dispatch(productsActions.getIds(item._id));
    });

    bunIngredient !== undefined && dispatch(productsActions.getIds(bunIngredient._id));
  }, [mainIngredients, bunIngredient, dispatch]);

  return (
    <div ref={dropTarget}>
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
    </div>
  );
};

export default ConstructorList;
