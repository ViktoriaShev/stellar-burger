import { ingredientsReducer } from './ingredients';
import { getIngredientsFromServer } from '../../thunks/ingredients';
import { RequestStatus, TIngredient } from '../../../utils/types';

describe('ingredientsSlice', () => {
  it('should update status to loading when getIngredientsFromServer.pending is dispatched', () => {
    const initialState = {
      ingredients: [],
      status: RequestStatus.Loading
    };
    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      getIngredientsFromServer.pending('')
    );
    expect(actualState).toEqual(initialState);
  });

  it('should update status to failed when getIngredientsFromServer.rejected is dispatched', () => {
    const initialState = {
      ingredients: [],
      status: RequestStatus.Failed
    };
    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      getIngredientsFromServer.rejected(new Error(), '')
    );
    expect(actualState).toEqual(initialState);
  });

  it('should update status to success and update ingredients when getIngredientsFromServer.fulfilled is dispatched', () => {
    const mockIngredients: TIngredient[] = [
      {
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
      },
      {
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
      },
      {
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
      }
    ];
    const initialState = {
      ingredients: mockIngredients,
      status: RequestStatus.Success
    };
    const actualState = ingredientsReducer(
      {
        ...initialState
      },
      getIngredientsFromServer.fulfilled(mockIngredients, '')
    );
    expect(actualState).toEqual(initialState);
  });
});

afterAll(() => {
  jest.clearAllMocks();
});
