import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  items: [],
  categories: [],
  status: STATUS.LOADING,
};

// Асинхронный thunk для получения терминов и категорий через axios
export const fetchDefinitions = createAsyncThunk(
  'definitions/fetchDefinitions',
  async (_, { rejectWithValue }) => {
    try {
      const [termsRes, categoriesRes] = await Promise.all([
        axios.get('http://localhost:8888/api/terms'),
        axios.get('http://localhost:8888/api/categories'),
      ]);

      return {
        terms: termsRes.data,
        categories: categoriesRes.data,
      };
    } catch (err) {
      // Если нужно, можно достать err.response.data.message
      return rejectWithValue(err.response?.data || err.message || 'Failed to fetch definitions');
    }
  }
);

const definitionSlice = createSlice({
  name: 'definition',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    removeTermById(state, action) {
      const idToRemove = action.payload;
      state.items = state.items.filter((term) => term.id !== idToRemove);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefinitions.pending, (state) => {
        state.status = STATUS.LOADING;
        state.items = [];
        state.categories = [];
      })
      .addCase(fetchDefinitions.fulfilled, (state, action) => {
        state.items = action.payload.terms;
        state.categories = action.payload.categories;
        state.status = STATUS.SUCCESS;
      })
      .addCase(fetchDefinitions.rejected, (state) => {
        state.status = STATUS.ERROR;
        state.items = [];
        state.categories = [];
      });
  },
});

export const { setItems, removeTermById } = definitionSlice.actions;
export default definitionSlice.reducer;
