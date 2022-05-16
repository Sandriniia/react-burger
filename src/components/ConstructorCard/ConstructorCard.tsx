import React, { useRef, FC } from 'react';
import constructorCardStyles from './constructorCard.module.css';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { productsActions } from '../../services/slices/productsSlice';

const ConstructorCard: FC = ({ item, index }) => {
  const ref = useRef(null);

  const dispatch = useDispatch();

  const [{ isDrag }, drag] = useDrag({
    type: 'constructor',
    item: { id: item._id, index },
    collect(monitor) {
      return {
        isDrag: monitor.isDragging(),
      };
    },
  });

  const [{ handlerId }, drop] = useDrop({
    accept: 'constructor',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      dispatch(
        productsActions.moveConstructorIngredient({ dragIndex: dragIndex, hoverIndex: hoverIndex }),
      );

      item.index = hoverIndex;
    },
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }
      dispatch(
        productsActions.moveConstructorIngredient({ dragIndex: dragIndex, hoverIndex: hoverIndex }),
      );
    },
  });

  const opacity = isDrag ? 0 : 1;

  drag(drop(ref));

  return (
    <div
      className={`${constructorCardStyles.element_container} mb-4`}
      ref={ref}
      style={{ opacity }}
      draggable
      data-handler-id={handlerId}
    >
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() => dispatch(productsActions.deleteProduct({ item: item, index: index }))}
      />
    </div>
  );
};

export default ConstructorCard;
