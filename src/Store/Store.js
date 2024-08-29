import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './Card'; 



export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});


