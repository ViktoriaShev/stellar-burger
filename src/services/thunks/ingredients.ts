import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';

export const getIngredientsFromServer = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);
