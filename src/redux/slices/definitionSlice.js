import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  items: [],
  status: STATUS.LOADING,
};

export const fetchDefinitions = createAsyncThunk(
  'definitions/fetchDefinitions',
  async (_, { rejectWithValue }) => {
    try {
      const message = {
        Command: 'GET_TERMS',
        Payload: {},
      };
      const response = await window.api.sendAndWaitResponse(message);
      console.log(response);
      return response.payload;
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
        state.items = action.payload;
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
