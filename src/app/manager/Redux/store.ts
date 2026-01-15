import { configureStore } from "@reduxjs/toolkit";

import managerSlice from './slice/manager-slice';
import businessSlice from './slice/business-slice';

export const managerStore = configureStore({
  reducer: {
    manager: managerSlice,
    business: businessSlice
  }
});

export type RootState = ReturnType<typeof managerStore.getState>;
export type AppDispatch = typeof managerStore.dispatch;
