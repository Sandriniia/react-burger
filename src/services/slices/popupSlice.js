import { createSlice } from "@reduxjs/toolkit";

const initialState = { isPopupOrderDetailsOpen: false, isPopupIngredientDetailsOpen: false };

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openOrderDetailsPopup(state) {
      state.isPopupOrderDetailsOpen = true;
    },
    openIngredientsDetailsPopup(state) {
      state.isPopupIngredientDetailsOpen = true;
    },
    closePopups(state) {
      state.isPopupOrderDetailsOpen = false;
      state.isPopupIngredientDetailsOpen = false;
    },
  }
});

export const popupActions = popupSlice.actions;

export default popupSlice;