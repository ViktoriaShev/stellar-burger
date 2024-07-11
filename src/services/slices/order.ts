import { RequestStatus } from '@utils-types';
import { TOrder } from '@utils-types';
import { createSlice } from '@reduxjs/toolkit';
import { postOrderBurger } from '../thunks/order';

interface OrderData {
  info: {
    order: TOrder;
    name: string;
  } | null;
  status: RequestStatus;
}

const initialState: OrderData = {
  info: null,
  status: RequestStatus.Idle
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearData: (state: OrderData) => {
      state.info = null;
    }
  },
  selectors: {
    getInfoOrder: (state: OrderData) => state.info,
    getStatus: (state: OrderData) => state.status,
    getOrder: (state: OrderData) => state.info?.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderBurger.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.info = action.payload;
      })
      .addCase(postOrderBurger.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(postOrderBurger.pending, (state) => {
        state.status = RequestStatus.Loading;
      });
  }
});

export const { getInfoOrder, getStatus, getOrder } = orderSlice.selectors;
export const { clearData } = orderSlice.actions;
