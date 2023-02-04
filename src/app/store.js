import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './api/apiSlice';
import authReducer from '../features/auth/authSlice';
import docReducer from '../features/documentation/documentationSlice';

export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    doc: docReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,

});
