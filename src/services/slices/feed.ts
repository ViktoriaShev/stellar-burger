import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsFromServer, getOrderByNumber } from '../thunks/feed';
import { TOrder, RequestStatus } from '@utils-types';

interface feedType {
  orders: TOrder[];
  orderDetails: TOrder | null;
  total: number;
  totalToday: number;
  status: RequestStatus;
}

const initialState: feedType = {
  orders: [],
  orderDetails: null,
  total: 0,
  totalToday: 0,
  status: RequestStatus.Idle
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getOrdersToFeed: (state: feedType) => state.orders,
    getStatus: (state: feedType) => state.status,
    getAllFeed: (state) => state,
    getOrderDetails: (state) => state.orderDetails
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsFromServer.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(
        getOrderByNumber.fulfilled,
        (
          state: feedType,
          { payload }: PayloadAction<{ success: boolean; orders: TOrder[] }>
        ) => {
          state.status = RequestStatus.Success;
          if (payload.orders.length > 0) {
            state.orderDetails = payload.orders[0];
          }
        }
      )
      .addMatcher(
        (action) =>
          [getFeedsFromServer.rejected, getOrderByNumber.rejected].includes(
            action.type
          ),

        (state) => {
          state.status = RequestStatus.Failed;
        }
      )
      .addMatcher(
        (action) =>
          [getFeedsFromServer.pending, getOrderByNumber.pending].includes(
            action.type
          ),

        (state) => {
          state.status = RequestStatus.Loading;
        }
      );
  }
});

export const { getOrdersToFeed, getAllFeed, getOrderDetails } =
  feedSlice.selectors;
