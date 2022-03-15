import React from 'react';
import constructorCardStyles from './constructorCard.module.css';
import { useDrag } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { productsActions } from '../../services/slices/productsSlice';

const ConstructorCard = ({ item, index }) => {

  const dispatch = useDispatch();

  const [, dragRef] = useDrag({
    type: 'constructor',
    item: {},
  });

  return (
    <div
      className={`${constructorCardStyles.element_container} mb-4`}
      ref={dragRef}
    >
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(productsActions.deleteProduct({ id: item._id, index: index }))}
      />
    </div>
  );
};

export default ConstructorCard;
