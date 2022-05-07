import { configureStore } from '@reduxjs/toolkit'
import products from './products/slice';

export default configureStore({
  reducer: {
    products
  },
})