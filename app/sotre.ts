import {configureStore} from '@reduxjs/toolkit';
import {dataSlice} from './Data/userValue';
export const store = configureStore({
  reducer: {
    ReduxUserDetails: dataSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
