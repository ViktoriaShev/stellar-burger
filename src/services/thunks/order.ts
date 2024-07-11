import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi, TNewOrderResponse } from '../../utils/burger-api';

export const postOrderBurger = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/postOrder',
  async (data: string[]) => await orderBurgerApi(data)
);
