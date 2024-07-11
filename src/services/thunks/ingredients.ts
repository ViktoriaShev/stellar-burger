import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '../../utils/burger-api';
import { TIngredient } from '../../utils/types';

export const getIngredientsFromServer = createAsyncThunk(
  'ingredients/getIngredients',
  async () => await getIngredientsApi()
);
