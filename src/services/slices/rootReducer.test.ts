import { createStore } from 'redux';
import rootReducer from './rootReducer';
import { RequestStatus } from '../../utils/types';
describe('rootReducer', () => {
  test('initializes the rootReducer correctly', () => {
    const store = createStore(rootReducer);
    store.dispatch({ type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual({
      user: {
        isAuthChecked: false,
        data: null,
        requestStatus: RequestStatus.Idle
      },
      ingredients: {
        ingredients: [],
        status: RequestStatus.Idle
      },
      constructorItems: {
        bun: null,
        ingredients: []
      },
      feed: {
        orders: [],
        orderDetails: null,
        total: 0,
        totalToday: 0,
        status: RequestStatus.Idle
      },
      order: {
        info: null,
        status: RequestStatus.Idle
      },
      orders: {
        orders: [],
        status: RequestStatus.Idle
      }
    });
  });
});
