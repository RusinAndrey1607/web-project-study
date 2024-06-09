import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiFetch } from '../app/api';

export const fetchBids = createAsyncThunk('bids/fetchBids', async (lotId) => {
  const response = await apiFetch(`/bid/${lotId}`, { method: 'GET', credentials: 'include' });
  return response;
});


export const addBid = createAsyncThunk('bids/addBid', async (bid) => {
  const response = await apiFetch(`/bid`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bid),
    credentials: 'include'
  });
  return response;
});

const bidSlice = createSlice({
  name: 'bids',
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBids.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBids.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchBids.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addBid.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  }
});

export default bidSlice.reducer;
