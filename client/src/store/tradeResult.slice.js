import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "../app/api";

export const fetchTradeResults = createAsyncThunk(
  "tradeResults/fetchTradeResults",
  async () => {
    const response = await apiFetch(`/trade/`, {
      method: "GET",
      credentials: "include",
    });
    return response;
  }
);

export const closeTrade = createAsyncThunk(
  "tradeResults/closeTrade",
  async (lotId) => {
    const response = await apiFetch(`/trade/end`, {
      method: "POST",
      body: JSON.stringify({ lotId }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  }
);
const tradeResultsSlice = createSlice({
  name: "tradeResults",
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTradeResults.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTradeResults.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchTradeResults.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(closeTrade.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(closeTrade.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(closeTrade.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default tradeResultsSlice.reducer;
