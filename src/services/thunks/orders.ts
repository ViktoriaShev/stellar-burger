import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';
import { TOrder } from '@utils-types';

export const getOrders = createAsyncThunk<TOrder[]>(
  'orders/getOrders',
  async () => await getOrdersApi()
);
