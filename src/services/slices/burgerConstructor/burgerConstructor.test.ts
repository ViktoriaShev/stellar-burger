import constructorSlice, {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  resetConstructor
} from './burgerConstructor';
import { TConstructorIngredient, TIngredient } from '../../../utils/types';

describe('constructorSlice reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('should handle addToConstructor(add ingredient)', () => {
    const ingredient: TConstructorIngredient = {
      id: '1',
      _id: '1',
      name: 'Ingredient 1',
      type: '',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const newState = constructorSlice.reducer(
      initialState,
      addToConstructor(ingredient)
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual({
      ...ingredient,
      id: expect.any(String)
    });
    expect(newState.bun).toBeNull;
  });
  it('should handle addToConstructor(add bun)', () => {
    const bun: TIngredient = {
      _id: '5',
      name: 'Ingredient 5',
      type: 'bun',
      proteins: 5,
      fat: 5,
      carbohydrates: 5,
      calories: 5,
      price: 5,
      image: '',
      image_mobile: '',
      image_large: ''
    };

    const newState = constructorSlice.reducer(
      initialState,
      addToConstructor(bun)
    );

    expect(newState.ingredients).toHaveLength(0);
    expect(newState.bun).toEqual({
      ...bun,
      id: expect.any(String)
    });
  });

  it('should handle removeFromConstructor', () => {
    const ingredient1 = {
      id: '1',
      _id: '1',
      name: 'Ingredient 1',
      type: '',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: '',
      image_mobile: '',
      image_large: ''
    };
    const ingredient2 = {
      id: '2',
      _id: '2',
      name: 'Ingredient 2',
      type: '',
      proteins: 2,
      fat: 2,
      carbohydrates: 2,
      calories: 2,
      price: 2,
      image: '',
      image_mobile: '',
      image_large: ''
    };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2]
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      removeFromConstructor(0)
    );
    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toEqual(ingredient2);
  });

  it('should handle reorderConstructor', () => {
    const ingredient1 = {
      id: '1',
      _id: '1',
      name: 'Ingredient 1',
      type: '',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: '',
      image_mobile: '',
      image_large: ''
    };
    const ingredient2 = {
      id: '2',
      _id: '2',
      name: 'Ingredient 2',
      type: '',
      proteins: 2,
      fat: 2,
      carbohydrates: 2,
      calories: 2,
      price: 2,
      image: '',
      image_mobile: '',
      image_large: ''
    };
    const ingredient3 = {
      id: '3',
      _id: '3',
      name: 'Ingredient 3',
      type: '',
      proteins: 3,
      fat: 3,
      carbohydrates: 3,
      calories: 3,
      price: 3,
      image: '',
      image_mobile: '',
      image_large: ''
    };
    const stateWithIngredients = {
      ...initialState,
      ingredients: [ingredient1, ingredient2, ingredient3]
    };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      reorderConstructor({ from: 0, to: 2 })
    );
    expect(newState.ingredients).toHaveLength(3);
    expect(newState.ingredients[0]).toEqual(ingredient2);
    expect(newState.ingredients[1]).toEqual(ingredient3);
    expect(newState.ingredients[2]).toEqual(ingredient1);
  });

  it('should handle resetConstructor', () => {
    const ingredient = {
      id: '1',
      _id: '1',
      name: 'Ingredient 1',
      type: '',
      proteins: 1,
      fat: 1,
      carbohydrates: 1,
      calories: 1,
      price: 1,
      image: '',
      image_mobile: '',
      image_large: ''
    };
    const stateWithIngredients = { ...initialState, ingredients: [ingredient] };
    const newState = constructorSlice.reducer(
      stateWithIngredients,
      resetConstructor()
    );
    expect(newState).toEqual(initialState);
  });
});
