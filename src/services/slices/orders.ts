import { TOrder, RequestStatus } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { getOrders } from '../thunks/orders';

interface ordersType {
  orders: TOrder[];
  status: RequestStatus;
}

const initialState = {
  orders: [],
  status: RequestStatus.Idle
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getUserOrders: (state: ordersType) => state.orders,
    getStatus: (state: ordersType) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getOrders.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getOrders.fulfilled, (state: ordersType, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload;
      });
  }
});

export const { getUserOrders, getStatus } = ordersSlice.selectors;
