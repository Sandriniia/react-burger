import React, { useEffect, FC } from 'react';
import { useDrop } from 'react-dnd';
import constructorListStyle from './constructorList.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorCard from '../ConstructorCard/ConstructorCard';
import { productsActions } from '../../services/slices/productsSlice';
import { useAppSelector, useAppDispatch } from '../../services/types/hooks';
import { TIngredient } from '../../services/types/types';

const ConstructorList: FC = () => {
  const dispatch = useAppDispatch();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      dispatch(productsActions.addProduct(item));
    },
  });

  const products = useAppSelector((state) => state.products.products);
  const mainIngredients = useAppSelector((state) => state.products.currentMainProducts);
  const bunIngredient = useAppSelector((state) => state.products.currentBun);

  useEffect(() => {
    const Mds = mainIngredients.map(product => product._id);
    const bId = bunIngredient.map(product => product._id);
    dispatch(productsActions.getIds([...Mds, ...bId, ...bId]))
  }, [mainIngredients,bunIngredient, dispatch]);

  const getBun = (position: 'верх' | 'низ', type: 'top' | 'bottom'): JSX.Element[] => {
    let bunType = type;
    let bunPosition = position;
    return bunIngredient.map((item: TIngredient) => {
      return (
        <div className={`${constructorListStyle.element_container} mb-4`} key={item._id}>
          <ConstructorElement
            type={bunType}
            isLocked={true}
            text={`${item.name} (${bunPosition})`}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      );
    })
  }

  return (
    <div className={constructorListStyle.main} ref={dropTarget}>
      {!!bunIngredient && !!mainIngredients && (
        <h1 className='text text_type_main-medium mb-6'>
          Пожалуйста, перенесите сюда булку и ингредиенты для создания заказа.
        </h1>
      )}
      {products && getBun('верх', 'top')}
      <div className={constructorListStyle.middle_container}>
        {products &&
          mainIngredients.map((item, index) => {
            return <ConstructorCard item={item} index={index} key={item.uid} />;
          })}
      </div>
      {products && getBun('низ', 'bottom')}
    </div>
  );
};

export default ConstructorList;
