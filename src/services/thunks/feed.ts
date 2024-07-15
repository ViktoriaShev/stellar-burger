import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getFeedsApi,
  getOrderByNumberApi,
  TOrderResponse
} from '../../utils/burger-api';

export const getFeedsFromServer = createAsyncThunk(
  'feed/getFeeds',
  async () => await getFeedsApi()
);

export const getOrderByNumber = createAsyncThunk<TOrderResponse, number>(
  'order/getOrder',
  async (id: number) => await getOrderByNumberApi(id)
);
