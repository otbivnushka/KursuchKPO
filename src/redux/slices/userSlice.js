import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const STATUS = {
  WAITING: 'waiting',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

const initialState = {
  user: null,
  status: STATUS.WAITING,
};

export const authorization = createAsyncThunk(
  'user/authorization',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      const message = { login, password };

      const res = await axios.post(`${window.api.getUrl()}/api/user/auth`, message);
      localStorage.setItem('token', res.data.token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message || 'Failed to auth');
    }
  }
);

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(
        `${window.api.getUrl()}/api/user`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to fetch user data'
      );
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
      if (state.user) state.user.Messages = action.payload;
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
      // ayф
      .addCase(authorization.pending, (state) => {
        state.status = STATUS.LOADING;
      })
      .addCase(authorization.fulfilled, (state, action) => {
        state.user = action.payload;
        state.token = action.payload.token;
        state.status = STATUS.SUCCESS;
      })
      .addCase(authorization.rejected, (state) => {
        state.status = STATUS.ERROR;
        state.user = null;
      })

      // фетч юзер
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
