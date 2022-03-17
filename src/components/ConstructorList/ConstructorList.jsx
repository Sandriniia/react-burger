import React, { useEffect } from 'react';
import { useDrop} from 'react-dnd';
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
  console.log(mainIngredients);

  useEffect(() => {
    const bun = products.find((item) => {
      return item.type === 'bun';
    });

    bun && dispatch(productsActions.getCurrentBun(bun));
  }, [products, dispatch]);

  useEffect(() => {
    mainIngredients.forEach((item) => {
      dispatch(productsActions.getIds(item._id));
    });

    bunIngredient.forEach((item) => {
      dispatch(productsActions.getIds(item._id));
    });
  }, [mainIngredients, bunIngredient, dispatch]);

  return (
    <div ref={dropTarget}>
      {products &&
        bunIngredient.map((item, index) => {
          return (
            <div
              className={`${constructorListStyle.element_container} mb-4`}
              key={`${item._id}_${index}`}
            >
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
            return <ConstructorCard item={item} index={index} key={`${item._id}_${index}`}/>;
          })}
      </div>
      {products &&
        bunIngredient.map((item, index) => {
          return (
            <div
              className={`${constructorListStyle.element_container} mb-4`}
              key={`${item._id}_${index}`}
            >
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
