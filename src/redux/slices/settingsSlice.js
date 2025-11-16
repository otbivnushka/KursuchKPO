import { createSlice } from '@reduxjs/toolkit';
import i18next from 'i18next';

const initialState = {
  theme: localStorage.getItem('theme') || 'light',
  lang: localStorage.getItem('lang') || 'en',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      localStorage.setItem('theme', action.payload);
      document.documentElement.setAttribute('data-theme', action.payload);
    },
    setLang: (state, action) => {
      state.lang = action.payload;
      localStorage.setItem('lang', action.payload);
      i18next.changeLanguage(action.payload);
    },
  },
});

export const { setTheme, setLang } = settingsSlice.actions;
export default settingsSlice.reducer;
