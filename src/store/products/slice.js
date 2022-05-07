import { createSlice } from '@reduxjs/toolkit'

export const products = createSlice({
  name: 'products',
  initialState: {
    productList: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload;
    },
  },
})

export const { setProducts } = products.actions;

export default products.reducer;