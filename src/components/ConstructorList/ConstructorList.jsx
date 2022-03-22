import React, { useEffect } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorCard from '../ConstructorCard/ConstructorCard';
import { productsActions } from '../../services/slices/productsSlice';

const ConstructorList = () => {
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(productsActions.addProduct(item));
    },
  });

  const products = useSelector((state) => state.products.products);
  const mainIngredients = useSelector((state) => state.products.currentMainProducts);
  const bunIngredient = useSelector((state) => state.products.currentBun);

  useEffect(() => {
    mainIngredients.forEach((item) => {
      dispatch(productsActions.getIds(item._id));
    });

    bunIngredient.forEach((item) => {
      dispatch(productsActions.getIds(item._id));
    });
  }, [mainIngredients, bunIngredient, dispatch]);

  return (
    <div className={constructorListStyle.main} ref={dropTarget}>
      {bunIngredient.length === 0 && mainIngredients.length === 0 && (
        <h1 className='text text_type_main-medium'>
          Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.
        </h1>
      )}
      {products &&
        bunIngredient.map((item) => {
          return (
            <div className={`${constructorListStyle.element_container} mb-4`} key={item._id}>
              <ConstructorElement
                type='top'
                isLocked={true}
                text={`${item.name} (верх)`}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
      <div className={constructorListStyle.middle_container}>
        {products &&
          mainIngredients.map((item, index) => {
            return <ConstructorCard item={item} index={index} key={item.uid} />;
          })}
      </div>
      {products &&
        bunIngredient.map((item) => {
          return (
            <div className={`${constructorListStyle.element_container} mb-4`} key={item._id}>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={`${item.name} (низ)`}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          );
        })}
    </div>
  );
};

export default ConstructorList;
