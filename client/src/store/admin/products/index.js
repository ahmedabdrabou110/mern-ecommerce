import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  products: [],
};

export const addNewProducts = createAsyncThunk(
  "/addnewproducts",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:8000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  "/getallproducts",
  async () => {
    const response = await axios.get(
      "http://localhost:8000/api/admin/products/get"
    );
    return response?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/editproducts",
  async ({ id, formData }) => {
    const response = await axios.put(
      `http://localhost:8000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const deleteProduct = createAsyncThunk("/addnewproducts", async (id) => {
  const response = await axios.delete(
    `http://localhost:8000/api/admin/products/delete/${id}`
  );
  return response?.data;
});

const AdminProducts = createSlice({
  name: "adminProducts",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
      })
      .addCase(fetchAllProducts.rejected, (state) => {
        state.isLoading = false;
        state.products = [];
      });
  },
});

export default AdminProducts.reducer;
