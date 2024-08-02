import { RequestStatus } from '../../../utils/types';
import type { TIngredient } from '../../../utils/types';
import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsFromServer } from '../../thunks/ingredients';

export interface IngredientsState {
  ingredients: TIngredient[];
  status: RequestStatus;
}

const initialState: IngredientsState = {
  ingredients: [],
  status: RequestStatus.Idle
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state: IngredientsState) => state.ingredients,
    getStatus: (state) => state.status
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsFromServer.pending, (state) => {
        state.status = RequestStatus.Loading;
      })
      .addCase(getIngredientsFromServer.rejected, (state) => {
        state.status = RequestStatus.Failed;
      })
      .addCase(getIngredientsFromServer.fulfilled, (state, action) => {
        state.status = RequestStatus.Success;
        state.ingredients = action.payload;
      });
  }
});
export const { getIngredients, getStatus } = ingredientsSlice.selectors;
export const ingredientsReducer = ingredientsSlice.reducer;
export default ingredientsSlice.reducer;
