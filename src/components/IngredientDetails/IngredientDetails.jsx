import React from 'react'
import ingredientDetailsStyles from './ingredientDetails.module.css'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

const IngredientDetails = ({handleClosePopup}) => {
  return (
    <ModalOverlay handleClosePopup={handleClosePopup}></ModalOverlay>
  )
}

export default IngredientDetails;