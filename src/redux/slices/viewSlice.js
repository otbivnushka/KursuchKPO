import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  definitionInfo: {},
  status: STATUS.LOADING,
};

export const fetchDefinition = createAsyncThunk(
  'view/fetchDefinition',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:8888/api/terms/visited', { term: id });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message || 'Failed to fetch definition');
    }
  }
);

const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefinition.pending, (state) => {
        state.status = STATUS.LOADING;
        state.definitionInfo = {};
      })
      .addCase(fetchDefinition.fulfilled, (state, action) => {
        state.definitionInfo = action.payload;
        state.status = STATUS.SUCCESS;
      })
      .addCase(fetchDefinition.rejected, (state) => {
        state.status = STATUS.ERROR;
        state.definitionInfo = {};
      });
  },
});

export const { setItems } = viewSlice.actions;
export default viewSlice.reducer;
