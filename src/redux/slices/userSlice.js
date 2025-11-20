import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const STATUS = {
  WAITING: 'waiting',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  user: null,
  status: STATUS.WAITING,
  justLoggedIn: false,
};

export const authorization = createAsyncThunk(
  'user/authorization',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const message = {
        Command: 'AUTH',
        Payload: { login, password },
      };

      const response = await window.api.sendAndWaitResponse(message);

      return response.payload;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to auth');
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const message = {
        Command: 'GET_USER_DATA',
        Payload: {},
      };

      const response = await window.api.sendAndWaitResponse(message);

      return response.payload;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch user data');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },

    updateFavorites(state, action) {
      if (state.user) state.user.Favorites = action.payload;
    },

    updateNotes(state, action) {
      if (state.user) state.user.Notes = action.payload;
    },

    updateMessages(state, action) {
      if (state.user) state.user.messages = action.payload;
    },

    updateRatedTerms(state, action) {
      if (state.user) state.user.RatedTerms = action.payload;
    },

    resetStatus(state) {
      state.status = STATUS.WAITING;
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== AUTH =====
      .addCase(authorization.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.user = { ...action.payload };
        state.status = STATUS.SUCCESS;
      })
      .addCase(authorization.rejected, (state) => {
        state.status = STATUS.ERROR;
        state.user = null;
      })

      // ===== FETCH USER DATA =====
      .addCase(fetchUserData.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = STATUS.SUCCESS;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = STATUS.ERROR;
      });
  },
});

export const {
  setUser,
  updateFavorites,
  updateNotes,
  updateMessages,
  updateRatedTerms,
  resetStatus,
} = userSlice.actions;

export default userSlice.reducer;
