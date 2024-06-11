// store.ts
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import tempUserReducer from './reducer/tempUserSlice';
import userReducer from './reducer/userSlicer'
import tempCompanyReducer from './reducer/tempCompanySlice'
import requestReducer from './reducer/allRequestsSlice'
import userListReducer from './reducer/usersListSlice'
import companyListReducer from './reducer/companyListSlice';
import companyReducer from './reducer/companySlice';
import adminReducer from './reducer/adminSlice';
import subscriptionReducer from './reducer/subscriptionSlice';
import categoryReducer from './reducer/categorySlice'
import jobReducer from './reducer/jobSlice';
import employeeReducer from './reducer/employeeListSlice'
import chatReducer from './reducer/chatSlice'
import allMessageReducer from './reducer/allMessageList'
import applicantReducer from './reducer/applicantSlice'


const rootReducer = combineReducers({
  tempUser: tempUserReducer,
  user: userReducer,
  tempCompany: tempCompanyReducer,
  request: requestReducer,
  usersList: userListReducer,
  companyList: companyListReducer,
  company: companyReducer,
  admin: adminReducer,
  subscription: subscriptionReducer,
  category: categoryReducer,
  job: jobReducer,
  employee: employeeReducer,
  chat: chatReducer,
  allMessage: allMessageReducer,
  applicantList: applicantReducer
});

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
