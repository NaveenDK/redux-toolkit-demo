import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = { data: [], status: "idle" };
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // fetchProducts(state, action) {
    //   state.data = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = "idle";
      })
      .addCase(getProducts.pending, (state, action) => {
        state.data = action.payload;
        state.status = "loading";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.data = action.payload;
        state.status = "Error";
      });
  },
});

export const { fetchProducts } = productSlice.actions;
export default productSlice.reducer;

export const getProducts = createAsyncThunk("products/get", async () => {
  const data = await fetch("https://fakestoreapi.com/product");
  const result = await data.json();
  return result;
});

//thunk action creator
// export function getProducts() {
//   return async function getProductsThunk(dispatch, getState) {
//     const data = await fetch("https://fakestoreapi.com/products");
//     const result = await data.json();
//     dispatch(fetchProducts(result));
//   };
// }
