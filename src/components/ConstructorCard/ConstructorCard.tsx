import React, { useRef, FC } from 'react';
import constructorCardStyles from './constructorCard.module.css';
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd';
import type { Identifier } from 'dnd-core';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { productsActions } from '../../services/slices/productsSlice';
import { TIngredient } from '../../services/types/types';
import { useAppDispatch } from '../../services/types/hooks';

type TConstructorCard = {
  item: TIngredient;
  index: number;
};

const ConstructorCard: FC<TConstructorCard> = ({ item, index }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();

  const [{ isDrag }, drag] = useDrag({
    type: 'constructor',
    item: { id: item._id, index },
    collect(monitor: any) {
      return {
        isDrag: monitor.isDragging(),
      };
    },
  });

  const [{ handlerId }, drop] = useDrop<TIngredient, void, { handlerId: Identifier | null }>({
    accept: 'constructor',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: TIngredient, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current && ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition && mousePosition.y - hoveredRect.top;

      if (hoverClientY && dragIndex && dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (hoverClientY && dragIndex && dragIndex > hoverIndex && hoverClientY < hoverMiddleY) {
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
