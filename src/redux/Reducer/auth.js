/*eslint-disable */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isLoggedIn: false,
  userAddress: "",
  isTx: false,
  userBalance: "",
  APY: "",
  isDelegated: false,
  totalValidators: 0,
  userEvmAddress: "",
  walletType: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.userAddress = action?.payload;
    },

    checkIfDelegatorExist: (state, action) => {
      state.isDelegated = action.payload;
    },
    isTxOccur: (state, action) => {
      state.isTx = action.payload;
    },

    getTotalValidators: (state, action) => {
      state.totalValidators = action.payload;
    },
    getWalletBalance: (state, action) => {
      state.userBalance = action.payload;
    },
    getEvmAddress: (state, action) => {
      state.userEvmAddress = action.payload;
    },
    getApy: (state, action) => {
      state.APY = action.payload;
    },
    logout: (state) => {
      state = {};
      sessionStorage.clear();
    },
    getWalletType: (state, action) => {
      state.walletType = action.payload;
    },
  },
});

export const {
  logInSuccess,
  checkIfDelegatorExist,
  logout,
  getWalletBalance,
  getApy,
  isTxOccur,
  getTotalValidators,
  getEvmAddress,
  getWalletType,
} = authSlice.actions;

export default authSlice.reducer;
