import { createSlice } from '@reduxjs/toolkit';

const initialState = { isPopupOrderDetailsOpen: false };

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openOrderDetailsPopup(state) {
      state.isPopupOrderDetailsOpen = true;
    },
    closePopups(state) {
      state.isPopupOrderDetailsOpen = false;
    },
  },
});

export const popupActions = popupSlice.actions;

export default popupSlice;
