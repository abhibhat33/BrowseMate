import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchItemsApi } from "./api";

/**
 * Async thunk for fetching items from the API.
 * This function dispatches different states based on the API response.
 */
export const fetchItems = createAsyncThunk(
  "items/fetchItems",
  ({ page = 1 } = {}) =>
    fetchItemsApi({ page })
);

/**
 * Redux slice for managing items state.
 * Handles fetching, loading, success, and failure states.
 */
const itemsSlice = createSlice({
  name: "items",
  initialState: {
    data: [], // Stores the fetched items
    status: "idle", // API call status: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null, // Stores any error messages from API failures
    currentPage: 1, // Keeps track of the current page for pagination
  },
  reducers: {
    /**
     * Updates the current page for pagination.
     * @param {Object} state - The current Redux state.
     * @param {Object} action - The dispatched action containing the new page number.
     */
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      /**
       * Handles the pending state when the API request is in progress.
       * Updates the status to 'loading'.
       */
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading";
      })

      /**
       * Handles the fulfilled state when the API request is successful.
       * Updates the status to 'succeeded' and stores the fetched data.
       * @param {Object} state - The current Redux state.
       * @param {Object} action - The dispatched action containing the API response data.
       */
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })

      /**
       * Handles the rejected state when the API request fails.
       * Updates the status to 'failed' and stores the error message.
       * @param {Object} state - The current Redux state.
       * @param {Object} action - The dispatched action containing the error message.
       */
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPage } = itemsSlice.actions;
export default itemsSlice.reducer;
