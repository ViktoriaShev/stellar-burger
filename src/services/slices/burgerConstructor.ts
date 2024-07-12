import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TConstructorIngredient } from '../../utils/types';

export interface constructorSliceInterface {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: constructorSliceInterface = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (
        state: constructorSliceInterface,
        { payload }: PayloadAction<TConstructorIngredient>
      ) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: crypto.randomUUID() }
      })
    },
    removeFromConstructor: (
      state: constructorSliceInterface,
      { payload }: PayloadAction<number>
    ) => {
      state.ingredients.splice(payload, 1);
    },
    reorderConstructor: (
      state,
      { payload }: PayloadAction<{ from: number; to: number }>
    ) => {
      const { from, to } = payload;
      const ingredients = [...state.ingredients];
      ingredients.splice(to, 0, ingredients.splice(from, 1)[0]);
      state.ingredients = ingredients;
    },
    resetConstructor: () => initialState
  },
  selectors: {
    getConstructorItems: (state) => state,
    getIngredientsInConstructor: (state) => state.ingredients,
    selectBurgerIngredients: (state) => {
      const { bun, ingredients } = state;
      const allIngredients = [bun, ...ingredients];
      if (bun) {
        allIngredients.push(bun);
      }
      const ingredientIds = allIngredients.map((ingredient) => ingredient?._id);

      return ingredientIds;
    }
  }
});

export const {
  getConstructorItems,
  getIngredientsInConstructor,
  selectBurgerIngredients
} = constructorSlice.selectors;
export const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} = constructorSlice.actions;
