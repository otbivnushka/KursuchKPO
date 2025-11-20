import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

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

export const fetchDefinitions = createAsyncThunk(
  'definitions/fetchDefinitions',
  async (_, { rejectWithValue }) => {
    try {
      const message_terms = {
        Command: 'GET_TERMS',
        Payload: {},
      };
      const message_categories = {
        Command: 'GET_CATEGORIES',
        Payload: {},
      };
      const response_terms = await window.api.sendAndWaitResponse(message_terms);
      const response_categories = await window.api.sendAndWaitResponse(message_categories);

      return { terms: response_terms.payload, categories: response_categories.payload };
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch definitions');
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefinitions.pending, (state) => {
        state.status = STATUS.LOADING;
        state.items = [];
      })
      .addCase(fetchDefinitions.fulfilled, (state, action) => {
        state.items = action.payload.terms;
        state.categories = action.payload.categories;
        state.status = STATUS.SUCCESS;
      })
      .addCase(fetchDefinitions.rejected, (state) => {
        state.status = STATUS.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = definitionSlice.actions;
export default definitionSlice.reducer;
