import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth.slice'
import lotSlice from './lot.slice'
import bidSlice from './bid.slice'

export const store = configureStore({
  reducer: {
    auth:authSlice,
    lots:lotSlice,
    bids:bidSlice
  },
})