// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tempUserReducer from './reducer/tempUserSlice';
import userReducer from './reducer/userSlicer'
import tempCompanyReducer from './reducer/tempCompanySlice'

const rootReducer = combineReducers({
  tempUser: tempUserReducer,
  user: userReducer,
  tempCompany: tempCompanyReducer
});

export type AppDispatch =typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
