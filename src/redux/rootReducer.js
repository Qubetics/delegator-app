/*eslint-disable*/
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './Reducer/auth';
import drawerReducer from './Reducer/drawer';

const combinedReducer = combineReducers({
  auth: authReducer,
  drawer: drawerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

export default rootReducer;
