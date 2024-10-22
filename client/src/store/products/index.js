import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
};

export const getAllFilteredProducts = createAsyncThunk(
  "/shop/products",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/shop/products/get"
    );
    return response.data;
  }
);

export const productShopSlice = createSlice({
  name: "userProduct",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(getAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default productShopSlice.reducer;
