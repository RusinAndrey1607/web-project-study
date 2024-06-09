import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../app/api';

export const fetchLots = createAsyncThunk('lots/fetchLots', async () => {
  const response = await apiFetch('/lot', { method: 'GET', credentials: 'include' });
  return response;
});

export const addLot = createAsyncThunk('lots/addLot', async (lot) => {
  const response = await apiFetch('/lot', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lot),
    credentials: 'include'
  });
  return response;
});

const lotSlice = createSlice({
  name: 'lots',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLots.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLots.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLots.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addLot.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default lotSlice.reducer;
