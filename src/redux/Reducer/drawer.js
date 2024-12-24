import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isSidebarOpen: true,
  selectedAccounts: {
    account: '',
    name: '',
    valoperAddress: '',
    stake: 0,
    actual: 0
  },
};

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
    selectedAccounts: (state, action) => {
      state.selectedAccounts = action.payload;
    },
  },
});

export const { toggleSidebar, selectedAccounts } = drawerSlice.actions;

export default drawerSlice.reducer;
