import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import headlineReducer from './reducers/headlineSlice';
import themeReducer from './reducers/themeSlice';

const store = configureStore({
  reducer: {
    headlines: headlineReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
