import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import definitionReducer from './slices/definitionSlice';

import settingsReducer from './slices/settingsSlice';
import userReducer from './slices/userSlice';
import viewReducer from './slices/viewSlice';

export const store = configureStore({
  reducer: {
    definition: definitionReducer,
    settings: settingsReducer,
    user: userReducer,
    view: viewReducer,
  },
});

export const useAppDispatch = () => useDispatch();
