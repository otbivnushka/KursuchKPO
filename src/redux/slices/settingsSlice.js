import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import i18next from 'i18next';

// Загрузка настроек из Electron файла
export const loadSettings = createAsyncThunk('settings/load', async () => {
  return await window.api.getSettings();
});

// Сохранение настроек через файл
export const saveSettings = createAsyncThunk('settings/save', async (data) => {
  await window.api.saveSettings(data);
  return data;
});

const initialState = {
  login: '',
  password: '',
  theme: 'light',
  lang: 'en',

  categorySelect: '',
  sortBy: '',
  viewAs: '',
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
    setCategorySelect: (state, action) => {
      state.categorySelect = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setViewAs: (state, action) => {
      state.viewAs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // загрузка
      .addCase(loadSettings.fulfilled, (state, action) => {
        const { theme, lang } = action.payload;

        if (theme) {
          state.theme = theme;
          document.documentElement.setAttribute('data-theme', theme);
        }

        if (lang) {
          state.lang = lang;
          i18next.changeLanguage(lang);
        }
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        const { theme, lang } = action.payload;

        if (theme) {
          state.theme = theme;
          document.documentElement.setAttribute('data-theme', theme);
        }

        if (lang) {
          state.lang = lang;
          i18next.changeLanguage(lang);
        }
      });
  },
});
export const { setTheme, setLang, setCategorySelect, setSortBy, setViewAs } = settingsSlice.actions;
export default settingsSlice.reducer;
