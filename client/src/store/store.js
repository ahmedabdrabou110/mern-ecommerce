import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index";
import adminProductsReducer from "./admin/products/index";
import userProductsReducer from "./products/index";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: adminProductsReducer,
    userProducts: userProductsReducer,
  },
});
